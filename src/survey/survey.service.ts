import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { Survey} from './entities/survey.entity';


@Injectable()

export class SurveyService {
 
  constructor(
    @InjectRepository(Survey)
    private surveyRepository: Repository<Survey>,
  ) {}

  async create( newSurvey: Partial<Survey>):Promise<Survey> {
    try {
      newSurvey.isValidated=true;
      return await this.surveyRepository.save(newSurvey);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
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
                .select (["survey.created_at"])
                .where(" survey.location = :location",{location: "insat"})
                .getOne();
                date.setHours(date.getHours() - 2);
    var bool = result.created_at > date ;
    
    return bool;
  }

  findOne(id: number) {
    return `This action returns a #${id} survey`;
  }

  update(id: number, updateSurveyDto: UpdateSurveyDto) {
    return `This action updates a #${id} survey`;
  }

  remove(id: number) {
    return `This action removes a #${id} survey`;
  }
}
function SurveyEntity(SurveyEntity: any) {
  throw new Error('Function not implemented.');
}

