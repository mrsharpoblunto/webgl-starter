/* @flow */

export default class CubeComponent {
    static Type: string = 'CUBE_COMPONENT';
    getType(): string { return CubeComponent.Type; }

    rotation: number;
    position: Array<number>;

    constructor(position: Array<number>) {
        this.rotation = 0;
        this.position = position;
    }
}
