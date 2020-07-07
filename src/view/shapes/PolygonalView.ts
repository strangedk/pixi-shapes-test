import * as PIXI from 'pixi.js'
import ShapeView from "./ShapeView";
import ShapeEnum from "../../enum/ShapeEnum";

class PolygonalView extends ShapeView {
    private polygon: PIXI.Polygon;

    constructor(type: ShapeEnum) {
        super(type);
        this.setup();
        this.draw();
    }

    protected setup(): void {        
        switch (this.type) {
            case ShapeEnum.Polygonal_3:
                this.polygon = this.setup_poly_3();
            case ShapeEnum.Polygonal_4:
                this.polygon = this.setup_poly_4();
            case ShapeEnum.Polygonal_5:
                this.polygon = this.setup_poly_5();
            case ShapeEnum.Polygonal_6:
                this.polygon = this.setup_poly_6();
        }
    }

    private setup_poly_3(): PIXI.Polygon {
        const x1 = -20 + Math.floor(Math.random() * 20);
        const y1 = -20 + Math.floor(Math.random() * 20);
        const x2 = 30 + Math.floor(Math.random() * 20);
        const y2 = -10 + Math.floor(Math.random() * 20);
        const x3 = Math.floor(Math.random() * 20);
        const y3 = Math.floor(Math.random() * 20);
        return new PIXI.Polygon([x1, y1, x2, y2, x3, y3]);
    }

    private setup_poly_4(): PIXI.Polygon {
        const x1 = 0 + Math.floor(Math.random() * 20);
        const y1 = 0 + Math.floor(Math.random() * 20);
        const x2 = 35 + Math.floor(Math.random() * 20);
        const y2 = 15 + Math.floor(Math.random() * 20);
        const x3 = 45 + Math.floor(Math.random() * 20);
        const y3 = 30 + Math.floor(Math.random() * 20);
        const x4 = 50 + Math.floor(Math.random() * 20);
        const y4 = 40 + Math.floor(Math.random() * 20);
        return new PIXI.Polygon([x1, y1, x2, y2, x3, y3, x4, y4]);
    }

    private setup_poly_5(): PIXI.Polygon {
        const x1 = 5 + Math.floor(Math.random() * 20);
        const y1 = 5 + Math.floor(Math.random() * 20);
        const x2 = 50 + Math.floor(Math.random() * 20);
        const y2 = 15 + Math.floor(Math.random() * 20);
        const x3 = 40 + Math.floor(Math.random() * 20);
        const y3 = 35 + Math.floor(Math.random() * 20);
        const x4 = 25 + Math.floor(Math.random() * 20);
        const y4 = 50 + Math.floor(Math.random() * 20);
        const x5 = 15 + Math.floor(Math.random() * 20);
        const y5 = 30 + Math.floor(Math.random() * 20);
        return new PIXI.Polygon([x1, y1, x2, y2, x3, y3, x4, y4, x5, y5]);
    }

    private setup_poly_6(): PIXI.Polygon {
        const x1 = 20 + Math.floor(Math.random() * 20);
        const y1 = 10 + Math.floor(Math.random() * 20);
        const x2 = 35 + Math.floor(Math.random() * 20);
        const y2 = -5 + Math.floor(Math.random() * 20);
        const x3 = 45 + Math.floor(Math.random() * 20);
        const y3 = 15 + Math.floor(Math.random() * 20);
        const x4 = 40 + Math.floor(Math.random() * 20);
        const y4 = 35 + Math.floor(Math.random() * 20);
        const x5 = 0 + Math.floor(Math.random() * 20);
        const y5 = 40 + Math.floor(Math.random() * 20);
        const x6 = 10 + Math.floor(Math.random() * 20);
        const y6 = 20 + Math.floor(Math.random() * 20);
        return new PIXI.Polygon([x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6]);
    }

    public draw(): void {
        super.draw();

        const { polygon } = this;
        this.lineStyle(this.lineWeight, this.strokeColor)
            .beginFill(this.fillColor)
            .drawPolygon(polygon)
            .closePath()
            .endFill();
    }
}

export default PolygonalView;