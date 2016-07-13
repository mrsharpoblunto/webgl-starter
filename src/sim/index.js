/* @flow */
import type { SimSystem } from 'framework';
import CameraSystem from 'sim/camera-system';
import CubeSystem from 'sim/cube-system';

export default function(): Array<SimSystem> {
    return [
        new CameraSystem(),
        new CubeSystem(),
    ];
}
