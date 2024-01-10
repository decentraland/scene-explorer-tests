import {
  Animator,
  GltfContainer,
  GltfContainerLoadingState,
  LoadingState,
  Transform
} from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { test } from 'testing-library/src/testing'
import { assert } from 'testing-library/src/testing/assert'
import { customAddEntity } from 'testing-library/src/utils/entity'
import { createDelayFunction } from 'testing-library/src/utils/helpers'
import { assertSnapshot } from 'testing-library/src/utils/snapshot-test'

const delay = createDelayFunction()

const animations = [
  '01_Run_Armature_0',
  '02_walk_Armature_0',
  '03_creep_Armature_0',
  '04_Idle_Armature_0',
  '05_site_Armature_0'
]

test('animator: set animations[0] and play it', async function (context) {
  customAddEntity.clean()
  const wolf = customAddEntity.addEntity()
  Transform.create(wolf, {
    position: Vector3.create(8, 0.25, 8),
    scale: Vector3.create(3, 3, 3)
  })
  GltfContainer.create(wolf, {
    src: 'src/assets/models/wolf.glb'
  })

  assert(
    await context.helpers.waitTicksUntil(() => {
      return (
        GltfContainerLoadingState.getOrNull(wolf) !== null &&
        GltfContainerLoadingState.get(wolf).currentState !==
          LoadingState.LOADING
      )
    }, 10000),
    'timeout waiting loading wolf'
  )

  assert(
    GltfContainerLoadingState.get(wolf).currentState === LoadingState.FINISHED
  )
  Animator.create(wolf, {
    states: [
      {
        clip: animations[0],
        loop: true,
        playing: true,
        speed: 0.00001
      }
    ]
  })
  // TODO: sometimes in godot the gltf is not added immediately it's loaded
  await context.helpers.waitNTicks(1)

  Animator.getMutable(wolf).states[0].clip = animations[0]
  await delay(1200)

  await assertSnapshot(
    'screenshot/$explorer_snapshot_animator_1.png',
    Vector3.create(6, 1, 8),
    Vector3.create(8, 1, 8)
  )
})

test('animator: set animations[1] and play it', async function (context) {
  customAddEntity.clean()
  const wolf = customAddEntity.addEntity()
  Transform.create(wolf, {
    position: Vector3.create(8, 0.25, 8),
    scale: Vector3.create(3, 3, 3)
  })
  GltfContainer.create(wolf, {
    src: 'src/assets/models/wolf.glb'
  })

  assert(
    await context.helpers.waitTicksUntil(() => {
      return (
        GltfContainerLoadingState.getOrNull(wolf) !== null &&
        GltfContainerLoadingState.get(wolf).currentState !==
          LoadingState.LOADING
      )
    }, 10000),
    'timeout waiting loading wolf'
  )

  assert(
    GltfContainerLoadingState.get(wolf).currentState === LoadingState.FINISHED
  )
  Animator.create(wolf, {
    states: [
      {
        clip: animations[0],
        loop: true,
        playing: true,
        speed: 0.00001
      }
    ]
  })
  // TODO: sometimes in godot the gltf is not added immediately it's loaded
  await context.helpers.waitNTicks(1)

  Animator.getMutable(wolf).states[0].clip = animations[1]
  await delay(1200)

  await assertSnapshot(
    'screenshot/$explorer_snapshot_animator_2.png',
    Vector3.create(6, 1, 8),
    Vector3.create(8, 1, 8)
  )
})

test('animator: set animations[2] and play it', async function (context) {
  customAddEntity.clean()
  const wolf = customAddEntity.addEntity()
  Transform.create(wolf, {
    position: Vector3.create(8, 0.25, 8),
    scale: Vector3.create(3, 3, 3)
  })
  GltfContainer.create(wolf, {
    src: 'src/assets/models/wolf.glb'
  })

  assert(
    await context.helpers.waitTicksUntil(() => {
      return (
        GltfContainerLoadingState.getOrNull(wolf) !== null &&
        GltfContainerLoadingState.get(wolf).currentState !==
          LoadingState.LOADING
      )
    }, 10000),
    'timeout waiting loading wolf'
  )

  assert(
    GltfContainerLoadingState.get(wolf).currentState === LoadingState.FINISHED
  )
  Animator.create(wolf, {
    states: [
      {
        clip: animations[0],
        loop: true,
        playing: true,
        speed: 0.00001
      }
    ]
  })
  // TODO: sometimes in godot the gltf is not added immediately it's loaded
  await context.helpers.waitNTicks(1)

  Animator.getMutable(wolf).states[0].clip = animations[2]
  await delay(1200)

  await assertSnapshot(
    'screenshot/$explorer_snapshot_animator_3.png',
    Vector3.create(6, 1, 8),
    Vector3.create(8, 1, 8)
  )
})

test('animator: set animations[3] and play it', async function (context) {
  customAddEntity.clean()
  const wolf = customAddEntity.addEntity()
  Transform.create(wolf, {
    position: Vector3.create(8, 0.25, 8),
    scale: Vector3.create(3, 3, 3)
  })
  GltfContainer.create(wolf, {
    src: 'src/assets/models/wolf.glb'
  })

  assert(
    await context.helpers.waitTicksUntil(() => {
      return (
        GltfContainerLoadingState.getOrNull(wolf) !== null &&
        GltfContainerLoadingState.get(wolf).currentState !==
          LoadingState.LOADING
      )
    }, 10000),
    'timeout waiting loading wolf'
  )

  assert(
    GltfContainerLoadingState.get(wolf).currentState === LoadingState.FINISHED
  )
  Animator.create(wolf, {
    states: [
      {
        clip: animations[0],
        loop: true,
        playing: true,
        speed: 0.00001
      }
    ]
  })
  // TODO: sometimes in godot the gltf is not added immediately it's loaded
  await context.helpers.waitNTicks(1)

  Animator.getMutable(wolf).states[0].clip = animations[3]
  await delay(1200)

  await assertSnapshot(
    'screenshot/$explorer_snapshot_animator_4.png',
    Vector3.create(6, 1, 8),
    Vector3.create(8, 1, 8)
  )
})

test('animator: set animations[4] and play it', async function (context) {
  customAddEntity.clean()
  const wolf = customAddEntity.addEntity()
  Transform.create(wolf, {
    position: Vector3.create(8, 0.25, 8),
    scale: Vector3.create(3, 3, 3)
  })
  GltfContainer.create(wolf, {
    src: 'src/assets/models/wolf.glb'
  })

  assert(
    await context.helpers.waitTicksUntil(() => {
      return (
        GltfContainerLoadingState.getOrNull(wolf) !== null &&
        GltfContainerLoadingState.get(wolf).currentState !==
          LoadingState.LOADING
      )
    }, 10000),
    'timeout waiting loading wolf'
  )

  assert(
    GltfContainerLoadingState.get(wolf).currentState === LoadingState.FINISHED
  )
  Animator.create(wolf, {
    states: [
      {
        clip: animations[0],
        loop: true,
        playing: true,
        speed: 0.00001
      }
    ]
  })
  // TODO: sometimes in godot the gltf is not added immediately it's loaded
  await context.helpers.waitNTicks(1)

  Animator.getMutable(wolf).states[0].clip = animations[4]
  await delay(1200)

  await assertSnapshot(
    'screenshot/$explorer_snapshot_animator_5.png',
    Vector3.create(6, 1, 8),
    Vector3.create(8, 1, 8)
  )
})
