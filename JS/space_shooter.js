
window.onload = function() {

    var startGame = function() {
        var start = document.getElementById('startbutton');
            start.style.display = 'none';

            document.body.style.overflowY = "hidden";

            var playArea = document.getElementById('playArea');

            // Mise en place des touches de déplacement et de tir.
            var key = {
                right: false,
                left: false,
                up: false,
                down: false
            };

            // Mise en place de l'animation des sprites
            var spriteSequences = {
                bigIdle: [{
                    masque:{
                      height:'25px',
                      width:'25px'
                    },
                    sprite:{
                      positionY:'-60px',
                      positionX:'-18px',
                    }
                },
                {
                    masque:{
                      height:'115px',
                      width:'115px'
                    },
                    sprite:{
                      positionY:'-18px',
                      positionX:'-61px',
                    }
                },
                {
                    masque:{
                      height:'127px',
                      width:'127px'
                    },
                    sprite:{
                      positionY:'-12px',
                      positionX:'-197px',
                    }
                },
                {
                    masque:{
                      height:'115px',
                      width:'115px'
                    },
                    sprite:{
                      positionY:'-18px',
                      positionX:'-346px',
                    }
                },
                {
                    masque:{
                      height:'92px',
                      width:'92px'
                    },
                    sprite:{
                      positionY:'-30px',
                      positionX:'-503px',
                    }
                },
                {
                    masque:{
                      height:'20px',
                      width:'20px'
                    },
                    sprite:{
                      positionY:'-65px',
                      positionX:'-619px',
                    }
                },
                {
                    masque:{
                      height:'10px',
                      width:'9px'
                    },
                    sprite:{
                      positionY:'-70px',
                      positionX:'-642px',
                    }
                }]
            }
            /*
            var enemyExplosionSequences = {
                otherIdle : [
                    {
                        masque:{
                          height:'34px',
                          width:'34px'
                        },
                        sprite:{
                          positionY:'-22px',
                          positionX:'-6px',
                        }
                    },
                    {
                        masque:{
                          height:'34px',
                          width:'34px'
                        },
                        sprite:{
                          positionY:'-22px',
                          positionX:'-44px',
                        }
                    },
                    {
                        masque:{
                          height:'40px',
                          width:'42px'
                        },
                        sprite:{
                          positionY:'-21px',
                          positionX:'-82px',
                        }
                    },
                    {
                        masque:{
                          height:'40px',
                          width:'42px'
                        },
                        sprite:{
                          positionY:'-21px',
                          positionX:'-126px',
                        }
                    },
                    {
                        masque:{
                          height:'48px',
                          width:'48px'
                        },
                        sprite:{
                          positionY:'-18px',
                          positionX:'-173px',
                        }
                    },
                    {
                        masque:{
                          height:'68px',
                          width:'68px'
                        },
                        sprite:{
                          positionY:'-7px',
                          positionX:'-230px',
                        }
                    }
                ]
            }
            */

            // Mise en place des lasers
            var lasers = new Array();
            var laserSpeed = 6;
            var max_lasers = 5;

            // Mise en place des ennemies
            var enemies = new Array();
            var enemySpeed = 2;
            var enemyTotal = 1;
            enemyPosition = {
                x: 150,
                y: -20
            };

            // Mise en place du nombre de vies et de la fin du jeu et du score.
            var lives = 3;
            var gameOver = false;
            var scoreText = 'Score: ';
            var score = 0;
            var livesText = 'Lives: ';
            var stagesText = 'Stage: ';
            var stage = 1;

            // Mise en place du vaisseau et de la balise img qui contiendra le vaisseau dans l'aire de jeu
            var spaceShip = document.createElement('div');
            var xWing = document.createElement('div');
            var spaceShipPosition = {
                x: 0,
                y: 0,
                startX: 0,
                startY: 0
            };
            var spaceShipSpeed = 4;
            var spaceShipWidth = spaceShip.offsetWidth;
            var spaceShipHeight = spaceShip.offsetHeight;
            var spaceShipEnemy, tieFighter, enemyExplode;
            var gameOverText = document.createElement('h2');
            var scoreDiv = document.createElement('div');
            var scoreLabel = document.createElement('p');
            var livesDiv = document.createElement('div');
            var livesLabel = document.createElement('p');
            var stagesDiv = document.createElement('div');
            var stagesLabel = document.createElement('p');
            var photo = document.createElement('img');
            var competences = document.createElement('h3');
            var competencesText = document.createElement('p');
            var experiences = document.createElement('h3');
            var experiencesText = document.createElement('p');
            var formation = document.createElement('h3');
            var formationText = document.createElement('p');

            document.body.appendChild(playArea);
            playArea.classList.add('playarea');
            playArea.appendChild(spaceShip);
            spaceShip.id = 'spaceShip';
            spaceShip.classList.add('spaceship');
            xWing.classList.add('xwing');
            spaceShip.appendChild(xWing);
            xWing.id = 'xwing';
            var xwingExplosion = document.createElement('div');
            spaceShip.appendChild(xwingExplosion);
            xwingExplosion.id = 'xwingExplode';
            xwingExplosion.classList.add('xwingExplode');
            var xwingExplodeTag = window.document.getElementById('xwingExplode');

            playArea.appendChild(scoreDiv);
            scoreDiv.classList.add('scorediv');
            scoreDiv.appendChild(scoreLabel);
            scoreLabel.classList.add('scorelabel');
            playArea.appendChild(livesDiv);
            livesDiv.classList.add('livesdiv');
            livesDiv.appendChild(livesLabel);
            livesLabel.classList.add('liveslabel');
            playArea.appendChild(stagesDiv);
            stagesDiv.classList.add('stagesdiv');
            stagesDiv.appendChild(stagesLabel);
            stagesLabel.classList.add('stagelabel');

            // Initialisation de la position du vaisseau et des limites de l'aire de jeu et vies.
            spaceShipPosition.x = (playArea.offsetWidth / 2) - (spaceShip.offsetWidth / 2);
            spaceShipPosition.y = playArea.offsetHeight - spaceShip.offsetHeight;
            spaceShipPosition.startX = spaceShipPosition.x;
            spaceShipPosition.startY = spaceShipPosition.y;

            playArea.leftBoundary = 0;
            playArea.rightBoundary = playArea.offsetWidth - spaceShip.offsetWidth - 20;
            playArea.topBoundary = 0;
            playArea.bottomBoundary = playArea.offsetHeight - spaceShip.offsetHeight - 20;



            // Initialisation des lasers
            var Laser = function() {
                return document.createElement('div');
            };

            // Initialisation des ennemies
            var Enemy = function() {
                spaceShipEnemy = document.createElement('div');
                tieFighter = document.createElement('div');
                enemyExplode = document.createElement('div');
                tieFighter.classList.add('enemy');
                //tieFighter.setAttribute('id','tieFighter'+id);
                enemyExplode.classList.add('enemyExplode');
                //enemyExplode.setAttribute('id', 'enemyExplode'+id);
                spaceShipEnemy.appendChild(tieFighter);
                spaceShipEnemy.appendChild(enemyExplode);
                return spaceShipEnemy;
            };

            // Initialisation des touches de déplacement
            var keyDown = function(event){
                var code = event.keyCode;

                if (code === 39) {
                    key.right = true;
                } else if (code === 37) {
                    key.left = true;
                }
                if (code === 38) {
                    key.up = true;
                } else if (code === 40) {
                    key.down = true;
                }
                if (code === 88) {
                    if (lasers.length < max_lasers) {
                        var leftLaser = Laser();
                        lasers.push([leftLaser, spaceShipPosition.y]);
                        playArea.appendChild(lasers[lasers.length - 1][0]);
                        leftLaser.classList.add('laser');
                        leftLaser.style.top = spaceShipPosition.y + 10 + 'px';
                        leftLaser.style.left = spaceShipPosition.x + 9 + 'px';
                        var rightLaser = Laser();
                        lasers.push([rightLaser, spaceShipPosition.y]);
                        playArea.appendChild(lasers[lasers.length - 1][0]);
                        rightLaser.classList.add('laser');
                        rightLaser.style.top = spaceShipPosition.y + 85 + 'px';
                        rightLaser.style.left = spaceShipPosition.x + 105 + 'px';
                    }
                }
            };

            var keyUp = function(event) {
                var code = event.keyCode;

                if (code === 39) {
                    key.right = false;
                } else if (code === 37) {
                    key.left = false;
                }
                if (code === 38) {
                    key.up = false;
                } else if (code === 40) {
                    key.down = false;
                }
            };

            // Création des ennemies
            for (var i = 0; i < enemyTotal; i++) {
                var enemy = new Enemy(i);
                enemies.push([enemy, enemyPosition.y]);
                playArea.appendChild(enemies[i][0]);
                enemies[i][0].classList.add('enemyDiv');
                enemies[i][0].style.top = enemies[i][0] + 'px';
                enemies[i][0].style.left = enemyPosition.x + 'px';
                enemyPosition.x += 150;
            }

            // Mise en place du déplacement du vaisseau et vérification que le vaisseau ne se péplace pas hors de l'aire de jeu.
            var spaceShipMove = function() {
                if (key.right === true) {
                    spaceShipPosition.x += spaceShipSpeed;
                } else if (key.left === true) {
                    spaceShipPosition.x -= spaceShipSpeed;
                }
                if (key.up === true) {
                    spaceShipPosition.y -= spaceShipSpeed;
                } else if (key.down === true) {
                    spaceShipPosition.y += spaceShipSpeed;
                }

                if (spaceShipPosition.x < playArea.leftBoundary) {
                    spaceShipPosition.x = playArea.leftBoundary;
                }
                if (spaceShipPosition.x > playArea.rightBoundary) {
                    spaceShipPosition.x = playArea.rightBoundary;
                }
                if (spaceShipPosition.y < playArea.topBoundary) {
                    spaceShipPosition.y = playArea.topBoundary;
                }
                if (spaceShipPosition.y > playArea.bottomBoundary) {
                    spaceShipPosition.y = playArea.bottomBoundary;
                }
                spaceShip.style.left = spaceShipPosition.x + 'px';
                spaceShip.style.top = spaceShipPosition.y + 'px';
            };

            // Ajout et déplacement des lasers
            var lasersMove = function() {
                for (var i = 0; i < lasers.length; i++) {
                    if (parseInt(lasers[i][0].style.top) > playArea.topBoundary) {
                        lasers[i][1] -= laserSpeed;
                        lasers[i][0].style.top = lasers[i][1] + 'px';
                        checkCollision(i);
                    } else {
                        playArea.removeChild(lasers[i][0]);
                        lasers.splice(i, 1);
                    }
                }
            };

            // Ajout et déplacement des ennemies.
            var enemiesMove = function() {
                if (enemies.length < enemyTotal) {
                    var enemy = Enemy();
                    enemies.push([enemy, enemyPosition.y]);
                    playArea.appendChild(enemies[enemies.length - 1][0]);
                    enemies[enemies.length - 1][0].classList.add('enemyDiv');
                    enemies[enemies.length - 1][0].style.top = enemies[enemies.length - 1][1] + 'px';
                    enemies[enemies.length - 1][0].style.left = Math.floor(Math.random() * 350) + 'px';
                }
                for (var i = 0; i < enemies.length; i++) {
                    enemies[i][1] += enemySpeed;
                    enemies[i][0].style.top = enemies[i][1] + 'px';

                    var ex = parseInt(enemies[i][0].style.left);
                    var ey = parseInt(enemies[i][0].style.top);
                    var ew = ex + parseInt(enemies[i][0].offsetWidth);
                    var eh = ey + parseInt(enemies[i][0].offsetHeight);
                    var sx = parseInt(spaceShip.style.left);
                    var sy = parseInt(spaceShip.style.top);
                    var sw = sx + parseInt(spaceShip.offsetWidth);
                    var sh = sy + parseInt(spaceShip.offsetHeight);

                   if (parseInt(enemies[i][0].style.top) > (playArea.bottomBoundary + enemies[i][0].style.height)) {
                        enemies[i][1] = enemyPosition.y;
                        enemies[i][0].style.top = enemies[i][1] + 'px';
                    } else if (sx >= ex && sx <= ew && sy >= ey && sy <= eh) {
                        checkLives();
                    } else if (sw <= ew && sw >= ex && sy >= ey && sy <= eh) {
                        checkLives();
                    } else if (sh >= ey && sy <= eh && sx >= ex && sx <= ew) {
                        checkLives();
                    } else if (sh >= ey && sh <= eh && sw <= ew && sw >= ex) {
                       checkLives();
                    }
                }
            };

            // Animation de l'explosion du xwing
            var bigIdle = function(index){
                var style = xwingExplodeTag.style;
                var sequence = spriteSequences.bigIdle[index];
                  style.width = sequence.masque.width;
                  style.height = sequence.masque.height;
                  style.left = 'calc(50% - '+parseInt(sequence.masque.width)/2+'px)';
                  style.top = 'calc(50% - '+parseInt(sequence.masque.height)/2+'px)';
                  style.backgroundPositionX = sequence.sprite.positionX;
                  style.backgroundPositionY = sequence.sprite.positionY;

              var bigIdleTimeoutId = window.setTimeout( function(){
                 if(spriteSequences.bigIdle[index+1]){
                     if(index >= 3){
                         xWing.style.display = 'none';
                     }
                   bigIdle(index + 1);
                 }else{
                     xWing.style.display = 'block';
                   bigIdle(0);
                 };
               }, 250);
            };

            // Animation de l'explosion du tieFighter
            /*var otherIdle = function(index, tieFighterId, enemyExplodeId){
                //console.log(document.getElementById(enemyExplodeId).style);
                var style = document.getElementById(enemyExplodeId).style;
                var sequence = enemyExplosionSequences.otherIdle[index];
                  style.width = sequence.masque.width;
                  style.height = sequence.masque.height;
                  style.left = 'calc(50% - '+parseInt(sequence.masque.width)/2+'px)';
                  style.top = 'calc(50% - '+parseInt(sequence.masque.height)/2+'px)';
                  style.backgroundPositionX = sequence.sprite.positionX;
                  style.backgroundPositionY = sequence.sprite.positionY;

              var otherIdleTimeoutId = window.setTimeout( function(){
                if(enemyExplosionSequences.otherIdle[index+1]){
                    if(index >= 4){
                        tieFighter.id = tieFighterId;//console.log(tieFighter);
                        tieFighter.style.display = 'none';
                    }
                    otherIdle(index + 1, tieFighterId, enemyExplodeId);
                } else {
                    tieFighter.id = tieFighterId;//console.log(tieFighter);
                    tieFighter.style.display = 'block';
                    otherIdle(0, tieFighterId, enemyExplodeId);
                };
               }, 250);
            };*/

            var removeSpaceShip = function() {
                setTimeout(function () {
                    playArea.removeChild(spaceShip);
                }, 1500);
            };

            // Vérification du nombre de vies et affichage de fin de partie
            var checkLives = function() {
                if (lives > 1) {
                    showCV();
                    resetGame();
                } else {
                    bigIdle(0);
                    removeSpaceShip();
                    for (var i = 0; i < enemies.length; i++) {
                        playArea.removeChild(enemies[i][0]);
                    }
                    if (lasers.length > 0) {
                        for (var i = 0; i < lasers.length; i++) {
                            playArea.removeChild(lasers[i][0]);
                        }
                    }
                    gameOver = true;
                    playArea.appendChild(gameOverText);
                    gameOverText.classList.add('gameover');
                    gameOverText.innerHTML = 'Game Over';
                }
                lives -= 1;
            }

            var showCV = function() {
                if (score == 2500) {
                    enemyTotal = 2;
                    stage = 2;
                    document.body.appendChild(photo);
                    photo.classList.add('photo');
                    photo.classList.add('left');
                    photo.setAttribute('src', 'img/stef.png');

                }
                if (score == 5000) {
                    enemyTotal = 3;
                    stage = 3;
                    document.body.appendChild(competences);
                    competences.classList.add('right');
                    competences.classList.add('competenceslabel')
                    competences.innerHTML = 'Compétences';
                    document.body.appendChild(competencesText);
                    competencesText.classList.add('competencestext');
                    competencesText.classList.add('right');
                    competencesText.innerHTML = 'Photoshop, HTML/CSS, JavaScript, JQuery, JQuery UI, Bootstrap, AngularJS, MongoDB, NodeJS, ExpressJS, Architecture client/serveur, AJAX, MeteorJS, PHP, Symfony2, SQL, Git';
                }
                if (score == 10000) {
                    enemyTotal = 4;
                    stage = 4;
                    document.body.appendChild(experiences);
                    experiences.classList.add('experienceslabel');
                    experiences.classList.add('left');
                    experiences.innerHTML = 'Expériences';
                    document.body.appendChild(experiencesText);
                    experiencesText.classList.add('experiencestext');
                    experiencesText.classList.add('left');
                    experiencesText.innerHTML = 'Développeur web Front End - Infopro Digital Antony.<br> De Décembre 2020 à Janvier 2021.<br><br> Développeur web Front End - ACCOR Issy-les-Moulineaux.<br> De Janvier 2020 à Mars 2020.<br><br> Développeur web Front End - Serious Factory Suresnes.<br> D\' Octobre 2018 à Novembre 2018.<br><br> Développeur web javascript full stack - My Rem Software Saint-Gratien.<br> De Juillet 2017 à Janvier 2018.<br><br> Développeur web full stack php - S4M Paris.<br> De Janvier 2013 à Juillet 2017.';
                }
                if (score >= 15000) {
                    enemyTotal = 5;
                    stage = 5;
                    document.body.appendChild(formation);
                    formation.classList.add('right');
                    formation.classList.add('formationlabel');
                    formation.innerHTML = 'Formation';
                    document.body.appendChild(formationText);
                    formationText.classList.add('right');
                    formationText.classList.add('formationtext');
                    formationText.innerHTML = 'IFOCOP Paris XI Formation professionnelle Développeur Web full stack JavaScript. Titre inscrit au RNCP.<br/>Novembre 2016 à Septembre 2017.<br/>I.U.T. Paris XIII DUT informatique. Octobre 2011 à Octobre 2012.<br/>CIFAP Montreuil Contrat de qualification journaliste Multimédia.';
                }

            }

            // Remise à zéro du jeux
            var resetGame = function() {
                spaceShipPosition.x = spaceShipPosition.startX;
                spaceShipPosition.y = spaceShipPosition.startY;
                spaceShip.style.left = spaceShipPosition.x + 'px';
                spaceShip.style.top = spaceShipPosition.y + 'px';
                enemyPosition.x = 150;
                for (var i = 0; i < enemyTotal; i++) {
                    enemies[i][1] = enemyPosition.y;
                    enemies[i][0].style.top = enemies[i][1] + 'px';
                    enemies[i][0].style.left = enemyPosition.x + 'px';
                    enemyPosition.x += 150;
                }
            };
            /*
            var tieFighterExplodeTag;
            var tieFighterTag;
            var enemyExplodeId;
            var tieFighterId;
            */

            // Gestion des collisions
            var checkCollision = function(l) {
                var lx = parseInt(lasers[l][0].style.left);
                var ly = parseInt(lasers[l][0].style.top);
                for (var i = 0; i < enemies.length; i++) {
                    var ex = parseInt(enemies[i][0].style.left);
                    var ey = parseInt(enemies[i][0].style.top);
                    var ew = enemies[i][0].offsetWidth;
                    var eh = enemies[i][0].offsetHeight;
                    if (lx > ex && lx < ex + ew && ly > ey && ly < ey + eh) {
                        playArea.removeChild(lasers[l][0]);
                        /*tieFighterExplodeTag = document.getElementById('enemyExplode'+i);
                        tieFighterTag = document.getElementById('tieFighter'+i);
                        enemyExplodeId = tieFighterExplodeTag.id;
                        tieFighterId = tieFighterTag.id;
                        otherIdle(0, tieFighterId, enemyExplodeId);
                        setTimeout(function (playArea, enemy) {
                            playArea.removeChild(enemy[0]);
                        }, 200, playArea, enemies[i]);*/
                        playArea.removeChild(enemies[i][0]);
                        lasers.splice(l, 1);
                        enemies.splice(i, 1);
                        score += 100;
                    }
                }
            }

            var scoreUpdate = function() {
                scoreLabel.innerHTML = scoreText + score;
                livesLabel.innerHTML = livesText + lives;
                stagesLabel.innerHTML = stagesText + stage;
            }

            // Ajout des listeners
            document.addEventListener('keydown', keyDown, false);
            document.addEventListener('keyup', keyUp, false);

            // Ajout d'une fonction permettant le rafraichissement de notre jeu.
            var loop = function() {
                if (gameOver === false) {
                    spaceShipMove();
                    enemiesMove();
                    lasersMove();
                    showCV();
                }
                scoreUpdate();
                requestAnimationFrame(loop);
            };

            loop();
    }

    window.document.getElementById('startbutton').onclick = startGame;

}
