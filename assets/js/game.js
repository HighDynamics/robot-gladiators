var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;
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

var fight = function (enemyName) {
  // repeat and execute as long as the enemy-robot is alive
  while (enemyHealth > 0 && playerHealth > 0) {
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
        window.alert(playerName + " has chosen to skip the fight! Goodbye!");
        // Subtract money from playerMoney for skipping
        playerMoney = Math.max(0, playerMoney - 10);
        console.log("playerMoney", playerMoney);
        break;
      }
    }

    // If player chooses to fight, then fight
    if (promptFight === "fight" || promptFight === "FIGHT") {
      // Generate random damage value based on player's attack power
      var damage = randomNumber(playerAttack - 3, playerAttack);

      enemyHealth = Math.max(0, enemyHealth - damage);
      // Log a resulting message to the console so we know that it worked
      console.log(
        playerName +
          " attacked " +
          enemyName +
          ". " +
          enemyName +
          " now has " +
          enemyHealth +
          " health remaining"
      );

      // Check enemy's health
      if (enemyHealth <= 0) {
        window.alert(enemyName + " has died!");
        break;
      } else {
        window.alert(enemyName + " still has " + enemyHealth + " health left.");
      }
      // Generate random number based on enemy's attack power
      var damage = randomNumber(enemyAttack-3, enemyAttack);

      playerHealth = Math.max(0, playerHealth - damage);
      // Log a resulting message to the console so we know that it worked
      console.log(
        enemyName +
          " attacked " +
          playerName +
          ". " +
          playerName +
          " now has " +
          playerHealth +
          " health remaining"
      );

      // Check player's health
      if (playerHealth <= 0) {
        window.alert(playerName + " has died!");
        break;
      } else {
        window.alert(
          playerName + " still has " + playerHealth + " health left."
        );
      }
    } else {
      window.alert("You need to choose a valid option. Try again!");
    }
  }
};
var startGame = function () {
  // Reset player stats
  playerHealth = 100;
  playerAttack = 10;
  playerMoney = 10;
  for (var i = 0; i < enemyNames.length; i++) {
    if (playerHealth > 0) {
      // Let player know what round they are in, remember that arrays start at 0, so it needs to have 1 added to it
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

      // Pick new enemy to fight based on the index of the enemyNames array
      var pickedEnemyName = enemyNames[i];

      // Reset enemyHealth before starting new fight
      enemyHealth = randomNumber(40, 60);

      // Use debugger to pause script from running and check what's going on at that moment in the code
      // debugger;

      // Call fight function with enemy-robot
      fight(pickedEnemyName);

      // If we're not at the last enemy in the array
      if (playerHealth > 0 && i < enemyNames.length - 1) {
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
    if (playerHealth > 0) {
      window.alert(
        "Great job, you've survived the game! You now have a score of " +
          playerMoney +
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
      if (playerMoney >= 7) {
        window.alert("Refilling player's health by 20 for 7 dollars.");

        // increase health and decrease money
        playerHealth = playerHealth + 20;
        playerMoney = playerMoney - 7;
      } else {
        window.alert("You don't have enough money!");
      }
      break;
    case "upgrade":
    case "UPGRADE":
      if (playerMoney >= 7) {
        window.alert("Upgrading player's attack by 6 for 7 dollars.");

        // Increase attack and decrease money
        playerAttack = playerAttack + 6;
        playerMoney = playerMoney - 7;
      } else {
        window.alert("You don't have enough money!");
      }
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

startGame();
