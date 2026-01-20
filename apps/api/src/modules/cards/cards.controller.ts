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
import { CardsService } from './cards.service';
import { CreateCardDto, UpdateCardDto, CreateCardCommentDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('cards')
@UseGuards(JwtAuthGuard)
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(@Body() createCardDto: CreateCardDto, @Request() req) {
    return this.cardsService.create(
      createCardDto,
      req.user.id,
      req.user.organizationId
    );
  }

  @Get('project/:projectId')
  findAllByProject(@Param('projectId') projectId: string, @Request() req) {
    return this.cardsService.findAllByProject(projectId, req.user.organizationId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.cardsService.findOne(id, req.user.organizationId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCardDto: UpdateCardDto,
    @Request() req,
  ) {
    return this.cardsService.update(
      id,
      updateCardDto,
      req.user.id,
      req.user.organizationId
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.cardsService.remove(id, req.user.id, req.user.organizationId);
  }

  // Card Comments
  @Post('comments')
  createComment(@Body() createCommentDto: CreateCardCommentDto, @Request() req) {
    return this.cardsService.createComment(
      createCommentDto,
      req.user.id,
      req.user.organizationId
    );
  }

  @Get(':id/comments')
  getComments(@Param('id') cardId: string, @Request() req) {
    return this.cardsService.getComments(cardId, req.user.organizationId);
  }

  // Drag and Drop - Update positions
  @Patch('positions/bulk')
  updatePositions(
    @Body() updates: Array<{ id: string; position: number; columnId: string }>,
    @Request() req,
  ) {
    return this.cardsService.updatePositions(updates, req.user.organizationId);
  }
}
