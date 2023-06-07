//obtenção das classes no HTML
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const cloud = document.querySelector('.clouds');
const score = document.querySelector('.score');
const kamek = document.querySelector('.kamek');
const golden_coin = document.querySelector('.golden-coin');

//criação dos áudios com path dos .mp3
const mario_jump_sound = new Audio('sounds/Mario-Jump-Sound.mp3');
const mario_game_over = new Audio('sounds/Mario-Game-Over.mp3');
const mario_theme = new Audio('sounds/Super-Mario-Theme.mp3');
const mario_winning = new Audio('sounds/Mario-Level-Complet.mp3');

let score_game = 0;
let gameLost = false; // Variável de controle para verificar se o jogo foi perdido
let isCrouched = false;
let gameWin = false;

mario_jump_sound.volume = 0.2;

const jump = () => {
    mario_jump_sound.play();    
    mario.classList.add('mario-jump');

    setTimeout(() => {
        mario.classList.remove('mario-jump')
    }, 500);
}

const crouch = () => {
  if (!isCrouched) {
    isCrouched = true;
    mario.src = 'images/mario-crouched.png';
    mario.style.width = '70px';
    mario.style.left = '30px';
  }
}

const standUp = () => {
  if (isCrouched) {
    isCrouched = false;
    mario.src = 'images/mario.gif';
    mario.style.width = '150px';
    mario.style.left = '0';
  }
}

const loop = setInterval(() => {
    //obtenção da posição dos elementos na tela
    const pipePosition = pipe.offsetLeft;
    const cloudPosition = cloud.offsetLeft;
    const marioPosition = parseFloat(window.getComputedStyle(mario).bottom.replace('px', ''));
    const kamekPosition = kamek.offsetLeft;

    if (pipePosition <= 120 && marioPosition < 80 && pipePosition > 0) {
      if (!gameLost) { // Verifica se o jogo já foi perdido
        gameLost = true; // Define a variável de controle como true para indicar que o jogo foi perdido
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        cloud.style.animation = 'none';
        cloud.style.left = `${cloudPosition}px`;

        kamek.style.left = `${kamekPosition}px`;
        kamek.style.animation = 'none';

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
    else if(kamekPosition <= 80 && marioPosition > 40 && kamekPosition > 0){
      if(!gameLost){
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

        kamek.style.left = `${kamekPosition}px`;
        kamek.style.animation = 'none';

        mario_theme.pause()
        mario_game_over.play();

        clearInterval(loop);
      }
    }
    else if(score_game >= 999){
      if(!gameLost){
        gameWin = true;
        pipe.style.animation = 'none';
        pipe.style.left = '100%';

        cloud.style.animation = 'none';
        cloud.style.left = '100%';
        mario.classList.add('mario-winning');
        setTimeout(() =>{
          mario.style.animation = 'none';
          mario.style.bottom = '0';
          mario.src = 'images/mario-victory.png';
          mario.style.width = '75px';
          mario.style.left = '50%';
        }, 3000)
        
        golden_coin.style.left = '49%';
        golden_coin.style.width = '100px';
        golden_coin.style.top = '200px';

        kamek.style.left = '100%';
        kamek.style.animation = 'none';

        mario_theme.pause()
        mario_winning.play();
        clearInterval(loop);
      }
    }
    else{
      score.textContent = parseInt(score_game);
      mario_theme.play();
      score_game += 0.03;
      if(score_game > 50 && score_game < 150){
        pipe.style.animationDuration = `${1.8}s`;
        score_game += 0.01
      }
      else if(score_game > 150 && score_game < 500){
        pipe.style.animationDuration = `${1.6}s`;
        score_game += 0.02
      }
      else if(score_game > 500 && score_game < 999){
        pipe.style.animationDuration = `${1.6}s`;
        score_game += 0.07
      }
    }
}, 10);


document.addEventListener('keydown', function(event) {
  if (event.keyCode === 32 || event.keyCode === 38){
    if(!gameLost && !gameWin){
    jump();
    }
  }
  else if (event.keyCode === 40){
    if(!gameLost && !gameWin){
    crouch();
    }
  }
});

document.addEventListener('keyup', function(event) {
  if (event.keyCode === 40) {
    if(!gameLost && !gameWin){
    standUp();
  }
  }
});
