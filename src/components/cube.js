/* @flow */

export default class CubeComponent {
    rotation: number;
    position: Vec3;

    constructor(position: Vec3) {
        this.rotation = 0;
        this.position = position;
    }
}
