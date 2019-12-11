import * as Phaser from "phaser";
import { getFontSettings } from "./utils";

export class ScoreScene extends Phaser.Scene {
  public score: number;
  public result: Phaser.GameObjects.Text;
  public hint: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: "ScoreScene",
    });
  }

  public init(params: any): void {
    this.score = params.starsCaught;
  }

  public create(): void {
    const resultText: string = "Your score is " + this.score + "!";
    this.result = this.add.text(this.game.canvas.width / 2, 250, resultText, getFontSettings(48));
    this.result.setOrigin(0.5);

    const hintText: string = "Click to restart";
    this.hint = this.add.text(this.game.canvas.width / 2, 350, hintText, getFontSettings(48));
    this.hint.setOrigin(0.5);

    this.input.on("pointerdown", function(/*pointer*/) {
      this.scene.start("WelcomeScene");
    }, this);
  }
}
