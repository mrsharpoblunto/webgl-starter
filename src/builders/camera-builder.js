/* @flow */
import type { World, Entity } from 'framework';
import * as Components from 'components';

type CameraOptions = {
    lockPitch: boolean,
    fov: number,
    position: Vec3,
    focalPoint: Vec3,
}

export default function camera(ent: Entity, options: CameraOptions): Entity {
    return ent.addComponent(new Components.CameraComponent(
        options.lockPitch,
        options.fov,
        options.position,
        options.focalPoint,
    ));
}
