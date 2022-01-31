import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateAnimeDto } from './create-anime.dto';

export class UpdateAnimeDto extends OmitType(CreateAnimeDto, ["categories"] as const) { }
