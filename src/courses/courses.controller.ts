import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Patch, Delete} from '@nestjs/common';

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
    @HttpCode(HttpStatus.NO_CONTENT)
    create(@Body('nome') body) {
        return body;
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body) {
        return `Curso #${id} atualizado!`;
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Body() body) {
        return `Curso #${id} removido!`;
    }
}
