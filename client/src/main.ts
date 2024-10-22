import Game from "./game.js";

// Main test function
async function main() {
  const game = new Game(document.getElementById("game") as HTMLCanvasElement);
  await game.load();
  game.render();
}

// Run the main test
main().catch(console.error);
