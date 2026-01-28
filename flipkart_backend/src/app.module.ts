/* eslint-disable prettier/prettier */

// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { AuthModule } from './authentication/auth.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ProductsModule } from './products/products.module';
// import { dataSourceOptions } from './config/typeorm.config';
// import { OrdersModule } from './orders/orders.module';
// import { CartModule } from './cart/cart.module';

// @Module({
//   imports: [
//     TypeOrmModule.forRoot({...dataSourceOptions}),
//     AuthModule,
//     ProductsModule,
//     OrdersModule,
//     CartModule
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './authentication/auth.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CartModule } from './cart/cart.module';

import { dataSourceOptions } from './config/typeorm.config';

@Module({
  imports: [
    // ✅ Global env config
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // ✅ Async TypeORM config using ConfigService
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        dataSourceOptions(configService),
    }),

    AuthModule,
    ProductsModule,
    OrdersModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

