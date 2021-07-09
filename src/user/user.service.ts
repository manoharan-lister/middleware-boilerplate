import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(private HttpService: HttpService) {}
  async create(user: User): Promise<Observable<AxiosResponse<any>>> {
    const response = await this.HttpService.get(
      'https://jsonplaceholder.typicode.com/users/1',
    ).toPromise();
    return response.data;
  }

  async findOne(id: string): Promise<Observable<AxiosResponse<any>>> {
    const response = await this.HttpService.get(
      'https://jsonplaceholder.typicode.com/users/' + id,
    ).toPromise();
    return response.data;
  }
}
