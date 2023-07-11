import { Module } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { InstructorController } from './instructor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Instructor, InstructorSchema } from './instructor.model';
import { UserSchema, User } from 'src/user/user.model';
import { Course, CourseSchema } from 'src/course/course.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Instructor.name, schema: InstructorSchema },
      { name: Course.name, schema: CourseSchema },
    ]),
  ],
  providers: [InstructorService],
  controllers: [InstructorController]
})
export class InstructorModule { }
