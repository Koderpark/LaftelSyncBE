import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { map } from 'rxjs';

export class UserKeyDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsNumber()
  key?: number;
}
