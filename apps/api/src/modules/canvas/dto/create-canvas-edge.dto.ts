import { IsString, IsOptional, IsObject } from 'class-validator';

export class CreateCanvasEdgeDto {
  @IsString()
  canvasId: string;

  @IsString()
  sourceId: string;

  @IsString()
  targetId: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  label?: string;

  @IsOptional()
  @IsObject()
  style?: any;
}
