/* @flow */
import type { Entity } from 'framework';
import * as Components from 'components';

const ROTATION_SPEED = 0.001;

export default class CubeSystem {
    _cubes: Set<Components.CubeComponent>;

    constructor() {
        this._cubes = new Set();
    }

    systemWillMount(): void {
    }

    systemWillUnmount(): void {
    }

    worldAddingEntity(entity: Entity): void {
        const cube = entity.getComponent(Components.CubeComponent.Type);
        if (cube) {
           this._cubes.add(cube);
        }
    }
    worldRemovingEntity(entity: Entity): void {
        const cube = entity.getComponent(Components.CubeComponent.Type);
        if (cube) {
           this._cubes.delete(cube);
        }
    }
    simulate(timestep: number): void {
        for (const cube of this._cubes) {
            cube.rotation += timestep * ROTATION_SPEED;
        }
    }
}
