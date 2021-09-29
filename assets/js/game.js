// Game States
// "WIN" - Player robot has defeated all enemy-robots
//  * Fight all enemy-robots
//  * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

// Function to generate a random numberic value
var randomNumber = function (min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
};

var fight = function (enemy) {
  // repeat and execute as long as the enemy-robot is alive
  while (enemy.health > 0 && playerInfo.health > 0) {
    // ask the player if they'd like to fight or run
    var promptFight = window.prompt(
      "Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose."
    );

    // If player picks 'skip' confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {
      // Confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // If yes (true), leave fight
      if (confirmSkip) {
        window.alert(
          playerInfo.name + " has chosen to skip the fight! Goodbye!"
        );
        // Subtract money from playerInfo.money for skipping
        playerInfo.money = Math.max(0, playerInfo.money - 10);
        console.log("playerInfo.money", playerInfo.money);
        break;
      }
    }

    // If player chooses to fight, then fight
    if (promptFight === "fight" || promptFight === "FIGHT") {
      // Generate random damage value based on player's attack power
      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

      enemy.health = Math.max(0, enemy.health - damage);
      // Log a resulting message to the console so we know that it worked
      console.log(
        playerInfo.name +
          " attacked " +
          enemy.name +
          ". " +
          enemy.name +
          " now has " +
          enemy.health +
          " health remaining"
      );

      // Check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + " has died!");
        break;
      } else {
        window.alert(
          enemy.name + " still has " + enemy.health + " health left."
        );
      }
      // Generate random number based on enemy's attack power
      var damage = randomNumber(enemy.attack - 3, enemy.attack);

      playerInfo.health = Math.max(0, playerInfo.health - damage);
      // Log a resulting message to the console so we know that it worked
      console.log(
        enemy.name +
          " attacked " +
          playerInfo.name +
          ". " +
          playerInfo.name +
          " now has " +
          playerInfo.health +
          " health remaining"
      );

      // Check player's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + " has died!");
        break;
      } else {
        window.alert(
          playerInfo.name + " still has " + playerInfo.health + " health left."
        );
      }
    } else {
      window.alert("You need to choose a valid option. Try again!");
    }
  }
};
var startGame = function () {
  // Reset player stats
  playerInfo.reset();

  for (var i = 0; i < enemyInfo.length; i++) {
    if (playerInfo.health > 0) {
      // Let player know what round they are in, remember that arrays start at 0, so it needs to have 1 added to it
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

      // Pick new enemy to fight based on the index of the enemyInfo array
      var pickedEnemyObj = enemyInfo[i];

      // Reset enemy.health before starting new fight
      pickedEnemyObj.health = randomNumber(40, 60);

      // Use debugger to pause script from running and check what's going on at that moment in the code
      // debugger;

      // Call fight function with enemy-robot
      fight(pickedEnemyObj);

      // If we're not at the last enemy in the array
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        // Ask if player wants to use the store before next round
        var storeConfirm = window.confirm(
          "The fight is over, visit the store before the next round?"
        );

        // If yes, take them to the store() function
        if (storeConfirm) {
          shop();
        }
      }
    } else {
      window.alert("You have lost your robot in the battle! Game over!");
      break;
    }
    // After the loop ends, player is either out of health or enemies to fight, so run the endGame function
  }

  var endGame = function () {
    // If player is still alive, player wins!
    if (playerInfo.health > 0) {
      window.alert(
        "Great job, you've survived the game! You now have a score of " +
          playerInfo.money +
          "."
      );
    } else {
      window.alert("You've lost your robot in a battle.");
    }

    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
      // Restart the game
      startGame();
    } else {
      window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
  };

  endGame();
};

var shop = function () {
  // Ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
  );

  // Use switch to carry out action
  switch (shopOptionPrompt) {
    case "refill":
    case "REFILL":
      playerInfo.refillHealth()
      break;
    case "upgrade":
    case "UPGRADE":
      playerInfo.upgradeAttack()
      break;
    case "leave":
    case "LEAVE":
      window.alert("Leaving the store.");

      // Do nothing, so function will end
      break;
    default:
      window.alert("You did not pick a valid option. Try again.");

      // Call shop again to force player to pick a valid option
      shop();
      break;
  }
};

var playerInfo = {
  name: window.prompt("What is your robot's name?"),
  health: 100,
  attack: 10,
  money: 10,
  reset: function(){
    this.health = 100,
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function(){
    if(this.money >= 7){
    window.alert("Refilling player's health by 20 for 7 dollars.")
    this.health += 20;
    this.money -= 7;
    } else {
      window.alert("You don't have enough money!")
    }
  },
  upgradeAttack: function(){
    if(this.money >= 7){
    window.alert("Upgrading player's attack by 6 for 7 dollars.")
    this.attack += 6;
    this.money -= 7;
  } else {
    window.alert("You don't have enough money!")
  }
}
};

var enemyInfo = [
  {
    name: "Roberto",
    attack: randomNumber(10, 14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14),
  },
  {
    name: "Robo Tumble",
    attack: randomNumber(10, 14),
  },
];

startGame();
