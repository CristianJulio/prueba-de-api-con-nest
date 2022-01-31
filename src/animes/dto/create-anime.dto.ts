import { ICreateCategory } from "../interfaces/ICreateCategory"

export class CreateAnimeDto {
  name: string
  episodes: number
  airing: boolean
  released_date: string
  categories: ICreateCategory[]
}
