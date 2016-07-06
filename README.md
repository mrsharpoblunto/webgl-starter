# webgl-starter
A WebGL starter project with hot reloading and a component entity system

# Component Entity system
The starter comes with a simple component entity system (see [here](https://en.wikipedia.org/wiki/Entity_component_system) and [here](http://gameprogrammingpatterns.com/component.html) for some background on the component entity system pattern) that allows separation of state, simulation logic, and rendering logic.

## Components
All relevant entity states should be attached via some combination of components on an entity.

## Builders
Builders are factory functions that allow a known configuration of components to be attached to an entity.

## Sim systems
Sim systems represent all the games logic and are responsible for simulating the world. Sim systems should be completely stateless (all state should reside in components) in order for them to be hot reloadable.

## Render systems
Render systems are responsible for rendering entities and thier components. Render systems should be completely stateless, and also should not alter the world state - i.e. they should only read the world state.
