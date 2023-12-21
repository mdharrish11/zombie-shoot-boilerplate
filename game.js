// Iteration 1: Declare variables required for this game
let time = 60;
let zombieID = 0;



// Iteration 1.2: Add shotgun sound
let game_body = document.getElementById('game-body')
let shotgunSound = new Audio('./assets/shotgun.wav');
 
game_body.onclick = function(){
    shotgunSound.pause()
    shotgunSound.currentTime = 0;
    shotgunSound.play();
    backgroundSound.play();
}

// Iteration 1.3: Add background sound
let backgroundSound = new Audio('./assets/bgm.mp3');
backgroundSound.play();
backgroundSound.loop = true;

// Iteration 1.4: Add lives
let totalLives = 4;
let currentLives = 4;
let maxLivesDiv = document.getElementById('max-lives');

updateLive()
maxLivesDiv.innerHTML += "totalLives" + currentLives
function updateLive(){
     let currLivesDiv = document.getElementById('lives');
    currLivesDiv.innerText = "CurrentLives" + currentLives 
 }

// Iteration 2: Write a function to make a zombie
function makeZombie(){
 let zombie = document.createElement('img')
 let randomNum = randomNumber(1, 6)
 
 zombie.src = `./assets/zombie-${randomNum}.png`
 zombie.classList = "zombie-image"
 zombie.setAttribute('id', zombieID)

 let horiZontalRange = randomNumber(0,85)
 zombie.style.transform = `translateX(${horiZontalRange}vw)`
 let speed = randomNumber(1,6)
 zombie.style.animationDuration = `(${speed}s`
 game_body.appendChild(zombie)
 zombie.onclick = function(){
    destroyZombie(zombie)}

}





// Iteration 3: Write a function to check if the player missed a zombie
function missedZombie(zombie) {
  if (zombie.getBoundingClientRect().top <= 0){
    currentLives--
    updateLive()
    destroyZombie(zombie)
  }
}

// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function destroyZombie(zombie) {
 zombie.style.display = 'none'
 zombieID++;
 makeZombie() 
}
// Iteration 5: Creating timer
let interval = setInterval(function()  {
    time--;
    document.getElementById('timer').innerHTML = time
    let zombie = document.getElementById(zombieID)
   if(missedZombie(zombie)){
    destroyZombie(zombie)
}
if(currentLives <= 0){
    clearInterval(interval)
        location.href = 'game-over.html'
    }

    if(time <= 0){
        clearInterval(interval)
        location.href = 'win.html'
    }
},1000)


// Iteration 6: Write a code to start the game by calling the first zombie
makeZombie() 

// Iteration 7: Write the helper function to get random integer
function randomNumber (min, max){ 
    let num = Math.floor(Math.random()*(max-min+1)) +min
    return num;
}