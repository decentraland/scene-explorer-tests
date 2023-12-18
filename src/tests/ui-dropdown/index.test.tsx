import { test } from '../../testing'
import { CustomReactEcsRenderer } from '../../utils/ui'

import { Material, engine } from '@dcl/sdk/ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'
import ReactEcs, { Dropdown, Label, UiEntity } from '@dcl/sdk/react-ecs'
import { assertSnapshot } from '../../utils/snapshot-test'

let clicked: boolean = false

function ChangeColor(index: number): void {
  console.log('dropdown clicked')
  let color: Color4 = Color4.Black()
  for (const [entity] of engine.getEntitiesWith(Material)) {
    switch (index) {
      case 0:
        color = Color4.Black()
        clicked = false
        break
      case 1:
        color = Color4.Red()
        clicked = true
        break
      case 2:
        color = Color4.Blue()
        clicked = true
        break
      case 3:
        color = Color4.Green()
        clicked = true
        break
    }
    Material.setPbrMaterial(entity, { albedoColor: color })
  }
}

function TestElementButton(): ReactEcs.JSX.Element {
  return (
    <UiEntity
      uiTransform={{
        position: { left: '150px', top: '50px' },
        width: '200px',
        height: '100px',
        alignContent: 'auto',
        flexDirection: 'column',
        alignSelf: 'center'
      }}
    >
      <Label
        value="Select a color"
        fontSize={18}
        color={Color4.White()}
        uiTransform={{
          width: '140px',
          height: '40px'
        }}
      />
      <Dropdown
        options={[`Black`, `Red`, `Blue`, `Green`]}
        onChange={ChangeColor}
        uiTransform={{
          width: '100px',
          height: '40px'
        }}
      />
    </UiEntity>
  )
}

test('ui-button: should change background color to red', async function (context) {
  clicked = false
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
    'screenshot/$explorer_snapshot_ui_dropdown_red.png',
    Vector3.create(8, 1, 10),
    Vector3.create(8, 1, 8)
  )

  ChangeColor(0)
})

test('ui-button: should change background color to blue', async function (context) {
  clicked = false
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
    'screenshot/$explorer_snapshot_ui_dropdown_blue.png',
    Vector3.create(8, 1, 10),
    Vector3.create(8, 1, 8)
  )

  ChangeColor(0)
})

test('ui-button: should change background color to green', async function (context) {
  clicked = false
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
    'screenshot/$explorer_snapshot_ui_dropdown_green.png',
    Vector3.create(8, 1, 10),
    Vector3.create(8, 1, 8)
  )

  ChangeColor(0)
})
