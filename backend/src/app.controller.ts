import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): object {
    return {
      message: this.appService.getHello(),
      version: '1.0.0',
      status: 'running',
      endpoints: {
        auth: '/auth',
        users: '/users',
        business: '/business',
      },
    };
  }

  @Get('health')
  getHealth(): object {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
