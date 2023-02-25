import {DartGameDto} from '~/dtos/dart-game.dto';

export interface ResponseDto {
  type: 'game' | 'error' | 'end_game';
}

export interface GameResponseDto extends ResponseDto {
  game: DartGameDto;
}

export interface EndGameResponseDto extends ResponseDto {
  new_game: DartGameDto;
}

export interface ErrorResponseDto extends ResponseDto {
  message: string;
}

