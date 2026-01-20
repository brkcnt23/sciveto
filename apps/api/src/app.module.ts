import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { StockItemsModule } from './modules/stock-items/stock-items.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { PrismaService } from './prisma/prisma.service';
import { TemplatesModule } from './modules/templates/templates.module';
import { CardsModule } from './modules/cards/cards.module';
import { TagsModule } from './modules/tags/tags.module';
import { CanvasModule } from './modules/canvas/canvas.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    StockItemsModule,
    CategoriesModule,
    ProjectsModule,
    TemplatesModule,
    CardsModule,
    TagsModule,
    CanvasModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}