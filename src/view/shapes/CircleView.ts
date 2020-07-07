import ShapeView from "./ShapeView";
import ShapeEnum from "../../enum/ShapeEnum";

class CircleView extends ShapeView {
    private radius: number;

    constructor(type: ShapeEnum) {
        super(type);
        this.setup();
        this.draw();
    }

    protected setup(): void {
        this.radius = Math.floor(Math.random() * 50);
    }

    public draw(): void {
        super.draw();

        this.lineStyle(this.lineWeight, this.strokeColor)
            .beginFill(this.fillColor)
            .drawCircle(0, 0, this.radius)
            .endFill();
    }
}

export default CircleView;