// game starter function, and the management of the game 
let gameManager = {
    setGameStart: function(classType) {
        this.resetPlayer(classType);
        this.setPreFight();
    },

    // class types of resetting the player 
    resetPlayer: function(classType) {
        switch(classType) {
            case 'gatomon':
            player = new Player(classType, 150, 0, 200, 100, 50);
            break; 
            case 'patamon':
            player = new Player(classType, 100, 0, 100, 150, 200);
            break; 
            case 'renamon':
            player = new Player(classType, 200, 0, 200, 150, 200);
            break
            case 'terriermon':
            player = new Player(classType, 250, 0, 80, 150, 100);
            break;
        }
        // this will display the stats of the digimon once clicked 
        let getInterface = document.querySelector(".interface");
        getInterface.innerHTML = '<img src="./assets/images/player' + classType.toLowerCase() + '.png class= "img-player"><div><h3>' + '</h3><p>Health:' + player.health + '</p><p>Mana:' + player.mana + '</p><p>Strength:' + player.strength + '</p><p>Agility:' + player.agility + '</p><p>Speed:' + player.speed + '</p></div>'
    },
    // setting up our fight function 
    setFight: function(){
        let getHeader = document.querySelector("#header")
        let getActions = document.querySelector("#attackButton")
        let getEnemy= document.querySelector("#available-enemies")
        // building our enemy 
        let Enemy00 = new Enemy("Agumon1", 100, 0, 50, 100, 100);
        let Enemy01 = new Enemy("Agumon2", 200, 0, 100, 100, 100);
        let Enemy02 = new Enemy("Agumon3", 300, 0, 150, 100, 100);
        let chooseRandomEnemy = Math.floor(Math.random() * Math.floor (3));
        console.log(chooseRandomEnemy);
        switch (chooseRandomEnemy) {
            case 0:
            Enemy=Enemy00; 
            break;
            case 1: 
            Enemy=Enemy01;
            break;
            case 2: 
            Enemy=Enemy02;
            break;
        }
        getHeader.innerHTML = '<p>Attack the enemy</p>'
        getActions.innerHTML = '<a href="#" class="btn-prefight" onclick="PlayerMoves.calcAttack()">Attack!</a>';
        getEnemy.innerHTML = '<img src="./assets/images/agumon.gif/' + enemyType.toLowerCase() + '.png "alt="img-player"><div><h3>' + enemyType + '</h3><p>Health: ' + enemy.health + '</p><p> Mana: ' + enemy.mana + '</p><p>Strength: ' + '</p><p>Agility: ' + enemy.agility + '</p><p>Speed: ' + enemy.speed + '</p></div>'
    }
} 

/*************** Player stats *********************/
// I want the player to have health, mana, strength, agility, and speed data 
let player; 

class Player {
    constructor(classType, health, mana, strength, agility, speed) {
        this.classType = classType;
        this.health = health; 
        this.mana = mana; 
        this.strength = strength; 
        this.agility = agility; 
        this.speed = speed;
    }
}

// Calculate who will attack first
let playerMoves = {
    calcAttack: function () {
        let getPlayerSpeed = Player.speed;
        let getEnemySpeed = Enemy.speed;

// Calculating player attacks and how much they will strike for 
// if they do not have mana then we will use agility to subsitute 
let playerAttack = function() {
    let calcBaseDamage; 
    if (player.mana > 0) {
        calcBaseDamage = player.strength * player.mana / 1000; 
    } else {
        calcBaseDamage = player.strength * player.agility / 1000; 
    }
    let offsetDamage = Math.floor(Math.random() * Math.floor(10));
    let calcOutputDamage = calcBaseDamage + offsetDamage; 
    // number of hits and attack value 
    let numberOfHits = Math.floor(Math.random() * Math.floor(player.agility / 10) / 2) + 1; 
    let attackValues = [calcOutputDamage, numberOfHits]; 
    return attackValues; 
}

// Enemy Attack Calculation 
// calculating the enemy will be the same as the player attack 
let enemyAttack = function (){ 
    let calcBaseDamage;
    if (enemy.mana > 0) {
        calcBaseDamage = enemy.strength * enemy.mana / 1000; 
    } else {
        calcBaseDamage = enemy.strength * enemy.agility / 1000; 
    }
    let offsetDamage = Math.floor(Math.random() * Math.floor(10));
    let calcOutputDamage = Math.floor(Math.random() * Math.floor(player.agility / 10) / 2) + 1;
    let attackValues =  [calcOutputDamage, numberOfHits];
    return attackValues;
}

// get player & enemy health 
let getPlayerHealth = document.querySelector(".health-player");
let getEnemyHealth = document.querySelector(".health-enemy");

// Attack time! 
if (getPlayerSpeed >= getEnemySpeed) {
    let playerAttackValues = playerAttack ();
    let totalDamage = playerAttackValues[0] * playerAttackValues[1];
    enemy.health = enemy.health - totalDamage;

    alert("You hit" + playerAttackValues[0] + "damage" + playerAttackValues[1] + "times");

    if (enemy.health <= 0) {
        alert("You win! Refresh browser to play again."); 
        getPlayerHealth.innerHTML = 'Health:' + player.health;
        getEnemyHealth.innerHTML = "Health: 0";
    } else {
        getEnemyHealth.innerHTML = 'Health:' + enemy.health;
        
        // enemy attack
        let enemyAttackValues = enemyAttack(); 
        let totalDamage = enemyAttackValues[0] * enemyAttackValues[1];
        player.health = player.health - totalDamage;

        alert("Enemy hit" + enemyAttackValues[0] + "damage" + enemyAttackValues[1] + "times");

        if(player.health <= 0) {
            alert("You lose! Refresh browser to play again.");
            getPlayerHealth.innerHTML = 'Health: 0';
            getPlayerHealth.innerHTML = "Health: 0" + enemy.health
        } else {
            getPlayerHealth.innerHTML = 'Health:' + player.health;
        }
        } 
    }
    }
}

// enemy stats
function enemy(enemyType, health, mana, strength, agility, speed) {
    this.enemyType = enemyType; 
    this.health = health; 
    this.mana = mana; 
    this.strength = strength; 
    this.agility = agility; 
    this.speed = speed; 
}


// I want to build the characters to have multiple data types: mana, health, agility, speed, strength, etc. 
// I wan to be able to calculate the attack value by using the data types
// I want the screen to populate with those data attributes once clicked upon, and for the enemy to populate as well
// the enemy will be generated by math.floor and the stats will be assigned 
// the user will be able to click attack to deal damage to the enemy
// once either of the players hp hits 0 then the game will be able to restart