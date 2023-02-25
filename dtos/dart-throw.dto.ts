import {EndpointDto} from '~/dtos/endpoint.dto';

export interface DartThrowDto extends EndpointDto {
  id: number | null;
  player_name: string;
  modifier: undefined | 'D' | 'T';
  field: undefined | number | 'BULL' | 'MISS';
}
