import { storage, app } from 'firebase-admin';

declare global {
  type FirebaseStorage = storage.Storage;
  type FirebaseApp = app.App;
}
export {};
