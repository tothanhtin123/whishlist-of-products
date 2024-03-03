import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isNil } from 'lodash';
import * as path from 'path';

@Injectable()
export class CommonConfigService {
  constructor(private configService: ConfigService) {}

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get isTest(): boolean {
    return this.nodeEnv === 'test';
  }

  private getNumber(key: string): number {
    const value = this.get(key);

    try {
      return Number(value);
    } catch {
      throw new Error(key + ' environment variable is not a number');
    }
  }

  private getBoolean(key: string): boolean {
    const value = this.get(key);

    try {
      return Boolean(JSON.parse(value));
    } catch {
      throw new Error(key + ' env var is not a boolean');
    }
  }

  private getString(key: string): string {
    const value = this.get(key);

    return value.replaceAll('\\n', '\n');
  }

  get nodeEnv(): string {
    return this.getString('NODE_ENV');
  }

  get appConfig() {
    return {
      whitelist: this.getString('CORS_WHITELIST'),
      port: this.getString('PORT'),
      enableDoc: this.getBoolean('ENABLE_DOCUMENTATION'),
    };
  }

  get dbConfig() {
    return {
      uri: this.getString('DB_URI'),
    };
  }

  get publicAssetsConfig() {
    const publicDir = path.join(process.cwd(), 'assets');
    const imagesDir = path.join(publicDir, 'images');

    return {
      publicDir,
      imagesDir,
    };
  }

  get authConfig() {
    return {
      privateKey: this.getString('JWT_PRIVATE_KEY'),
      publicKey: this.getString('JWT_PUBLIC_KEY'),
      jwtATExpirationTime: this.getString('JWT_AT_EXPIRE'),
      jwtRTExpirationTime: this.getString('JWT_RT_EXPIRE'),
    };
  }

  get firebaseConfig() {
    return {
      apiKey: this.getString('FIREBASE_API_KEY'),
      authDomain: this.getString('FIREBASE_AUTH_DOMAIN'),
      projectId: this.getString('FIREBASE_PROJECT_ID'),
      storageBucket: this.getString('FIREBASE_STORAGE_BUCKET'),
      messagingSenderId: this.getString('FIREBASE_MESSAGING_SENDER_ID'),
      appId: this.getString('FIREBASE_APP_ID'),
      measurementId: this.getString('FIREBASE_MEASUREMENT_ID'),
    };
  }

  private get(key: string): string {
    const value = this.configService.get<string>(key);

    if (isNil(value)) {
      throw new Error(key + ' environment variable does not set'); // probably we should call process.exit() too to avoid locking the service
    }

    return value;
  }
}
