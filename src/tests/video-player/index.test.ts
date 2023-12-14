import {
  engine,
  Material,
  MeshRenderer,
  Transform,
  VideoPlayer
} from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'

import { assertSnapshot } from '../../utils/snapshot-test'
import { test } from './../../testing'
import { assertEquals } from './../../testing/assert'
import { customAddEntity } from './../../utils/entity'

test('video-player: if exist a reference snapshot should match with it', async function (context) {
  customAddEntity.clean()
  const screen = customAddEntity.addEntity()
  MeshRenderer.createOrReplace(screen, {
    mesh: { $case: 'plane', plane: { uvs: [] } }
  })
  Transform.create(screen, {
    position: Vector3.create(8, 8, 15),
    scale: Vector3.create(16, 16, 1)
  })
  VideoPlayer.create(screen, {
    src: 'src/assets/videos/dae-video-1.mp4',
    playing: true,
    volume: 0.2,
    loop: true,
    position: 0
  })

  const videoTexture = Material.Texture.Video({ videoPlayerEntity: screen })

  Material.setPbrMaterial(screen, {
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

  async function compareOrTakeSnapshot(): Promise<void> {
    snapshotId += 1
    await assertSnapshot(
      `screenshot/$explorer_snapshot_video_player_${snapshotId}.png`,
      Vector3.create(8, 8, 8),
      Vector3.create(8, 8, 16)
    )
      .then(() => successed++)
      .catch((error) => {
        console.error('The snapshot promise fail!', error)
      })
  }

  async function snapshotSystem(dt: number): Promise<void> {
    timer -= dt
    if (timer <= 0) {
      timer = 1
      await compareOrTakeSnapshot()
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
