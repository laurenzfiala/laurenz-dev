import {DartsPlayer} from '~/entities/darts-player.entity';
import {DartThrow} from '~/entities/dart-throw.entity';

export interface DartsGame {
  key: string | undefined;
  name: string;
  displayName: string;
  description: string;

  players(): DartsPlayer[];
  activePlayer(): DartsPlayer;
  setPlayerNames(playerNames: string[]): void;
  startGame(rematch: boolean): void;
  nextPlayer(): DartsPlayer;
  hasNextThrow(player: DartsPlayer): boolean;
  nextThrow(throwToBeReplaced?: DartThrow, newThrow?: DartThrow): DartThrow | undefined;
  scoreFn(player: DartsPlayer): number;
  isRoundEnd(): boolean;
  hasPlayerWon(player: DartsPlayer): number;
  hasEnded(): boolean;
}




