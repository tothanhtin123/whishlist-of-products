import { ConflictException, Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { UserModel } from './models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { errorMessages } from './user.error';

@Injectable()
export class UserService extends BaseService<UserModel> {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
  ) {
    super(userModel);
  }
  notFoundMessage: string = errorMessages.notFound;

  async checkUserExistsByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new ConflictException(errorMessages.existedByEmail);
    }
    return false;
  }
}
