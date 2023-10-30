import { CameraMode, CameraModeArea, engine, Transform } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { test } from '@dcl/sdk/testing'
import { assertComponentValue } from '@dcl/sdk/testing/assert'
import { Test } from '../../src/components'

const entity = engine.addEntity()
Transform.create(entity, { position: Vector3.create(8, 0, 8) })
CameraModeArea.create(entity, { area: Vector3.create(16, 2, 16), mode: 0 })

test('CameraMode is FirstPerson?', function* (context) {
    assertComponentValue(engine.CameraEntity, CameraMode, {
        mode: 0
    })
})
test('CameraMode is ThirdPerson?', async () => {
    assertComponentValue(engine.CameraEntity, CameraMode, {
        mode: 1
    })
})



