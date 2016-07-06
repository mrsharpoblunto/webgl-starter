/* @flow */
import twgl from 'twgl.js';
import type { Entity } from 'framework';
import cubeFrag from 'shaders/cube_frag.glsl';
import cubeVert from 'shaders/cube_vert.glsl';
import * as Components from 'components';

export default class CubeRenderSystem
{
    _cubes: Set<Components.CubeComponent>;
    _projection: any;
    _program: any;
    _uLightWorldPosLoc: any;
    _uLightColorLoc: any;
    _uAmbientLoc: any;
    _uSpecularLoc: any;
    _uShininessLoc: any;
    _uSpecularFactorLoc: any;
    _uDiffuseLoc: any;
    _uWorldLoc: any;
    _uWorldInverseTransposeLoc: any;
    _uWorldViewProjectionLoc: any;
    _uViewInverseLoc: any;
    _positionLoc: any;
    _normalLoc: any;
    _texcoordLoc: any;
    _positionBuffer: any;
    _normalBuffer: any;
    _texcoordBuffer: any;
    _indicesBuffer: any;
    _tex: any;

    constructor(gl: any) {
        this._cubes = new Set();

        this._program = twgl.createProgramFromSources(gl, [cubeVert, cubeFrag]);
        this._uLightWorldPosLoc = gl.getUniformLocation(this._program, "u_lightWorldPos");
        this._uLightColorLoc = gl.getUniformLocation(this._program, "u_lightColor");
        this._uAmbientLoc = gl.getUniformLocation(this._program, "u_ambient");
        this._uSpecularLoc = gl.getUniformLocation(this._program, "u_specular");
        this._uShininessLoc = gl.getUniformLocation(this._program, "u_shininess");
        this._uSpecularFactorLoc = gl.getUniformLocation(this._program, "u_specularFactor");
        this._uDiffuseLoc = gl.getUniformLocation(this._program, "u_diffuse");
        this._uWorldLoc = gl.getUniformLocation(this._program, "u_world");
        this._uWorldInverseTransposeLoc = gl.getUniformLocation(this._program, "u_worldInverseTranspose");
        this._uWorldViewProjectionLoc = gl.getUniformLocation(this._program, "u_worldViewProjection");
        this._uViewInverseLoc = gl.getUniformLocation(this._program, "u_viewInverse");

        this._positionLoc = gl.getAttribLocation(this._program, "a_position");
        this._normalLoc = gl.getAttribLocation(this._program, "a_normal");
        this._texcoordLoc = gl.getAttribLocation(this._program, "a_texcoord");

        const positions = [1, 1, -1, 1, 1, 1, 1, -1, 1, 1, -1, -1, -1, 1, 1, -1, 1, -1, -1, -1, -1, -1, -1, 1, -1, 1, 1, 1, 1, 1, 1, 1, -1, -1, 1, -1, -1, -1, -1, 1, -1, -1, 1, -1, 1, -1, -1, 1, 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, -1, 1, -1, 1, 1, -1, 1, -1, -1, -1, -1, -1];
        const normals   = [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1];
        const texcoords = [1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1];
        const indices   = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23];

        this._positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
        this._normalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
        this._texcoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._texcoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texcoords), gl.STATIC_DRAW);
        this._indicesBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indicesBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
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
    onAddEntity(entity: Entity): void {
        const cube = entity.getComponent(Components.CubeComponent.Type);
        if (cube) {
           this._cubes.add(cube);
        }
    }
    onRemoveEntity(entity: Entity): void {
        const cube = entity.getComponent(Components.CubeComponent.Type);
        if (cube) {
           this._cubes.delete(cube);
        }
    }
    setProjectionMatrix(matrix: any): void {
        this._projection = matrix;
    }
    render(gl: any, alpha: number): void {
        const eye = [1, 4, -6];
        const target = [0, 0, 0];
        const up = [0, 1, 0];
        const camera = twgl.m4.lookAt(eye, target, up);
        const view = twgl.m4.inverse(camera);
        const viewProjection = twgl.m4.multiply(view, this._projection);

        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);

        for (const cube of this._cubes) {
            const world =
                twgl.m4.multiply(
                twgl.m4.rotationY(cube.rotation),
                twgl.m4.translate(
                    twgl.m4.identity(),
                    cube.position
                ),
            );

            gl.useProgram(this._program);
            gl.uniform3fv(this._uLightWorldPosLoc, [1, 8, -10]);
            gl.uniform4fv(this._uLightColorLoc, [1, 0.8, 0.8, 1]);
            gl.uniform4fv(this._uAmbientLoc, [0, 0, 0, 1]);
            gl.uniform4fv(this._uSpecularLoc, [1, 1, 1, 1]);
            gl.uniform1f(this._uShininessLoc, 50);
            gl.uniform1f(this._uSpecularFactorLoc, 1);
            gl.uniform1i(this._uDiffuseLoc, 0);
            gl.uniformMatrix4fv(this._uViewInverseLoc, false, camera);
            gl.uniformMatrix4fv(this._uWorldLoc, false, world);
            gl.uniformMatrix4fv(this._uWorldInverseTransposeLoc, false, twgl.m4.transpose(twgl.m4.inverse(world)));
            gl.uniformMatrix4fv(this._uWorldViewProjectionLoc, false, twgl.m4.multiply(world, viewProjection));
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this._tex);
            gl.bindBuffer(gl.ARRAY_BUFFER, this._positionBuffer);
            gl.vertexAttribPointer(this._positionLoc, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(this._positionLoc);
            gl.bindBuffer(gl.ARRAY_BUFFER, this._normalBuffer);
            gl.vertexAttribPointer(this._normalLoc, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(this._normalLoc);
            gl.bindBuffer(gl.ARRAY_BUFFER, this._texcoordBuffer);
            gl.vertexAttribPointer(this._texcoordLoc, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(this._texcoordLoc);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indicesBuffer);
            gl.drawElements(gl.TRIANGLES, 6 * 6, gl.UNSIGNED_SHORT, 0);
        }
    }
}
