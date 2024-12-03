class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 414;
        this.canvas.height = 896;
    }
}

window.onload = () => new Game();