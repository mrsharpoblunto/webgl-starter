/* @flow */
import type { World, Entity } from 'framework';
import * as Components from 'components';

type CubeOptions = {
    position: Array<number>,
}

export default function cube(ent: Entity, options: CubeOptions): Entity {
    return ent.addComponent(new Components.CubeComponent(options.position));
}
