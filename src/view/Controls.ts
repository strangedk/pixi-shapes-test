import {EventEmitter} from 'events';

class Controls {
    static PIECES_PER_SECOND_CHANGED = 'PIECES_PER_SECOND_CHANGED';
    static GRAVITY_CHANGED = 'GRAVITY_CHANGED';
    
    public events = new EventEmitter();

    public gravitySpeed: number = 0.7;    
    private gravityStep: number = 0.7;

    public spawnDelay: number = 350;
    private spawnStep: number = 50;
    
    private piecesInSecondLess = document.getElementById('piecesInSecondLess');
    private piecesInSecondMore = document.getElementById('piecesInSecondMore');
    private piecesInSecondInput = document.getElementById('piecesInSecondInput') as any;
    private gravityMore = document.getElementById('gravityMore');
    private gravityLess = document.getElementById('gravityLess');
    private gravitySpeedInput = document.getElementById('gravitySpeedInput') as any;

    constructor() {
        this.piecesInSecondLess.addEventListener('click', this.decreasePiecesHandler);
        this.piecesInSecondMore.addEventListener('click', this.increasePiecesHandler);
        this.gravityMore.addEventListener('click', this.increaseGravityHandler);
        this.gravityLess.addEventListener('click', this.decreaseGravityHandler);

        this.piecesInSecondInput.value = this.spawnDelay.toString().substr(0,6);
        this.gravitySpeedInput.value = this.gravitySpeed.toString().substr(0,6);
    }

    private increasePiecesHandler = () => {
        if (this.spawnDelay + this.spawnStep >= 1000) {
            this.spawnDelay = 1000;
        } else {
            this.spawnDelay += this.spawnStep;
        }
        
        this.piecesInSecondInput.value = this.spawnDelay.toString().substr(0,6);
        this.events.emit(Controls.PIECES_PER_SECOND_CHANGED);
    }

    private decreasePiecesHandler = () => {
        if (this.spawnDelay - this.spawnStep <= 0) {
            this.spawnStep = 100;
        } else {
            this.spawnDelay -= this.spawnStep;
        }

        this.piecesInSecondInput.value = this.spawnDelay.toString().substr(0,6);
        this.events.emit(Controls.PIECES_PER_SECOND_CHANGED);
    }

    private increaseGravityHandler = () => {
        this.gravitySpeed += this.gravityStep;
        this.gravitySpeedInput.value = this.gravitySpeed.toString().substr(0,6);
        this.events.emit(Controls.GRAVITY_CHANGED);
    }

    private decreaseGravityHandler = () => {
        this.gravitySpeed -= this.gravityStep;
        this.gravitySpeedInput.value = this.gravitySpeed.toString().substr(0,6);
        this.events.emit(Controls.GRAVITY_CHANGED);
    }
}

export default Controls;