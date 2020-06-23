var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$("#level-title").text("Press A Key To Start");

$(document).keypress(function (e) {
  if (!started) {
    $("#level-title").text("Level 0");
    nextSequence();
    started = true;
  }
});

$(".btn").click(function (e) {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  // check user pattern if sequence ended
  if (userClickedPattern.length === gamePattern.length) {
    console.log("User clicked pattern: " + userClickedPattern);
    checkAnswer(userClickedPattern.length - 1);
  }
});

function nextSequence() {
  // print that new level started
  console.log("Beginning next sequence");

  // reset user clicked pattern
  userClickedPattern = [];

  // increase level
  level += 1;

  // update h1 tag
  $("#level-title").text("Level " + level);

  // game chooses random color and displays on screen
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);

  // check game sequence
  console.log("Game pattern: " + gamePattern);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("Checking last color: SUCCESS");
    setTimeout(function () {
      console.clear();
      nextSequence();
    }, 3000);
  } else {
    console.log("Checking last color: WRONG");
    // flash red, play sound, change level title
    $("#level-title").text("Game Over, Press Any Key To Restart");
    $("body").addClass("game-over");
    playSound("wrong");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    // restart on keypress
    $(document).keypress(function (e) {
      startOver();
    });
  }
}

function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
  nextSequence();
}
