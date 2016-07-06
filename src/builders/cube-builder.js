/* @flow */
import type { World, Entity } from 'framework';
import * as Components from 'components';

export default function cube(world: World,position: Array<number>): Entity {
    const ent = world.createEntity();
    ent.addComponent(new Components.CubeComponent(position));
    return ent;
}
