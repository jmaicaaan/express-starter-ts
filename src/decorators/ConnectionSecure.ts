import { Connection } from 'typeorm';
import { IDatabase } from '../libs/IDatabase';

export function ConnectionSecure(constructor: any): void {
  const keys = Object.keys(constructor.prototype);

  for (const key in keys) {
    if (keys[key]) {
      const methodKey = keys[key];
      const original = constructor.prototype[methodKey];

      if (methodKey === 'connect') {
        continue;
      }
      // tslint:disable-next-line:only-arrow-functions
      constructor.prototype[methodKey] = function() {
        // console.log(`About to call ${methodKey}`); uncomment for debug purposes
        if (!this.connection) {
          throw new Error(`Cannot execute method ${methodKey}(). Please check if you have database connection`);
        }
        return original.apply(this, arguments);
      };
    }
  }
}
