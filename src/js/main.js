/* @flow */
import twgl from 'twgl.js';
import { World, WorldRunner } from './framework';
import init from './world-builder';
import sims from './sim';
import renderers from './render';

const canvas = document.getElementById('canvas');
const gl = twgl.getWebGLContext(canvas);

const world = new World(gl,1920,16/9);
world.setSimSystems(sims());
world.setRenderSystems(renderers(gl));
world.resizeViewPort(window.innerWidth,window.innerHeight);
init(world);

const runner = new WorldRunner(world,60);
runner.start();

window.addEventListener('resize',function() {
    world.resizeViewPort(window.innerWidth,window.innerHeight);
});

if (__DEV__) {
    module = (module: any);
    if (module.hot) {
        module.hot.accept('./sim',function() {
            console.log('Hot reloading Sim systems');
            world.setSimSystems(require('./sim').default());
        });
        module.hot.accept('./render',function() {
            console.log('Hot reloading Render systems');
            world.setRenderSystems(require('./render').default(gl));
        });

        // don't hot reload this file as the world is stateful
        // and we only want to hot reload stateless stuff like
        // the sim & render systems
        module.hot.decline();
    }
}

