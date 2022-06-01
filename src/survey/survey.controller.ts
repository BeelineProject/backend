import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { Survey } from './entities/survey.entity';
import { v4 as uuidv4 } from 'uuid';
import { DateDto } from './dto/date.dto';
@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post()
  create(@Body() createSurveyDto: CreateSurveyDto) {
    let newSurvey = new Survey();
    newSurvey.id = uuidv4();
    newSurvey = { ...newSurvey, ...createSurveyDto };
    return this.surveyService.create(newSurvey);
  }

  @Get()
  findAll() {
    return this.surveyService.findAll();
  }
  @Get(':location')
  finByName(@Param('location') location: string){
    const date = new Date();
    return this.surveyService.findByName(location,date);
  }

  @Get('/get/count')
  countSurvey() {
    return this.surveyService.countSurvey();
  }
  @Get('count/date')
  countByDate(@Body() dateDto:DateDto) {
    return this.surveyService.countByDate(dateDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSurveyDto: UpdateSurveyDto) {
    return this.surveyService.update(+id, updateSurveyDto);
  }
 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.surveyService.remove(id);
  }
}


