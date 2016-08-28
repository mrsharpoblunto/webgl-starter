/* @flow */
import twgl from 'twgl.js';
import glm from 'gl-matrix';
import type { Entity } from 'framework';
import cubeFrag from 'shaders/cube_frag.glsl';
import cubeVert from 'shaders/cube_vert.glsl';
import * as Components from 'components';

export default class CubeRenderSystem
{
    _cubes: Set<Components.CubeComponent>;
    _camera: ?Components.CameraComponent;
    _programInfo: any;
    _bufferInfo: any;
    _tex: any;

    constructor(gl: any) {
        this._cubes = new Set();

        this._programInfo = twgl.createProgramInfo(gl, [cubeVert, cubeFrag]);
        this._bufferInfo = twgl.primitives.createCubeBufferInfo(gl,2);

        this._tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this._tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 2, 2, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([
            255, 255, 255, 255,
            192, 192, 192, 255,
            192, 192, 192, 255,
            255, 255, 255, 255,
        ]));
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    }

    worldAddingEntity(entity: Entity): void {
        entity.hasComponent(Components.CubeComponent,cube => {
           this._cubes.add(cube);
        });
        entity.hasComponent(Components.CameraComponent,camera => {
            this._camera = camera;
        });
    }

    worldRemovingEntity(entity: Entity): void {
        entity.hasComponent(Components.CubeComponent,cube => {
           this._cubes.delete(cube);
        });
        entity.hasComponent(Components.CameraComponent,camera => {
            this._camera = null;
        });
    }

    render(gl: any, alpha: number): void {
        if (!this._camera) return;
        const camera = this._camera;

        const view = camera.getViewMatrix();
        const invView = glm.mat4.create();
        const viewProjection = glm.mat4.create();
        const worldViewProjection = glm.mat4.create();

        const cameraPosition = camera.getPosition();
        const lightDirection = camera.getLookAt();

        glm.mat4.invert(invView,view);
        glm.mat4.mul(
            viewProjection,
            camera.getProjectionMatrix(),
            view,
        );

        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);

        for (const cube of this._cubes) {
            const world = glm.mat4.create();
            const invTransposeWorld = glm.mat4.create();
            const position = glm.mat4.create();
            const rotation = glm.mat4.create();

            glm.mat4.mul(
                world,
                glm.mat4.translate(
                    position,
                    position,
                    cube.position,
                ),
                glm.mat4.rotateY(rotation,rotation,cube.rotation),
            );
            glm.mat4.mul(
                worldViewProjection,
                viewProjection,
                world,
            );
            glm.mat4.invert(
                invTransposeWorld,
                glm.mat4.transpose(invTransposeWorld,world),
            );

            gl.useProgram(this._programInfo.program);
            twgl.setBuffersAndAttributes(gl,this._programInfo,this._bufferInfo);
            twgl.setUniforms(this._programInfo,{
                u_lightWorld: lightDirection,
                u_lightColor: [1,0.8,0.8,1],
                u_ambient: [0.2,0.2,0.2,1],
                u_specular: [1,1,1,1],
                u_shininess: 50,
                u_specularFactor: 1,
                u_diffuse: this._tex,
                u_world: world,
                u_worldInverseTranspose: invTransposeWorld,
                u_worldViewProjection: worldViewProjection,
                u_worldViewPos: cameraPosition
            });        
            twgl.drawBufferInfo(gl,gl.TRIANGLES,this._bufferInfo);
        }
    }
}
