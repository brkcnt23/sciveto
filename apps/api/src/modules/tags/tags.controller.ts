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
import { TagsService } from './tags.service';
import { CreateTagDto, UpdateTagDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('tags')
@UseGuards(JwtAuthGuard)
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  create(@Body() createTagDto: CreateTagDto, @Request() req) {
    return this.tagsService.create(createTagDto, req.user.organizationId);
  }

  @Get()
  findAll(@Request() req) {
    return this.tagsService.findAll(req.user.organizationId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.tagsService.findOne(id, req.user.organizationId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTagDto: UpdateTagDto,
    @Request() req,
  ) {
    return this.tagsService.update(id, updateTagDto, req.user.organizationId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.tagsService.remove(id, req.user.organizationId);
  }

  // Tag-Card Association
  @Post(':tagId/cards/:cardId')
  addTagToCard(
    @Param('tagId') tagId: string,
    @Param('cardId') cardId: string,
    @Request() req,
  ) {
    return this.tagsService.addTagToCard(cardId, tagId, req.user.organizationId);
  }

  @Delete(':tagId/cards/:cardId')
  removeTagFromCard(
    @Param('tagId') tagId: string,
    @Param('cardId') cardId: string,
    @Request() req,
  ) {
    return this.tagsService.removeTagFromCard(cardId, tagId, req.user.organizationId);
  }
}
