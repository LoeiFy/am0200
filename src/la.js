const STEP_LENGTH = 3;
const LIFE_TIME = 10;
const CELL_SIZE = 16;
const BORDER_WIDTH = 2;
const MAX_ELECTRONS = 5;
const CELL_DISTANCE = CELL_SIZE + BORDER_WIDTH;

const BG_COLOR = '#1d2227';
const BORDER_COLOR = '#1d2227';
const CELL_HIGHLIGHT = '#328bf6';
const ELECTRON_COLOR = '#00b07c';

const DPR = window.devicePixelRatio || 1;

const ACTIVE_ELECTRONS = [];

const MOVE_TRAILS = [
    [0, 1], // down
    [0, -1], // up
    [1, 0], // right
    [-1, 0], // left
].map(([x, y]) => [x * CELL_DISTANCE, y * CELL_DISTANCE]);

const END_POINTS_OFFSET = [
    [0, 0], // left top
    [0, 1], // left bottom
    [1, 0], // right top
    [1, 1], // right bottom
].map(([x, y]) => [
    x * CELL_DISTANCE - BORDER_WIDTH / 2,
    y * CELL_DISTANCE - BORDER_WIDTH / 2,
]);

class FullscreenCanvas {
    constructor(disableScale = false) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        this.canvas = canvas;
        this.context = context;
        this.disableScale = disableScale;

        this.resizeHandlers = [];
        this.handleResize = _.debounce(::this.handleResize, 100);

        this.adjust();

        window.addEventListener('resize', this.handleResize);
    }

    adjust() {
        const {
            canvas,
            context,
            disableScale,
        } = this;

        const {
            innerWidth,
            innerHeight,
        } = window;

        this.width = innerWidth;
        this.height = innerHeight;

        const scale = disableScale ? 1 : DPR;

        this.realWidth = canvas.width = innerWidth * scale;
        this.realHeight = canvas.height = innerHeight * scale;
        canvas.style.width = `${innerWidth}px`;
        canvas.style.height = `${innerHeight}px`;

        context.scale(scale, scale);
    }

    makeCallback(fn) {
        fn(this.context, this);
    }

    blendBackground(background, opacity = 0.05) {
        return this.paint((ctx, { realWidth, realHeight, width, height }) => {
            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = opacity;

            ctx.drawImage(background, 0, 0, realWidth, realHeight, 0, 0, width, height);
        });
    }

    paint(fn) {
        const { context } = this;

        context.save();

        this.makeCallback(fn);

        context.restore();

        return this;
    }

    onResize(fn) {
        this.resizeHandlers.push(fn);
    }

    handleResize() {
        const { resizeHandlers } = this;

        if (!resizeHandlers.length) return;

        this.adjust();

        resizeHandlers.forEach(::this.makeCallback);
    }

    renderIntoView(target = document.body) {
        const { canvas } = this;

        this.container = target;

        canvas.style.position = 'absolute';
        canvas.style.left = '0px';
        canvas.style.top = '0px';

        target.appendChild(canvas);
    }

}

class Electron {
    constructor(
        x = 0,
        y = 0,
        {
            lifeTime = LIFE_TIME * 1e3,
            speed = STEP_LENGTH,
            color = ELECTRON_COLOR,
        } = {}
    ) {
        this.lifeTime = lifeTime;
        this.expireAt = Date.now() + lifeTime;

        this.speed = speed;
        this.color = color;

        this.radius = BORDER_WIDTH / 2;
        this.current = [x, y];
        this.visited = {};
        this.setDest(this.randomPath());
    }

    randomPath() {
        const {
            current: [x, y],
        } = this;

        const { length } = MOVE_TRAILS;

        const [deltaX, deltaY] = MOVE_TRAILS[_.random(length - 1)];

        return [
            x + deltaX,
            y + deltaY,
        ];
    }

    composeCoord(coord) {
        return coord.join(',');
    }

    hasVisited(dest) {
        const key = this.composeCoord(dest);

        return this.visited[key];
    }

    setDest(dest) {
        this.destination = dest;
        this.visited[this.composeCoord(dest)] = true;
    }

    next() {
        let {
            speed,
            current,
            destination,
        } = this;

        if (Math.abs(current[0] - destination[0]) <= speed / 2 &&
            Math.abs(current[1] - destination[1]) <= speed / 2
        ) {
            destination = this.randomPath();

            let tryCnt = 1;
            const maxAttempt = 4;

            while (this.hasVisited(destination) && tryCnt <= maxAttempt) {
                tryCnt++;
                destination = this.randomPath();
            }

            this.setDest(destination);
        }

        const deltaX = destination[0] - current[0];
        const deltaY = destination[1] - current[1];

        if (deltaX) {
            current[0] += (deltaX / Math.abs(deltaX) * speed);
        }

        if (deltaY) {
            current[1] += (deltaY / Math.abs(deltaY) * speed);
        }

        return [...this.current];
    }

    paintNextTo(layer = new FullscreenCanvas()) {
        const {
            radius,
            color,
            expireAt,
            lifeTime,
        } = this;

        const [x, y] = this.next();

        layer.paint(ctx => {
            ctx.globalAlpha = Math.max(0, expireAt - Date.now()) / lifeTime;
            ctx.fillStyle = color;
            ctx.shadowColor = color;
            ctx.shadowBlur = radius * 5;
            ctx.globalCompositeOperation = 'lighter';

            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.closePath();

            ctx.fill();
        });
    }
}

class Cell {
    constructor(
        row = 0,
        col = 0,
        {
            electronCount = _.random(1, 4),
            background = ELECTRON_COLOR,
            forceElectrons = false,
            electronOptions = {},
        } = {},
    ) {
        this.background = background;
        this.electronOptions = electronOptions;
        this.forceElectrons = forceElectrons;
        this.electronCount = Math.min(electronCount, 4);

        this.startY = row * CELL_DISTANCE;
        this.startX = col * CELL_DISTANCE;
    }

    popRandom(arr = []) {
        const ramIdx = _.random(arr.length - 1);

        return arr.splice(ramIdx, 1)[0];
    }

    createElectrons() {
        const {
            startX,
            startY,
            electronCount,
            electronOptions,
            forceElectrons,
        } = this;

        if (!electronCount) return;

        const endpoints = [...END_POINTS_OFFSET];

        const max = forceElectrons ? electronCount : Math.min(electronCount, MAX_ELECTRONS - ACTIVE_ELECTRONS.length);

        for (let i = 0; i < max; i++) {
            const [offsetX, offsetY] = this.popRandom(endpoints);

            ACTIVE_ELECTRONS.push(new Electron(
                startX + offsetX,
                startY + offsetY,
                electronOptions,
            ));
        }
    }
}

const bgLayer = new FullscreenCanvas();
const mainLayer = new FullscreenCanvas();

function createRandomCell(options = {}) {
    if (ACTIVE_ELECTRONS.length >= MAX_ELECTRONS) return;

    const { width, height } = mainLayer;

    const cell = new Cell(
        _.random(height / CELL_DISTANCE),
        _.random(width / CELL_DISTANCE),
        options,
    );

    cell.createElectrons()
}

function drawGrid() {
    bgLayer.paint((ctx, { width, height }) => {
        ctx.fillStyle = BG_COLOR;
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = BORDER_COLOR;

        // horizontal lines
        for (let h = CELL_SIZE; h < height; h += CELL_DISTANCE) {
            ctx.fillRect(0, h, width, BORDER_WIDTH);
        }

        // vertical lines
        for (let w = CELL_SIZE; w < width; w += CELL_DISTANCE) {
            ctx.fillRect(w, 0, BORDER_WIDTH, height);
        }
    });
}

function drawItems() {
    const now = Date.now();

    for (let i = 0, max = ACTIVE_ELECTRONS.length; i < max; i++) {
        const item = ACTIVE_ELECTRONS[i];

        if (now >= item.expireAt) {
            ACTIVE_ELECTRONS.splice(i, 1);
            i--;
            max--;
        } else {
            item.paintNextTo(mainLayer);
        }
    }
}

let nextRandomAt;

function activateRandom() {
    const now = Date.now();

    if (now < nextRandomAt) {
        return;
    }

    nextRandomAt = now + _.random(300, 1000);

    createRandomCell();
}

function prepaint() {
    drawGrid();

    mainLayer.paint((ctx, { width, height }) => {
        // composite with rgba(255,255,255,255) to clear trails
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, width, height);
    });

    mainLayer.blendBackground(bgLayer.canvas, 0.9);
}

function render() {
    mainLayer.blendBackground(bgLayer.canvas);

    drawItems();
    activateRandom();

    shape.renderID = requestAnimationFrame(render);
}

const shape = {
    lastText: '',
    lastMatrix: null,
    renderID: undefined,
    isAlive: false,

    init(container = document.body) {
        if (this.isAlive) {
            return;
        }

        bgLayer.onResize(drawGrid);
        mainLayer.onResize(prepaint);

        mainLayer.renderIntoView(container);

        prepaint();
        render();

        this.isAlive = true;
    }

};

shape.init()

// prevent zoom
document.addEventListener('touchmove', e => e.preventDefault());
