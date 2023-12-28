// import { createBlackRoom } from 'testing-library/src/utils/black-room'
// import './tests/text-shape/index.test'
import {Font, Material, MeshRenderer, TextAlignMode, TextShape, Transform, engine} from '@dcl/sdk/ecs'
import { Vector3 , Color4, Color3} from '@dcl/ecs-math'

export function main(): void {
  // createBlackRoom()
  const width = 4
  const height = 4
  const textPosition = Vector3.create(8, .5 + height / 2, 8)

  const backgroundPlane = engine.addEntity()
  Transform.create(backgroundPlane, {
    position:  Vector3.add(textPosition, Vector3.create(0, 0, .01)),
    scale: Vector3.create(width, height, .005)
  })
  MeshRenderer.setBox(backgroundPlane)


  const centerPoint = engine.addEntity()
  Transform.create(centerPoint, {
    position: textPosition,
    scale: Vector3.create(.05, .05, .05)
  })
  MeshRenderer.setBox(centerPoint)
  Material.setBasicMaterial(centerPoint, { diffuseColor: Color4.Red() })



  const textEntity = engine.addEntity()
  Transform.create(textEntity, {
    position: textPosition
  })
  TextShape.createOrReplace(textEntity, { 
    text: 'Some test text with some \nlong text to test the text wrapping',
    /** the font (default F_SANS_SERIF) */
    font: Font.F_SANS_SERIF, 

    /** the font size (default 10) */
    fontSize: 6,

    // /** text color (default [1.0, 1.0, 1.0]) */
    textColor: Color4.create(1, 1, 1, 1),
    
    // /** X and Y alignment (default TAM_CENTER_CENTER) */
    textAlign: TextAlignMode.TAM_TOP_CENTER,
    // /** available horizontal space (default 1) */
    width,
    // /** available vertical space (default 1) */
    height,
    // /** distance from text to top border (default 0) */
    paddingTop: 0,
    // /** distance from text to right border (default 0) */
    paddingRight: 0,
    // /** distance from text to bottom border (default 0) */
    paddingBottom: 0,
    // /** distance from text to left border (default 0) */
    paddingLeft: 0,
    // /** extra distance between lines (default 0) */
    lineSpacing: .4,
    // /** maximum number of lines to display */
    lineCount: 0,
    // /** wrap text when the border is reached (default false) */
    textWrapping: true,
    // /** blurriness of the drop shadow (default 0) */
    shadowBlur: 0,
    /** horizontal length of the shadow (default 0) */
    shadowOffsetX: 0,
    /** vertical length of the shadow (default 0) */
    shadowOffsetY: 0,
    /** width of the stroke outlining each letter (default 0) */
    outlineWidth: 0,

    // outlineWidth should be != 0
    // /** outline stroke color (default [1.0, 1.0, 1.0]) */
    outlineColor: Color3.Blue(),

    // properties not working

    

    // when changing the value, the text changes size, but fixed and not according to width/height
    /** override `font_size` to automatically fit in `width`/`height` */
    // fontAutoSize: true,

    // nothing when change the value
    // /** drop shadow color (default [1.0, 1.0, 1.0]) */
    shadowColor: Color3.Green(), 

  })
}
