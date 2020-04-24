let gamePattern = [];
let userClickedPattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;
var clickCounter = 0;

function playAudio(color){
  let soundMedia = document.createElement('audio');
  soundMedia.setAttribute('src', 'sounds/'+color+".mp3");
  soundMedia.play();
}

let nextSequence = function(){

    clickCounter = 0;
    level++;
    $('h1').text('Level '+ level);
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $('#'+randomChosenColour).fadeOut(100).fadeIn(100);
    playAudio(randomChosenColour);
    console.log('Game: '+gamePattern);
}

let animatePress = function(currentColor){
  $('#'+currentColor).addClass('pressed');
  setTimeout(function(){
    $('#'+currentColor).removeClass('pressed');
  }, 100);
}


$('.btn').click(function(event){

  if(started){
    clickCounter++;
    let userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playAudio(userChosenColor);
    console.log('User: '+userClickedPattern);
    checkAnswer(clickCounter, userChosenColor);
  }
})

$('#clickToPlay').on('click', function(){
  if(document.getElementById('clickToPlay').innerHTML == 'Reset'){
    $('#clickToPlay').text('Click here to Play')
    $('h1').text('Follow the pattern')
    started = false;
    gamePattern = [];
    userClickedPattern = [];
  } else{
    $('#clickToPlay').text('Reset')
    setTimeout(startGame, 1200);
  }

})

function startGame(){
      if(!started){
        started = true;
        nextSequence();
      }
    };

function checkAnswer(clickCounter, userChosenColor){

  let flag = true;
  let result;

  if(clickCounter <= level){
    //cehck userChosenColor is equal to gamePattern[clickCounter-1]
    if(userChosenColor != gamePattern[clickCounter-1]){
      //if if fails, its wrong
      console.log('Wrong');
      result = 'wrong';
    } else{
      //when clickCounter = level, and last color matches the gamePattern[clickCounter-1], its successful
      if(clickCounter == level && userChosenColor == gamePattern[clickCounter-1]){
        console.log('Correct');
        result = 'correct';
      }
    }
  } else {
    console.log('clickCounter > level');
  }

  handleAnswer(result);
}


function handleAnswer(answer){
  if(answer == 'wrong'){
    $('#level-title').text('Game Over!');
    $('body').addClass('game-over');
    setTimeout(function(){
      $('body').removeClass('game-over')
    }, 2000);
    playAudio('wrong');
    level = 0;
    started = false;
    gamePattern = [];
    userClickedPattern = [];
    // startGame();
  } else if(answer == 'correct'){
    userClickedPattern = [];
    setTimeout(nextSequence, 1000);
  }
}

$('#howToPlay').click(function(){
  $("html, body").animate({ scrollTop: $(document).height() }, 1000);
})

// startGame();
