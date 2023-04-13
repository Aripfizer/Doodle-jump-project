
window.onload = () => {
  let gameWindow = document.querySelector(".game-wrapper");
  const doodler = document.createElement('div');
  let doodlerLeftSpace = 50;
  let startPoint = 150;
  let doodlerBottomSpace = startPoint;
  let isGameOver = false; 
  let platformCount = 5;
  let platforms = [];
  let upTimerId;
  let downTimerId;
  let isJumping = true;
  let isGoingLeft = false;
  let isGoingRight = false;
  let leftTimerId;
  let rightTimerId;


 const createDoodler = () => {
  console.log("createDoodler")
  doodler.classList.add("ball")
  doodlerLeftSpace = platforms[0].left
  doodler.style.left = doodlerLeftSpace + 'px';
  doodler.style.bottom = doodlerBottomSpace + 'px';

  gameWindow.appendChild(doodler);
 }


 class Platform {
  constructor(newPlatform) {
    this.bottom = newPlatform;
    this.left = Math.random() * 700;
    this.visual = document.createElement('div');

    const visual = this.visual;
    visual.classList.add('support');
    visual.style.left = this.left + 'px';
    visual.style.bottom = this.bottom + 'px';
    gameWindow.appendChild(visual);
  }
 }
 const createPlatforms = () => {
  console.log("createPlatforms")

  for(let i = 0; i < platformCount; i++)
  {
    let platGap = 600 / platformCount;
    let newPlatformBottom = 100 + i * platGap;
    let newPlatform = new Platform(newPlatformBottom);
    platforms.push(newPlatform)
  }
  console.log(platforms)
 }


 const movePlatforms = () => {
  if(doodlerBottomSpace > 200)
  {
    platforms.forEach((platform) => {
      platform.bottom -= 4;
      let visual = platform.visual;
      visual.style.bottom = platform.bottom + 'px';
    }) 
  }
 }


 const jump = () => {
  console.log("Jump")

  clearInterval(downTimerId);
  isJumping = true;
  upTimerId = setInterval(() => {
    doodlerBottomSpace += 20;
    doodler.style.bottom = doodlerBottomSpace + 'px';
    if(doodlerBottomSpace >= startPoint + 200)
    {
      fall();
    }

  }, 30);

 }

 const fall = () => {
  isJumping = false;

  clearInterval(upTimerId);
  downTimerId = setInterval(() => {
    doodlerBottomSpace -= 5;
    doodler.style.bottom = doodlerBottomSpace + 'px';
    if(doodlerBottomSpace <= 0)
    {
      gameOver();
    }
    platforms.forEach((platform) => {
      if(
        (doodlerBottomSpace >= platform.bottom) &&
        (doodlerBottomSpace <= platform.bottom + 30) &&
        ((doodlerLeftSpace + 30) >= platform.left) &&
        (doodlerLeftSpace <= (platform.left + 100)) &&
        !isJumping
        ) {
          console.log("LLLLL")
          startPoint = doodlerBottomSpace;
          
          jump()
        }
    })
  }, 30);
 }

 const gameOver = () => { 
   console.log("game over")
   clearInterval(upTimerId);
   clearInterval(downTimerId);
  isGameOver = true;
 }

 const control = (e) => {
  if (e.key === "ArrowUp") {
    throwTheBallUp();
  } else if (e.key === "ArrowRight") {
    moveRight();
    console.log("Touche de droite enfoncée");
  } else if (e.key === "ArrowLeft") {
    moveLeft();
    console.log("Touche de gauche enfoncée");
  }

 }

 const moveLeft = () => {
  if(isGoingRight) {
    clearInterval(rightTimerId)
  }
  isGoingLeft = true;

  leftTimerId = setInterval(() => {
    if(doodlerLeftSpace >= 0) {
      doodlerLeftSpace -= 5;
      doodler.style.left = doodlerLeftSpace + 'px';
    } else moveRight()
  }, 30);
 }
 const moveRight = () => {
  if(isGoingLeft) {
    clearInterval(leftTimerId)
  }
  isGoingRight = true;
  // clearInterval()
  rightTimerId = setInterval(() => {
    if(doodlerLeftSpace <= 700) {
      doodlerLeftSpace += 5;
      doodler.style.left = doodlerLeftSpace + 'px';
    } else moveLeft()
  }, 30);
 }



 const start = () => {
  if(!isGameOver)
  {
    createPlatforms();
    createDoodler();
    setInterval(movePlatforms, 30);
    jump();
    document.addEventListener("keydown", control);


  }
 }

 start()


};
