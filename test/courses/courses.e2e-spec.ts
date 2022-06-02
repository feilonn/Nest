import { CreateCourseDto } from './../../src/courses/dto/create-course.dto';
import { CoursesModule } from './../../src/courses/courses.module';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidationPipe } from '@nestjs/common';

describe('Courses: /courses', () => {
  let app: INestApplication;

  const course: CreateCourseDto = {
    name: 'Nestjs & TypeORM',
    description: 'Criando APIs restful com nestjs',
    tags:['nestjs', 'typeorm', 'nodejs', 'typescript']
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoursesModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'senha123',
          database: 'nest-fundamentos-test',
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe({
      whitelist: true, //Retira do objeto da requisição os atributos que não constam no DTO
      forbidNonWhitelisted: true, //Não permite que sejam enviadas informações não listadas no DTO
      transform: true, //Define que o objeto enviando nas requests seja do tipo do DTO
      }));

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  //Teste para o create do modulo courses
  it('/Create POST /courses', () => {
    return request(app.getHttpServer()).post('/courses').send(course).expect(HttpStatus.CREATED)
  });
});
