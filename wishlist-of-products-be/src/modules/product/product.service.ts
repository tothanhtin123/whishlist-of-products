import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductModel } from './models/product.model';
import { Model } from 'mongoose';
import { BaseService } from 'src/common/base/base.service';
import { errorMessages } from './product.error';

@Injectable()
export class ProductService extends BaseService<ProductModel> {
    notFoundMessage: string = errorMessages.notFound;
    constructor(@InjectModel(ProductModel.name) private readonly productModel: Model<ProductModel>){
        super(productModel)
    }
}
