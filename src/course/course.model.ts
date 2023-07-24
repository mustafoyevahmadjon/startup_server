import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaMS } from 'mongoose';
import { User } from 'src/user/user.model';

export type CourseDocument = HydratedDocument<Course>;

@Schema({ timestamps: true })
export class Course {
  @Prop({ type: SchemaMS.Types.ObjectId, ref: 'User' })
  author: User;

  @Prop({ unique: true, required: true })
  slug: string

  @Prop()
  title: string;

  @Prop()
  exerpt: string;

  @Prop([String])
  learn: string[];

  @Prop([String])
  requirements: string[];

  @Prop([String])
  tags: string[];

  @Prop()
  description: string;

  @Prop()
  level: string;

  @Prop()
  category: string;

  @Prop()
  price: number;

  @Prop({ type: Boolean, default: false })
  isActive: boolean

  @Prop()
  image: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);