import { CreateCatDTO } from './dtos/CreateCat.dto';
import { CatsService } from './cats.service';
import { ICat } from './interfaces/cat.interface';
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
  constructor(private readonly catService: CatsService) {}

  @Post()
  async create(@Body() cat: CreateCatDTO, @Res() response) {
    const createdCat = await this.catService.create(cat);
    response.status(201).send({ data: createdCat });
  }

  @Get()
  @HttpCode(200)
  async findAll(): Promise<ICat[]> {
    return this.catService.findAll();
  }

  @Get('/:id')
  @HttpCode(200)
  async findOne(@Param('id') id: string): Promise<ICat> {
    return this.catService.findOne(id);
  }

  @Patch('/:id')
  async updateOne(
    @Body() cat: CreateCatDTO,
    @Param('id') id: string,
    @Res() response,
  ) {
    const updatedCat = await this.catService.updateOne(id, cat);
    updatedCat
      ? response.status(200).send({ data: updatedCat })
      : response.status(200).send({ error: 'An unknown error' });
  }

  @Delete('/:id')
  async deleteOne(@Param('id') id: string, @Res() response) {
    const deletedCat = await this.catService.deleteOne(id);
    if (deletedCat) {
      response.status(400).send({ msg: 'success' });
      return;
    }
    response.status(200).send({ msg: 'failed' });
    return;
  }
}
