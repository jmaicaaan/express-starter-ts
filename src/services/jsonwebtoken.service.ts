import { sign, verify } from 'jsonwebtoken';
import { Service } from 'typedi';

@Service()
export class JsonWebTokenService {

  public sign(data: any) {
    return sign(data, 'secret');
  }

  public verify(token: any) {
    return verify(token, 'secret');
  }
}
