import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, Query } from '@nestjs/common';
import { AnimesService } from './animes.service';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { Anime } from './entities/anime.entity';
import { ICreateCategory } from './interfaces/ICreateCategory';

@Controller('animes')
export class AnimesController {
  constructor(private readonly animesService: AnimesService) { }

  @Post()
  create(@Body() createAnimeDto: CreateAnimeDto): Promise<Anime> {
    return this.animesService.create(createAnimeDto);
  }

  @Get()
  findAll() {
    return this.animesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animesService.findOne(+id);
  }

  @Get("/categories/:categoryId")
  findAnimesByCategory(@Param("categoryId", ParseIntPipe) categoryId: number, @Query("anime_name") animeName: string) {
    return this.animesService.findAnimesByCategory(categoryId, animeName)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAnimeDto: UpdateAnimeDto): Promise<Anime> {
    return this.animesService.update(+id, updateAnimeDto);
  }

  @Put("/categories/:animeId")
  updateAnimeCategories(@Param("animeId", ParseIntPipe) animeId: number, @Body() categories: ICreateCategory[]): Promise<Anime> {
    return this.animesService.updateAnimeCategories(animeId, categories)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animesService.remove(+id);
  }
}
