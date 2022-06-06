class Sprite {
    constructor(options) {
        this.ctx = options.ctx;

        this.image = options.image;

        this.width = options.width;
        this.height = options.height;

        this.frameIndex = 0;
        this.rowIndex = 0;

        this.tickCount = 0;
        this.ticksPerFrame = options.ticksPerFrame || 0;

        this.width = options.width;
        this.height = options.height;

        this.start();
    }

    update() {
        this.tickCount++;

        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;
            if (this.frameIndex < 2) {
                this.frameIndex++;
            } else {
                this.frameIndex = 0;
                if (this.rowIndex !== 2) this.rowIndex++;
                else this.rowIndex = 0;
            }
        }
    }

    render() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.drawImage(
            this.image,
            this.frameIndex * this.width,
            this.rowIndex * this.height,
            this.width,
            this.height,
            0,
            0,
            this.width,
            this.height
        )

        console.log("cX: " + this.frameIndex * this.width + " ------ cY: " + this.rowIndex * this.height)
    }

    start() {
        let loop = () => {
            this.update();
            this.render();

            window.requestAnimationFrame(loop);
        }

        window.requestAnimationFrame(loop);
    }
}

let canvas = document.getElementById('canvas');

let image = new Image();
image.src = './img/bird.png';

let sprite = new Sprite({
    ctx: canvas.getContext('2d'),
    image: image,
    width: 350,
    height: 350,
    ticksPerFrame: 4,
})