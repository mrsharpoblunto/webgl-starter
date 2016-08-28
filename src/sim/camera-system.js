/* @flow */
import type { Entity } from 'framework';
import glm from 'gl-matrix';
import * as Components from 'components';

const ROTATION_SPEED = 0.005;
const MOVEMENT_SPEED = 0.1;

export default class CameraSystem {
    _camera: ?Components.CameraComponent;
    _keys: Map<string,boolean>;
    _mouse: Vec2;
    _canvas: any;

    constructor() {
        this._mouse = glm.vec2.create();
        this._keys = new Map();
    }

    systemWillMount(canvas: any): void {
        this._canvas = canvas;
        canvas.addEventListener('click',this.handleMouseClick);
        canvas.addEventListener('mousemove',this.handleMouseMove);
        window.addEventListener('keydown',this.handleKeyDown);
        window.addEventListener('keyup',this.handleKeyUp);
    }

    systemWillUnmount(canvas: any): void {
        this._canvas = null;
        canvas.removeEventListener('click',this.handleMouseClick);
        canvas.removeEventListener('mousemove',this.handleMouseMove);
        window.removeEventListener('keydown',this.handleKeyDown);
        window.removeEventListener('keyup',this.handleKeyUp);
    }

    worldAddingEntity(entity: Entity): void {
        entity.hasComponent(Components.CameraComponent,camera => {
            this._camera = camera;
        });
    }

    worldRemovingEntity(entity: Entity): void {
        entity.hasComponent(Components.CameraComponent,camera => {
            this._camera = null;
        });
    }

    handleKeyDown = (e: any) => {
        this._keys.set(e.key,true);
    }

    handleKeyUp = (e: any) => {
        this._keys.set(e.key,false);
    }

    handleMouseClick = () => {
        if (this._canvas && (document: any).pointerLockElement !== this._canvas) {
            this._canvas.requestPointerLock();
        }
    }

    handleMouseMove = (e: any) => {
        this._mouse[0] += e.movementX;
        this._mouse[1] += e.movementY;
    }

    simulate(timestep: number): void {
        if (this._camera == null) return;
        const camera = this._camera;

        if (
            this._keys.get('w') || 
            this._keys.get('a') || 
            this._keys.get('s') || 
            this._keys.get('d')
        ) {
            const forward = glm.vec3.create();
            glm.vec3.copy(forward,camera.getLookAt());
            glm.vec3.scale(forward,forward,
                           (this._keys.get('s') ? 1 : 0) 
                           -(this._keys.get('w') ? 1 : 0));

            const right = glm.vec3.create();
            glm.vec3.copy(right,camera.getRight());
            glm.vec3.scale(right,right,
                           (this._keys.get('d') ? 1 : 0) 
                          -(this._keys.get('a') ? 1 : 0));

            const delta = glm.vec3.create();
            glm.vec3.add(
                delta,
                forward,
                right
            );
            glm.vec3.normalize(delta,delta);
            glm.vec3.scale(delta,delta,MOVEMENT_SPEED);
            camera.move(delta);
        }

        if (this._mouse[0]) {
            camera.rotYaw(this._mouse[0] * ROTATION_SPEED);
        }
        if (this._mouse[1]) {
            camera.rotPitch(this._mouse[1] * ROTATION_SPEED);
        }
        this._mouse[0] = this._mouse[1] = 0;
    }
}
