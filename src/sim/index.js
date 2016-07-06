/* @flow */
import type { SimSystem } from 'framework';
import CubeSystem from 'sim/cube-system';

export default function(): Array<SimSystem> {
    return [
        new CubeSystem(),
    ];
}
