import { Category } from "./entities/category.entity";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRespository: Repository<Category>
  ) { }

  async findAll(): Promise<Category[]> {
    const categories = await this.categoryRespository.find()
    return categories
  }

  async create(createCategoryDto: CreateCategoryDto[]) {
    await this.categoryRespository.save(createCategoryDto)
    return "This action creates a new category"
  }

  remove(id: number) {
    return `This action removes a category with id: ${id}`
  }
}