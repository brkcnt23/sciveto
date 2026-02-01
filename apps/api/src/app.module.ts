import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { StockItemsModule } from './modules/stock-items/stock-items.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { PrismaService } from './prisma/prisma.service';
import { TemplatesModule } from './modules/templates/templates.module';
import { AllocationsModule } from './modules/allocations/allocations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    OrganizationsModule,
    StockItemsModule,
    CategoriesModule,
    ProjectsModule,
    AllocationsModule,
    TemplatesModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}