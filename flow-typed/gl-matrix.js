declare class Quaternion {
    [key: number]: number;
}
declare class Vec2 {
    [key: number]: number;
}
declare class Vec3 {
    [key: number]: number;
}
declare class Vec4 {
    [key: number]: number;
}
declare class Mat2 {
    [key: number]: number;
}
declare class Mat3 {
    [key: number]: number;
}
declare class Mat4 {
    [key: number]: number;
}

declare module 'gl-matrix' {
    declare var vec2: {
        create: () => Vec2;
    }

    declare var vec3: {
        add: (out: Vec3, a: Vec3, b: Vec3, ...rest: Array<void>) => Vec3;
        angle: (a: Vec3, b: Vec3, ...rest: Array<void>) => number;
        bezier: (out: Vec3,a: Vec3, b: Vec3, c: Vec3, d: Vec3, t: number, ...rest: Array<void>) => Vec3;
        ceil: (out: Vec3, a: Vec3, ...rest: Array<void>) => Vec3;
        clone: (a: Vec3, ...rest: Array<void>) => Vec3;
        copy: (out: Vec3, a: Vec3, ...rest: Array<void>) => Vec3;
        create: (a: void) => Vec3;
        cross: (out: Vec3, a: Vec3, b: Vec3, ...rest: Array<void>) => Vec3;
        dist: (a: Vec3, b: Vec3, ...rest: Array<void>) => number;
        distance: (a: Vec3, b: Vec3, ...rest: Array<void>) => number;
        div: (out: Vec3, b: Vec3, b: Vec3, ...rest: Array<void>) => Vec3;
        divide: (out: Vec3, b: Vec3, b: Vec3, ...rest: Array<void>) => Vec3;
        dot: (a: Vec3, b: Vec3, ...rest: Array<void>) => number;
        equals: (a: Vec3, b: Vec3, ...rest: Array<void>) => bool;
        exactEquals: (a: Vec3, b: Vec3, ...rest: Array<void>) => bool;
        floor: (out: Vec3, a: Vec3, ...rest: Array<void>) => Vec3;
        forEach: (
            a: Array<Vec3>,
            stride: number,
            offset: number,
            count: number,
            fn: (out: Vec3, a: Vec3,...args: any) => void,
            ...args: any
        ) => void;
        fromValues: (x: number, y: number, z: number, ...rest: Array<void>) => Vec3;
        hermite: (out: Vec3,a: Vec3, b: Vec3, c: Vec3, d: Vec3, t: number, ...rest: Array<void>) => Vec3;
        inverse: (out: Vec3, a: Vec3, ...rest: Array<void>) => Vec3;
        len: (a: Vec3, ...rest: Array<void>) => number,
        length: (a: Vec3, ...rest: Array<void>) => number,
        lerp: (out: Vec3, a: Vec3, b: Vec3, t: number, ...rest: Array<void>) => Vec3;
        max: (out: Vec3, a: Vec3, b: Vec3, ...rest: Array<void>) => Vec3;
        min: (out: Vec3, a: Vec3, b: Vec3, ...rest: Array<void>) => Vec3;
        mul: (out: Vec3, a: Vec3, b: Vec3, ...rest: Array<void>) => Vec3;
        multiply: (out: Vec3, a: Vec3, b: Vec3, ...rest: Array<void>) => Vec3;
        negate: (out: Vec3, a: Vec3, ...rest: Array<void>) => Vec3;
        normalize: (out: Vec3, a: Vec3, ...rest: Array<void>) => Vec3;
        random: (out: Vec3, scale: ?number, ...rest: Array<void>) => Vec3;
        rotateX: (out: Vec3, a: Vec3, b: Vec3, c: number, ...rest: Array<void>) => Vec3;
        rotateY: (out: Vec3, a: Vec3, b: Vec3, c: number, ...rest: Array<void>) => Vec3;
        rotateZ: (out: Vec3, a: Vec3, b: Vec3, c: number, ...rest: Array<void>) => Vec3;
        round: (out: Vec3, a: Vec3, ...rest: Array<void>) => Vec3;
        scale: (out: Vec3, a: Vec3, b: number, ...rest: Array<void>) => Vec3;
        scaleAndAdd: (out: Vec3, a: Vec3, b: Vec3, scale: number, ...rest: Array<void>) => Vec3;
        set: (out: Vec3, x: number, y: number, z: number, ...rest: Array<void>) => Vec3;
        sqrDist: (a: Vec3, b: Vec3, ...rest: Array<void>) => number;
        squaredDistance: (a: Vec3, b: Vec3, ...rest: Array<void>) => number;
        sqrLen: (a: Vec3, ...rest: Array<void>) => number;
        squaredLength: (a: Vec3, ...rest: Array<void>) => number;
        str: (a: Vec3, ...rest: Array<void>) => string;
        sub: (out: Vec3, a: Vec3, b: Vec3, ...rest: Array<void>) => Vec3;
        subtract: (out: Vec3, a: Vec3, b: Vec3, ...rest: Array<void>) => Vec3;
        transformMat3: (out: Vec3, a: Vec3, m: Mat3, ...rest: Array<void>) => Vec3;
        transformMat4: (out: Vec3, a: Vec3, m: Mat4, ...rest: Array<void>) => Vec3;
        transformQuat: (out: Vec3, a: Vec3, q: Quaternion, ...rest: Array<void>) => Vec3;
    }

    declare var vec4: {
        add: (out: Vec4, a: Vec4, b: Vec4, ...rest: Array<void>) => Vec4;
        ceil: (out: Vec4, a: Vec4, ...rest: Array<void>) => Vec4;
        clone: (a: Vec4, ...rest: Array<void>) => Vec4;
        copy: (out: Vec4, a: Vec4, ...rest: Array<void>) => Vec4;
        create: (a: void) => Vec4;
        dist: (a: Vec4, b: Vec4, ...rest: Array<void>) => number;
        distance: (a: Vec4, b: Vec4, ...rest: Array<void>) => number;
        div: (out: Vec4, b: Vec4, b: Vec4, ...rest: Array<void>) => Vec4;
        divide: (out: Vec4, b: Vec4, b: Vec4, ...rest: Array<void>) => Vec4;
        dot: (a: Vec4, b: Vec4, ...rest: Array<void>) => number;
        equals: (a: Vec4, b: Vec4, ...rest: Array<void>) => bool;
        exactEquals: (a: Vec4, b: Vec4, ...rest: Array<void>) => bool;
        floor: (out: Vec4, a: Vec4, ...rest: Array<void>) => Vec4;
        forEach: (
            a: Array<Vec4>,
            stride: number,
            offset: number,
            count: number,
            fn: (out: Vec4, a: Vec4,...args: any) => void,
            ...args: any
        ) => void;
        fromValues: (x: number, y: number, z: number, ...rest: Array<void>) => Vec4;
        inverse: (out: Vec4, a: Vec4, ...rest: Array<void>) => Vec4;
        len: (a: Vec4, ...rest: Array<void>) => number,
        length: (a: Vec4, ...rest: Array<void>) => number,
        lerp: (out: Vec4, a: Vec4, b: Vec4, t: number, ...rest: Array<void>) => Vec4;
        max: (out: Vec4, a: Vec4, b: Vec4, ...rest: Array<void>) => Vec4;
        min: (out: Vec4, a: Vec4, b: Vec4, ...rest: Array<void>) => Vec4;
        mul: (out: Vec4, a: Vec4, b: Vec4, ...rest: Array<void>) => Vec4;
        multiply: (out: Vec4, a: Vec4, b: Vec4, ...rest: Array<void>) => Vec4;
        negate: (out: Vec4, a: Vec4, ...rest: Array<void>) => Vec4;
        normalize: (out: Vec4, a: Vec4, ...rest: Array<void>) => Vec4;
        random: (out: Vec4, scale: ?number, ...rest: Array<void>) => Vec4;
        round: (out: Vec4, a: Vec4, ...rest: Array<void>) => Vec4;
        scale: (out: Vec4, a: Vec4, b: number, ...rest: Array<void>) => Vec4;
        scaleAndAdd: (out: Vec4, a: Vec4, b: Vec4, scale: number, ...rest: Array<void>) => Vec4;
        set: (out: Vec4, x: number, y: number, z: number, ...rest: Array<void>) => Vec4;
        sqrDist: (a: Vec4, b: Vec4, ...rest: Array<void>) => number;
        squaredDistance: (a: Vec4, b: Vec4, ...rest: Array<void>) => number;
        sqrLen: (a: Vec4, ...rest: Array<void>) => number;
        squaredLength: (a: Vec4, ...rest: Array<void>) => number;
        str: (a: Vec4, ...rest: Array<void>) => string;
        sub: (out: Vec4, a: Vec4, b: Vec4, ...rest: Array<void>) => Vec4;
        subtract: (out: Vec4, a: Vec4, b: Vec4, ...rest: Array<void>) => Vec4;
        transformMat4: (out: Vec4, a: Vec4, m: Mat4, ...rest: Array<void>) => Vec4;
        transformQuat: (out: Vec4, a: Vec4, q: Quaternion, ...rest: Array<void>) => Vec4;
    }

    declare var quat: {
        add: (out: Quaternion, a: Quaternion, b: Quaternion, ...rest: Array<void>) => Quaternion;
        calculateW: (out: Quaternion, a: Quaternion, ...rest: Array<void>) => Quaternion;
        clone: (a: Quaternion, ...rest: Array<void>) => Quaternion;
        conjugate: (out: Quaternion, a: Quaternion, ...rest: Array<void>) => Quaternion;
        copy: (out: Quaternion, a: Quaternion, ...rest: Array<void>) => Quaternion;
        create: (a: void) => Quaternion;
        dot: (a: Quaternion, b: Quaternion, ...rest: Array<void>) => number;
        fromMat3: (out: Quaternion, m: Mat3, ...rest: Array<void>) => Quaternion;
        fromValues: (a: number,b: number,c: number, d:number, ...rest: Array<void>) => Quaternion;
        getAxisAngle: (out_axis: Vec3,q: Quaternion, ...rest: Array<void>) => number;
        identity: (out: Quaternion, ...rest: Array<void>) => Quaternion;
        invert: (out: Quaternion,a: Quaternion, ...rest: Array<void>) => Quaternion;
        len: (a: Quaternion, ...rest: Array<void>) => number;
        length: (a: Quaternion, ...rest: Array<void>) => number;
        lerp: (out:Quaternion,a: Quaternion, b: Quaternion, t: number, ...rest: Array<void>) => Quaternion;
        mul: (out: Quaternion, a: Quaternion, b: Quaternion, ...rest: Array<void>) => Quaternion;
        multiply: (out: Quaternion, a: Quaternion, b: Quaternion, ...rest: Array<void>) => Quaternion;
        normalize: (out: Quaternion, a: Quaternion, ...rest: Array<void>) => Quaternion;
        rotateX: (out: Quaternion, a: Quaternion, rad: number, ...rest: Array<void>) => Quaternion;
        rotateY: (out: Quaternion, a: Quaternion, rad: number, ...rest: Array<void>) => Quaternion;
        rotateZ: (out: Quaternion, a: Quaternion, rad: number, ...rest: Array<void>) => Quaternion;
        scale: (out: Quaternion, a: Quaternion, b: number, ...rest: Array<void>) => Quaternion;
        set: (out: Quaternion, x: number, y: number, z: number, w: number, ...rest: Array<void>) => Quaternion;
        setAxisAngle: (out: Quaternion, axis: Vec3, rad: number, ...rest: Array<void>) => Quaternion;
        slerp: (out: Quaternion, a: Quaternion, b: Quaternion, t: number, ...rest: Array<void>) => Quaternion;
        sqrLen: (a: Quaternion, ...rest: Array<void>) => number;
        squaredLength: (a: Quaternion, ...rest: Array<void>) => number;
        str: (a: Quaternion, ...rest: Array<void>) => string;
        equals: (a: Quaternion, b: Quaternion, ...rest: Array<void>) => bool;
        exactEquals: (a: Quaternion, b: Quaternion, ...rest: Array<void>) => bool;
        rotationTo: (out: Quaternion, a: Vec3, b: Vec3, ...rest: Array<void>) => Quaternion;
        setAxes: (out: Quaternion, view: Vec3, right: Vec3, up: Vec3, ...rest: Array<void>) => Quaternion;
        sqlerp: (out: Quaternion, a: Quaternion, b: Quaternion, c: Quaternion, d: Quaternion, t: number, ...rest: Array<void>) => Quaternion;
    }

    declare var mat4: {
        adjoint: (out: Mat4, a: Mat4, ...rest: Array<void>) => Mat4;
        invert: (out: Mat4, a: Mat4, ...rest: Array<void>) => Mat4;
        mul: (out: Mat4, a: Mat4, b: Mat4, ...rest: Array<void>) => Mat4;
        multiply: (out: Mat4, a: Mat4, b: Mat4, ...rest: Array<void>) => Mat4;
        rotateX: (out: Mat4, a: Mat4, rad: number, ...rest: Array<void>) => Mat4;
        rotateY: (out: Mat4, a: Mat4, rad: number, ...rest: Array<void>) => Mat4;
        rotateZ: (out: Mat4, a: Mat4, rad: number, ...rest: Array<void>) => Mat4;
        scale: (out: Mat4, a: Mat4, v: Vec3, ...rest: Array<void>) => Mat4;
        translate: (out: Mat4, a: Mat4, v: Vec3, ...rest: Array<void>) => Mat4;
        transpose: (out: Mat4, a: Mat4, ...rest: Array<void>) => Mat4;
        add: (out: Mat4, a: Mat4, b: Mat4, ...rest: Array<void>) => Mat4;
        clone: (a: Mat4, ...rest: Array<void>) => Mat4;
        copy: (out: Mat4, a: Mat4, ...rest: Array<void>) => Mat4;
        create: (a: void) => Mat4;
        determinant: (a: Mat4, ...rest: Array<void>) => number;
        equals: (a: Mat4, b: Mat4, ...rest: Array<void>) => bool;
        exactEquals: (a: Mat4, b: Mat4, ...rest: Array<void>) => bool;
        frob: (a: Mat4, ...rest: Array<void>) => number;
        fromQuat: (out: Mat4, q: Quaternion, ...rest: Array<void>) => Mat4;
        fromRotation: (out: Mat4, rad: number, axis: Vec3, ...rest: Array<void>) => Mat4;
        fromRotationTranslation: (out: Mat4, q: Quaternion, v: Vec3, ...rest: Array<void>) => Mat4;
        fromRotationTranslationScale: (out: Mat4, q: Quaternion, v: Vec3, s: Vec3, ...rest: Array<void>) => Mat4;
        fromRotationTranslationScaleOrigin: (out: Mat4, q: Quaternion, v: Vec3, s: Vec3, o: Vec3, ...rest: Array<void>) => Mat4;
        fromScaling: (out: Mat4, s: Vec3, ...rest: Array<void>) => Mat4;
        fromTranslation: (out: Mat4, v: Vec3, ...rest: Array<void>) => Mat4;
        fromValues: (
            m00: number,m01: number,m02: number,m03: number,
            m10: number,m11: number,m12: number,m13: number,
            m20: number,m21: number,m22: number,m23: number,
            m30: number,m31: number,m32: number,m33: number
            , ...rest: Array<void>
        ) => Mat4;
        fromXRotation: (out: Mat4, rad: number, ...rest: Array<void>) => Mat4;
        fromYRotation: (out: Mat4, rad: number, ...rest: Array<void>) => Mat4;
        fromZRotation: (out: Mat4, rad: number, ...rest: Array<void>) => Mat4;
        frustrum: (
            out: Mat4,
            left: number,right: number,bottom: number,top: number,
            near: number, far: number,
             ...rest: Array<void>
        ) => Mat4;
        getRotation: (out: Quaternion, a: Mat4, ...rest: Array<void>) => Quaternion;
        getTranslation: (out: Vec3, a: Mat4, ...rest: Array<void>) => Vec3;
        identity: (out: Mat4, ...rest: Array<void>) => Mat4;
        lookAt: (out: Mat4, eye: Vec3, center: Vec3, up: Vec3, ...rest: Array<void>) => Mat4;
        multiplyScalar: (out: Mat4, a: Mat4, b: number, ...rest: Array<void>) => Mat4;
        multiplyScalarAndAdd: (out: Mat4, a: Mat4, b: Mat4,scale: number, ...rest: Array<void>) => Mat4;
        ortho: (
            out: Mat4,
            left: number, right: number, bottom: number, top: number,
            near: number, far: number, ...rest: Array<void>
        ) => Mat4;
        perspective: (
            out: Mat4, 
            fovy: number, aspect: number, near: number, far: number, ...rest: Array<void>
        ) => Mat4;

        perspectiveFromFieldOfView: (
            out: Mat4,
            fov: Object,
            near: number, far: number, ...rest: Array<void>
        ) => Mat4;
        rotate: (out: Mat4, a: Mat4, rad: number, axis: Vec3, ...rest: Array<void>) => Mat4;
        set: (
            out: Mat4,
            m00: number,m01: number,m02: number,m03: number,
            m10: number,m11: number,m12: number,m13: number,
            m20: number,m21: number,m22: number,m23: number,
            m30: number,m31: number,m32: number,m33: number, 
            ...rest: Array<void>
        ) => Mat4;
        str: (a: Mat4, ...rest: Array<void>) => string;
        sub: (out: Mat4, a: Mat4, b: Mat4, ...rest: Array<void>) => Mat4;
        subtract: (out: Mat4, a: Mat4, b: Mat4, ...rest: Array<void>) => Mat4;
    }

    declare var mat3: {
        adjoint: (out: Mat3, a: Mat3, ...rest: Array<void>) => Mat3;
        invert: (out: Mat3, a: Mat3, ...rest: Array<void>) => Mat3;
        mul: (out: Mat3, a: Mat3, b: Mat3, ...rest: Array<void>) => Mat3;
        multiply: (out: Mat3, a: Mat3, b: Mat3, ...rest: Array<void>) => Mat3;
        scale: (out: Mat3, a: Mat3, v: Vec2, ...rest: Array<void>) => Mat3;
        translate: (out: Mat3, a: Mat3, v: Vec2, ...rest: Array<void>) => Mat3;
        transpose: (out: Mat3, a: Mat3, ...rest: Array<void>) => Mat3;
        add: (out: Mat3, a: Mat3, b: Mat3, ...rest: Array<void>) => Mat3;
        clone: (a: Mat3, ...rest: Array<void>) => Mat3;
        copy: (out: Mat3, a: Mat3, ...rest: Array<void>) => Mat3;
        create: (a: void) => Mat3;
        determinant: (a: Mat3, ...rest: Array<void>) => number;
        equals: (a: Mat3, b: Mat3, ...rest: Array<void>) => bool;
        exactEquals: (a: Mat3, b: Mat3, ...rest: Array<void>) => bool;
        frob: (a: Mat3, ...rest: Array<void>) => number;
        fromMat4: (out: Mat3, a: Mat4, ...rest: Array<void>) => Mat3;
        fromQuat: (out: Mat3, q: Quaternion, ...rest: Array<void>) => Mat3;
        fromRotation: (out: Mat3, rad: number, ...rest: Array<void>) => Mat3;
        fromScaling: (out: Mat3, s: Vec2, ...rest: Array<void>) => Mat3;
        fromTranslation: (out: Mat3, v: Vec2, ...rest: Array<void>) => Mat3;
        fromValues: (
            m00: number,m01: number,m02: number,
            m10: number,m11: number,m12: number,
            m20: number,m21: number,m22: number, 
            ...rest: Array<void>
        ) => Mat3;
        identity: (out: Mat3, ...rest: Array<void>) => Mat3;
        multiplyScalar: (out: Mat3, a: Mat3, b: number, ...rest: Array<void>) => Mat3;
        multiplyScalarAndAdd: (out: Mat3, a: Mat3, b: Mat3,scale: number, ...rest: Array<void>) => Mat3;
        normalFromMat4: (out: Mat3, a: Mat4, ...rest: Array<void>) => Mat3;
        rotate: (out: Mat3, a: Mat3, rad: number, ...rest: Array<void>) => Mat3;
        set: (
            out: Mat3,
            m00: number,m01: number,m02: number,
            m10: number,m11: number,m12: number,
            m20: number,m21: number,m22: number, 
            ...rest: Array<void>
        ) => Mat3;
        str: (a: Mat3, ...rest: Array<void>) => string;
        sub: (out: Mat3, a: Mat3, b: Mat3, ...rest: Array<void>) => Mat3;
        subtract: (out: Mat3, a: Mat3, b: Mat3, ...rest: Array<void>) => Mat3;
    }
}
