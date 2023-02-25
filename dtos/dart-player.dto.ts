import {DartThrowDto} from '~/dtos/dart-throw.dto';

export interface DartPlayerDto {
  name: string;
  thrs: DartThrowDto[];
}

export interface ZeroTargetDartPlayerDto extends DartPlayerDto {
  round_throws: DartThrowDto[];
  score: number;
  placement: number | null;
}

export interface RandomHeadToHeadPlayerDto extends DartPlayerDto {
  round_throws: DartThrowDto[];
  score: number;
  placement: number | null;
}
