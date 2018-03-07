import { sign, verify } from 'jsonwebtoken';
import { Service } from 'typedi';

@Service()
export class JWTService {

  public sign(data: any) {
    return sign(data, 'secret'); // todo: change this into something more secured?
  }

  public verify(token: any) {
    return verify(token, 'secret');
  }
}
