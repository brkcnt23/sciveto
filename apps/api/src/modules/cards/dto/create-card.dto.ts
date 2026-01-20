import { IsString, IsOptional, IsInt, IsEnum, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export enum CardPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export enum CardStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  REVIEW = 'REVIEW',
  DONE = 'DONE',
}

export class CreateCardDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  position?: number;

  @IsString()
  columnId: string;

  @IsString()
  projectId: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dueDate?: Date;

  @IsOptional()
  @IsEnum(CardPriority)
  priority?: CardPriority;

  @IsOptional()
  @IsEnum(CardStatus)
  status?: CardStatus;

  @IsOptional()
  @IsString()
  assignedToId?: string;
}
