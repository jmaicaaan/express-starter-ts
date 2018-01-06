import { useContainer as routingUseContainer } from 'routing-controllers';
import { Container } from 'typedi';
import { useContainer as ormUseContainer } from 'typeorm';

export function bootstrapContainers() {

  // let's tell orm and the routing controller to use the typeDI
  // https://github.com/typestack/typedi/issues/4

  ormUseContainer(Container);
  routingUseContainer(Container);
}
