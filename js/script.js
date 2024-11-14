const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const score = document.querySelector('.score');
const bestScore = document.querySelector('.best-score');
const gameBoard = document.querySelector('.game-board');
const tryAgain = document.querySelector('.try-again');
const jumpSound = document.querySelector('.mario-jump-sound');
const deathSound = document.querySelector('.mario-death-sound');
const style = document.createElement('style');

let points = 0;
let bestPoints = 0;
let isGameOver = false;
// document.cookie = 'chave=valor; expires=Mon, 31 Dec 2024 23:59:59 GMT;path=/';

const jump = () => {
    if (!isGameOver) {
        jumpSound.play();
        mario.classList.add('jump');
        setTimeout(() => {
            mario.classList.remove('jump');
        }, 500);
    }
};

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window
        .getComputedStyle(mario)
        .bottom.replace('px', '');

    const cloudsPosition = clouds.offsetLeft;

    style.innerHTML = `
        @keyframes death-animation {
            0% { bottom: ${marioPosition}px; }
            33% { bottom: ${marioPosition}px; }
            66% { bottom: ${marioPosition + 300}px; } /* Subida */
            100% { bottom: -300px; } /* Queda */
        }
    `;
    document.head.appendChild(style);

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 105) {
        isGameOver = true;
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        clouds.style.animation = 'none';
        clouds.style.left = `${cloudsPosition}px`;

        mario.src = './images/game-over.png';
        mario.style.width = '65px';
        mario.style.marginLeft = '55px';

        mario.style.animation = 'death-animation 1s ease-out';
        mario.style.bottom = '-300px';

        if (bestPoints <= points) {
            bestPoints = points;
            bestScore.textContent = `BEST SCORE: ${bestPoints - 1}`;
        } else {
            bestPoints = sessionStorage.getItem('best-points-score');
            bestScore.textContent = `BEST SCORE: ${bestPoints - 1}`;
        }

        deathSound.play();
        clearInterval(loop);
        clearInterval(scorePoints);

        tryAgain.style.display = 'block';
        setInterval(() => {
            tryAgain.style.transform = 'scale(1)';
            tryAgain.style.zIndex = '2';
        }, 50);

        sessionStorage.setItem('best-points-score', bestPoints);
    }
}, 10);

if (sessionStorage.getItem('best-points-score') === false) {
    sessionStorage.setItem('best-points-score', bestPoints - 1);
} else {
    bestPoints = sessionStorage.getItem('best-points-score');
}

if (bestPoints > 0) {
    bestScore.textContent = `BEST SCORE: ${bestPoints - 1}`;
}
const scorePoints = setInterval(() => {
    score.textContent = `SCORE: ${points}`;
    points++;
}, 100);

tryAgain.addEventListener('click', () => {
    window.location.reload();
});

document.addEventListener('keydown', jump);
