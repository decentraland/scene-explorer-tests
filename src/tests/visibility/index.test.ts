import {
  EngineInfo,
  MeshRenderer,
  Transform,
  VisibilityComponent,
  engine
} from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import * as Testing from '~system/Testing'
import { assertEquals } from '../../testing/assert'
import { customAddEntity } from '../../utils/entity'
import type {
  TakeAndCompareSnapshotRequest,
  TakeAndCompareSnapshotResponse
} from '../../utils/snapshot-test'
import { waitTicks, waitTicksUntil } from '../../utils/waiters'
import { test } from './../../testing'
import { assertMovePlayerTo } from '../../utils/helpers'

test('visibility on: if exist a reference snapshot should match with it', function* (context) {
  yield* waitTicksUntil(() => {
    const tickNumber = EngineInfo.getOrNull(engine.RootEntity)?.tickNumber ?? 0
    if (tickNumber > 100) {
      return true
    } else {
      return false
    }
  })
  customAddEntity.clean()
  const cube = customAddEntity.addEntity()
  Transform.create(cube, {
    position: Vector3.create(8, 1, 8)
  })
  MeshRenderer.create(cube, {
    mesh: {
      $case: 'box',
      box: { uvs: [] }
    }
  })
  VisibilityComponent.create(cube, { visible: true })
  yield* assertMovePlayerTo(Vector3.create(8, 1, 2), Vector3.create(8, 1, 8))
  yield* waitTicks(15)

  const params: TakeAndCompareSnapshotRequest = {
    id: 'visibility true',
    cameraPosition: Vector3.create(2, 2, 2),
    cameraTarget: Vector3.create(8, 1, 8),
    snapshotFrameSize: Vector3.create(1024, 1024),
    tolerance: 0.8
  }

  const result: TakeAndCompareSnapshotResponse = (
    Testing as any
  ).takeAndCompareSnapshot(params)

  if (!result.wasExist) {
    Error(
      'This is the first time the tool is run. The test took the reference snapshots for future testing.'
    )
  }

  assertEquals(result.isMatch, true, `snapshot doesn't match with reference`)
})

test('visibility off: if exist a reference snapshot should match with it', function* (context) {
  customAddEntity.clean()
  const cube = customAddEntity.addEntity()
  Transform.create(cube, {
    position: Vector3.create(8, 1, 8)
  })
  MeshRenderer.create(cube, {
    mesh: {
      $case: 'box',
      box: { uvs: [] }
    }
  })
  VisibilityComponent.create(cube, { visible: false })

  const params: TakeAndCompareSnapshotRequest = {
    id: 'visibility-false',
    cameraPosition: Vector3.create(1, 1, 1),
    cameraTarget: Vector3.create(8, 1, 8),
    snapshotFrameSize: Vector3.create(1024, 1024),
    tolerance: 0.8
  }

  const result: TakeAndCompareSnapshotResponse = (
    Testing as any
  ).takeAndCompareSnapshot(params)
  if (!result.wasExist) {
    Error(
      'This is the first time the tool is run. The test took the reference snapshots for future testing.'
    )
  }

  assertEquals(result.isMatch, true, `snapshot doesn't match with reference`)
})