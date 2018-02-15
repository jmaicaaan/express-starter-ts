import { compare, hash } from 'bcrypt';
import { Service } from 'typedi';

@Service()
export class BcryptService {

  public async hashString(plainText: string) {
    try {
      const res = hash(plainText, 10);
      return res;
    } catch (error) {
      return error;
    }
  }

  public async compareHash(plainText: string, hashString: string) {
    try {
      const res = compare(plainText, hashString);
      return res;
    } catch (error) {
      return error;
    }
  }
}
