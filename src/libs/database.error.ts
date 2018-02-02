import { BaseError } from 'make-error';

export class DatabaseError extends BaseError {

  public constructor(message: string) {
    super();
    this.message = message;
  }
}
