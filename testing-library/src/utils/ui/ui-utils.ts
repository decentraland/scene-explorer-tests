export function getScreenCanvasInfo(): { w: number; h: number } {
  return {
    w: 512,
    h: 512
  }
  // TODO: Need this information from explorer
  // return {
  //   w: UiCanvasInformation.getOrNull(engine.RootEntity)?.width || 24,
  //   h: UiCanvasInformation.getOrNull(engine.RootEntity)?.height || 24
  // }
}
