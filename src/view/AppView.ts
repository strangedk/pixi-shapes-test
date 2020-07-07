import * as PIXI from 'pixi.js';
import ShapeEnum from '../enum/ShapeEnum';
import AppController from '../controller/AppController';
import ShapeFactory from '../service/ShapeFactory';
import ShapeView from './shapes/ShapeView';
import Controls from './Controls';

class AppView extends PIXI.Graphics {
    private readonly backgroundLayer: PIXI.Graphics;
    private readonly interactiveLayer: PIXI.Graphics;

    private spawnID: any;

    constructor(private app: PIXI.Application, private controller: AppController, private controls: Controls) {
        super();

        this.interactive = true;

        controller.events.on(AppController.SHAPE_ADDED, this.shapeAddedHandler);
        controller.events.on(AppController.SHAPE_DELETED, this.shapeDeletedHandler);
        controls.events.on(Controls.PIECES_PER_SECOND_CHANGED, this.piecesPerSecondHandler)

        this.backgroundLayer = new PIXI.Graphics();
        this.backgroundLayer.on('click', this.appClickHandler);
        this.backgroundLayer.interactive = true;
        this.addChild(this.backgroundLayer);

        this.interactiveLayer = new PIXI.Graphics();
        this.interactiveLayer.on('click', this.appClickHandler);
        this.interactiveLayer.interactive = true;
        this.addChild(this.interactiveLayer);

        this.makeBackgroundAlpha();
        this.spawnLaunch();
    }

    public animate = () => {
        const { shapes } = this.controller;
        const { controls, app } = this;

        shapes.forEach(shape => {
            shape.y += controls.gravitySpeed;

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
        this.interactiveLayer.addChild(shape);
    }

    private shapeDeletedHandler = (shape: ShapeView) => {
        this.interactiveLayer.removeChild(shape);
    }

    private piecesPerSecondHandler = () => {
        this.spawnLaunch();
    }

    private appClickHandler = (event: PIXI.InteractionEvent) => {
        console.log(event);
        if (event.target instanceof ShapeView) {
            const shape = event.target;
            this.controller.delete(shape);
            this.controller.update(shape);
        } else {
            const mouse = this.app.renderer.plugins.interaction.mouse.global;
            const shape = this.createShape();
            shape.x = mouse.x - shape.width / 2;
            shape.y = mouse.y - shape.height / 2;
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
        this.spawnID = setInterval(this.spawnIteration, this.controls.spawnDelay)
    }

    private spawnIteration = () => {
        this.createShape();
    }

    private makeBackgroundAlpha = (x?: number, y?: number, w?: number, h?: number) => {
        this.backgroundLayer.clear()
            .beginFill(0xffffff)
            .lineStyle(2, 0x444444)
            .drawRect(0, 0, this.app.renderer.width, this.app.renderer.height)
            .endFill();

        this.backgroundLayer.lineStyle(2, 0xff0000);
        this.backgroundLayer.drawRect(x, y, w, h);
    }

    private updateInfoData = () => {
        const labelQuantity = document.getElementById('quantityOfShapes');
        const labelArea = document.getElementById('areaOfShapes');
        const { shapes } = this.controller;

        const quantity = `Quantity: ${shapes.length}`;
        if (labelQuantity.innerText !== quantity)
            labelQuantity.innerText = quantity;

        const { x, y, w, h } = this.findBoundObjects();

        const areaPx = Math.ceil(((w-x)*(h-y))).toString();
        const area = `Area: ${areaPx}px`;
        if (labelArea.innerText !== area)
            labelArea.innerText = area;

        this.makeBackgroundAlpha(x, y, w, h);
    }

    private findBoundObjects() {
        const { shapes } = this.controller;

        const left = Array.from(shapes).sort((a, b) => a.x - b.x);
        const right = Array.from(shapes).sort((a, b) => b.x - a.x);
        const top = Array.from(shapes).sort((a, b) => a.y - b.y);
        const bottom = Array.from(shapes).sort((a, b) => b.y - a.y);

        let x, y, w, h;

        if (left.length && right.length && top.length && bottom.length) {
            x = left[0].x;
            y = top[0].y;
            w = right[0].x + right[0].width;
            h = bottom[0].y + bottom[0].height;
        }

        return { x, y, w, h }
    }
}

export default AppView;