import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CanvasService } from './canvas.service';
import { CreateCanvasDto, UpdateCanvasDto, CreateCanvasNodeDto, CreateCanvasEdgeDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('canvas')
@UseGuards(JwtAuthGuard)
export class CanvasController {
  constructor(private readonly canvasService: CanvasService) {}

  @Post()
  create(@Body() createCanvasDto: CreateCanvasDto, @Request() req) {
    return this.canvasService.create(createCanvasDto, req.user.organizationId);
  }

  @Get('project/:projectId')
  findAllByProject(@Param('projectId') projectId: string, @Request() req) {
    return this.canvasService.findAllByProject(projectId, req.user.organizationId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.canvasService.findOne(id, req.user.organizationId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCanvasDto: UpdateCanvasDto,
    @Request() req,
  ) {
    return this.canvasService.update(id, updateCanvasDto, req.user.organizationId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.canvasService.remove(id, req.user.organizationId);
  }

  // Canvas Nodes
  @Post('nodes')
  createNode(@Body() createNodeDto: CreateCanvasNodeDto, @Request() req) {
    return this.canvasService.createNode(createNodeDto, req.user.organizationId);
  }

  @Patch('nodes/:id')
  updateNode(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateCanvasNodeDto>,
    @Request() req,
  ) {
    return this.canvasService.updateNode(id, updateData, req.user.organizationId);
  }

  @Delete('nodes/:id')
  removeNode(@Param('id') id: string, @Request() req) {
    return this.canvasService.removeNode(id, req.user.organizationId);
  }

  // Canvas Edges
  @Post('edges')
  createEdge(@Body() createEdgeDto: CreateCanvasEdgeDto, @Request() req) {
    return this.canvasService.createEdge(createEdgeDto, req.user.organizationId);
  }

  @Delete('edges/:id')
  removeEdge(@Param('id') id: string, @Request() req) {
    return this.canvasService.removeEdge(id, req.user.organizationId);
  }
}
