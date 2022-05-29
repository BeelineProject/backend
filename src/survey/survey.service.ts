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
      return await this.surveyRepository.save(newSurvey);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return `This action returns all survey`;
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

