import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
export type User = any;

@Injectable()
export class AuthService {
  private readonly users = [
    {
      firstname: 'test',
      lastname: 'j',
      email: 'test@gmail.com',
      password: 'password',
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
