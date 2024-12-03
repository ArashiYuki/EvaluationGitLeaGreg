class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 414;
        this.canvas.height = 896;
    }

    createBall() {
        const x = Math.random() * (this.canvas.width - 40) + 20;
        this.balls.push({
            x: x,
            y: -20,
            radius: 15,
            health: 3,
            speed: 2,
            vx: (Math.random() - 0.5) * 4
        });
    }
}

window.onload = () => new Game();