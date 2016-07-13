/* @flow */
import twgl from 'twgl.js';

import { World, WorldRunner } from 'framework';
import init from 'world-builder';
import sims from 'sim';
import renderers from 'render';

const canvas = document.getElementById('canvas');
canvas.focus();
const gl = twgl.getWebGLContext(canvas);
twgl.setDefaults({attribPrefix: 'a_'});

const world = new World(
    canvas,
    gl,
    1920, // max horizontal resolution
    16/9, // view area aspect ratio
    45,   // camera field of view
);
world.mountSimSystems(sims());
world.mountRenderSystems(renderers(gl));
world.resizeViewPort(window.innerWidth,window.innerHeight);
init(world);

const runner = new WorldRunner(
    world, // the world to simulate
    60,    // desired simulation frames per second
);
runner.start();

window.addEventListener('resize',function() {
    world.resizeViewPort(window.innerWidth,window.innerHeight);
});

if (__DEV__) {
    module = (module: any);
    if (module.hot) {
        module.hot.accept('./sim',function() {
            console.log('Hot reloading Sim systems');
            world.mountSimSystems(require('./sim').default());
        });
        module.hot.accept('./render',function() {
            console.log('Hot reloading Render systems');
            world.mountRenderSystems(require('./render').default(gl));
        });
        module.hot.accept('./world-builder',function() {
            console.log('Hot reloading World');
            world.clear();
            require('./world-builder').default(world);
        });

        // don't hot reload this file as the world is stateful
        // and we only want to hot reload stateless stuff like
        // the sim & render systems
        module.hot.decline();
    }
}
