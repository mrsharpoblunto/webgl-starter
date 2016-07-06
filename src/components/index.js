/* @flow */
import CubeComponent from 'components/cube';

export {
    CubeComponent,
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
