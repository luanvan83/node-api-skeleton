import { Service, Inject } from 'typedi';
import { User } from '../entities/UserEntity';
import { UserRepository } from '../repositories/UserRepository';
import { LogService } from './LogService';

@Service()
export class UserService {
  constructor (
    @Inject("UserRepository") private userRepository: typeof UserRepository,
    @Inject() private logger: LogService
  ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    this.logger.info("This is a log from service class");
    return await this.userRepository.findOneBy({
      id: id
    });
  }

  async findByNickname(nickname: string) : Promise<User[]> {
    return await this.userRepository.findByNickname(nickname);
  }

  async createUser(nickname: string, email: string): Promise<User | null> {
    const userEntity = new User();
    userEntity.nickname = nickname;
    userEntity.email = email;
    return await this.userRepository.saveUser(userEntity);
  }
}
