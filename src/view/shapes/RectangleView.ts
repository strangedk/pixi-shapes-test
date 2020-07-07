import * as PIXI from 'pixi.js'
import ShapeEnum from "../../enum/ShapeEnum";
import ShapeView from "./ShapeView";

class RectangleView extends ShapeView {
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
            .drawRect(1, 1, x, y)
            .endFill();
    }
}

export default RectangleView;