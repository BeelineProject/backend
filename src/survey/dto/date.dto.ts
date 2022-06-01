import { Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class DateDto {

    @IsNotEmpty()
    @Type(()=>Date)
    date: Date;
}