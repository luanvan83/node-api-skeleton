import { JsonController, Get, Param, Post, Req, Res, Body, OnUndefined, OnNull } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { UserService } from '../services/UserService';
import { LogService } from '../services/LogService';

@Service()
@JsonController('/users')
export class UserController {
  constructor(@Inject() private userService: UserService, @Inject() private logger: LogService) {}

  @Get('/')
  async getAllUsers() {
    const users = await this.userService.getAllUsers();
    this.logger.info('This is a log from controller', {"userCount": users.length});
    return users;
  }

  @Get('/:id')
  @OnUndefined(404)
  @OnNull(404)
  getUser(@Param('id') id: number) {
    const user = this.userService.findOne(id);
    return user;
  }

  @Get('/:id/feedbacks')
  async getUserFeedbacks(@Param('id') id: number) {
    const user = await this.userService.findOne(id);
    if (user) {
        const feedbacks = await user.feedbacks;
        return feedbacks;
    }
    return [{}];
  }

  @Post('/')
  createUser(@Body() user: any) {
    return this.userService.createUser(
      user.nickname,
      user.email
    );
  }
}