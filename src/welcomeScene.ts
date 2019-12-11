import * as Phaser from "phaser";
import { getFontSettings } from "./utils";

export class WelcomeScene extends Phaser.Scene {
  public title: Phaser.GameObjects.Text;
  public hint: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: "WelcomeScene",
    });
  }

  public create(): void {
    const titleText: string = "Flappy Bird";
    this.title = this.add.text(this.game.canvas.width / 2, 200, titleText, getFontSettings(64));
    this.title.setOrigin(0.5);
    const hintText: string = "Click to start";
    this.hint = this.add.text(this.game.canvas.width / 2, 350, hintText, getFontSettings(24));
    this.hint.setOrigin(0.5);

    this.input.on("pointerdown", (pointer) => {
      this.scene.start("GameScene");
    }, this);
  }
}
