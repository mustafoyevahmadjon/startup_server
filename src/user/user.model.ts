import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { timestamp } from "rxjs";
import {RoleUser} from "./user.interface";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop({ unique: true, required: true })
    email: string;

    @Prop({ required: true })
    fullName: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    role: RoleUser
}

export const UserSchema = SchemaFactory.createForClass(User);