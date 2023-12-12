import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    console.log(ctx.req);
    const authorizationHeader = ctx.req.headers.authorization;
    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1];
      try {
        const user = jwt.verify(token, this.configService.get('jwt_key'));
        ctx.user = user;
        console.log(user);
        return true;
      } catch (error) {
        throw new HttpException(
          'Invalid Token : ' + error.message,
          HttpStatus.UNAUTHORIZED,
        );
      }
    }
  }
}
