import { randomBytes } from 'crypto';
import { Service } from 'typedi';

@Service()
export class CryptoService {
  public createToken() {
    const buf = randomBytes(15);
    const token = buf.toString('hex');
    return token;
  }
}
