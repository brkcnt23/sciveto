import { IsString, IsOptional, IsObject } from 'class-validator';

export class CreateCanvasDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  projectId: string;

  @IsOptional()
  @IsObject()
  viewport?: any;

  @IsOptional()
  @IsObject()
  settings?: any;
}
