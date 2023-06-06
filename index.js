const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const cloud = document.querySelector('.clouds');
const mario_jump_sound = new Audio('sounds/Mario-Jump-Sound.mp3');
const mario_game_over = new Audio('sounds/Mario-Game-Over.mp3');
const mario_theme = new Audio('sounds/Super-Mario-Theme.mp3');
const score = document.querySelector('.score');

let score_game = 0;
let gameLost = false; // Variável de controle para verificar se o jogo foi perdido

mario_jump_sound.volume = 0.2;

const jump = () => {
    mario_jump_sound.play();    
    mario.classList.add('mario-jump');

    setTimeout(() => {
        mario.classList.remove('mario-jump')
    }, 500);
}

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const cloudPosition = cloud.offsetLeft;
    const marioPosition = parseFloat(window.getComputedStyle(mario).bottom.replace('px', ''));
    if (pipePosition <= 120 && marioPosition < 80 && pipePosition > 0) {
      if (!gameLost) { // Verifica se o jogo já foi perdido
        gameLost = true; // Define a variável de controle como true para indicar que o jogo foi perdido
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        cloud.style.animation = 'none';
        cloud.style.left = `${cloudPosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;
        mario.src = 'images/game-over.png';
        mario.style.width = '75px';
        mario.style.left = '50px';

        mario_theme.pause()
        mario_game_over.play();

        clearInterval(loop);
      }
    }
    else{
      score.textContent = parseInt(score_game);
      mario_theme.play();
      score_game += 0.1;
      if(score_game > 50 && score_game < 150){
        pipe.style.animationDuration = `${1.8}s`;
      }
      else if(score_game > 150 && score_game < 500){
        pipe.style.animationDuration = `${1.6}s`;
      }
    }
}, 10);


document.addEventListener('keydown', function(event) {
  if (event.keyCode === 32 || event.keyCode === 38){
    jump();
  }
});
document.addEventListener('click', jump);
