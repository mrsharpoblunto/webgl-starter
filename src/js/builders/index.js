/* @flow */
import { World, Entity } from '../framework';
import * as Components from '../components';

export function myEntity(world: World): Entity {
    const ent = world.createEntity();
    ent.addComponent(new Components.MyComponent());
    return ent;
}
