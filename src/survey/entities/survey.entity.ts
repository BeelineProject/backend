
import { CauseEnum } from 'src/enums/cause.enum';
import { TrafficStateEnum } from 'src/enums/traffic-state.enum';
import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, CreateDateColumn, DeleteDateColumn} from 'typeorm';

@Entity()
export class Survey {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
      location: string;
    @Column(
        {
           type:'enum',
           enum : TrafficStateEnum,
       }
    )
    state: string;
    @Column(
        {
            type:'enum',
            enum : CauseEnum,
        }
    )
    cause:string;
    @Column()
    waitingTime: Number;
    @Column()
    addition : String;
    @CreateDateColumn()
    created_at: Date;
    @Column()
    isValidated : boolean;
    @DeleteDateColumn()
    deletedAt : Date;
}
