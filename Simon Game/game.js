var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = new Array();
var userClickedPattern = new Array();
var level = 0;
var started = 0;

function nextSequence() {
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];

    animatePress(randomChosenColour);
    playSound(randomChosenColour);

    gamePattern.push(randomChosenColour);
    level++;
    $("#level-title").html("Level " + level);
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    },100);
}

function playSound(colour) {
    var audioSrc = "sounds/" + colour + ".mp3";
    var audio = new Audio(audioSrc);
    audio.play();
}


$( ".btn" ).click(function() {
    started = 1;
    var userChosenColour = $(this).attr("id")
    userClickedPattern.push(userChosenColour);
    
    animatePress(userChosenColour);
    playSound(userChosenColour);
    
    checkAnswer(userClickedPattern.length - 1);
});

$(document).on('keypress',function(e) {
    if(e.which === 65 || e.which === 97) {
        startOver();
        $("#level-title").html("Level " + level)
        setTimeout(()=> (nextSequence()), 500);
    }
});

function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length && started === 1) {
            setTimeout(() => (nextSequence()), 1000);
            userClickedPattern = [];
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(() => {
            $("body").removeClass("game-over");
        },200);

        $("#level-title").html("Game Over, Press A to Restart");
        
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = 0;
}