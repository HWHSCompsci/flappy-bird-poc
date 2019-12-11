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
    this.result = this.add.text(200, 250, resultText, getFontSettings(48));

    const hintText: string = "Click to restart";
    this.hint = this.add.text(300, 350, hintText, getFontSettings(48));

    this.input.on("pointerdown", function(/*pointer*/) {
      this.scene.start("WelcomeScene");
    }, this);
  }
}
