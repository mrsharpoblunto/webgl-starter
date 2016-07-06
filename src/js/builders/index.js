/* @flow */
import { World, Entity } from '../framework';
import * as Components from '../components';

export function cube(world: World): Entity {
    const ent = world.createEntity();
    ent.addComponent(new Components.CubeComponent());
    return ent;
}
