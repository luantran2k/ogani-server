import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  private readonly startTime: Date = new Date();
  constructor() {}

  @Get()
  getHello(): string {
    return `Api running at ${this.startTime.toLocaleString()}`;
  }
  @Get('hello')
  sayHello(): string {
    return `Hello ogani api`;
  }
}
