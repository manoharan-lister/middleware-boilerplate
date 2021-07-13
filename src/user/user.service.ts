import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { UserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private httpService: HttpService) {}

  async create(user: UserDto): Promise<Observable<AxiosResponse<any>>> {
    const response = await this.httpService.get('https://jsonplaceholder.typicode.com/users/1').toPromise();
    return response.data;
  }

  async findOne(id: string): Promise<Observable<AxiosResponse<any>>> {
    try {
      const response = await this.httpService.get('https://jsonplaceholder.typicode.com/users/' + id).toPromise();
      return response.data;
    } catch (e) {
      throw new HttpException(
        {
          message:'User not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  getWebview() {
    return {
      url: 'https://chicos.com/checkout/xxx',
      method: 'post',
      cookies: [
        {
          name: 'chico-checkout-xxxx',
          value: 'yyyy',
          domain: 'chicos.com',
          expiredDate: '2021-07-04',
          isHttpOnly: true,
          isSecure: true,
          path: '/',
        },
      ],
    };
  }
}
