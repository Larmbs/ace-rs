import SpriteSheet from "./sprite_sheet.js";
import { UI, UIContainer } from "./ui.js";
import { Scene, Object } from "./scene.js";

export default class Game {
  private gameElement: HTMLElement;
  private sceneElement: HTMLCanvasElement;
  private uiElement: HTMLDivElement;
  private scene: Scene | null;
  private ui: UIContainer | null;

  constructor(gameElement: HTMLElement) {
    this.gameElement = gameElement;

    this.sceneElement = document.createElement("canvas");
    this.sceneElement.id = "gameScene";
    this.uiElement = document.createElement("div");
    this.uiElement.id = "gameUI";

    this.gameElement.appendChild(this.sceneElement);
    this.gameElement.appendChild(this.uiElement);

    this.scene = null;
    this.ui = null;
  }

  /**
   * Loading behavior of game
   */
  async load() {
    /* Custom Code For The Game Goes Below Here*/

    const spriteSheet = new SpriteSheet();
    await spriteSheet.load(
      "assets/sprite_sheet1.png",
      "assets/sprite_sheet1.json"
    );
    console.log("Sprite sheet loaded successfully!");
    this.scene = new Scene(this.sceneElement, spriteSheet);
    this.ui = new UIContainer(this.uiElement);

    this.scene.addObject(new Object("JET", [20, 20], [0, 0], 0.1));
  }

  /**
   * Renders the game
   */
  render() {
    if (this.scene) {
      this.scene.render();
    }
    if (this.ui) {
      this.ui.render();
    }
  }
}
