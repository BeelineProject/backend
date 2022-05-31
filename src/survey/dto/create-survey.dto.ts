import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { TrafficStateEnum } from 'src/enums/traffic-state.enum';
import { Optional } from '@nestjs/common';
import { CauseEnum } from 'src/enums/cause.enum';

export class CreateSurveyDto {

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsEnum(TrafficStateEnum)
  state: string;

  @IsOptional()
  @IsEnum(CauseEnum)
  cause: string;

  @IsOptional()
  @Type(() => Number )
  @IsNumber()
  waitingTime: number;

  @IsOptional()
  @IsString()
  addition : String;

}
