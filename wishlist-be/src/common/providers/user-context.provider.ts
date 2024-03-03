import { ContextProvider } from './context.provider';

export class UserContext extends ContextProvider {
  nameSpace: string = 'user';
  key: string = 'user';

  get() {
    return this.getFromContext<User>();
  }

  set(user: User) {
    this.setToContext(user);
  }
}
