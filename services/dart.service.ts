import {DartsGame} from '~/entities/darts-game.entity';
import {ZeroTargetGame} from '~/entities/zero-target-darts-game.entity';
import {DartGameDto, ZeroTargetDartGameDto} from '~/dtos/dart-game.dto';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {DartThrow} from '~/entities/dart-throw.entity';
import {StartGameDto} from '~/dtos/start-game.dto';
import {EndGameDto} from '~/dtos/end-game.dto';
import {KeyHolder} from '~/dtos/key-holder.dto';
import {EndGameResponseDto, ErrorResponseDto, GameResponseDto, ResponseDto} from '~/dtos/response.dto';
import {DartServiceConfig} from '~/entities/dart-service-config.entity';

declare module 'vue/types/vue' {
  interface Vue {
    $dartService: DartService
  }
}

// @ts-ignore
export default ({ app }, inject) => {
  inject('dartService', new DartService())
}

export class DartService {

  private gameMap: {[name: string]: (dto: DartGameDto) => DartsGame} = {
    'zero_target': (dto) => ZeroTargetGame.fromDto(dto as ZeroTargetDartGameDto)
  };

  private ws!: WebSocket;
  public config: DartServiceConfig = new DartServiceConfig();
  public component!: Vue;
  private _game!: DartsGame;
  private _change!: BehaviorSubject<DartsGame>;
  private _wsStateChange: BehaviorSubject<number> = new BehaviorSubject<number>(WebSocket.CLOSED);
  private _end: Subject<DartsGame | null> = new Subject<DartsGame | null>();
  private throwDesyncQueue: DartThrow[] = [];

  private connect(): Promise<WebSocket> {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      return Promise.resolve(this.ws);
    } else if (this.ws) {
      this.ws.close();
    }
    const url = 'ws://darts.local:8765/';
    //const url = 'ws://192.168.1.45:8765/';
    //const url = 'ws://localhost:8765/';
    this.ws = new WebSocket(url);
    return new Promise<WebSocket>((resolve, reject) => {
      this.ws.onopen = ev => {
        this.throwDesyncQueue = [];
        this._wsStateChange.next(WebSocket.OPEN);
        resolve(this.ws);
      };
      this.ws.onmessage = ev => this.onWsMessageReceived(ev);
      this.ws.onerror = e => {
        console.log('Server could not be reached.');
        reject('Server could not be reached.');
      };
      this.ws.onclose = e => {
        this._wsStateChange.next(WebSocket.CLOSED);
        console.log('Websocket connection closed.');
        reject('Connection closed.');
      };
    });
  }

  private onWsMessageReceived(ev: MessageEvent<any>,
                              resolve?: (value: any) => void,
                              reject?: (value: any) => void) {
    let response = JSON.parse(ev.data) as ResponseDto;
    if (response.type === 'error') {
      if (reject) reject((response as ErrorResponseDto).message);
    } else if (response.type === 'game') {
      this.onGameResponseReceived(response as GameResponseDto);
      if (resolve) resolve(response as GameResponseDto);
    } else if (response.type === 'end_game') {
      this.onEndGameResponseReceived(response as EndGameResponseDto);
      if (resolve) resolve(response as EndGameResponseDto);
    }
    if (reject) reject('Unexpected message received: ' + ev.data);
  }

  private onGameResponseReceived(response: GameResponseDto) {
    this._game = this.mapGame(response.game);
    if (this._change) {
      this._change.next(this._game);
    } else {
      this._change = new BehaviorSubject<DartsGame>(this._game);
    }
  }

  private onEndGameResponseReceived(response: EndGameResponseDto): void {
    let newGame = null;
    if (response.new_game) {
      newGame = this.mapGame(response.new_game);
    }
    this._end.next(newGame);
  }

  public async start(config: DartServiceConfig): Promise<DartsGame> {
    const dto = {action: 'start'} as StartGameDto;
    config.updateStartGameDto(dto);
    await this.send(dto);
    return this._game;
  }

  public async startUsingConfig(): Promise<void> {
    if (!this.config.doServerComms) return Promise.resolve();
    const promise = new Promise<void>((resolve, reject) => {
      this.start(this.config).then(value => {
        resolve();
      }).catch(reason => {
        reject(reason);
      });
    });
    return promise;
  }

  public async get(key?: string): Promise<DartsGame> {
    await this.send({key: key, action: 'get'} as KeyHolder);
    return this._game;
  }

  public async thr(thr: DartThrow): Promise<DartsGame> {
    if (this.ws.readyState !== WebSocket.OPEN) {
      this.throwDesyncQueue.push(thr);
      return this._game;
    }
    await this.send(thr.toDto());
    return this._game;
  }

  public async end(rematch: boolean = false): Promise<DartsGame | undefined> {
    let dto = {action: 'end'} as EndGameDto;
    if (rematch) {
      const startDto = {} as StartGameDto;
      this.config.updateStartGameDto(startDto)
      dto.new_game = startDto;
    }
    await this.send(dto);
    return rematch ? this._game : undefined;
  }

  private async send(data: KeyHolder): Promise<ResponseDto> {
    await this.connect();
    const promise = new Promise<ResponseDto>((resolve, reject) => {
      this.ws.onmessage = ev => {
        this.onWsMessageReceived(ev, resolve, reject);
      };
      this.ws.onerror = ev => {
        reject('Server could not be reached.');
      };
    });
    if (!data.key && this._game) {
      data.key = this._game.key;
    }
    this.ws.send(JSON.stringify(data));
    return promise;
  }

  private mapGame(received: DartGameDto): DartsGame {
    console.log(received);
    return this.gameMap[received.name](received);
  }

  get game(): DartsGame {
    return this._game;
  }

  set game(game: DartsGame) {
    if (this._change) this._change.next(game); // TODO check
    this._game = game;
  }

  get onChange(): Observable<DartsGame> {
    return this._change.asObservable();
  }

  get onWsStateChanged(): Observable<number> {
    return this._wsStateChange.asObservable();
  }

  get onEnd(): Observable<DartsGame | null> {
    return this._end.asObservable();
  }
}
