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
    _qRotation: Quarternion;
    _position: Vec3;
    _fov: number;
    _projectionMatrix: Mat4;
    _viewMatrix: Mat4;

    constructor(lockPitch: boolean,fov: number,position: Vec3, focalPoint: Vec3) {
        this._lockPitch = lockPitch;
        this._accumPitch = 0;
        this._fov = fov;
        this._position = glm.vec3.create();
        this._projectionMatrix = glm.mat4.create();
        this._viewMatrix = glm.mat4.create();
        this._qRotation = glm.quat.create();
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

    getProjectionMatrix(): Mat4 {
        return this._projectionMatrix;
    }

    rotYaw(theta: number): void {
        glm.quat.rotateY(this._qRotation,this._qRotation,theta);
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
        glm.quat.mul(this._qRotation,rot,this._qRotation);
    }

    setAxis(lookAt: Vec3, up: Vec3, right: Vec3): void {
        glm.quat.setAxes(this._qRotation,lookAt,right,up);
        if (this._lockPitch) {
            this._accumPitch = Math.asin(lookAt[1] * -1);
        }
    }

    setFocalPoint(focalPoint: Vec3, up: ?Vec3): void {
        this.setFocalPointAndPosition(focalPoint, this._position, up);
    }

    setFocalPointAndPosition(focalPoint: Vec3, position: Vec3, upVec: ?Vec3): void {
        glm.vec3.copy(this._position,position);

        const lookAt = glm.vec3.create();
        const right = glm.vec3.create();
        const up = glm.vec3.create();
        glm.vec3.sub(lookAt,focalPoint,this._position);
        console.log(position);
        console.log(lookAt);
        glm.vec3.normalize(lookAt,lookAt);
        glm.vec3.cross(right,lookAt,upVec || UP);
        glm.vec3.normalize(right,right);
        glm.vec3.cross(up,right,lookAt);
        glm.vec3.normalize(up,up);

        this.setAxis(lookAt, up, right);
    }

    setPosition(position: Vec3): void {
        glm.vec3.copy(this._position,position);
    }

    move(delta: Vec3): void {
        glm.vec3.add(this._position,this._position,delta);
    }

    getLookAt(): Vec3 {
        const rot = glm.mat3.create();
        glm.mat3.fromQuat(rot,this._qRotation);
        return glm.vec3.fromValues(rot[2],rot[5],rot[8]);
    }

    getRight(): Vec3 {
        const rot = glm.mat3.create();
        glm.mat3.fromQuat(rot,this._qRotation);
        return glm.vec3.fromValues(rot[0],rot[3],rot[6]);
    }

    getUp(): Vec3 {
        const rot = glm.mat3.create();
        glm.mat3.fromQuat(rot,this._qRotation);
        return glm.vec3.fromValues(rot[1],rot[4],rot[7]);
    }

    getViewMatrix(): Mat4 {
        const position = glm.vec3.create();
        const translation = glm.mat4.create();
        
        glm.vec3.scale(position,this._position,-1.0);

        return glm.mat4.mul(
            this._viewMatrix,
            glm.mat4.fromQuat(glm.mat4.create(),this._qRotation),
            glm.mat4.fromTranslation(translation,position),
        );
    }
}
