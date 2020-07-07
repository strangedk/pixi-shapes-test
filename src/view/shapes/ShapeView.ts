import * as PIXI from 'pixi.js';
import {EventEmitter} from 'events';
import ShapeEnum from '../../enum/ShapeEnum';

abstract class ShapeView extends PIXI.Graphics {
    DEFAULT_MAX_LINE_WEIGHT = 2;

    private events = new EventEmitter();
    
    protected fillColor: number;
    protected strokeColor: number;
    protected lineWeight: number;

    constructor(public type: ShapeEnum) {
        super();

        this.interactive = true;
        this.buttonMode = true;
        this.on('click', this.onClick);
    }

    protected abstract setup(): void;

    public draw(): void {
        this.clear();
        this.fillColor = Math.random() * 0xffffff;
        this.strokeColor = Math.random() * 0xffffff;
        this.lineWeight = 1 + Math.random() * this.DEFAULT_MAX_LINE_WEIGHT;
    };

    protected delete = () => {
        this.events.emit('delete', this);
    }

    private onClick = () => {
        this.delete();
    }
}

export default ShapeView;