import { Tag } from './entities/tag.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { Module } from '@nestjs/common';
import { Course } from './entities/course.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Course, Tag])],
    controllers: [CoursesController],
    providers: [CoursesService],
})

export class CoursesModule {}
