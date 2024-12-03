class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 414;
        this.canvas.height = 896;

		this.cannon = {
            x: this.canvas.width / 2,
            y: this.canvas.height - 30,
            width: 30,
            height: 40,
            speed: 5
        };

		this.gameLoop();

		// Gestionnaires d'événements
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    }

	handleMouseMove(event) {
		const rect = this.canvas.getBoundingClientRect();
		const mouseX = event.clientX - rect.left;

		// Limiter le canon dans les bordures du canvas
		this.cannon.x = Math.max(this.cannon.width / 2, Math.min(mouseX, this.canvas.width - this.cannon.width / 2));
		console.log(this.cannon.x);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Canon
        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(this.cannon.x - this.cannon.width / 2, this.cannon.y,
            this.cannon.width, this.cannon.height);
    }

	gameLoop() {
		this.draw();
		requestAnimationFrame(this.gameLoop.bind(this));
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