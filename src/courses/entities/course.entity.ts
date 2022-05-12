import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('courses')//Table name
export class Course {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column('json', { nullable:true })
    tags: string[];
}