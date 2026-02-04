import { IsEmail, IsString, MinLength, IsOptional, MaxLength, Matches } from "class-validator";

export class RegisterDto {
  @IsEmail({}, { message: 'Geçerli bir e-posta adresi girin' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Şifre en az 6 karakter olmalıdır' })
  password: string;

  @IsString({ message: 'Ad gereklidir' })
  @MinLength(2, { message: 'Ad en az 2 karakter olmalıdır' })
  @MaxLength(50, { message: 'Ad en fazla 50 karakter olabilir' })
  firstName: string;

  @IsString({ message: 'Soyad gereklidir' })
  @MinLength(2, { message: 'Soyad en az 2 karakter olmalıdır' })
  @MaxLength(50, { message: 'Soyad en fazla 50 karakter olabilir' })
  lastName: string;

  @IsString({ message: 'Organizasyon adı gereklidir' })
  @MinLength(2, { message: 'Organizasyon adı en az 2 karakter olmalıdır' })
  @MaxLength(100, { message: 'Organizasyon adı en fazla 100 karakter olabilir' })
  organizationName: string;

  @IsOptional()
  @IsString()
  industry?: string; // steel-manufacturing, tensile-architecture, electronics, general
  
  @IsOptional()
  @IsString()
  @MaxLength(50)
  legalName?: string; // Optional legal company name
  
  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{10,11}$/, { message: 'Vergi numarası 10-11 haneli olmalıdır' })
  taxId?: string; // Optional tax ID
}