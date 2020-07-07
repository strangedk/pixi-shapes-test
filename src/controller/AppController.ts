import { EventEmitter } from 'events';
import ShapeView from '../view/shapes/ShapeView';

class AppController {
    static SHAPE_DELETED = 'STORAGE_SHAPE_DELETED';
    static SHAPE_ADDED = 'STORAGE_SHAPE_ADDED';

    public shapes: ShapeView[] = [];
    public events: EventEmitter = new EventEmitter();

    public create = (shape: ShapeView): void => {
        const { shapes, events } = this;
        shapes[shapes.length] = shape;

        shape.once('delete', () => this.delete(shape));

        events.emit(AppController.SHAPE_ADDED, shape);
    }

    public delete = (shape: ShapeView): void => {
        const { shapes, events } = this;
        const shapeIndex = shapes.indexOf(shape);

        if (shapeIndex !== -1) {
            shapes.splice(shapeIndex, 1);
            events.emit(AppController.SHAPE_DELETED, shape);
        }
    }

    public update = (shape: ShapeView) => {
        this.shapes
            .filter(same => same.type === shape.type)
            .forEach(shape => shape.draw())
    }
}

export default AppController;