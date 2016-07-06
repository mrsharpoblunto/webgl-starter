/* @flow */
import type { World } from 'framework';
import * as Builders from 'builders';

/**
 * This function is responsible for initializing the world state. Once
 * initialized it is the sim systems that will manage the state of the
 * world
 */
export default function buildWorld(world: World): void {
    for (let x = -10; x < 10; x+= 4) {
        for (let y = -10; y < 10; y+= 4) {
                Builders.cube(world,[x,y,0]);
        }
    }
}
