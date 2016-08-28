/* @flow */
import type { Entity } from 'framework';
import * as Components from 'components';

const ROTATION_SPEED = 0.001;

export default class CubeSystem {
    _cubes: Set<Components.CubeComponent>;

    constructor() {
        this._cubes = new Set();
    }

    systemWillMount(canvas: any): void {
    }

    systemWillUnmount(canvas: any): void {
    }

    worldAddingEntity(entity: Entity): void {
        entity.hasComponent(Components.CubeComponent,cube => {
           this._cubes.add(cube);
        });
    }
    worldRemovingEntity(entity: Entity): void {
        entity.hasComponent(Components.CubeComponent,cube => {
           this._cubes.delete(cube);
        });
    }
    simulate(timestep: number): void {
        for (const cube of this._cubes) {
            cube.rotation += timestep * ROTATION_SPEED;
        }
    }
}
