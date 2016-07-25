/* @flow */
import twgl from 'twgl.js';
import glm from 'gl-matrix';

const UP = glm.vec3.fromValues(0.0,1.0,0.0);
const RIGHT = glm.vec3.fromValues(1.0,0.0,0.0);

export default class CameraComponent {
    static Type: string = 'CAMERA_COMPONENT';
    getType(): string { return CameraComponent.Type }

    _lockPitch: boolean;
    _accumPitch: number;
    _rotation: Quarternion;
    _position: Vec3;
    _fov: number;
    _projectionMatrix: Mat4;
    _viewMatrix: Mat4;
    _up: Vec3;

    constructor(lockPitch: boolean,fov: number,position: Vec3, focalPoint: Vec3) {
        this._lockPitch = lockPitch;
        this._accumPitch = 0;
        this._fov = fov;
        this._position = glm.vec3.create();
        this._projectionMatrix = glm.mat4.create();
        this._viewMatrix = glm.mat4.create();
        this._rotation = glm.quat.create();
        this._up = glm.vec3.clone(UP);
        this.setFocalPointAndPosition(
            glm.vec3.fromValues.apply(glm.vec3,focalPoint),
            glm.vec3.fromValues.apply(glm.vec3,position)
        );
    }

    setProjectionMatrix(gl: any) {
        glm.mat4.perspective(
            this._projectionMatrix,
            this._fov * (Math.PI / 180),
            gl.drawingBufferWidth / gl.drawingBufferHeight,
            0.5,
            1000,
        );
    }

    setUp(up: Vec3,lerp: ?number): void {
        if (lerp) {
            glm.vec3.lerp(this._up,this._up,up,lerp);
        } else {
            glm.vec3.copy(this._up,up);
        }
        glm.vec3.normalize(this._up,this._up);
    }

    _setAxes(lookAt: Vec3, up: Vec3, right: Vec3): void {
        glm.quat.setAxes(this._rotation,lookAt,right,up);
        if (this._lockPitch) {
            this._accumPitch = Math.asin(lookAt[1] * -1);
        }
    }

    setFocalPoint(focalPoint: Vec3, focalLerp: ?number): void {
        this.setFocalPointAndPosition(focalPoint, this._position, focalLerp);
    }

    setFocalPointAndPosition(focalPoint: Vec3, position: Vec3, focalLerp: ?number, positionLerp: ?number): void {
        if (positionLerp) {
            glm.vec3.lerp(this._position,this._position,position,positionLerp);
        } else {
            glm.vec3.copy(this._position,position);
        }

        const lookAt = glm.vec3.create();
        const right = glm.vec3.create();
        const up = glm.vec3.create();
        glm.vec3.sub(lookAt,focalPoint,this._position);
        glm.vec3.normalize(lookAt,lookAt);
        if (focalLerp) {
            const currentLookAt = this.getLookAt();
            glm.vec3.scale(currentLookAt,currentLookAt,-1);
            glm.vec3.lerp(lookAt,currentLookAt,lookAt,focalLerp);
        }
        glm.vec3.cross(right,lookAt,this._up);
        glm.vec3.normalize(right,right);
        glm.vec3.cross(up,right,lookAt);

        this._setAxes(lookAt, up, right);
    }
    setPosition(position: Vec3): void {
        glm.vec3.copy(this._position,position);
    }

    move(delta: Vec3): void {
        glm.vec3.add(this._position,this._position,delta);
    }

    rotYaw(theta: number): void {
        glm.quat.rotateY(this._rotation,this._rotation,theta);
    }

    rotPitch(theta: number): void {
        if (this._lockPitch) {
            if (theta > (Math.PI / 2)) {
                theta = Math.PI / 2;
            }
            if (theta < -(Math.PI / 2)) {
                theta = -Math.PI / 2;
            }
            this._accumPitch += theta;
            if (this._accumPitch > (Math.PI / 2)) {
                theta = (Math.PI / 2) - (this._accumPitch - theta);
                this._accumPitch = Math.PI / 2;
            }
            if (this._accumPitch < -(Math.PI / 2)) {
                theta = -(Math.PI / 2) - (this._accumPitch - theta);
                this._accumPitch = -(Math.PI / 2);
            }
        }

        const rot = glm.quat.create();
        glm.quat.setAxisAngle(rot,RIGHT,theta);
        glm.quat.mul(this._rotation,rot,this._rotation);
    }


    getProjectionMatrix(): Mat4 {
        return glm.mat4.clone(this._projectionMatrix);
    }

    getPosition(): Vec3 {
        return glm.vec3.clone(this._position);
    }

    getLookAt(): Vec3 {
        const rot = glm.mat3.create();
        glm.mat3.fromQuat(rot,this._rotation);
        return glm.vec3.fromValues(rot[2],rot[5],rot[8]);
    }

    getRight(): Vec3 {
        const rot = glm.mat3.create();
        glm.mat3.fromQuat(rot,this._rotation);
        return glm.vec3.fromValues(rot[0],rot[3],rot[6]);
    }

    getUp(): Vec3 {
        const rot = glm.mat3.create();
        glm.mat3.fromQuat(rot,this._rotation);
        return glm.vec3.fromValues(rot[1],rot[4],rot[7]);
    }

    getViewMatrix(): Mat4 {
        const position = glm.vec3.create();
        const translation = glm.mat4.create();
        
        glm.vec3.scale(position,this._position,-1.0);

        return glm.mat4.clone(
            glm.mat4.mul(
                this._viewMatrix,
                glm.mat4.fromQuat(glm.mat4.create(),this._rotation),
                glm.mat4.fromTranslation(translation,position),
            )
        );
    }
}
