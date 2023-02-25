import {DartThrow} from '~/entities/dart-throw.entity';
import {DartsGame} from '~/entities/darts-game.entity';
import {AbstractDartsPlayer, DartsPlayer} from '~/entities/darts-player.entity';
import {ZeroTargetDartGameDto} from '~/dtos/dart-game.dto';
import {RandomHeadToHeadPlayerDto} from '~/dtos/dart-player.dto';
import {DartField} from '~/entities/dart-field.entity';

export class RandomHeadToHeadPlayer extends AbstractDartsPlayer {
  _throws: DartThrow[] = [];
  _roundThrows: DartThrow[] = [];
  failed: boolean = false;
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
    this._throws.push(thr);
    this._roundThrows.push(thr);
  }

  toDto(): RandomHeadToHeadPlayerDto {
    return {
      name: this._name,
      thrs: this._throws.map(t => t.toDto()),
      round_throws: this._roundThrows.map(t => t.toDto()),
      score: this._score,
      placement: this._placement
    };
  }

  static fromDto(dto: RandomHeadToHeadPlayerDto): RandomHeadToHeadPlayer {
    return new RandomHeadToHeadPlayer(
      dto.name,
      dto.score,
      dto.thrs.map(t => DartThrow.fromDto(t)),
      dto.round_throws.map(t => DartThrow.fromDto(t)),
      dto.placement
    );
  }
}

export class RandomHeadToHeadGame implements DartsGame {
  private _key: string | undefined;
  private _name: string;
  private _displayName: string;
  private _description: string;
  private _winningScore: number;
  private _players: RandomHeadToHeadPlayer[];
  private _activePlayerIndex: number;
  private _targetFieldAge!: number;
  private _targetField!: DartField;

  constructor(winningScore: number,
              key?: string,
              name?: string,
              description?: string,
              players: RandomHeadToHeadPlayer[] = [],
              activePlayerIndex: number = 0) {
    this._key = key;
    this._name = 'random_hth';
    this._displayName = winningScore + ' Random Head-to-Head';
    this._description = 'Like tennis.';
    this._winningScore = winningScore;
    this._players = players;
    this._activePlayerIndex = activePlayerIndex;
    this.newTargetField(); // TODO move to startGame()
  }

  scoreFn(player: DartsPlayer): number {
    return player.score();
  }

  hasNextThrow(player: RandomHeadToHeadPlayer): boolean {
    return this.activePlayer() === player
      && !this.activePlayer().failed
      && this.scoreFn(player) < this._winningScore;
  }

  nextPlayer(): DartsPlayer {
    do {
      this._activePlayerIndex++;
      if (this._activePlayerIndex >= this._players.length) this._activePlayerIndex = 0;
    } while (this.hasPlayerWon(this.activePlayer()));
    this.activePlayer()._roundThrows = [];
    this.activePlayer().failed = false;
    return this.activePlayer();
  }

  nextThrow(throwToBeReplaced?: DartThrow, newThrow?: DartThrow): DartThrow | undefined {
    let ap = this.activePlayer();
    if (newThrow) {
      ap.throw(newThrow);
      if (this._targetField.field === newThrow.field) { // TODO use equals
        let modifierMult = 1;
        if (newThrow.modifier === 'D') modifierMult = 2;
        if (newThrow.modifier === 'T') modifierMult = 3;
        ap.modifyScore(modifierMult * (this._targetFieldAge + 1));
        this.newTargetField();
        return new DartThrow(this.activePlayer().name());
      } else {
        this._targetFieldAge++;
        this.activePlayer().failed = true;
        return undefined;
      }
    }
    return new DartThrow(this.activePlayer().name());
  }

  setPlayerNames(playerNames: string[]): void {
    this._players = [];
    playerNames.forEach(n => {
      this._players.push(new RandomHeadToHeadPlayer(n));
    });
  }

  startGame(rematch: boolean): void {
    this._activePlayerIndex = 0;
  }

  newTargetField(): void {
    this._targetFieldAge = 0;
    this._targetField = DartField.randomField();
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

  get targetField(): DartField {
    return this._targetField;
  }

  activePlayer(): RandomHeadToHeadPlayer {
    return this._players[this._activePlayerIndex];
  }

  players(): DartsPlayer[] {
    return this._players;
  }

  isRoundEnd(): boolean {
    return this._activePlayerIndex === this._players.length-1 && !this.hasNextThrow(this.activePlayer());
  }

  hasPlayerWon(player: RandomHeadToHeadPlayer): number {
    return 0;
  }

  hasEnded(): boolean {
    return false;
  }

  static fromDto(dto: ZeroTargetDartGameDto): RandomHeadToHeadGame {
    return new RandomHeadToHeadGame(
      dto.starting_score,
      dto.key,
      dto.name,
      dto.name,
      dto.players.map(p => RandomHeadToHeadPlayer.fromDto(p as RandomHeadToHeadPlayerDto)),
      dto.players.findIndex(p => p.name === dto.active_player.name)
    );
  }

}
