import { Column, DeleteDateColumn, PrimaryGeneratedColumn } from "typeorm";

export class Ad {

    @PrimaryGeneratedColumn('uuid')
    id; 

    @Column()
    name ; 

    @Column()
    path;
    
    @DeleteDateColumn()
    deletedAt : Date;
    
}
