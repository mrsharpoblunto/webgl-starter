/* @flow */
import { World } from './framework';
import * as Builders from './builders';

export default function buildWorld(world: World): void {
    const ent = Builders.myEntity(world);
}
