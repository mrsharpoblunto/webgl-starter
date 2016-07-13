/* @flow */
import type { World, Entity } from 'framework';
import * as Components from 'components';

export default function empty(ent: Entity): Entity {
    return ent;
}
