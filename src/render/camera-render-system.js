/* @flow */
import twgl from 'twgl.js';
import type { Entity } from 'framework';
import * as Components from 'components';

export default class CameraRenderSystem
{
    _camera: ?Components.CameraComponent;

    constructor(gl: any) {
    }

    worldAddingEntity(entity: Entity): void {
        const camera = entity.getComponent(Components.CameraComponent.Type);
        if (camera) {
           this._camera = camera;
        }
    }
    worldRemovingEntity(entity: Entity): void {
        const camera = entity.getComponent(Components.CameraComponent.Type);
        if (camera) {
            this._camera = null;
        }
    }
    render(gl: any, alpha: number): void {
        if (this._camera) {
            this._camera.setProjectionMatrix(gl);
        }
    }
}
