const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const score = document.querySelector('.score');
const bestScore = document.querySelector('.best-score');
const gameBoard = document.querySelector('.game-board');
const tryAgain = document.querySelector('.try-again');

let points = 0;
let bestPoints = 0;

document.cookie = 'chave=valor; expires=Mon, 31 Dec 2024 23:59:59 GMT;path=/';

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
};

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window
        .getComputedStyle(mario)
        .bottom.replace('px', '');

    const cloudsPosition = clouds.offsetLeft;

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 105) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        clouds.style.animation = 'none';
        clouds.style.left = `${cloudsPosition}px`;

        mario.src = './images/game-over.png';
        mario.style.width = '65px';
        mario.style.marginLeft = '55px';

        if (bestPoints <= points) {
            bestPoints = points;
            bestScore.textContent = `BEST SCORE: ${bestPoints - 1}`;
        } else {
            bestPoints = sessionStorage.getItem('best-points-score');
            bestScore.textContent = `BEST SCORE: ${bestPoints - 1}`;
        }

        clearInterval(loop);
        clearInterval(scorePoints);

        tryAgain.style.display = 'block';
        setInterval(() => {
            tryAgain.style.transform = 'scale(1)';
        }, 50);

        sessionStorage.setItem('best-points-score', bestPoints);
    }
}, 10);

if (sessionStorage.getItem('best-points-score') === false) {
    sessionStorage.setItem('best-points-score', bestPoints - 1);
} else {
    bestPoints = sessionStorage.getItem('best-points-score');
}

if (bestPoints != 0) {
    bestScore.textContent = `BEST SCORE: ${bestPoints -1}`;
}
const scorePoints = setInterval(() => {
    score.textContent = `SCORE: ${points}`;
    points++;
}, 100);

tryAgain.addEventListener('click', () => {
    window.location.reload();
});

document.addEventListener('keydown', jump);
