import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductCategoriesModule } from './product-categories/product-categories.module';

@Module({
  imports: [ProductsModule, UsersModule, AuthModule, ProductCategoriesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
