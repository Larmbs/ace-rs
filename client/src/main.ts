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

  const game = new Game(document.getElementById("game") as HTMLCanvasElement);
  game.render();
}

// Run the main test
main().catch(console.error);
