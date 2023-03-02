//SELECTORS

const $time = document.querySelector('#time');
const $result = document.querySelector('#result');
const $start = document.querySelector('#start');
const $game = document.querySelector("#game");
const $duration = document.querySelector('#duration');

const colors = ['red','green',"blue","yellow",];
let score = 0;

// EVENTS

$start.addEventListener('click', startGameFunc);
$duration.addEventListener('change', durationTimeFunc);
$game.addEventListener('click', clickHandlerFunc);



//FUNCTIONS

function startGameFunc(){
    score = 0;
    $result.textContent = score;
    hide($start);
    $game.style.background = 'white';
    $duration.setAttribute('disabled','true');



    const interval = setInterval(()=>{    // nshvac interval  heto kanchuma funkcian
                                        
     let time = +$time.textContent ;

     if(time <= 0){
        clearInterval(interval);
        endGameFunc();
        
                       
     }
     else{
        $time.textContent = (time - 0.1).toFixed(1);
     }

     
    },100);

    renderBox();

    


}

function renderBox(){
    $game.textContent = '';
    const gameSize = $game.getBoundingClientRect().width;
    const index = random(0,colors.length-1);
    const size = random(30, 100);
    const top = random(0, gameSize-size);
    const left = random(0,gameSize-size);

    const box = document.createElement('div');
    box.style.width = box.style.height = size+"px";
    box.style.backgroundColor = colors[index];
    box.style.position = 'absolute';
    box.style.top = top+"px";
    box.style.left = left+"px";
    box.style.cursor = 'pointer';
    box.style.borderRadius = "50%";
    box.setAttribute('data-box', 'true');
    $game.append(box);
    

}

function clickHandlerFunc(e){
   if(e.target.dataset.box){
    score++;
    $result.textContent = score;
    renderBox()
   }
}



function endGameFunc(){
    $game.textContent = '';
    show($start);
    $game.style.background = 'gray';
    $time.textContent = (+$duration.value).toFixed(1);
    $duration.removeAttribute('disabled');



}

function durationTimeFunc(e){
  $time.textContent = (+e.target.value).toFixed(1);
}







// SUPPORT FUNCS

function hide($el){
    $el.classList.add('hide');
}

function show($el){
    $el.classList.remove('hide');
}

function random(min, max){
    return Math.floor(Math.random()*(max-min+1)) + min;
}