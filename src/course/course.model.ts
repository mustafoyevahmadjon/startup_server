import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaMS } from 'mongoose';
import { Section } from 'src/section/section.model';
import { User } from 'src/user/user.model';

export type CourseDocument = HydratedDocument<Course>;

@Schema({ timestamps: true })
export class Course {
  @Prop({ type: SchemaMS.Types.ObjectId, ref: 'User' })
  author: User;

  @Prop([{ type: SchemaMS.Types.ObjectId, ref: 'Section' }])
  sections: Section[];

  @Prop({ unique: true, required: true })

  @Prop([String])
  learn: string[];

  @Prop([String])
  requirements: string[];

  @Prop([String])
  tags: string[];

  @Prop()
  price: number;

  @Prop({ type: Boolean, default: false })
  isActive: boolean

  @Prop()
  title: string;

  @Prop()
  slug: string

  @Prop()
  level: string;

  @Prop()
  category: string;

  @Prop()
  image: string;

  @Prop()
  exerpt: string;

  @Prop()
  description: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);