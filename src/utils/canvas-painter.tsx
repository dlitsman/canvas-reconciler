import {
  Container,
  Instance,
  TextInstance,
  TextOrRegularInstance,
} from "../reconciler/canvas";

type Bounds = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export class CanvasPainter {
  ctx: CanvasRenderingContext2D;
  container: Container;
  canvas: HTMLCanvasElement;
  devicePixelRatio: number;
  width: number;
  height: number;

  constructor(
    canvasElement: HTMLCanvasElement,
    container: Container,
    devicePixelRatio: number
  ) {
    const ctx = canvasElement.getContext("2d");
    if (ctx == null) {
      throw new Error("Unable to create 2d context from canvasElement");
    }

    this.ctx = ctx;
    this.container = container;
    this.canvas = canvasElement;
    this.devicePixelRatio = devicePixelRatio;
    this.width = canvasElement.width;
    this.height = canvasElement.height;
  }

  init() {
    this.adjustDevicePixelRatio();
  }

  adjustDevicePixelRatio() {
    if (this.devicePixelRatio > 1) {
      var canvasWidth = this.canvas.width;
      var canvasHeight = this.canvas.height;

      this.canvas.width = canvasWidth * window.devicePixelRatio;
      this.canvas.height = canvasHeight * window.devicePixelRatio;
      this.canvas.style.width = canvasWidth + "px";
      this.canvas.style.height = canvasHeight + "px";

      this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  renderContainer() {
    this.clearCanvas();

    const bounds = { x: 0, y: 0, width: this.width, height: this.height };

    this.renderElementRecursively(this.container.children, bounds);
  }

  _calculateNewBounds(element: Instance, bounds: Bounds) {
    const padding = element.config.padding ?? 0;
    const left = element.config.left ?? 0;
    const top = element.config.top ?? 0;

    const newX = bounds.x + left + padding;
    const newY = bounds.y + top + padding;

    const newWidth = element.config.width ?? bounds.width - padding * 2;
    const newHeight = element.config.height ?? bounds.height - padding * 2;

    return {
      x: newX,
      y: newY,
      width: newWidth,
      height: newHeight,
    };
  }

  renderElementRecursively(elements: TextOrRegularInstance[], bounds: Bounds) {
    for (const element of elements) {
      if (element.type === "view") {
        this.renderView(element, bounds);

        const newBounds = this._calculateNewBounds(element, bounds);

        if (element.children != null) {
          this.renderElementRecursively(element.children, newBounds);
        }
      } else if (element.type === "text") {
        this.renderText(element, bounds);
      }
    }
  }

  renderView(element: Instance, bounds: Bounds) {
    if (!element.config.backgroundColor) {
      // noop
      return;
    }

    this.ctx.save();

    this.ctx.fillStyle = element.config.backgroundColor;
    console.log("!!!drawing", bounds);
    this.ctx.fillRect(bounds.x, bounds.y, bounds.width, bounds.height);

    this.ctx.restore();
  }

  renderText(element: TextInstance, bounds: Bounds) {
    this.ctx.save();

    this.ctx.font = "20px serif";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(element.text, bounds.x, bounds.y + 20);

    this.ctx.restore();
  }
}
