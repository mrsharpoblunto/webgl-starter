/* @flow */
import { World } from './framework';
import * as Builders from './builders';

export default function buildWorld(world: World): void {
    Builders.cube(world);
}
