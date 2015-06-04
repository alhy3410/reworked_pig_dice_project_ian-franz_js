function Player(playerName, turnScore, totalScore) {
  this.playerName = playerName;
  this.turnScore = turnScore;
  this.totalScore = totalScore;
}

Player.prototype.roll = function() {
  var diceValues = [1, 2, 3, 4, 5, 6];
  var rollValue = diceValues[Math.floor(Math.random() * diceValues.length)];
  if (rollValue === 1) {
    this.turnScore = 0;
  } else {
    this.turnScore += rollValue;
  };
  return rollValue;
}

Player.prototype.score = function() {
  this.totalScore += this.turnScore;
  this.turnScore = 0;
}

function resetFields(){
  $(".player2-rolled-number").text("");
  $(".player2-turn-score").text("");
  $(".player1-rolled-number").text("");
  $(".player1-turn-score").text("");
}

$(function() {
  var allPlayers = [];
  $('#create-player').show();

  $('#computer').click(function(event){
    event.preventDefault();
    $("#create-player").hide();
    $('#create-player-computer').show();
  });

  $('form#create-player-computer').submit(function(event){
    event.preventDefault();
    $(".game").show();
    $(".form-hider").hide();

    var playerName = $('input#player-name').val();
    var player = new Player(playerName, 0, 0 );
    var computer = new Player("Computer", 0, 0 );
    allPlayers.push(player,computer);

    $(".player1-name").text(player.playerName);
    $(".player1-total-score").html("<span class='player1-total-score'>" + player.totalScore + "</span>");
    $(".computer").show();
    $('.computer-name').text(computer.playerName);
    $('#player2info').hide();
    $('#computerinfo').show();
    $('.computer').show();

    $("button#player1-roll").click(function(event) {
      event.preventDefault();
      $('.computer-scored1').hide();
      var playerRolledNumber = player.roll();

      if (playerRolledNumber === 1) {
        $(".player1").hide();
        $(".player1-scored1").show();
        $('#computer_rolls').show();
      }
      $(".player1-rolled-number").text(playerRolledNumber);
      $(".player1-turn-score").text(player.turnScore);
    });

    $("button#player1-hold").click(function(event) {
      event.preventDefault();
      $('#computerRolledNumbers').text("");


      $('.computer-scored1').hide();
      player.score();
      $('#computer_rolls').show();
      $(".player1-total-score").text(player.totalScore);
      resetFields();
      if (player.totalScore >= 100) {
        $(".game").hide();
        $(".player1-victory").show();
      } else {
        $(".player1").hide();
      }

      $('button#computer_rolls').off();
      $('button#computer_rolls').click(function(){
        $(".player1-scored1").hide();
        $('.computer-total-score').text(computer.totalScore);
        $(".player1").hide();

        var rolledOne = false;

        while(computer.turnScore <= 15 && rolledOne === false){
          var computerRolledNumber = computer.roll();
          $('#computerRolledNumbers').append("<p>The Computer Rolled: " + computerRolledNumber + "</p>")
          $('.computer-rolled-number').text(computerRolledNumber);

          if (computerRolledNumber === 1){
            rolledOne = true;
            computer.turnScore = 0;
            $('.computer-scored1').show();
          }
          $('.computer-turn-score').text(computer.turnScore);
        }

        if(computer.turnScore >= 15 || rolledOne === true){
          $('.player1').show();
          $('#computer_rolls').hide();
          $('.computer-total-score').text(computer.totalScore);
          computer.score();
        }

        if(computer.totalScore >= 100){
          $(".game").hide();
          $(".computer-victory").show();
        }

      });
    });
  });

  $("form#create-player").submit(function(event) {
    event.preventDefault();
    $(".game").show();
    $(".form-hider").hide();

    var player1Name = $("input#player1-name").val();
    var player2Name = $("input#player2-name").val();
    var player1 = new Player(player1Name, 0, 0)
    var player2 = new Player(player2Name, 0, 0)
    allPlayers.push(player1,player2);

    $(".player1-name").text(player1.playerName);
    $(".player1-total-score").html("<span class='player1-total-score'>" + player1.totalScore + "</span>");

    $('#player2info').show();
    $('.player2').show();


    $("button#player1-roll").click(function(event) {
      event.preventDefault();
      var player1RolledNumber = player1.roll();
      if (player1RolledNumber === 1) {
        $(".player1").hide();
        $(".player2").show();
        $(".player1-scored1").show();
      }
      $(".player1-rolled-number").text(player1RolledNumber);
      $(".player1-turn-score").text(player1.turnScore);
      $(".player2-scored1").hide();
    });

    $("button#player1-hold").click(function(event) {
      event.preventDefault();
      player1.score();
      $(".player1-total-score").text(player1.totalScore);
      resetFields();
      if (player1.totalScore >= 100) {
        $(".game").hide();
        $(".player1-victory").show();
      } else {
      $(".player1").hide();
      $(".player2").show();
      $(".player2-scored1").hide();
      }
    });

    $(".player2-name").text(player2.playerName);
    $(".player2-total-score").html("<span class='player2-total-score'>" + player2.totalScore + "</span>");

    $("button#player2-roll").click(function(event) {
      event.preventDefault();
      var player2RolledNumber = player2.roll();
      if (player2RolledNumber === 1) {
        $(".player2").hide();
        $(".player1").show();
        $(".player2-scored1").show();
        $(".player1-scored1").hide();
      }
      $(".player2-rolled-number").text(player2RolledNumber);
      $(".player2-turn-score").text(player2.turnScore);
    });

    $("button#player2-hold").click(function(event) {
      event.preventDefault();
      player2.score();
      $(".player2-total-score").text(player2.totalScore);
      resetFields();
      if (player2.totalScore >= 100) {
        $(".game").hide();
        $(".player2-victory").show();
      } else {
      $(".player1").show();
      $(".player2").hide();
      $(".player1-scored1").hide();
      }
    });
  });
});
