import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { VariantModule } from './variant/variant.module';

@Module({
  imports: [ProductModule, CategoryModule, VariantModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
