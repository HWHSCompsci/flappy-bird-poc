import * as Phaser from "phaser";
import { getFontSettings } from "./utils";

export class GameScene extends Phaser.Scene {
  public starDelta: number;
  public lastStarTime: number;
  public starsCaught: number;
  public starsFallen: number;
  public sand: Phaser.Physics.Arcade.StaticGroup;
  public info: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: "GameScene",
    });
  }

  public init(/*params: any*/): void {
    this.starDelta = 1000;
    this.lastStarTime = 0;
    this.starsCaught = 0;
    this.starsFallen = 0;
  }

  public preload(): void {
    this.load.image("star", "./assets/star.png");
    this.load.image("sand", "./assets/sand.jpg");
  }

  public create(): void {
    this.sand = this.physics.add.staticGroup({
      frameQuantity: 20,
      key: "sand",
    });
    Phaser.Actions.PlaceOnLine(this.sand.getChildren(),
      new Phaser.Geom.Line(20, 580, 820, 580));
    this.sand.refresh();

    this.info = this.add.text(10, 10, "", getFontSettings(24));
  }

  public update(time: number): void {
    const diff: number = time - this.lastStarTime;
    if (diff > this.starDelta) {
      this.lastStarTime = time;
      if (this.starDelta > 500) {
        this.starDelta -= 20;
      }
      this.emitStar();
    }
    this.info.text = `${this.starsCaught} caught - ${this.starsFallen} fallen (max 3)`;
  }

  private onClick(star: Phaser.Physics.Arcade.Image): () => void {
    return () => {
      star.setTint(0x00ff00);
      star.setVelocity(0, 0);
      this.starsCaught += 1;
      this.time.delayedCall(100, (s) => {
        s.destroy();
      }, [star], this);
    };
  }

  private onFall(star: Phaser.Physics.Arcade.Image): () => void {
    return () => {
      star.setTint(0xff0000);
      this.starsFallen += 1;
      this.time.delayedCall(100, (s) => {
        s.destroy();
        if (this.starsFallen > 2) {
          this.scene.start("ScoreScene", { starsCaught: this.starsCaught });
        }
      }, [star], this);
    };
  }

  private emitStar(): void {
    let star: Phaser.Physics.Arcade.Image;
    const x = Phaser.Math.Between(25, 775);
    const y = 26;
    star = this.physics.add.image(x, y, "star");

    star.setDisplaySize(50, 50);
    star.setVelocity(0, 200);
    star.setInteractive();

    star.on("pointerdown", this.onClick(star), this);
    this.physics.add.collider(star, this.sand, this.onFall(star), null, this);
  }
}
