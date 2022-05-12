import { PartialType } from "@nestjs/mapped-types";
import { CreateCourseDto } from "./create-course.dto";

//Utiliza as informações do create-course.dto e as trata como optional <?>
export class UpdateCourseDto extends PartialType(CreateCourseDto) {}
