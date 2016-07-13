/* @flow */
import type { World } from 'framework';
import * as Builders from 'builders';
import glm from 'gl-matrix';

/**
 * This function is responsible for initializing the world state. Once
 * initialized it is the sim systems that will manage the state of the
 * world
 */
export default function buildWorld(world: World): void {
    world.createEntity(Builders.camera,{
        lockPitch: true,
        fov: 45,
        position: glm.vec3.fromValues(0,5,10),
        focalPoint: glm.vec3.fromValues(0,0,0),
    });

    const INC = 5;
    const MAX = 100;
        for (let x = -MAX; x < MAX; x+= INC) {
            for (let z = -MAX; z < MAX; z+= INC) {
            world.createEntity(Builders.cube,{ 
                position: glm.vec3.fromValues(x,0,z),
            });
        }
    }
}
