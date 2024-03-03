import { storage, app } from 'firebase-admin';

declare global {
  type FirebaseStorage = storage.Storage;
  type FirebaseBucket = storage;
  type FirebaseApp = app.App;
}
export {};
