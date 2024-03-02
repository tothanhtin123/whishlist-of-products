import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { UserModel } from './models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { errorMessages } from './user.error';
import { verify } from 'argon2';

@Injectable()
export class UserService extends BaseService<UserModel> {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
  ) {
    super(userModel);
  }
  notFoundMessage: string = errorMessages.notFound;

  async validUserByEmailAndPassword(email: string, password: string) {
    const user = await this.getOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException(errorMessages.emailOrPasswordInCorrect);
    }
    const comparePassword = await verify(user.password, password);
    if (!comparePassword) {
      throw new UnauthorizedException(errorMessages.emailOrPasswordInCorrect);
    }
    return user;
  }

  async checkUserExistsByEmail(email: string) {
    const user = await this.getOne({ where: { email } });
    if (user) {
      throw new ConflictException(errorMessages.existedByEmail);
    }
    return false;
  }
}
