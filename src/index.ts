import { createBlackRoom } from './utils/black-room'

// This test should always be first
import './tests/transform/index.test'

// TODO: it needs input simulation to test it
// import './tests/pointer-lock/index.test'

import './tests/raycast/index.test'
import './tests/camera-mode/index.test'
import './tests/billboard/index.test'
import './tests/engine-info/index.test'

// snapshot tests:
import './tests/mesh-renderer/index.test'
import './tests/material/index.test'
import './tests/visibility/index.test'
import './tests/gltf-container/index.test'
import './tests/video-player/index.test'
import './tests/text-shape/index.test'

export function main(): void {
  createBlackRoom()
}
