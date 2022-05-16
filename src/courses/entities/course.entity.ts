import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tag } from './tag.entity';

@Entity('courses')//Table name
export class Course {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @JoinTable()
    @ManyToMany(() => Tag, (tag: Tag) => tag.courses, { cascade: true })
    tags: Tag[];
}