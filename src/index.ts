import * as PIXI from 'pixi.js';
import AppController from './controller/AppController';
import AppView from './view/AppView';
import Controls from './view/Controls';

const init = () => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const options = {
    width: 530,
    height: 340,
    view: canvas,
  };

  const app = new PIXI.Application(options);
  const canvasWrapper = document.getElementById('canvasWrapper');
  canvasWrapper.appendChild(app.view);

  const controls = new Controls();
  const controller = new AppController();  
  const view = new AppView(app, controller, controls);

  app.stage.addChild(view);
  app.ticker.add(view.animate);
}

init();