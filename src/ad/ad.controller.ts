import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AdService } from './ad.service';
import { CreateAdDto } from './dto/create-ad.dto';
import {FileInterceptor} from '@nestjs/platform-express'
import { UpdateAdDto } from './dto/update-ad.dto';
import { diskStorage } from 'multer';
import { editFileName } from 'src/generics/file-upload-utils';

@Controller('ad')
export class AdController {
  constructor(private readonly adService: AdService) {}

  @Post()
  create(@Body() createAdDto: CreateAdDto) {
    return this.adService.create(createAdDto);
  }

  @Get()
  findAll() {
    return this.adService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdDto: UpdateAdDto) {
    return this.adService.update(+id, updateAdDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adService.remove(+id);
  }

@Post('upload')
@UseInterceptors(FileInterceptor('file', {
storage: diskStorage({
destination: './upload',
filename: editFileName,
}),
}))
uploadFile(
          @UploadedFile() file: Express.Multer.File,
          @Body() body) {
const response = {
originalname: file.originalname,
filename: file.filename,
};
return response;
}
}
