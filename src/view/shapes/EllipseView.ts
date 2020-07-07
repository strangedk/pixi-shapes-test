import * as PIXI from 'pixi.js'
import ShapeView from "./ShapeView";
import ShapeEnum from "../../enum/ShapeEnum";

class EllipseView extends ShapeView {
    private size: PIXI.Point;

    constructor(type: ShapeEnum) {
        super(type);
        this.setup();
        this.draw();
    }

    protected setup(): void {
        const x = Math.floor(Math.random() * 50);
        const y = Math.floor(Math.random() * 50);
        this.size = new PIXI.Point(x, y);
    }

    public draw(): void {
        super.draw();

        const { x, y } = this.size;
        this.lineStyle(this.lineWeight, this.strokeColor)
            .beginFill(this.fillColor)
            .drawEllipse(0, 0, x, y)
            .endFill();
    }
}

export default EllipseView;