import { EventEmitter } from 'events';
import ShapeView from '../view/shapes/ShapeView';

class AppController {
    static SHAPE_DELETED = 'SHAPE_DELETED';
    static SHAPE_ADDED = 'SHAPE_ADDED';
    static DELAY_CHANGED = 'DELAY_CHANGED';
    static GRAVITY_CHANGED = 'GRAVITY_CHANGED';

    public shapes: ShapeView[] = [];
    public events: EventEmitter = new EventEmitter();

    public delayStep = 0.1; // milliseconds
    public currentDelay = 0.4;
    public currentGravity = 1;

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

    public delayMore = () => {        
        if (this.currentDelay <= 0) {
            this.currentDelay = 0;
        } else {
            this.currentDelay -= this.delayStep;
        }
        console.log('delay more', this.currentDelay);        
        this.events.emit(AppController.DELAY_CHANGED, this.currentDelay);
    }

    public delayLess = () => {        
        this.currentDelay += this.delayStep;
        console.log('delay less', this.currentDelay);
        this.events.emit(AppController.DELAY_CHANGED, this.currentDelay);
    }

    public gravityMore = () => {
        this.currentGravity++;
        this.events.emit(AppController.GRAVITY_CHANGED, this.currentGravity);
    }

    public gravityLess = () => {
        this.currentGravity--;
        this.events.emit(AppController.GRAVITY_CHANGED, this.currentGravity);
    }
}

export default AppController;