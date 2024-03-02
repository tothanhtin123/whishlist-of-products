import { Prop } from "@nestjs/mongoose";
import { hash } from "argon2";
import { Exclude } from "class-transformer";
import { HydratedDocument } from "mongoose";
import { BaseModel, Schema, createSchema } from "src/common/base/base.model";

export type UserDocument = HydratedDocument<UserModel> & BaseModel;

@Schema('user')
export class UserModel extends BaseModel{
    @Prop({
        isRequired: true,
        unique: true,
    })
    email: string;

    @Prop({
        isRequired: true
    })
    @Exclude()
    password: string;

    @Prop({
        isRequired: true,
    })
    fullName: string;
}

export const UserSchema = createSchema(UserModel);

UserSchema.pre<UserDocument>('save', async function (next){
    if (this.password) {
		this.password = await hash(this.password);
	}
	next();
})

UserSchema.index({email:'text'},{weights:{email:1}})