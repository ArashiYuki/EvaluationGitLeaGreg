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

        this.projectiles = [];
        this.isGameOver = false;
        this.projectileSpeed = 7;
        this.fireRateLevel = 1;
        this.projectileSpeedLevel = 1;

        this.startAutoFire();

        // Création périodique de balles avec difficulté progressive
        this.ballSpawnInterval = setInterval(() => {
            if (!this.isGameOver) {
                this.createBall();
                // Réduire progressivement le temps entre les balles
                this.spawnRate = Math.max(this.minSpawnRate, this.spawnRate - 50);
                // Redémarrer l'intervalle avec le nouveau timing
                clearInterval(this.ballSpawnInterval);
                this.ballSpawnInterval = setInterval(() => {
                    if (!this.isGameOver) this.createBall();
                }, this.spawnRate);
            }
        }, this.spawnRate);

        // Gestionnaires d'événements
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));

        // Création périodique de balles
        setInterval(() => {
            if (!this.isGameOver) {
                this.createBall();
            }
        }, 3000);

        this.gameLoop();

        document.getElementById('restartButton').addEventListener('click', () => {
            document.getElementById('gameOver').style.display = 'none';
            this.restart();
        });
    }

    startAutoFire() {
        // Supprimer l'ancien interval s'il existe
        if (this.fireInterval) {
            clearInterval(this.fireInterval);
        }

        // Créer un nouvel interval unique
        this.fireInterval = setInterval(() => {
            if (!this.isGameOver) {
                this.projectiles.push({
                    x: this.cannon.x,
                    y: this.cannon.y,
                    radius: 5,
                    speed: this.projectileSpeed
                });
            }
        }, this.fireRate);
    }

    shoot() {
        const now = Date.now();
        if (now - this.lastShot >= this.fireRate) {
            this.projectiles.push({
                x: this.cannon.x,
                y: this.cannon.y,
                radius: 5,
                speed: this.projectileSpeed
            });
            this.lastShot = now;
        }
    }

    update() {
        this.projectiles.forEach(projectile => {
            projectile.y -= projectile.speed;  // Cette ligne est correcte
        });

        this.projectiles = this.projectiles.filter(proj => proj.y > -10);
    }

    handleMouseMove(event) {
        if (!this.isGameOver) {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;

            // Limiter le canon dans les bordures du canvas
            this.cannon.x = Math.max(this.cannon.width / 2, Math.min(mouseX, this.canvas.width - this.cannon.width / 2));
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Canon
        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(this.cannon.x - this.cannon.width / 2, this.cannon.y,
            this.cannon.width, this.cannon.height);

        // Projectiles
        this.projectiles.forEach(projectile => {
            this.ctx.beginPath();
            this.ctx.arc(projectile.x, projectile.y, projectile.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = 'yellow';
            this.ctx.fill();
            this.ctx.closePath();
        });
    }

    gameLoop() {
        if (!this.isGameOver) {
            this.checkCollisions();
            this.update();
            this.draw();
            requestAnimationFrame(this.gameLoop.bind(this));
        }
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

    restart() {
        this.balls = [];
        this.projectiles = [];
        this.score = 0;
        this.isGameOver = false;
        this.spawnRate = 3000;
        clearInterval(this.ballSpawnInterval);
        this.ballSpawnInterval = setInterval(() => {
            if (!this.isGameOver) this.createBall();
        }, this.spawnRate);
        this.gameLoop();
    }
}

window.onload = () => new Game();