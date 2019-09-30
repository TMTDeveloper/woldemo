import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import * as wol from './magic.packet';

class SendMagicPacketRequest {
  readonly mac?: string;
  readonly address?: string;
  readonly port?: number;
}

// tslint:disable-next-line: max-classes-per-file
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('wol')
  async sendPacket(@Body() smp: SendMagicPacketRequest): Promise<any> {
    const wakeResult = await wol.wake(smp.mac, {
      address: smp.address ? smp.address : null,
      port: smp.port ? smp.port : null,
    });
    return wakeResult;
  }
}
