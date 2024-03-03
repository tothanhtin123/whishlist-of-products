import { getValue, setValue } from 'express-ctx';

export abstract class ContextProvider {
  abstract nameSpace: string;

  abstract key: string;

  getFromContext<T>(): T | undefined {
    return getValue<T>(this.getKeyWithNamespace(this.key));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setToContext(value: any): void {
    setValue(this.getKeyWithNamespace(this.key), value);
  }

  private getKeyWithNamespace(key: string): string {
    return `${this.nameSpace}.${key}`;
  }
}
