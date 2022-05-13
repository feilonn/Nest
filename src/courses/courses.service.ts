import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from './entities/course.entity';
import { HttpException, Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//REGRAS DE NEGÓCIO FICAM NO SERVICE

@Injectable()
export class CoursesService {
   
    constructor(
        //Injeção de dependencia para criação de um repositorio baseado na entity Course
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>
    ) {

    }

    findAll() {
        //Método find() sem parametros tras todos os registros do BD.
        return this.courseRepository.find();
    }

    findOne(id: number) {
        //{where:{"id":id}}
        const course = this.courseRepository.findOne(id);
        if (!course) {
            throw new NotFoundException(`Course ID = ${id} not found`);
        }

        return course;
    }

    create(createCourseDto: CreateCourseDto) {
        //Cria Objeto
        const course = this.courseRepository.create(createCourseDto);
        //Salva Objeto
        return this.courseRepository.save(course);
    }

    //Assíncrona para aguardar o preload do registro
    async update(id: number, updateCourseDto: UpdateCourseDto) {
        const course = await this.courseRepository.preload({
            id: +id,
            ...updateCourseDto
        });

        if(!course) {
            throw new NotFoundException(`Course ID = ${id} not found`);
        }

        return this.courseRepository.save(course);
    }

    async remove(id: number) {
        const course = await this.courseRepository.findOne(id);

        if(!course) {
            throw new NotFoundException(`Course ID = ${id} not found`);
        }

        return this.courseRepository.remove(course); 
    }
}
