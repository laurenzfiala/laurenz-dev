import {EndpointDto} from '~/dtos/endpoint.dto';
import {StartGameDto} from '~/dtos/start-game.dto';

export interface EndGameDto extends EndpointDto {
  new_game: StartGameDto;
}
