import { Response, Request } from "express";

export async function intro(request: Request, response: Response) {

  response.send('Hello World, Typescript!');
}