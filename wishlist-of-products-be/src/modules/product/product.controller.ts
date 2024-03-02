import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { UseUserGuard } from 'src/common/decorators/use-user-guard.decorator';
import { AuthStrategy } from '../auth/auth.enum';
import { CreateProductDto } from './dtos/create-product.dto';
import { User } from 'src/common/decorators/user.decorator';
import { UseCreateProductInterceptor, UseGetProductInterceptor } from './product.interceptor';

@Controller('product')
@UseUserGuard(AuthStrategy.JWT)
export class ProductController {
    constructor (private readonly productService: ProductService){

    }


    @Post()
    @UseCreateProductInterceptor()
    create(@Body() createProductDto: CreateProductDto, @User() user: User){
        return this.productService.create({...createProductDto, createdById: user.id, updatedById: user.id});
    }

    @Get(":id")
    @UseGetProductInterceptor()
    getOne(@Param("id") id: string){
        return this.productService.getOneById(id,{relations:['createdBy','updatedBy']})
    }
}
