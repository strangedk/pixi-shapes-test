import * as PIXI from 'pixi.js';
import ShapeEnum from '../enum/ShapeEnum';
import AppController from '../controller/AppController';
import ShapeFactory from '../service/ShapeFactory';
import ShapeView from './shapes/ShapeView';

class AppView extends PIXI.Graphics {
    private gravitySpeed: number = 0.4;
    
    private spawnDelay: number = 1;
    private spawnID: any;

    constructor(private app: PIXI.Application, private controller: AppController) {
        super();

        this.interactive = true;

        controller.events.on(AppController.SHAPE_ADDED, this.shapeAddedHandler);
        controller.events.on(AppController.SHAPE_DELETED, this.shapeDeletedHandler);

        this.on('click', this.appClickHandler);

        this.makeBackgroundAlpha();
        this.spawnLaunch();
    }

    public animate = () => {
        const { shapes } = this.controller;
        const { gravitySpeed, app } = this;

        shapes.forEach(shape => {
            shape.y += gravitySpeed;

            if (shape.y > shape.height + app.renderer.height) {
                this.controller.delete(shape);
            }
        });

        this.updateInfoData();
    }

    private shapeAddedHandler = (shape: ShapeView) => {
        const { width } = this.app.renderer;

        shape.x = shape.width + Math.floor(Math.random() * width - shape.width)
        shape.y = -shape.height;
        this.addChild(shape);
    }

    private shapeDeletedHandler = (shape: ShapeView) => {
        this.removeChild(shape);
    }

    private appClickHandler = (event: PIXI.InteractionEvent) => {
        if (event.target instanceof ShapeView) {
            const shape = event.target;
            this.controller.delete(shape);
            this.controller.update(shape);
        } else {
            const mouse = this.app.renderer.plugins.interaction.mouse.global;
            const shape = this.createShape();
            shape.x = mouse.x;
            shape.y = mouse.y;
        }
    }

    private createShape = () => {
        const { controller: storage } = this;
        const shape = ShapeFactory.create(ShapeEnum.Random);
        storage.create(shape);
        return shape;
    }

    private spawnLaunch = () => {
        clearInterval(this.spawnID);
        this.spawnID = setInterval(this.spawnIteration, this.spawnDelay * 1000)
    }

    private spawnIteration = () => {
        this.createShape();
    }

    private makeBackgroundAlpha = () => {
        this.clear()
            .beginFill(0xffffff)
            .lineStyle(2, 0x444444)
            .drawRect(0, 0, this.app.renderer.width, this.app.renderer.height)
            .endFill();
    }

    private updateInfoData = () => {
        const labelQuantity = document.getElementById('quantityOfShapes');
        const labelArea = document.getElementById('areaOfShapes');
        const { shapes } = this.controller;        

        const quantity = `Quantity: ${shapes.length}`;
        if (labelQuantity.innerText !== quantity)
            labelQuantity.innerText = quantity;
            
        const area = "0";
        if (labelArea.innerText !== area)
            labelArea.innerText = area;    
            
        const bounds = this.getBounds();
    }
}

export default AppView;