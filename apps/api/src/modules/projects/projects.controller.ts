import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto, ProjectQueryDto, AllocateStockDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto, @Request() req) {
    return this.projectsService.create(
      createProjectDto,
      req.user.id,
      req.user.organizationId
    );
  }

  @Get()
  findAll(@Query() queryDto: ProjectQueryDto, @Request() req) {
    return this.projectsService.findAll(queryDto, req.user.organizationId);
  }

  @Get('my')
  findMyProjects(@Query() queryDto: ProjectQueryDto, @Request() req) {
    return this.projectsService.findAll(
      { ...queryDto, managerId: req.user.id },
      req.user.organizationId
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.projectsService.findOne(id, req.user.organizationId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @Request() req,
  ) {
    return this.projectsService.update(
      id,
      updateProjectDto,
      req.user.id,
      req.user.organizationId
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.projectsService.remove(id, req.user.id, req.user.organizationId);
  }

  // Stock Allocation Routes
  @Post(':id/allocations')
  allocateStock(
    @Param('id') projectId: string,
    @Body() allocateStockDto: AllocateStockDto,
    @Request() req,
  ) {
    return this.projectsService.allocateStock(
      projectId,
      allocateStockDto,
      req.user.id,
      req.user.organizationId
    );
  }

  @Get(':id/allocations')
  getProjectAllocations(@Param('id') projectId: string, @Request() req) {
    return this.projectsService.getProjectAllocations(
      projectId,
      req.user.organizationId
    );
  }

  @Patch('allocations/:allocationId/usage')
  updateAllocationUsage(
    @Param('allocationId') allocationId: string,
    @Body('usedQuantity') usedQuantity: number,
    @Request() req,
  ) {
    return this.projectsService.updateAllocationUsage(
      allocationId,
      usedQuantity,
      req.user.id,
      req.user.organizationId
    );
  }
}