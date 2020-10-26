import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';

@Controller('cats')
export class CatsController {
  constructor(private readonly CatsService: CatsService) {}

  @Post()
  async create(@Body() cat: Cat, @Res() response) {
    const createdCat = await this.CatsService.create(cat);
    response.status(201).send({ data: createdCat });
  }

  @Get()
  @HttpCode(200)
  async findAll(): Promise<Cat[]> {
    return this.CatsService.findAll();
  }

  @Get('/:id')
  @HttpCode(200)
  async findOne(@Param('id') id: string): Promise<Cat> {
    return this.CatsService.findOne(id);
  }

  @Patch('/:id')
  async updateOne(@Body() cat: Cat, @Param('id') id: string, @Res() response) {
    const updatedCat = await this.CatsService.updateOne(id, cat);
    updatedCat
      ? response.status(200).send({ data: updatedCat })
      : response.status(200).send({ error: 'An unknown error' });
  }

  @Delete('/:id')
  async deleteOne(@Param('id') id: string, @Res() response) {
    const deletedCat = await this.CatsService.deleteOne(id);
    if (deletedCat) {
      response.status(400).send({ msg: 'success' });
      return;
    }
    response.status(200).send({ msg: 'failed' });
    return;
  }
}
