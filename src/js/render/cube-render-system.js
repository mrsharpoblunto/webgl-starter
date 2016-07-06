import twgl from 'twgl.js';
import cubeFrag from '../../shaders/cube_frag.glsl';
import cubeVert from '../../shaders/cube_vert.glsl';
import * as Components from '../components';

export default class CubeRenderSystem
{
    _cubes: Set<CubeComponent>;
    _gl: any;
    _projection: any;

    constructor(gl: any) {
        this._cubes = new Set();
        this._gl = gl;

        this._program = twgl.createProgramFromSources(this._gl, [cubeVert, cubeFrag]);
        this._uLightWorldPosLoc = this._gl.getUniformLocation(this._program, "u_lightWorldPos");
        this._uLightColorLoc = this._gl.getUniformLocation(this._program, "u_lightColor");
        this._uAmbientLoc = this._gl.getUniformLocation(this._program, "u_ambient");
        this._uSpecularLoc = this._gl.getUniformLocation(this._program, "u_specular");
        this._uShininessLoc = this._gl.getUniformLocation(this._program, "u_shininess");
        this._uSpecularFactorLoc = this._gl.getUniformLocation(this._program, "u_specularFactor");
        this._uDiffuseLoc = this._gl.getUniformLocation(this._program, "u_diffuse");
        this._uWorldLoc = this._gl.getUniformLocation(this._program, "u_world");
        this._uWorldInverseTransposeLoc = this._gl.getUniformLocation(this._program, "u_worldInverseTranspose");
        this._uWorldViewProjectionLoc = this._gl.getUniformLocation(this._program, "u_worldViewProjection");
        this._uViewInverseLoc = this._gl.getUniformLocation(this._program, "u_viewInverse");

        this._positionLoc = this._gl.getAttribLocation(this._program, "a_position");
        this._normalLoc = this._gl.getAttribLocation(this._program, "a_normal");
        this._texcoordLoc = this._gl.getAttribLocation(this._program, "a_texcoord");

        const positions = [1, 1, -1, 1, 1, 1, 1, -1, 1, 1, -1, -1, -1, 1, 1, -1, 1, -1, -1, -1, -1, -1, -1, 1, -1, 1, 1, 1, 1, 1, 1, 1, -1, -1, 1, -1, -1, -1, -1, 1, -1, -1, 1, -1, 1, -1, -1, 1, 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, -1, 1, -1, 1, 1, -1, 1, -1, -1, -1, -1, -1];
        const normals   = [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1];
        const texcoords = [1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1];
        const indices   = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23];

        this._positionBuffer = this._gl.createBuffer();
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._positionBuffer);
        this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(positions), this._gl.STATIC_DRAW);
        this._normalBuffer = this._gl.createBuffer();
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._normalBuffer);
        this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(normals), this._gl.STATIC_DRAW);
        this._texcoordBuffer = this._gl.createBuffer();
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._texcoordBuffer);
        this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(texcoords), this._gl.STATIC_DRAW);
        this._indicesBuffer = this._gl.createBuffer();
        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._indicesBuffer);
        this._gl.bufferData(this._gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), this._gl.STATIC_DRAW);
        this._tex = this._gl.createTexture();
        this._gl.bindTexture(this._gl.TEXTURE_2D, this._tex);
        this._gl.texImage2D(this._gl.TEXTURE_2D, 0, this._gl.RGBA, 2, 2, 0, this._gl.RGBA, this._gl.UNSIGNED_BYTE, new Uint8Array([
            255, 255, 255, 255,
            192, 192, 192, 255,
            192, 192, 192, 255,
            255, 255, 255, 255,
        ]));
        this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, this._gl.NEAREST);
        this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, this._gl.NEAREST);
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
    render(alpha: number): void {
        const eye = [1, 4, -6];
        const target = [0, 0, 0];
        const up = [0, 1, 0];
        const camera = twgl.m4.lookAt(eye, target, up);
        const view = twgl.m4.inverse(camera);
        const viewProjection = twgl.m4.multiply(view, this._projection);

        this._gl.enable(this._gl.DEPTH_TEST);
        this._gl.enable(this._gl.CULL_FACE);

        for (const cube of this._cubes) {
            var world = twgl.m4.rotationY(cube.rotation);

            this._gl.useProgram(this._program);
            this._gl.uniform3fv(this._uLightWorldPosLoc, [1, 8, -10]);
            this._gl.uniform4fv(this._uLightColorLoc, [1, 0.8, 0.8, 1]);
            this._gl.uniform4fv(this._uAmbientLoc, [0, 0, 0, 1]);
            this._gl.uniform4fv(this._uSpecularLoc, [1, 1, 1, 1]);
            this._gl.uniform1f(this._uShininessLoc, 50);
            this._gl.uniform1f(this._uSpecularFactorLoc, 1);
            this._gl.uniform1i(this._uDiffuseLoc, 0);
            this._gl.uniformMatrix4fv(this._uViewInverseLoc, false, camera);
            this._gl.uniformMatrix4fv(this._uWorldLoc, false, world);
            this._gl.uniformMatrix4fv(this._uWorldInverseTransposeLoc, false, twgl.m4.transpose(twgl.m4.inverse(world)));
            this._gl.uniformMatrix4fv(this._uWorldViewProjectionLoc, false, twgl.m4.multiply(world, viewProjection));
            this._gl.activeTexture(this._gl.TEXTURE0);
            this._gl.bindTexture(this._gl.TEXTURE_2D, this._tex);
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._positionBuffer);
            this._gl.vertexAttribPointer(this._positionLoc, 3, this._gl.FLOAT, false, 0, 0);
            this._gl.enableVertexAttribArray(this._positionLoc);
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._normalBuffer);
            this._gl.vertexAttribPointer(this._normalLoc, 3, this._gl.FLOAT, false, 0, 0);
            this._gl.enableVertexAttribArray(this._normalLoc);
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._texcoordBuffer);
            this._gl.vertexAttribPointer(this._texcoordLoc, 2, this._gl.FLOAT, false, 0, 0);
            this._gl.enableVertexAttribArray(this._texcoordLoc);
            this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._indicesBuffer);
            this._gl.drawElements(this._gl.TRIANGLES, 6 * 6, this._gl.UNSIGNED_SHORT, 0);
        }
    }
}
