/**
 * Represents a sprites area on a sprite sheet
 */
export interface SpriteArea {
  x: number;
  y: number;
  w: number;
  h: number;
}

/**
 * Class which allows for quick and easy drawing of textures
 */
export default class SpriteSheet {
  private image: HTMLImageElement = new Image();
  private sprites: Map<string, SpriteArea> = new Map();

  /**
   * Initializes a sprite sheet by loading and image and sprite mappings
   * @param url - Loads and image onto the sprite sheet
   * @param sprites - A mapping of names to sprite areas or path to that mapping
   * @returns
   */
  async load(url: string, sprites: Map<string, SpriteArea> | string) {
    const imagePromise = new Promise<void>((resolve, reject) => {
      this.image.src = url;

      this.image.onload = () => {
        resolve();
      };

      this.image.onerror = (error) => {
        reject(new Error("Error loading image: " + error));
      };
    });

    let spriteDataPromise: Promise<Map<string, SpriteArea>>;

    if (typeof sprites === "string") {
      spriteDataPromise = fetch(sprites)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => {
          const spriteMapping = new Map<string, SpriteArea>();
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              spriteMapping.set(key, data[key]);
            }
          }
          return spriteMapping;
        });
    } else {
      spriteDataPromise = Promise.resolve(sprites);
    }

    return Promise.all([imagePromise, spriteDataPromise]).then(
      ([imageLoaded, spriteMapping]) => {
        this.sprites = spriteMapping;
      }
    );
  }

  /**
   * Draws a sprite
   * @param ctx - Canvas drawing context
   * @param sprite_name - Name of sprite on sprite sheet
   * @param position - Placement position of sprite
   * @param scale - Stretch of sprite
   * @param rotation - Rotation of sprite from its center
   * @param border - Draws an outline around sprite if true
   * @returns
   */
  render(
    ctx: CanvasRenderingContext2D,
    sprite_name: string,
    position: [number, number],
    scale: [number, number] = [1, 1], // Default scale is 1 (no scaling)
    rotation: number = 0, // Default rotation is 0 (no rotation)
    border: boolean = false // Default border is false
  ) {
    const sprite = this.sprites.get(sprite_name);

    if (!sprite) {
      console.error("Sprite Does Not Exists");
      return;
    }

    // Save the current state of the canvas
    ctx.save();

    // Translate to the position where we want to draw the sprite
    ctx.translate(position[0], position[1]);

    // Apply rotation
    ctx.rotate(-rotation);

    ctx.scale(scale[0], scale[1]);

    // Draw the border before scaling
    if (border) {
      ctx.lineWidth = 1;
      // Set stroke style for the border
      ctx.strokeStyle = "blue"; // Change color as needed

      // Draw a rectangle around the sprite's position and size, using the original dimensions
      ctx.strokeRect(-sprite.w / 2, -sprite.h / 2, sprite.w, sprite.h);
    }

    // Draw the sprite itself
    ctx.drawImage(
      this.image,
      sprite.x,
      sprite.y,
      sprite.w,
      sprite.h, // Source rectangle (from the sprite sheet)
      -sprite.w / 2,
      -sprite.h / 2,
      sprite.w,
      sprite.h // Destination rectangle (centered at the origin)
    );

    // Restore the canvas state
    ctx.restore();
  }
}
