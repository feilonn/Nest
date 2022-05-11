import { CoursesService } from './courses.service';
import { Body, Controller, Get, Param, Post, Patch, Delete} from '@nestjs/common';

@Controller('courses')
export class CoursesController {
    //Injeção de dependencia
    constructor(private readonly coursesService: CoursesService){}

    @Get()
    findAll() {
        return this.coursesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id:string) {
        return this.coursesService.findOne(id)
    }

    @Post()
    create(@Body() body) {
        return this.coursesService.create(body);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body) {
        return this.coursesService.update(id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Body() body) {
        return this.coursesService.remove(id);
    }
}
