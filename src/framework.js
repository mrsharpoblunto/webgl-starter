/* @flow */
import twgl from 'twgl.js';

export interface SimSystem {
    systemWillMount(canvas: any): void;
    systemWillUnmount(canvas: any): void;
    worldAddingEntity(entity: Entity): void;
    worldRemovingEntity(entity: Entity): void;
    simulate(timestep: number): void;
}

export interface RenderSystem {
    worldAddingEntity(entity: Entity): void;
    worldRemovingEntity(entity: Entity): void;
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
    _canvas: any;
    _glContext: any;
    _aspect: number;
    _fov: number;
    _maxWidth: number;
    _entities: Map<number,Entity>;
    _simSystems: Array<SimSystem>;
    _renderSystems: Array<RenderSystem>;
    _building: boolean;

    constructor(canvas: any,glContext: any,maxWidth: number,aspect: number,fov: number) {
        this._simSystems = [];
        this._renderSystems = [];
        this._entities = new Map();
        this._nextId = 0;
        this._freeIds = [];
        this._aspect = aspect;
        this._fov = fov;
        this._maxWidth = maxWidth;
        this._canvas = canvas;
        this._glContext = glContext;
        this._building = false;
    }
    mountSimSystems(systems: Array<SimSystem>): void {
        for (let system of this._simSystems) {
            if (system.systemWillUnmount) {
                system.systemWillUnmount(this._canvas);
            }
        }
        this._simSystems = systems;
        for (let system of this._simSystems) {
            if (system.systemWillMount) {
                system.systemWillMount(this._canvas);
            }
        }
        for (let [id,ent] of this._entities) {
            for (let system of this._simSystems) {
                system.worldAddingEntity(ent);
            }
        }
    }
    mountRenderSystems(systems: Array<RenderSystem>): void {
        this._renderSystems = systems;
        for (let [id,ent] of this._entities) {
            for (let system of this._renderSystems) {
                system.worldAddingEntity(ent);
            }
        }
    }
    clear(): void {
        for (let [id,ent] of this._entities) {
            for (let system of this._simSystems) {
                system.worldRemovingEntity(ent);
            }
            for (let system of this._renderSystems) {
                system.worldRemovingEntity(ent);
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
    createEntity(builder: (entity: Entity,options: any) => Entity, options: any): Entity {
        let id: number;
        if (this._freeIds.length) {
            id = this._freeIds[this._freeIds.length - 1];
            this._freeIds.pop();
        } else {
            id = this._nextId++;
        }
        this._building = true;
        const entity = builder(new Entity(id,this),options);
        this._building = false;
        this._entities.set(entity.id,entity);
        for (let system of this._simSystems) {
            system.worldAddingEntity(entity);
        }
        for (let system of this._renderSystems) {
            system.worldAddingEntity(entity);
        }
        return entity;
    }
    removeEntity(entity: Entity): void {
        for (let system of this._simSystems) {
            system.worldRemovingEntity(entity);
        }
        for (let system of this._renderSystems) {
            system.worldRemovingEntity(entity);
        }
        this._entities.delete(entity.id);
        this._freeIds.push(entity.id);
    }
    changeEntity(entity: Entity): void {
        if (this._building) return;
        for (let system of this._simSystems) {
            system.worldRemovingEntity(entity);
            system.worldAddingEntity(entity);
        }
        for (let system of this._renderSystems) {
            system.worldRemovingEntity(entity);
            system.worldAddingEntity(entity);
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

