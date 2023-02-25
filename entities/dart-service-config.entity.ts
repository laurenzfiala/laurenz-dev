import {StartGameDto} from '~/dtos/start-game.dto';

export class DartServiceConfig {
  name!: string;
  playerNames!: string[];
  showKey!: boolean;
  doServerComms!: boolean;

  public updateStartGameDto(dto: StartGameDto): void {
    dto.name = this.name;
    dto.player_names = this.playerNames;
  }
}
