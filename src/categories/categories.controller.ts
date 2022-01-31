import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { Category } from "./entities/category.entity";

@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Get()
  findAll(): Promise<Category[]> {
    return this.categoriesService.findAll()
  }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto[]) {
    return this.categoriesService.create(createCategoryDto)
  }

  @Delete(":categoryId")
  remove(@Param("categoryId", ParseIntPipe) id: number) {
    return this.categoriesService.remove(id)
  }
}