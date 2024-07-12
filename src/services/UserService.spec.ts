import Container from "typedi";
import { UserService } from "./UserService";
import { expect } from "@jest/globals";
import { User } from "../entities/UserEntity";

const UserRepositoryMock = {
  find: jest.fn().mockReturnValue([{
    nickname: 'Foo'
  }]),
  findByNickname: jest.fn().mockReturnValue([{
    nickname: 'Another Foo'
  }]),
  saveUser: jest.fn().mockImplementation((userEntity: User) => {
    return userEntity;
  })
};

describe('UserService Test', () => {
  beforeAll(() => {
    Container.reset()
    Container.set('UserRepository', UserRepositoryMock);
  });

  it('Should be TRUE', () => {
    expect(true);
  });

  it('Should call the getAllUsers() within mock repository', async () => {
    const service = Container.get(UserService);
    const result = await service.getAllUsers();
    expect(result.length).toEqual(1);
    expect(result[0].nickname).toEqual('Foo');
  })

  it('Should call the findByNickname() within mock repository', async () => {
    const service = Container.get(UserService);
    const result = await service.findByNickname('Another Foo');
    expect(result.length).toEqual(1);
    expect(result[0].nickname).toEqual('Another Foo');
  })

  it('Should call the createUser() within mock repository', async () => {
    const service = Container.get(UserService);
    const result = await service.createUser('New Foo', 'foo@barr.com');
    expect(result instanceof User).toBe(true);
    expect(result?.nickname).toEqual('New Foo');
  })
})