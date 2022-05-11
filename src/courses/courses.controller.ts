import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('courses')
export class CoursesController {

    @Get()
    findAll() {
        return "List de cursos";
    }

    @Get(':id')
    findOne(@Param('id') id:string) {
        return `Curso #${id}`;
    }

    @Post()
    create(@Body('nome') body) {
        return body;
    }

}
