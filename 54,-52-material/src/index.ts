import { createBlackRoom } from './utils/black-room'

// This test should always be first
import './tests/transform/index.test'

import './tests/material/index.test'

export function main(): void {
  createBlackRoom()
}
