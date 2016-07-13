uniform vec3 u_worldViewPos;
uniform mat4 u_worldViewProjection;
uniform mat4 u_world;
uniform mat4 u_worldInverseTranspose;

attribute vec4 a_position;
attribute vec3 a_normal;
attribute vec2 a_texcoord;

varying vec4 v_position;
varying vec2 v_texCoord;
varying vec3 v_normal;
varying vec3 v_surfaceToView;

void main() {
    v_texCoord = a_texcoord;
    v_position = (u_worldViewProjection * a_position);
    v_normal = (u_worldInverseTranspose * vec4(a_normal, 0)).xyz;
    v_surfaceToView = u_worldViewPos - (u_world * a_position).xyz;
    gl_Position = v_position;
}
