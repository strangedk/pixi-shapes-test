import ShapeView from "../view/shapes/ShapeView";
import CircleView from "../view/shapes/CircleView";
import ShapeEnum from "../enum/ShapeEnum";
import RectangleView from "../view/shapes/RectangleView";
import EllipseView from "../view/shapes/EllipseView";
import PolygonalView from "../view/shapes/PolygonalView";

class ShapeFactory {
    public static create(wantedType: ShapeEnum = ShapeEnum.Random): ShapeView {
        let type = wantedType;
        if (type === ShapeEnum.Random) {
            type = Math.floor(Math.random() * ShapeFactory.calculateEnumEntriesLength());
        }

        switch (type) {
            case ShapeEnum.Circle:
                return new CircleView(type);
            case ShapeEnum.Rectangle:                
                return new RectangleView(type);
            case ShapeEnum.Ellipse:
                return new EllipseView(type);
            case ShapeEnum.Polygonal_3:
                return new PolygonalView(type);
            case ShapeEnum.Polygonal_4:
                return new PolygonalView(type);
            case ShapeEnum.Polygonal_5:
                return new PolygonalView(type);
            case ShapeEnum.Polygonal_6:
                return new PolygonalView(type);
            default:
                return new CircleView(ShapeEnum.Circle);
        }
    }

    private static calculateEnumEntriesLength() {
        const values = Object.values(ShapeEnum);        
        const countWithoutLengthAndRandom = values.filter(element => isNaN(element as any)).length-1;
        return countWithoutLengthAndRandom;
    }
}

export default ShapeFactory;