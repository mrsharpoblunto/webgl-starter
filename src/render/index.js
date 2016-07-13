/* @flow */
import type { RenderSystem } from 'framework';
import CameraRenderSystem from 'render/camera-render-system';
import CubeRenderSystem from 'render/cube-render-system';

export default function(glContext: any): Array<RenderSystem> {
    return [
        new CameraRenderSystem(glContext),
        new CubeRenderSystem(glContext),
    ];
}
