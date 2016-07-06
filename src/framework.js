/* @flow */
import twgl from 'twgl.js';

export interface SimSystem {
    onAddEntity(entity: Entity): void;
    onRemoveEntity(entity: Entity): void;
    simulate(timestep: number): void;
}

export interface RenderSystem {
    setProjectionMatrix(matrix: any): void;
    onAddEntity(entity: Entity): void;
    onRemoveEntity(entity: Entity): void;
    render(gl: any, alpha: number): void;
}

export interface Component {
    getType(): string;
}

export class Entity {
    id: number;
    _components: Map<string,any>;
    _world: World;

    constructor(id:number,world:World) {
        this.id = id;
        this._components = new Map();
        this._world = world;
    }
    addComponent(component:Component): Entity {
        this._components.set(component.getType(),component);
        this._world.changeEntity(this);
        return this;
    }
    removeComponent(component:any): Entity {
        this._components.delete(component.getType());
        this._world.changeEntity(this);
        return this;
    }
    getComponent(type: string): any {
        return this._components.get(type);
    }
    hasComponent(type: string): boolean {
        return !!this._components.get(type);
    }
}

export class World {
    _nextId: number;
    _freeIds: Array<number>;
    _glContext: any;
    _aspect: number;
    _fov: number;
    _maxWidth: number;
    _projectionMatrix: any;
    _entities: Map<number,Entity>;
    _simSystems: Array<SimSystem>;
    _renderSystems: Array<RenderSystem>;

    constructor(glContext: any,maxWidth: number,aspect: number,fov: number) {
        this._simSystems = [];
        this._renderSystems = [];
        this._entities = new Map();
        this._nextId = 0;
        this._freeIds = [];
        this._aspect = aspect;
        this._fov = fov;
        this._maxWidth = maxWidth;
        this._glContext = glContext;
        this._projectionMatrix = twgl.m4.create();
    }
    setSimSystems(systems: Array<SimSystem>): void {
        this._simSystems = systems;
        for (let [id,ent] of this._entities) {
            for (let system of this._simSystems) {
                system.onAddEntity(ent);
            }
        }
    }
    setRenderSystems(systems: Array<RenderSystem>): void {
        this._renderSystems = systems;
        for (let system of this._renderSystems) {
            system.setProjectionMatrix(this._projectionMatrix);
        }
        for (let [id,ent] of this._entities) {
            for (let system of this._renderSystems) {
                system.onAddEntity(ent);
            }
        }
    }
    clear(): void {
        for (let [id,ent] of this._entities) {
            for (let system of this._simSystems) {
                system.onRemoveEntity(ent);
            }
            for (let system of this._renderSystems) {
                system.onRemoveEntity(ent);
            }
        }
    }
    resizeViewPort(viewPortWidth: number,viewPortHeight: number): void {
        let width = Math.min(this._maxWidth,viewPortWidth);
        let height = width/ this._aspect;
        if (height > viewPortHeight) {
            width = viewPortHeight * this._aspect;
            height = viewPortHeight;
        }

        const canvas = this._glContext.canvas;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';

        const pixelRatio = window.devicePixelRatio || 1;
        width *= pixelRatio;
        height *= pixelRatio;
        if (canvas.clientWidth !== canvas.width || canvas.clientHeight !== canvas.height) {
            canvas.width = width;
            canvas.height = height;
            this._glContext.viewport(
                0,
                0,
                width,
                height
            );
            twgl.m4.perspective(
                this._fov * (Math.PI / 180),
                width / height,
                0.5,
                1000,
                this._projectionMatrix
            );
        }
    }
    simulate(timestep: number): void {
        for (let system of this._simSystems) {
            system.simulate(timestep);
        }
    }
    render(alpha: number): void {
        this._glContext.clearColor(0.0,0.0,0.0,1.0);
        this._glContext.clear(
            this._glContext.COLOR_BUFFER_BIT | 
            this._glContext.DEPTH_BUFFER_BIT
        );
        for (let system of this._renderSystems) {
            system.render(this._glContext,alpha);
        }
    }
    createEntity(): Entity {
        let id: number;
        if (this._freeIds.length) {
            id = this._freeIds[this._freeIds.length - 1];
            this._freeIds.pop();
        } else {
            id = this._nextId++;
        }
        const entity = new Entity(id,this);
        this._entities.set(entity.id,entity);
        for (let system of this._simSystems) {
            system.onAddEntity(entity);
        }
        for (let system of this._renderSystems) {
            system.onAddEntity(entity);
        }
        return entity;
    }
    removeEntity(entity: Entity): void {
        for (let system of this._simSystems) {
            system.onRemoveEntity(entity);
        }
        for (let system of this._renderSystems) {
            system.onRemoveEntity(entity);
        }
        this._entities.delete(entity.id);
        this._freeIds.push(entity.id);
    }
    changeEntity(entity: Entity): void {
        for (let system of this._simSystems) {
            system.onRemoveEntity(entity);
            system.onAddEntity(entity);
        }
        for (let system of this._renderSystems) {
            system.onRemoveEntity(entity);
            system.onAddEntity(entity);
        }
    }
    findEntity(id: number): Entity | void {
        return this._entities.get(id);
    }
}

export class WorldRunner {
    _world: World;
    _frameTime: number;
    _frameDelta: number;
    _lastFrameTime: number;

    constructor(world: World,simFps: number) {
        this._world = world;
        this._frameTime = 1000 / simFps;
        this._frameDelta = 0;
        this._lastFrameTime = 0;
        (this: any)._step = this._step.bind(this);
    }
    start(): void {
        window.requestAnimationFrame(this._step);
    }
    _step(timestamp: number): void {
        this._frameDelta += timestamp - this._lastFrameTime;
        this._lastFrameTime = timestamp;
        let numUpdateSteps = 0;
        while (this._frameDelta >= this._frameTime) {
            this._world.simulate(this._frameTime);
            this._frameDelta -= this._frameTime;
            if (++numUpdateSteps > 240) {
                // bail out if this runs too many times. This can happen if simulate
                // takes longer to run than the time it simulates.
                break;
            }
        }
        this._world.render(this._frameDelta / this._frameTime);
        window.requestAnimationFrame(this._step);
    }
}

