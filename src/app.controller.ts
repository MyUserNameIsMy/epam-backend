import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import * as string_decoder from 'string_decoder';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from '@nestjs/common';
import { DataDto } from './data.dto';

@ApiTags('TEST Request')
@Controller('test')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(':id')
  testGet(@Param('id') id: string): { message: string } {
    return {
      message: `Hello + ${id}`,
    };
  }

  @Post('register')
  testPost(@Body() data: DataDto): { message: string; token: string } {
    return {
      message: `Hello + ${data.fio}`,
      token: `${data.password}`,
    };
  }
}
