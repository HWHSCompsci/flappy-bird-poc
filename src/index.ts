import * as Phaser from "phaser";
import { GameScene } from "./gameScene";
import { ScoreScene } from "./scoreScene";
import { WelcomeScene } from "./welcomeScene";

const config: Phaser.Types.Core.GameConfig = {
  backgroundColor: "#4EC0CA",
  height: 600,
  parent: "game",
  physics: {
    arcade: {
      debug: false,
    },
    default: "arcade",
  },
  scene: [WelcomeScene, GameScene, ScoreScene],
  title: "Starfall",
  width: 800,
};

export class StarfallGame extends Phaser.Game {
  constructor(conf: Phaser.Types.Core.GameConfig) {
    super(conf);
  }
}

window.onload = () => {
  const game = new StarfallGame(config);
};
