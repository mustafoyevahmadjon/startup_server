import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from 'src/user/decorators/user.decorator';
import { Course, CourseSchema } from './course.model';
import { UserSchema } from 'src/user/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Course.name, schema: CourseSchema },
    ]),
  ],
  providers: [CourseService],
  controllers: [CourseController]
})
export class CourseModule { }
