let gamePattern=[];let userClickedPattern=[];let buttonColors=["red","blue","green","yellow"];var started=!1;var level=0;var clickCounter=0;function playAudio(color){let soundMedia=document.createElement('audio');soundMedia.setAttribute('src','sounds/'+color+".mp3");soundMedia.play()}
let nextSequence=function(){clickCounter=0;level++;$('h1').text('Level '+level);let randomNumber=Math.floor(Math.random()*4);let randomChosenColour=buttonColors[randomNumber];gamePattern.push(randomChosenColour);$('#'+randomChosenColour).fadeOut(100).fadeIn(100);playAudio(randomChosenColour);console.log('Game: '+gamePattern)}
let animatePress=function(currentColor){$('#'+currentColor).addClass('pressed');setTimeout(function(){$('#'+currentColor).removeClass('pressed')},100)}
$('.btn').click(function(event){if(started){clickCounter++;let userChosenColor=event.target.id;userClickedPattern.push(userChosenColor);animatePress(userChosenColor);playAudio(userChosenColor);console.log('User: '+userClickedPattern);checkAnswer(clickCounter,userChosenColor)}})
$('#clickToPlay').on('click',function(){if(document.getElementById('clickToPlay').innerHTML=='Reset'){$('#clickToPlay').text('Click here to Play')
$('h1').text('Follow the pattern')
started=!1;gamePattern=[];userClickedPattern=[]}else{$('#clickToPlay').text('Reset')
setTimeout(startGame,1200)}
level=0})
function startGame(){if(!started){started=!0;nextSequence()}};function checkAnswer(clickCounter,userChosenColor){let flag=!0;let result;if(clickCounter<=level){if(userChosenColor!=gamePattern[clickCounter-1]){console.log('Wrong');result='wrong'}else{if(clickCounter==level&&userChosenColor==gamePattern[clickCounter-1]){console.log('Correct');result='correct'}}}else{console.log('clickCounter > level')}
handleAnswer(result)}
function handleAnswer(answer){if(answer=='wrong'){$('#level-title').text('Game Over!');$('body').addClass('game-over');setTimeout(function(){$('body').removeClass('game-over')},2000);playAudio('wrong');level=0;started=!1;gamePattern=[];userClickedPattern=[]}else if(answer=='correct'){userClickedPattern=[];setTimeout(nextSequence,1000)}}
$('#howToPlay').click(function(){$("html, body").animate({scrollTop:$(document).height()},1000)})
