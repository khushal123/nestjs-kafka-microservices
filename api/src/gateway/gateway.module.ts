import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  providers: [GatewayService],
  imports: [CacheModule.register()],
  exports: [GatewayService]
})
export class GatewayModule {}
