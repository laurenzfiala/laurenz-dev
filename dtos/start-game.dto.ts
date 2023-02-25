import {EndpointDto} from '~/dtos/endpoint.dto';

export interface StartGameDto extends EndpointDto {
  name: string;
  player_names: string[];
}
