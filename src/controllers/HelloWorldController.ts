import { JsonController, Get, Param, UseBefore, UseAfter } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@JsonController('/')
export class HelloWorldController {
  constructor() {}

  @Get('/')
  helloWorld() {
    return "Hello world!";
  }
}