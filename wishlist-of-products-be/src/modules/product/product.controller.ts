import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { UseUserGuard } from 'src/common/decorators/use-user-guard.decorator';
import { AuthStrategy } from '../auth/auth.enum';
import { CreateProductDto } from './dtos/create-product.dto';
import { User } from 'src/common/decorators/user.decorator';
import {
  UseCreateProductInterceptor,
  UseDeleteProductInterceptor,
  UseGetProductInterceptor,
  UseUpdateProductInterceptor,
} from './product.interceptor';
import { UpdateProductDto } from './dtos/update-product.dto';

@Controller('product')
@UseUserGuard(AuthStrategy.JWT)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseCreateProductInterceptor()
  create(@Body() createProductDto: CreateProductDto, @User() user: User) {
    return this.productService.create({
      ...createProductDto,
      createdById: user.id,
      updatedById: user.id,
    });
  }

  @Get(':id')
  @UseGetProductInterceptor()
  getOne(@Param('id') id: string) {
    return this.productService.getOneById(id);
  }

  @Patch(':id')
  @UseUpdateProductInterceptor()
  updateOne(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @User() user: User,
  ) {
    return this.productService.updateById(id, {
      ...updateProductDto,
      updatedById: user.id,
    });
  }

  @Delete(':id')
  @UseDeleteProductInterceptor()
  deleteOne(@Param('id') id: string) {
    return this.productService.softRemoveById(id);
  }
}
