/* @flow */
import type { SimSystem } from '../framework';

class MySimSystem {
    constructor() {
    }
    onAddEntity(): void {
    }
    onRemoveEntity(): void {
    }
    simulate(timestep: number): void {
    }
}

export default function(): Array<SimSystem> {
    return [
        new MySimSystem(),
    ];
}
