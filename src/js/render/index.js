/* @flow */
import type { RenderSystem } from '../framework';

class MyRenderSystem
{
    constructor(glContext: any) {
    }
    onAddEntity(): void {
    }
    onRemoveEntity(): void {
    }
    render(alpha: number): void {
    }
    setProjectionMatrix(matrix: any): void {
    }
}

export default function(glContext: any): Array<RenderSystem> {
    return [
        new MyRenderSystem(glContext),
    ];
}
