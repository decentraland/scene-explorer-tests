import {
  AvatarAnchorPointType,
  AvatarAttach,
  EngineInfo,
  MeshRenderer,
  engine
} from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { customAddEntity } from '../../utils/entity'
import { assertSnapshot } from '../../utils/snapshot-test'
import { test } from './../../testing'
import { assertMovePlayerTo } from '../../utils/helpers'

test('avatar-attach: attach an entity on left hand', async function (context) {
  await context.helpers.waitTicksUntil(() => {
    const tickNumber = EngineInfo.getOrNull(engine.RootEntity)?.tickNumber ?? 0
    if (tickNumber > 100) {
      return true
    } else {
      return false
    }
  })
  customAddEntity.clean()
  const attachedEntity = customAddEntity.addEntity()
  AvatarAttach.create(attachedEntity, {
    anchorPointId: AvatarAnchorPointType.AAPT_LEFT_HAND
  })
  MeshRenderer.create(attachedEntity, {
    mesh: {
      $case: 'sphere',
      sphere: { uvs: [] }
    }
  })

  await assertMovePlayerTo(
    context,
    Vector3.create(8, 0, 8),
    Vector3.create(8, 1, 16)
  )

  await context.helpers.waitNTicks(50)

  await assertSnapshot(
    'screenshot/$explorer_snapshot_avatar_attach_1.png',
    Vector3.create(8, 1, 14),
    Vector3.create(8, 1, 8)
  )
})

test('avatar-attach: attach an entity on right hand', async function (context) {
  customAddEntity.clean()
  const attachedEntity = customAddEntity.addEntity()
  AvatarAttach.create(attachedEntity, {
    anchorPointId: AvatarAnchorPointType.AAPT_RIGHT_HAND
  })
  MeshRenderer.create(attachedEntity, {
    mesh: {
      $case: 'sphere',
      sphere: { uvs: [] }
    }
  })

  await assertMovePlayerTo(
    context,
    Vector3.create(8, 0, 8),
    Vector3.create(8, 1, 16)
  )

  await context.helpers.waitNTicks(50)

  await assertSnapshot(
    'screenshot/$explorer_snapshot_avatar_attach_2.png',
    Vector3.create(8, 1, 14),
    Vector3.create(8, 1, 8)
  )
})

test('avatar-attach: attach an entity on tag name', async function (context) {
  customAddEntity.clean()
  const attachedEntity = customAddEntity.addEntity()
  AvatarAttach.create(attachedEntity, {
    anchorPointId: AvatarAnchorPointType.AAPT_NAME_TAG
  })
  MeshRenderer.create(attachedEntity, {
    mesh: {
      $case: 'sphere',
      sphere: { uvs: [] }
    }
  })

  await assertMovePlayerTo(
    context,
    Vector3.create(8, 0, 8),
    Vector3.create(8, 1, 16)
  )

  await context.helpers.waitNTicks(50)

  await assertSnapshot(
    'screenshot/$explorer_snapshot_avatar_attach_3.png',
    Vector3.create(8, 1, 14),
    Vector3.create(8, 1, 8)
  )
})

test('avatar-attach: attach an entity on tag name', async function (context) {
  customAddEntity.clean()
  const attachedEntity = customAddEntity.addEntity()
  AvatarAttach.create(attachedEntity, {
    anchorPointId: AvatarAnchorPointType.AAPT_POSITION
  })
  MeshRenderer.create(attachedEntity, {
    mesh: {
      $case: 'sphere',
      sphere: { uvs: [] }
    }
  })

  await assertMovePlayerTo(
    context,
    Vector3.create(8, 0, 8),
    Vector3.create(8, 1, 16)
  )

  await context.helpers.waitNTicks(50)

  await assertSnapshot(
    'screenshot/$explorer_snapshot_avatar_attach_4.png',
    Vector3.create(8, 1, 14),
    Vector3.create(8, 1, 8)
  )
})
