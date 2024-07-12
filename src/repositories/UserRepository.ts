import { User } from '../entities/UserEntity';

import { AppDataSource } from '../typeorm-data-source';

export const UserRepository = AppDataSource.getRepository(User).extend({
  findByNickname(nickname: string) {
    return this.createQueryBuilder("user")
      .where("user.nickname = :nickname", { nickname })
      .getMany()
  },

  saveUser(user: User) {
    return this.save(user);
  }
})
