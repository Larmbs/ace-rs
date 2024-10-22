export class Object {
    constructor(name, scale = [1, 1], position = [0, 0], rotation = 0) {
        this.name = name;
        this.scale = scale;
        this.position = position;
        this.rotation = rotation;
    }
}
export default class Game {
    constructor(canvas, sprite_sheet) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.context.imageSmoothingEnabled = false;
        this.sprite_sheet = sprite_sheet;
        this.objects = [];
        this.onResize();
        window.addEventListener("resize", this.onResize.bind(this));
    }
    /**
     * Method to be called when the window is resized
     */
    onResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        // Makes canvas (0, 0) at the middle of the window
        this.context.translate(this.canvas.width / 2, this.canvas.height / 2);
        // Must redraw after window resize
        this.draw();
    }
    /**
     * Scales the scene view
     */
    scaleView(scale = [1, 1]) {
        this.context.scale(scale[0], scale[1]);
    }
    /**
     * Adds an object to the scene
     * @param sprite - A new scene object
     */
    addObject(sprite) {
        this.objects.push(sprite);
    }
    /**
     * Draws the game on the screen
     * @param scale  - The scaling of the entire window
     * @param offset - Offsets the viewing area by some amount
     */
    draw(offset = [0, 0]) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.objects.length; i++) {
            let object = this.objects[i];
            this.sprite_sheet.draw(this.context, object.name, [object.position[0] + offset[0], object.position[1] + offset[1]], object.scale, object.rotation, false);
        }
    }
}
