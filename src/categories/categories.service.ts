import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './models/category.model';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel(Category)
        private categoryModel: typeof Category
      ) {}
    
      async create(categoryDto: any): Promise<Category> {
        return this.categoryModel.create(categoryDto);
      }
    
      async findAll(): Promise<Category[]> {
        return this.categoryModel.findAll();
      }

      async findBycategory(): Promise<Category[]> {
        return this.categoryModel.findAll();
      }
}
