import { CustomReactEcsRenderer } from '../../utils/ui'
import { test } from '../../testing'

import ReactEcs, { UiEntity, Button, Label } from '@dcl/sdk/react-ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'
import { assertSnapshot } from '../../utils/snapshot-test'
import { UiCanvasInformation, engine } from '@dcl/sdk/ecs'

function getScreenCanvasInfo() {
  return {
    w: 512,
    h: 512
  }
  return {
    w: UiCanvasInformation.getOrNull(engine.RootEntity)?.width || 24,
    h: UiCanvasInformation.getOrNull(engine.RootEntity)?.height || 24
  }
}

function TestElementText() {
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
      uiText={{
        value: 'White Text',
        color: Color4.White(),
        fontSize: 80,
        font: 'serif',
        textAlign: 'middle-center'
      }}
    ></UiEntity>
  )
}

function TestElementTextBlue() {
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
      uiText={{
        value: 'Blue Text',
        color: Color4.Blue(),
        fontSize: 80,
        font: 'serif',
        textAlign: 'middle-center'
      }}
    ></UiEntity>
  )
}

function TestElementTextWhiteSansSerif() {
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
      uiText={{
        value: 'Sans-Serif',
        color: Color4.White(),
        fontSize: 80,
        font: 'sans-serif',
        textAlign: 'middle-center'
      }}
    ></UiEntity>
  )
}

function TestElementTextWhiteMonospace() {
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
      uiText={{
        value: 'Monospace',
        color: Color4.White(),
        fontSize: 80,
        font: 'monospace',
        textAlign: 'middle-center'
      }}
    ></UiEntity>
  )
}

test('ui-text: should render the entire screen red with white text', async function (context) {
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

test('ui-text: should render the entire screen red with white text sans serif', async function (context) {
  CustomReactEcsRenderer.destroy()
  CustomReactEcsRenderer.setUiRenderer(TestElementTextWhiteSansSerif)
  await context.helpers.waitNTicks(10)
  await assertSnapshot(
    'screenshot/$explorer_snapshot_ui_text_3.png',
    Vector3.create(8, 1, 10),
    Vector3.create(8, 1, 8)
  )
})

test('ui-text: should render the entire screen red with white text monospace', async function (context) {
  CustomReactEcsRenderer.destroy()
  CustomReactEcsRenderer.setUiRenderer(TestElementTextWhiteMonospace)
  await context.helpers.waitNTicks(10)
  await assertSnapshot(
    'screenshot/$explorer_snapshot_ui_text_4.png',
    Vector3.create(8, 1, 10),
    Vector3.create(8, 1, 8)
  )
})
