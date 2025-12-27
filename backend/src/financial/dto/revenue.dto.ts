import { IsNumber, IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateRevenueDto {
  @IsNumber()
  amount: number;

  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDateString()
  date: string;
}

export class UpdateRevenueDto {
  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  date?: string;
}
