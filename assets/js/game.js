var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 82;
// Game States
// "WIN" - Player robot has defeated all enemy-robots
//  * Fight all enemy-robots
//  * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

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
        playerMoney = playerMoney - 10;
        console.log("playerMoney", playerMoney);
        break;
      }
    }

    // If player chooses to fight, then fight
    if (promptFight === "fight" || promptFight === "FIGHT") {
      // Subtract the value of 'playerAttack' from the value of 'enemyHealth'
      enemyHealth = enemyHealth - playerAttack;
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
      // Subtract the value of 'enemyAttack' from the value of 'playerHealth'
      playerHealth = playerHealth - enemyAttack;
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

for (var i = 0; i < enemyNames.length; i++) {
  if (playerHealth > 0) {
      // Let player know what round they are in, remember that arrays start at 0, so it needs to have 1 added to it
    window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

    // Pick new enemy to fight based on the index of the enemyNames array
    var pickedEnemyName = enemyNames[i];

    // Reset enemyHealth before starting new fight
    enemyHealth = 50;

    // Use debugger to pause script from running and check what's going on at that moment in the code
    // debugger;

    // Call fight function with enemy-robot
    fight(pickedEnemyName);
  } else {
      window.alert("You have lost your robot in the battle! Game over!");
      break;
  }
}
