import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { GatewayModule } from './gateway/gateway.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [TasksModule, ConfigModule.forRoot({
    envFilePath: ["../.env"],
    isGlobal: true
  }), GatewayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
