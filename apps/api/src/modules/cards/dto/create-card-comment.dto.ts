import { IsString } from 'class-validator';

export class CreateCardCommentDto {
  @IsString()
  content: string;

  @IsString()
  cardId: string;
}
