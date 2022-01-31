import { Anime } from './entities/anime.entity';
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { Category } from 'src/categories/entities/category.entity';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { ICreateCategory } from './interfaces/ICreateCategory';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateAnimeDto } from './dto/update-anime.dto';

@Injectable()
export class AnimesService {
  constructor(
    @InjectRepository(Anime)
    private animeRepository: Repository<Anime>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) { }

  async findAll() {
    const animes = await this.animeRepository.find({ relations: ["categories"] });
    return animes;
  }

  async findOne(id: number) {
    const anime = await this.animeRepository.findOne(id, { relations: ["categories"] })
    return anime;
  }

  async findAnimesByCategory(categoryId: number, animeName?: string) {
    const animes = await this.animeRepository.query(`
      SELECT categories.name as category_name, animes.name as anime_name
        FROM animes
      JOIN animes_categories_categories
        ON "animes_categories_categories"."animesId" = animes.id
      JOIN categories
        ON categories.id = "animes_categories_categories"."categoriesId"
      WHERE categories.id = ${categoryId} ${animeName ? `AND animes.name = '${animeName}'` : ""}
    `)

    return animes
  }

  async create(createAnimeDto: CreateAnimeDto): Promise<Anime> {
    const { name, episodes, airing, released_date, categories } = createAnimeDto
    const categoriesToSave = []

    for (let i = 0; i < categories.length; i++) {
      const category = await this.categoryRepository.findOne(createAnimeDto.categories[i].categoryId)
      categoriesToSave.push(category)
    }

    const anime = new Anime()

    anime.name = name
    anime.episodes = episodes
    anime.airing = airing
    anime.released_date = released_date
    anime.categories = categoriesToSave

    const savedAnime = await this.animeRepository.save(anime)

    return savedAnime;
  }

  async update(animeId: number, updateAnimeDto: UpdateAnimeDto): Promise<Anime> {
    if (!Object.values(updateAnimeDto).length) throw new BadRequestException("Nothing was passed")

    const { name, episodes, airing, released_date } = updateAnimeDto

    const anime = await this.animeRepository.findOne(animeId, { relations: ["categories"] })

    anime.name = name
    anime.episodes = episodes
    anime.airing = airing
    anime.released_date = released_date

    const updated = await this.animeRepository.save(anime)

    return updated
  }

  async updateAnimeCategories(animeId: number, categories: ICreateCategory[]): Promise<Anime> {
    const anime = await this.animeRepository.findOne(animeId, { relations: ["categories"] })
    const newCategories = []

    for (let i = 0; i < categories.length; i++) {
      const category = await this.categoryRepository.findOne(categories[i].categoryId)
      newCategories.push(category)
    }

    anime.categories = newCategories

    const savedAnime = await this.animeRepository.save(anime)

    return savedAnime
  }

  remove(id: number) {
    this.animeRepository.delete(id)
    return {
      message: `Anime with id ${id} deleted`,
      statusCode: HttpStatus.OK
    }
  }
}
