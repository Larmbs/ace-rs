import SpriteSheet from "./sprite_sheet";

/**
 * Object that cannot move but is affected by scene offsets
 */
export class Object {
  name: string;
  scale: [number, number];
  position: [number, number];
  rotation: number;

  constructor(
    name: string,
    scale: [number, number] = [1, 1],
    position: [number, number] = [0, 0],
    rotation: number = 0
  ) {
    this.name = name;
    this.scale = scale;
    this.position = position;
    this.rotation = rotation;
  }
}

/**
 * Object with physic properties that follows scene offset
 */
export class ActiveObject {
  name: string;
  scale: [number, number];
  position: [number, number];
  rotation: number;
  constructor(
    name: string,
    scale: [number, number] = [1, 1],
    position: [number, number] = [0, 0],
    rotation: number = 0
  ) {
    this.name = name;
    this.scale = scale;
    this.position = position;
    this.rotation = rotation;
  }

  /**
   * Object gets updated
   * @param dt
   */
  update(dt: number) {}
}

/**
 * Object that is static and is not affected by scene offsets
 */
export class StaticObject {
  name: string;
  scale: [number, number];
  position: [number, number];
  rotation: number;
  constructor(
    name: string,
    scale: [number, number] = [1, 1],
    position: [number, number] = [0, 0],
    rotation: number = 0
  ) {
    this.name = name;
    this.scale = scale;
    this.position = position;
    this.rotation = rotation;
  }
}

export class Scene {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private sprite_sheet: SpriteSheet;
  private objects: (StaticObject | Object | ActiveObject)[];

  constructor(canvas: HTMLCanvasElement, sprite_sheet: SpriteSheet) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d")!;

    this.context.imageSmoothingEnabled = false;

    this.sprite_sheet = sprite_sheet;
    this.objects = [];

    this.onResize();
    window.addEventListener("resize", this.onResize.bind(this));
  }

  /**
   * Adds an object to the game scene
   * @param object
   */
  addObject(object: Object) {
    this.objects.push(object);
  }

  /**
   * Method to be called when the window is resized
   */
  onResize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // Makes canvas (0, 0) at the middle of the window
    this.context.translate(this.canvas.width / 2, this.canvas.height / 2);
    this.context.imageSmoothingEnabled = false;

    // Must redraw after window resize
    this.render();
  }

  /**
   * Scales the scene view
   */
  scaleView(scale: [number, number] = [1, 1]) {
    this.context.scale(scale[0], scale[1]);
  }

  /**
   * Update
   */
  update(dt: number) {
    for (let i = 0; i < this.objects.length; i++) {
      let object = this.objects[i];
      if (object instanceof ActiveObject) {
        object.update(dt);
      }
    }
  }

  /**
   * Renders the objects onto the screen
   * @param offset - Offsets the viewing area by some amount
   */
  render(offset: [number, number] = [0, 0]) {
    // Clear screen
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw objects
    for (let i = 0; i < this.objects.length; i++) {
      let object = this.objects[i];

      if (object instanceof StaticObject) {
        this.sprite_sheet.render(
          this.context,
          object.name,
          [object.position[0] + offset[0], object.position[1] + offset[1]],
          object.scale,
          object.rotation,
          false
        );
      } else if (object instanceof Object || ActiveObject) {
        this.sprite_sheet.render(
          this.context,
          object.name,
          [object.position[0] + offset[0], object.position[1] + offset[1]],
          object.scale,
          object.rotation,
          false
        );
      }
    }
  }
}
