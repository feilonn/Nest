import { Tag } from './entities/tag.entity';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from './entities/course.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//REGRAS DE NEGÓCIO FICAM NO SERVICE

@Injectable()
export class CoursesService {
   
    constructor(
        //Injeção de dependencia para criação de um repositorio baseado na entity Course
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
    
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>

    ) {}

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

    async create(createCourseDto: CreateCourseDto) {
        const tags = await Promise.all(
            createCourseDto.tags.map((name: string) => this.preloadTagByName(name))
        );

        //Cria Objeto
        const course = this.courseRepository.create({
            ...createCourseDto,
            tags
        });
        //Salva Objeto
        return this.courseRepository.save(course);
    }

    //Assíncrona para aguardar o preload do registro
    async update(id: number, updateCourseDto: UpdateCourseDto) {
        const tags = updateCourseDto.tags && (await Promise.all(
            updateCourseDto.tags.map((name: string) => this.preloadTagByName(name))
        ))

        const course = await this.courseRepository.preload({
            id: +id,
            ...updateCourseDto,
            tags
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

    private async preloadTagByName(name: string): Promise<Tag> {
        const tag  = await this.tagRepository.findOne({ name });

        if(tag) {
            return tag
        }

        return this.tagRepository.create({ name });
    }
}
