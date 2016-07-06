/* @flow */
import type { RenderSystem } from 'framework';
import CubeRenderSystem from 'render/cube-render-system';

export default function(glContext: any): Array<RenderSystem> {
    return [
        new CubeRenderSystem(glContext),
    ];
}
