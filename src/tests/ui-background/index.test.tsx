import { CustomReactEcsRenderer } from '../../utils/ui'
import { test } from '../../testing'

import ReactEcs, { UiEntity, Button } from '@dcl/sdk/react-ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'
import { assertSnapshot } from '../../utils/snapshot-test'
import { UiCanvasInformation, engine } from '@dcl/sdk/ecs'

function getScreenCanvasInfo() {
  return {
    w: 1024,
    h: 1024
  }
  return {
    w: UiCanvasInformation.getOrNull(engine.RootEntity)?.width || 24,
    h: UiCanvasInformation.getOrNull(engine.RootEntity)?.height || 24
  }
}

function TestElementGreen() {
  const screenSize = getScreenCanvasInfo()
  // console.log("asd")
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

function TestElementRed() {
  const screenSize = getScreenCanvasInfo()
  // console.log("asd")
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

function TestElementRocks() {
  const screenSize = getScreenCanvasInfo()
  // console.log("asd")
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
