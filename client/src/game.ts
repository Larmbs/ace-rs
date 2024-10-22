import SpriteSheet from "./sprite_sheet.js";
import { UI, UIContainer } from "./ui.js";
import { Scene } from "./scene.js";
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
export default class Game {
  private gameElement: HTMLElement;
  private sceneElement: HTMLCanvasElement;
  private uiElement: HTMLDivElement;
  private scene: Scene | null;
  private ui: UIContainer | null;

  constructor(gameElement: HTMLElement) {
    this.gameElement = gameElement;

    this.sceneElement = new HTMLCanvasElement;
    this.sceneElement.id = "gameScene";
    this.uiElement = new HTMLDivElement;
    this.uiElement.id = "gameUI";

    this.gameElement.appendChild(this.sceneElement);
    this.gameElement.appendChild(this.uiElement);

    this.scene = null;
    this.ui = null;

    /* Custom Code For The Game Goes Below Here*/
    
    const spriteSheet = new SpriteSheet;
    spriteSheet.load(
      "assets/sprite_sheet1.png",
      "assets/sprite_sheet1.json"
    );
    console.log("Sprite sheet loaded successfully!");    this.scene = new Scene(this.sceneElement, new SpriteSheet);
    this.ui = new UIContainer(this.uiElement);
  }

  /**
   * Renders the game
   */
  render() {
    if (this.scene) {this.scene.render();}
    if (this.ui) {this.ui.render();}
  }
}
