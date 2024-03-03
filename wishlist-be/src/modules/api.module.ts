import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { FileStorageModule } from './file-storage/file-storage.module';

@Module({
  imports: [UserModule, AuthModule, ProductModule, FileStorageModule],
})
export class ApiModule {}
