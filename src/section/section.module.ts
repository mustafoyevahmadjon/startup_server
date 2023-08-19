import { Module } from '@nestjs/common';
import { SectionController } from './section.controller';
import { SectionService } from './section.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Section, SectionSchema } from './section.model';
import { Lessonschema } from 'src/lesson/lesson.model';
import { Course, CourseSchema } from 'src/course/course.model';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: Section.name, schema: SectionSchema },
      { name: Course.name, schema: CourseSchema },
    ]),
  ],
  controllers: [SectionController],
  providers: [SectionService]
})
export class SectionModule { }
