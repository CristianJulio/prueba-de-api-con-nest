import { Category } from "src/categories/entities/category.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AnimeToUser } from "./anime-to-user.entity";

@Entity("animes")
export class Anime {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string;

  @Column()
  episodes: number

  @Column()
  airing: boolean

  @Column()
  released_date: string

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[]

  @ManyToOne(() => AnimeToUser, animeToUser => animeToUser.animeId)
  public animeToUser!: AnimeToUser[]
}