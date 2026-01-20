import { IsString, IsNumber, IsOptional, IsObject } from 'class-validator';

export class CreateCanvasNodeDto {
  @IsString()
  canvasId: string;

  @IsString()
  type: string;

  @IsNumber()
  positionX: number;

  @IsNumber()
  positionY: number;

  @IsOptional()
  @IsNumber()
  width?: number;

  @IsOptional()
  @IsNumber()
  height?: number;

  @IsObject()
  data: any;

  @IsOptional()
  @IsObject()
  style?: any;
}
