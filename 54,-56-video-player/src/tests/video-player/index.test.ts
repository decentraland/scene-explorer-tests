import {
  engine,
  Material,
  MeshRenderer,
  Transform,
  VideoPlayer,
  videoEventsSystem
} from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'

import { assertSnapshot } from 'testing-library/src/utils/snapshot-test'
import { test } from 'testing-library/src/testing'
import { assertEquals } from 'testing-library/src/testing/assert'
import { customAddEntity } from 'testing-library/src/utils/entity'

test('video-player: if exist a reference snapshot should match with it', async function (context) {
  customAddEntity.clean()
  const screenEntity = customAddEntity.addEntity()
  MeshRenderer.createOrReplace(screenEntity, {
    mesh: { $case: 'plane', plane: { uvs: [] } }
  })
  Transform.create(screenEntity, {
    position: Vector3.create(8, 8, 15),
    scale: Vector3.create(16, 16, 1)
  })
  VideoPlayer.create(screenEntity, {
    src: 'src/assets/videos/dae-video-1.mp4',
    playing: true,
    volume: 0.2,
    loop: true,
    position: 0
  })

  const videoTexture = Material.Texture.Video({ videoPlayerEntity: screenEntity })

  Material.setPbrMaterial(screenEntity, {
    texture: videoTexture,
    roughness: 1.0,
    specularIntensity: 0,
    metallic: 0
  })

  let timer: number = 0.5
  let snapshotId: number = 0
  let testFinished: boolean = false
  let successed: number = 0

  await context.helpers.waitNTicks(1)

  const snapshotsQuantity: number = 4

  function compareOrTakeSnapshot(): void {
    snapshotId += 1
    assertSnapshot(
      `screenshot/$explorer_snapshot_video_player_${snapshotId}.png`,
      Vector3.create(8, 8, 8),
      Vector3.create(8, 8, 16)
    ).then(() => {
      successed++
    }).catch(console.error)
  }

  let lastTimestampState = -1
  function snapshotSystem(dt: number): void {
    const videoState = videoEventsSystem.getVideoState(screenEntity)
    if (videoState?.timestamp === undefined) return
    if (videoState?.timestamp === lastTimestampState) {
      return
    }

    lastTimestampState = videoState?.timestamp
    console.log ({state: videoEventsSystem.getVideoState(screenEntity)})

    timer -= dt
    if (timer <= 0) {
      timer = 1
      compareOrTakeSnapshot()
      console.log(successed)
    }
    if (snapshotsQuantity === snapshotId) {
      testFinished = true
    }

  }

  engine.addSystem(snapshotSystem)

  await context.helpers.waitTicksUntil(() => {
    if (testFinished) {
      return true
    } else {
      return false
    }
  })

  engine.removeSystem(snapshotSystem)

  customAddEntity.clean()
  assertEquals(successed, snapshotsQuantity)
})
