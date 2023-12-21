import { CustomReactEcsRenderer } from 'testing-library/src/utils/ui'
import { test } from 'testing-library/src/testing'

import ReactEcs, { UiEntity } from '@dcl/sdk/react-ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'
import { assertSnapshot } from 'testing-library/src/utils/snapshot-test'
import { getScreenCanvasInfo } from 'testing-library/src/utils/ui/ui-utils'

function TestElementGreen(): ReactEcs.JSX.Element {
  const screenSize = getScreenCanvasInfo()
  return (
    <UiEntity
      uiTransform={{
        width: screenSize.w,
        height: screenSize.h
      }}
      uiBackground={{
        color: Color4.Green()
      }}
    ></UiEntity>
  )
}

function TestElementRed(): ReactEcs.JSX.Element {
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
    ></UiEntity>
  )
}

function TestElementRocks(): ReactEcs.JSX.Element {
  const screenSize = getScreenCanvasInfo()
  return (
    <UiEntity
      uiTransform={{
        width: screenSize.w,
        height: screenSize.h
      }}
      uiBackground={{
        textureMode: 'stretch',
        texture: {
          src: 'src/assets/images/rock-wall-texture.png',
          wrapMode: 'repeat'
        }
      }}
    ></UiEntity>
  )
}

test('ui-brackground: should render the entire screen green', async function (context) {
  CustomReactEcsRenderer.destroy()
  CustomReactEcsRenderer.setUiRenderer(TestElementGreen)
  await context.helpers.waitNTicks(10)
  await assertSnapshot(
    'screenshot/$explorer_snapshot_ui_background_all_screen_green.png',
    Vector3.create(8, 1, 10),
    Vector3.create(8, 1, 8)
  )
})

test('ui-brackground: should render the entire screen red', async function (context) {
  CustomReactEcsRenderer.destroy()
  CustomReactEcsRenderer.setUiRenderer(TestElementRed)
  await context.helpers.waitNTicks(10)
  await assertSnapshot(
    'screenshot/$explorer_snapshot_ui_background_all_screen_red.png',
    Vector3.create(8, 1, 10),
    Vector3.create(8, 1, 8)
  )
})

test('ui-brackground: should render the entire screen rocks', async function (context) {
  CustomReactEcsRenderer.destroy()
  CustomReactEcsRenderer.setUiRenderer(TestElementRocks)
  await context.helpers.waitNTicks(10)
  await assertSnapshot(
    'screenshot/$explorer_snapshot_ui_background_all_screen_rocks.png',
    Vector3.create(8, 1, 10),
    Vector3.create(8, 1, 8)
  )
})
