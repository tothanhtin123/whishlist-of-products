import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { UserModel } from './models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService extends BaseService<UserModel>{
    constructor(@InjectModel(UserModel.name) private readonly userModel: Model<UserModel>){
        super(userModel);
    }
    notFoundMessage: string = 'User Not Found';
}
