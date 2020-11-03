import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CatDocument } from './schemas/cat.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ICat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel('Cat') private readonly catModel: Model<CatDocument>,
  ) {}

  async create(cat: ICat): Promise<ICat> {
    const createCat = new this.catModel(cat);
    return createCat.save();
  }

  async findAll(): Promise<ICat[]> {
    return this.catModel.find();
  }

  async findOne(id: string): Promise<ICat> {
    return this.catModel.findById({ _id: id });
  }

  async updateOne(id: string, cat: ICat): Promise<ICat> {
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
