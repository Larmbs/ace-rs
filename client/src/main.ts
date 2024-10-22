import SpriteSheet from "./sprite_sheet.js";
import Game from "./game.js";
import { Object } from "./game.js";

// Main test function
async function main() {
  const spriteSheet = new SpriteSheet();
  await spriteSheet.load(
    "assets/sprite_sheet1.png",
    "assets/sprite_sheet1.json"
  );
  console.log("Sprite sheet loaded successfully!");

  const game = new Game(
    document.getElementById("gameCanvas") as HTMLCanvasElement,
    spriteSheet
  );
  game.scaleView([1, 1]);
  game.addObject(new Object("ONE", [50, 50]));
  game.addObject(new Object("TWO", [10, 15], [45, 70]));
  game.draw();
}

// Run the main test
main().catch(console.error);
