import { test } from '../../testing'
import { CustomReactEcsRenderer } from '../../utils/ui'

import { Material, engine } from '@dcl/sdk/ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'
import ReactEcs, { Button, UiEntity } from '@dcl/sdk/react-ecs'
import { assertSnapshot } from '../../utils/snapshot-test'
import { getScreenCanvasInfo } from '../../utils/ui/ui-utils'

let clicked: boolean = false

function ChangeColor(color: Color4): void {
  for (const [entity] of engine.getEntitiesWith(Material)) {
    Material.setPbrMaterial(entity, { albedoColor: color })
  }
}

function TestElementButton(): ReactEcs.JSX.Element {
  const screenSize = getScreenCanvasInfo()
  return (
    <UiEntity
      uiTransform={{
        width: screenSize.w,
        height: screenSize.h
      }}
    >
      <Button
        value="Click change backgound to blue"
        variant="primary"
        uiTransform={{ width: 200, height: 50 }}
        onMouseDown={() => {
          clicked = true
          ChangeColor(Color4.Blue())
        }}
      />
    </UiEntity>
  )
}

test('ui-button: should change color to blue', async function (context) {
  CustomReactEcsRenderer.destroy()
  CustomReactEcsRenderer.setUiRenderer(TestElementButton)
  await context.helpers.waitTicksUntil(() => {
    if (clicked) {
      return true
    } else {
      return false
    }
  })

  await context.helpers.waitNTicks(5)

  await assertSnapshot(
    'screenshot/$explorer_snapshot_ui_button.png',
    Vector3.create(8, 1, 10),
    Vector3.create(8, 1, 8)
  )

  ChangeColor(Color4.Black())
})
