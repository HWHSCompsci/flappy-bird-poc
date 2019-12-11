import * as Phaser from "phaser";
import { GameScene } from "./gameScene";
import { ScoreScene } from "./scoreScene";
import { WelcomeScene } from "./welcomeScene";

const config: Phaser.Types.Core.GameConfig = {
  backgroundColor: "#4EC0CA",
  height: 900,
  parent: "game",
  physics: {
    arcade: {
      debug: false,
    },
    default: "arcade",
  },
  scene: [WelcomeScene, GameScene, ScoreScene],
  title: "FlappyBird",
  type: Phaser.AUTO,
  width: 1600,
};

export class FlappyBirdGame extends Phaser.Game {
  constructor(conf: Phaser.Types.Core.GameConfig) {
    super(conf);
  }
}

window.onload = () => {
  const game = new FlappyBirdGame(config);
};
