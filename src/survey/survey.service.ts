import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { Repository } from 'typeorm';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { Survey} from './entities/survey.entity';
import { DateDto } from './dto/date.dto';


@Injectable()

export class SurveyService {
 
  constructor(
    @InjectRepository(Survey)
    private surveyRepository: Repository<Survey>,
  ) {}


  async create( newSurvey: Partial<Survey>):Promise<Survey> {
    try {
      var date = new Date();
      date.setHours(date.getHours() - 2);
      console.log(date);
      const result = await this.surveyRepository
      .createQueryBuilder("survey")
      .select("count(survey.location)","count")
      .where(" survey.location like :location",{location: '%'+ newSurvey.location })
      .andWhere(" survey.state like :state",{state: '%'+ newSurvey.state })
      .andWhere(" survey.deletedAt is NuLL")
      .andWhere(" survey.created_at > :date ",{date:  date})
      .getCount()
      console.log(result);
      if (result>=3)
      {newSurvey.isValidated=true;} 
      else {newSurvey.isValidated=false;}
//this function deletes the information after 4 hours since it is no longer usefull
      setTimeout(
        ()=>{this.surveyRepository.softDelete(newSurvey.id); 
             console.log(`deleted ${newSurvey.id}`);},
             4*60*60*1000);

      return await this.surveyRepository.save(newSurvey);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
 
 
  async findByName(location: String, date : Date) {
  try { 
    date.setHours(date.getHours() - 2);
    console.log(date);
    const result = await this.surveyRepository
                .createQueryBuilder("survey")
                .where(" survey.location like :location",{location: '%'+ location })
                .andWhere(" survey.created_at > :date ",{date: date})
                .andWhere("survey.isValidated = :bool" , {bool:true})
                .andWhere(" survey.deletedAt is NuLL")
                .getOne();
    return result ;}
    
    catch(err){ 
      return `location ${location} is not found `;
    };
  }

  async findAll() {
    var date = new Date();
    const result = await this.surveyRepository
                .createQueryBuilder("survey")
                .getMany();
  
    
    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} survey`;
  }
async countSurvey(){
    const result = await this.surveyRepository
    .count();
    console.log('Iam here');
    return result;
   
  }
  async countByDate(dateDto:DateDto){ 
    var date = dateDto.date;
    date.setHours(0);
    date.setMinutes(0);
    const result = await this.surveyRepository
    .createQueryBuilder("survey")
    .select("survey.location")
    .andWhere(" survey.deletedAt is NuLL")
    .andWhere(" survey.created_at >= :date ",{date: date })
    .getCount()
    console.log(result);
    return result;
  }

  update(id: number, updateSurveyDto: UpdateSurveyDto) {
    return `This action updates a #${id} survey`;
  }

  async remove(id: string) {
    console.log("inside remove");
     return await this.surveyRepository.softDelete(id);
     
  }
}





