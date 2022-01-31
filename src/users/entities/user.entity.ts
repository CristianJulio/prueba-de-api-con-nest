import { AnimeToUser } from "src/animes/entities/anime-to-user.entity";
import { Anime } from "src/animes/entities/anime.entity";
import { Role } from "src/roles/entities/role.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  first_name: string

  @Column()
  second_name: string

  @Column()
  first_last_name: string

  @Column()
  second_last_name: string

  @Column()
  username: string

  @Column()
  password: string

  @Column()
  email: string

  @Column()
  prof_pic: string

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[]

  @OneToMany(() => AnimeToUser, animeToUser => animeToUser.userId)
  public animeToUser!: AnimeToUser[]
}