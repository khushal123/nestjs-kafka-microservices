import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { OnGatewayConnection, WebSocketGateway } from '@nestjs/websockets';
import { WebSocketServer } from '@nestjs/websockets'
import { Cache } from 'cache-manager';
import { Server } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: "*"
    }
})
export class GatewayService implements OnGatewayConnection {

    @WebSocketServer()
    server: Server

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }


    async handleConnection(client: any, ...args: any[]) {
        console.log(`user connected :${client.id}`)
        await this.cacheManager.reset()
        await this.cacheManager.set("clientId", client.id)
    }

    async emitMessage(message: any) {
        const clientId: string = await this.cacheManager.get('clientId');

        this.server.to(clientId).emit("taskstatus", message)
    }
}
