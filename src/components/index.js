/* @flow */
import CubeComponent from 'components/cube';
import CameraComponent from 'components/camera';

export {
    CubeComponent,
    CameraComponent,
}

if (__DEV__) {
    // don't do any hot reloading of components themselves as they are
    // inherently stateful and changing them mid simulation will cause
    // unpredictable outcomes
    module = (module: any);
    if (module.hot) {
        module.hot.decline();
    }
}
