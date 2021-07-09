import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();
  });

  describe('get user by id', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get<UsersController>(UsersController);
      // expect(appController.getOne()).toBe('Hello World!');
    });
  });
});
