/* @flow */

export class CubeComponent {
    static Type: string = 'CUBE_COMPONENT';
    getType(): string { return CubeComponent.Type; }

    rotation: number;

    constructor() {
        this.rotation = 0;
    }
}
