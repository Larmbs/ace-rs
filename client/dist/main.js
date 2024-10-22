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
import Game from "./game.js";
import { Object } from "./game.js";
// Main test function
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const spriteSheet = new SpriteSheet();
        yield spriteSheet.load("assets/sprite_sheet1.png", "assets/sprite_sheet1.json");
        console.log("Sprite sheet loaded successfully!");
        const game = new Game(document.getElementById("gameCanvas"), spriteSheet);
        game.scaleView([1, 1]);
        game.addObject(new Object("ONE", [50, 50]));
        game.addObject(new Object("TWO", [10, 15], [45, 70]));
        game.draw();
    });
}
// Run the main test
main().catch(console.error);
