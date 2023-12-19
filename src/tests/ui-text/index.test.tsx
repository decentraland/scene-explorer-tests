import { CustomReactEcsRenderer } from '../../utils/ui'
import { test } from '../../testing'

import ReactEcs, { UiEntity, Label } from '@dcl/sdk/react-ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'
import { assertSnapshot } from '../../utils/snapshot-test'
import { getScreenCanvasInfo } from '../../utils/ui/ui-utils'

function TestElementText(): ReactEcs.JSX.Element {
  const screenSize = getScreenCanvasInfo()
  return (
    <UiEntity
      uiTransform={{
        width: screenSize.w,
        height: screenSize.h
      }}
      uiBackground={{
        color: Color4.Red()
      }}
    >
      <Label
        value="This is a label"
        color={Color4.White()}
        fontSize={80}
        font="serif"
        textAlign="middle-center"
      />
    </UiEntity>
  )
}

function TestElementTextBlue(): ReactEcs.JSX.Element {
  const screenSize = getScreenCanvasInfo()
  return (
    <UiEntity
      uiTransform={{
        width: screenSize.w,
        height: screenSize.h
      }}
      uiBackground={{
        color: Color4.Red()
      }}
    >
      <Label
        value="This is a label"
        color={Color4.Blue()}
        fontSize={80}
        font="serif"
        textAlign="middle-center"
      />
    </UiEntity>
  )
}

test('ui-text: should render the entire screen red with white label', async function (context) {
  CustomReactEcsRenderer.destroy()
  CustomReactEcsRenderer.setUiRenderer(TestElementText)
  await context.helpers.waitNTicks(10)
  await assertSnapshot(
    'screenshot/$explorer_snapshot_ui_text_1.png',
    Vector3.create(8, 1, 10),
    Vector3.create(8, 1, 8)
  )
})

test('ui-text: should render the entire screen red with blue label', async function (context) {
  CustomReactEcsRenderer.destroy()
  CustomReactEcsRenderer.setUiRenderer(TestElementTextBlue)
  await context.helpers.waitNTicks(10)
  await assertSnapshot(
    'screenshot/$explorer_snapshot_ui_text_2.png',
    Vector3.create(8, 1, 10),
    Vector3.create(8, 1, 8)
  )
})
