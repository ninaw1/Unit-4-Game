// I referenced a lot of help from here: https://github.com/vshimpi100/unit-4-game, since we did not learn jQuery I had to pull a lot of help
// I know this code is in jQuery; I was really trying to make the game work with just JS but the rpg game was not functioning as I wanted 
// I couldn't get my javascript file to work in time, so I had to reference a successful jQuery code to get my app to work 
$( document ).ready(function() {

    // All code in here

    var yourCharacter;
    var defender;
    var characterSelected = false;
    var defenderSelected = true;
    var yourCharacterPower;
    var yourCharacterHp;
    var defenderPower;
    var defenderHp;
    var attack;
    var attackPlus;
    
function startGame() {

        reset();
            // This will hide the dialogue box until active 
            $('#attack-dialogue').hide();
            // once one of the digimon is clicked, then the character will be moved to populate the arena field 
            // the other digimon are able to move to the enemy field 
            // this will be similar to the onclick function of javascript 
            $('body').on('click', '.character', function(){
                
                    $(this).removeClass('col-md-3 character').addClass('col characterSelected');
                    yourCharacter = $(this).data("name");
                     $('.characterSelected').appendTo('#your-character');
                    console.log(yourCharacter);
                    
                    $('.character').appendTo('#available-enemies').removeClass('character').addClass('defender');
                    
                    yourCharacterPower = $(this).data("power");
                    console.log('Power = ' + yourCharacterPower);

                    attackPlus = $(this).data("power");
                    console.log('attackPlus = ' + attackPlus);

                    yourCharacterHp = $(this).data("hp");
                    console.log('HP = ' + yourCharacterHp);
                    
            });
            $('body').on('click','.defender' , function(){
                
                $(this).removeClass('col-md-3 defender').addClass('col enemySelected');
                
                defender = $(this).data("name");
                console.log(defender);
               
                $('.enemySelected').appendTo('#the-defender');
               
                defenderPower = $(this).data("power");
                console.log('Power = ' + defenderPower);

                defenderHp = $(this).data("hp");
                console.log('HP = ' + defenderHp);
    
            });     
            // This will be our fight button and with each attack it will populate the field with how much your attacked for and how much you are counterattacked for
            $('body').on('click','#fight-btn' , function(){
                
                attack();

                $('#attack-dialogue').show().html('<p>' + 'You attacked ' + defender + ' for ' + yourCharacterPower + ' damage' + '<p>' + 
                '<p>' + defender + ' counter attacked you ' +  ' for ' + defenderPower + ' damage' + '<p>');

                if (defenderHp <= 0) {
                    $('.enemySelected').addClass('hide').removeClass('enemySelected');   
                }
                if (yourCharacterHp <= 0) {
                    $('.characterSelected').addClass('hide').removeClass('characterSelected'); 
                    $('.btn-danger').text('RESET');
                    $('.btn-danger').click(function() {
                        location.reload();
                    });    
                } 
            });

        }; 
        // starting our game  
            function attack() {
                    yourCharacterHp -= defenderPower;
                    $("#your-character #hp").text(yourCharacterHp);
                    console.log('yourCharacterHp = ' + yourCharacterHp);    
                    
                    defenderHp -= yourCharacterPower;
                    $("#the-defender #hp").text(defenderHp);
                    console.log('defenderHp = ' + defenderHp);

                    yourCharacterPower = yourCharacterPower + attackPlus;
                    console.log('yourCharacterPower = ' + yourCharacterPower);
            }
        function reset () {     
        }
            startGame();  
}); 