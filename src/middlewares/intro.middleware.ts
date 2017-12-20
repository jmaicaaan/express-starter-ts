import { ExpressMiddlewareInterface } from "routing-controllers";

export class Intro implements ExpressMiddlewareInterface {

   use(request: any, response: any, next?: (err?: any) => any): any {
       console.log('I am a middleware');
       next();
   }
}
