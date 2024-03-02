import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './models/user.model';
import { UserController } from './user.controller';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name:UserModel.name,
        schema:UserSchema,
      }
    ])
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
