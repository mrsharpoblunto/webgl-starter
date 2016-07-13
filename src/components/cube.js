/* @flow */

export default class CubeComponent {
    static Type: string = 'CUBE_COMPONENT';
    getType(): string { return CubeComponent.Type; }

    rotation: number;
    position: Vec3;

    constructor(position: Vec3) {
        this.rotation = 0;
        this.position = position;
    }
}
