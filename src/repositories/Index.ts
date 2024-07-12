import { UserRepository } from "./UserRepository";
import { Container } from 'typedi';

export function registerRepositories() {
  Container.set("UserRepository", UserRepository);
}