import {DartPlayerDto} from '~/dtos/dart-player.dto';

export interface DartGameDto {
  key: string;
  name: string;
  players: DartPlayerDto[];
  active_player: DartPlayerDto;
  throw_amount: number;
}

export interface ZeroTargetDartGameDto extends DartGameDto {
  starting_score: number;
}