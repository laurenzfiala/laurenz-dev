import {DartThrow} from '~/entities/dart-throw.entity';
import {DartsGame} from '~/entities/darts-game.entity';
import {AbstractDartsPlayer, DartsPlayer} from '~/entities/darts-player.entity';
import {ZeroTargetDartGameDto} from '~/dtos/dart-game.dto';
import {ZeroTargetDartPlayerDto} from '~/dtos/dart-player.dto';

export class ZeroTargetPlayer extends AbstractDartsPlayer {
  _throws: DartThrow[] = [];
  _roundThrows: DartThrow[] = [];
  _placement: number | null;

  constructor(name: string,
              score: number = 0,
              throws: DartThrow[] = [],
              roundThrows: DartThrow[] = [],
              placement: number | null = null) {
    super(name, score);
    this._throws = throws;
    this._roundThrows = roundThrows;
    this._placement = placement;
  }

  throws(): DartThrow[] {
    return this._throws;
  }

  displayThrows(): DartThrow[] {
    return this._roundThrows;
  }

  throw(thr: DartThrow) {
    super.throw(thr);
    this.modifyScore(thr.value);
    this._roundThrows.push(thr);
  }

  toDto(): ZeroTargetDartPlayerDto {
    return {
      name: this._name,
      thrs: this._throws.map(t => t.toDto()),
      round_throws: this._roundThrows.map(t => t.toDto()),
      score: this._score,
      placement: this._placement
    };
  }

  static fromDto(dto: ZeroTargetDartPlayerDto): ZeroTargetPlayer {
    return new ZeroTargetPlayer(
      dto.name,
      dto.score,
      dto.thrs.map(t => DartThrow.fromDto(t)),
      dto.round_throws.map(t => DartThrow.fromDto(t)),
      dto.placement
    );
  }
}

export class ZeroTargetGame implements DartsGame {
  private _key: string | undefined;
  private _name: string;
  private _displayName: string;
  private _description: string;
  private _startingValue: number;
  private _players: ZeroTargetPlayer[];
  private _activePlayerIndex: number;

  constructor(startingValue: number,
              key?: string,
              name?: string,
              description?: string,
              players: ZeroTargetPlayer[] = [],
              activePlayerIndex: number = 0) {
    this._key = key;
    this._name = 'zero_target';
    this._displayName = startingValue.toString();
    this._description = 'Starting with a score of ' + startingValue + ', the first player to reach score 0 wins.';
    this._startingValue = startingValue;
    this._players = players;
    this._activePlayerIndex = activePlayerIndex;
  }

  scoreFn(player: DartsPlayer): number {
    return this._startingValue - player.score();
  }

  hasNextThrow(player: DartsPlayer): boolean {
    return this.activePlayer() === player
      && this.activePlayer()._roundThrows.length < 3
      && this.scoreFn(player) > 0;
  }

  nextPlayer(): DartsPlayer {
    if (this.scoreFn(this.activePlayer()) < 0) {
      this.activePlayer()._roundThrows.forEach(thr => {
        this.activePlayer().modifyScore(-thr.value);
      });
    }
    do {
      this._activePlayerIndex++;
      if (this._activePlayerIndex >= this._players.length) this._activePlayerIndex = 0;
    } while (this.hasPlayerWon(this.activePlayer()));
    this.activePlayer()._roundThrows = [];
    return this.activePlayer();
  }

  nextThrow(throwToBeReplaced?: DartThrow, newThrow?: DartThrow): DartThrow | undefined {
    let ap = this.activePlayer();
    if (newThrow !== undefined) {
      if (throwToBeReplaced !== undefined) {
        ap.modifyScore(-throwToBeReplaced.value + newThrow.value);
        throwToBeReplaced.modifier = newThrow.modifier;
        throwToBeReplaced.field = newThrow.field;
      } else {
        ap.throw(newThrow);
      }
    }
    /*if (this.scoreFn(ap) === 0 && this._placements.indexOf(ap) === -1) {
      this._placements.push(ap);
    } else if (this.scoreFn(ap) !== 0 &&  this._placements.indexOf(ap) !== -1) {
      this._placements = this._placements.filter(p => ap !== p);
    }*/
    if (this.hasNextThrow(this.activePlayer())) {
      return new DartThrow(this.activePlayer().name());
    }
    return undefined;
  }

  setPlayerNames(playerNames: string[]): void {
    this._players = [];
    playerNames.forEach(n => {
      this._players.push(new ZeroTargetPlayer(n));
    });
  }

  startGame(rematch: boolean): void {
    this._players.sort((a, b) => {
      return this.hasPlayerWon(b) - this.hasPlayerWon(a);
    });
    this._activePlayerIndex = 0;
    //this._placements = [];
    /*this._players.forEach(p => {
      p.reset();
    });*/
  }

  get key(): string | undefined {
    return this._key;
  }

  get name(): string {
    return this._name;
  }

  get displayName(): string {
    return this._displayName;
  }

  get description(): string {
    return this._description;
  }

  activePlayer(): ZeroTargetPlayer {
    return this._players[this._activePlayerIndex];
  }

  players(): DartsPlayer[] {
    return this._players;
  }

  isRoundEnd(): boolean {
    return this._activePlayerIndex === this._players.length-1 && !this.hasNextThrow(this.activePlayer());
  }

  hasPlayerWon(player: ZeroTargetPlayer): number {
    if (this._players.length === 1 && !this.hasEnded()) return 0;
    /*let placement = this._placements.indexOf(player) + 1;
    if (this._placements.length === this._players.length-1 && placement === 0) {
      return this._players.length;
    } else {
      return placement;
    }*/
    return 0;
  }

  hasEnded(): boolean {
    //return this._placements.length >= this._players.length - (this._players.length === 1 ? 0 : 1);
    return false;
  }

  static fromDto(dto: ZeroTargetDartGameDto): ZeroTargetGame {
    return new ZeroTargetGame(
      dto.starting_score,
      dto.key,
      dto.name,
      dto.name,
      dto.players.map(p => ZeroTargetPlayer.fromDto(p as ZeroTargetDartPlayerDto)),
      dto.players.findIndex(p => p.name === dto.active_player.name)
    );
  }

}
