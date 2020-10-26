import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Cat, CatDocument } from './schemas/cat.schema';
import { CreateCatDTO } from './dtos/CreateCat.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel('Cat') private readonly catModel: Model<CatDocument>,
  ) {}

  async create(cat: CreateCatDTO): Promise<Cat> {
    const createCat = new this.catModel(cat);
    return createCat.save();
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find();
  }

  async findOne(id: string): Promise<Cat> {
    return this.catModel.findById({ _id: id });
  }

  async updateOne(id: string, cat: Cat): Promise<Cat> {
    const updatedCat = await this.catModel.findOneAndUpdate({ _id: id }, cat, {
      new: true,
      upsert: false,
    });
    return updatedCat;
  }

  async deleteOne(id: string): Promise<boolean> {
    const deletedCat = await this.catModel.findByIdAndDelete({ _id: id });
    return deletedCat ? true : false;
  }
}
