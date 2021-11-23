import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateProductDto {
    @ApiPropertyOptional()
    readonly id?: string
    @IsString()
    @ApiProperty()    
    @IsNotEmpty()    
    thumbnail: string
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()     
    price: number
    @IsString()
    @IsNotEmpty()
    @ApiProperty()    
    name: string
}
