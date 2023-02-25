import {KeyHolder} from '~/dtos/key-holder.dto';

export interface EndpointDto extends KeyHolder {
  action: string;
}
