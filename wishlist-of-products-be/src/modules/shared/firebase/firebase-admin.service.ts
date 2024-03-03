import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CommonConfigService } from '../common-config/common-config.service';
import * as admin from 'firebase-admin';
@Injectable()
export class FirebaseAdminService {
  private firebaseStorage: FirebaseStorage;
  constructor(private readonly config: CommonConfigService) {
    admin.initializeApp({
      credential: admin.credential.cert(config.firebaseConfig),
      storageBucket: config.firebaseConfig.storageBucket,
    });
    if (admin.apps.length > 0) {
      Logger.log('Connection to Firebase successful');
      this.firebaseStorage = admin.app().storage();
    } else {
      Logger.error('Connection to Firebase failed');
    }
  }

  get storage() {
    if (!this.firebaseStorage) {
      Logger.error('Firebase Storage is not defined');
      throw new InternalServerErrorException();
    }
    return this.firebaseStorage;
  }

  get bucket() {
    return this.firebaseStorage.bucket();
  }
}
