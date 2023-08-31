import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpStatus,
  HttpException,
  UseFilters,
} from '@nestjs/common';
import { CreateCatDto, UpdateCatDto } from './dto/cats.dto';
import { CatsService } from './cats.service';
import { Cat } from './interface/cat.interface';
import { HttpExceptionFilter } from '../utils/http-exception.filter';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  @UseFilters(HttpExceptionFilter)
  async findAll(): Promise<Cat[]> {
    try {
      return this.catsService.findAll();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is a custom message',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
