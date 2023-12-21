import { createBlackRoom } from './utils/black-room'

// This test should always be first
import './tests/transform/index.test'

import './tests/ui-dropdown/index.test'

export function main(): void {
  createBlackRoom()
}
