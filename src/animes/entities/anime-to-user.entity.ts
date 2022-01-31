import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Anime } from "./anime.entity";

@Entity()
export class AnimeToUser {
  @PrimaryGeneratedColumn()
  public animeToUserId: number

  @Column()
  animeId: number

  @Column()
  userId: number

  @Column()
  status: "watching" | "complete" | "on_hold" | "dropped" | "repeating"

  @Column()
  score: number

  @Column()
  progress: number

  @Column()
  start_date: string

  @Column()
  finnish_date: string

  @ManyToOne(() => Anime, anime => anime.animeToUser)
  public anime!: Anime

  @ManyToOne(() => User, user => user.animeToUser)
  public user!: User
}