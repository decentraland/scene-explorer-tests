import type { IEngine, PointerEventsSystem } from '@dcl/ecs'

import { createReconciler } from '@dcl/react-ecs/dist/reconciler'
import { engine, pointerEventsSystem } from '@dcl/sdk/ecs'
import { UiComponent } from '@dcl/sdk/react-ecs'

export function createReactBasedUiSystem(
  engine: IEngine,
  pointerSystem: PointerEventsSystem
) {
  let renderer: ReturnType<typeof createReconciler> | undefined = createReconciler(engine, pointerSystem)
  let uiComponent: UiComponent | undefined = undefined

  function ReactBasedUiSystem() {
    if (renderer && uiComponent) {
      renderer.update(uiComponent())
    }
  }

  engine.addSystem(ReactBasedUiSystem, 100e3, '@dcl/react-ecs')

  return {
    destroy() {
      if (renderer === undefined) return
      
      for (const entity of renderer.getEntities()) {
        engine.removeEntity(entity)
      }
      renderer = undefined
    },
    setUiRenderer(ui: UiComponent) {
      if (renderer === undefined) {
        renderer = createReconciler(engine, pointerSystem)
      }

      uiComponent = ui
    }
  }
}


export const CustomReactEcsRenderer = createReactBasedUiSystem(engine, pointerEventsSystem)