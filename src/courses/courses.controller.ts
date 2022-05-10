import { Controller, Get } from '@nestjs/common';

@Controller('courses')
export class CoursesController {

    @Get("/list")
    findAll() {
        return "List de cursos";
    }

}
