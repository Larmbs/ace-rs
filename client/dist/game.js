var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import SpriteSheet from "./sprite_sheet.js";
import { UIContainer } from "./ui.js";
import { Scene, Object } from "./scene.js";
export default class Game {
    constructor(gameElement) {
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
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            /* Custom Code For The Game Goes Below Here*/
            const spriteSheet = new SpriteSheet;
            yield spriteSheet.load("assets/sprite_sheet1.png", "assets/sprite_sheet1.json");
            console.log("Sprite sheet loaded successfully!");
            this.scene = new Scene(this.sceneElement, spriteSheet);
            this.ui = new UIContainer(this.uiElement);
            this.scene.addObject(new Object("JET", [20, 20], [0, 0], 0.1));
        });
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
