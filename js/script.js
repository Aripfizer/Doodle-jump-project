let collisionDetected = false;
let lastSupportTop = 60;
let canStartGame = true;
let ballCenter = null;
let supportCenter = null;
let relicRect = null;
let closestSupport = null;
let minDistance = Infinity;

window.onload = () => {
  let timer = 0;
  let score = 0;
  // const startBtn = document.querySelector('#start-btn');

  // startBtn.addEventListener('click', () => {
  //     canStartGame = true;
  //     console.log(canStartGame);
  // });

  // if(!canStartGame)
  // {
  document.querySelector("#timer").textContent = timer + " s";
  document.querySelector("#score").textContent = score + " point";
  // }
  // else
  // {
    setInterval(() => {
      const ball = document.querySelector(".ball");
      if(ball)
      {
        timer++;
        document.querySelector("#timer").textContent = timer + " s";

      }
  }, 1000);

  setInterval(() => {
    const ball = document.querySelector(".ball");
    if(ball)
    {
      score++;
      let text = "";
      if (score < 2) {
        text = " point";
      } else {
        text = " points";
      }

      document.querySelector("#score").textContent = score + text;
    }
    }, 500);

  createSupport("first-support");
  createBall();

  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp") {
      throwTheBallUp();
    } else if (event.key === "ArrowRight") {
      throwTheBallRight();
      console.log("Touche de droite enfoncée");
    } else if (event.key === "ArrowLeft") {
      throwTheBallLeft();
      console.log("Touche de gauche enfoncée");
    }
  });

  setInterval(createSupport, 2000);
  setInterval(getObjectPositions, 100);
  setInterval(canRemoveSupport, 20);
  setInterval(canRemoveBall, 20);
  fallSupport(document.querySelector(".first-support"));
  //   fallTheBall();
};

// };

const getObjectPositions = () => {
  const supports = document.querySelectorAll(".support");
  const ball = document.querySelector(".ball");
if(ball) 
{
  const ballRect = ball.getBoundingClientRect();

  supports.forEach((support) => {
    const distance = Math.sqrt(Math.pow((support.offsetLeft - ball.offsetLeft), 2) + Math.pow((support.offsetTop - ball.offsetTop), 2));
    
    // Mise à jour du support le plus proche
    if (distance < minDistance) {
      closestSupport = support;
      minDistance = distance;
    } 
  })
  const supportRect = closestSupport.getBoundingClientRect();

  ballCenter = {
    x: ballRect.left + ballRect.width / 2,
    y: ballRect.top + ballRect.height / 2
  }
  
  supportCenter = {
    x: supportRect.left + supportRect.width / 2,
    y: supportRect.top + supportRect.height / 2
  }
  relicRect = {
    x: supportRect.x,
    y: supportRect.y - 30,
    width: 100,
    height: 30
  };


}



}


const canRemoveBall = () => {
  const gameWrapper = document.querySelector(".game-wrapper");
  const wrapperRect = gameWrapper.getBoundingClientRect();
  const ball = document.querySelector(".ball");
  if(ball)
  {
    const ballRect = ball.getBoundingClientRect();

    if (
      ballRect.bottom > wrapperRect.bottom ||
      ballRect.right > wrapperRect.right
    ) {
      ball.remove();
    }
  }
  
}


const canRemoveSupport = () => {
  const supports = document.querySelectorAll(".support");
  const gameWrapper = document.querySelector(".game-wrapper");
  const wrapperRect = gameWrapper.getBoundingClientRect();

  supports.forEach((support) => {
    // console.log("Wrapper Btn ", wrapperRect.bottom )
    // console.log("support Btn ", supportRect.bottom )
    const supportRect = support.getBoundingClientRect();

    if (
      supportRect.bottom > wrapperRect.bottom ||
      supportRect.right > wrapperRect.right
    ) {
      support.remove();
    }
  });
};

// const fallSupport = () => {
//   const supports = document.querySelectorAll(".support");
//   const ball = document.querySelector(".ball");

//   const fallInterval = setInterval(() => {
//       supports.forEach((support) => {
//           const supportRect = support.getBoundingClientRect();
//           let supportTopPosition = supportRect.top;
//           let ballTopPosition = ball.offsetTop;
//           supportTopPosition += 5;
//           ballTopPosition += 5;
//           support.style.top = supportTopPosition + 'px';
//           ball.style.top = ballTopPosition + 'px';
//       })
//   }, 800);
// };

const fallTheBall = () => {
  const ball = document.querySelector(".ball");
  let topPosition = ball.getBoundingClientRect().top;

  const fallInterval = setInterval(() => {
    topPosition += 5;
    ball.style.top = topPosition + "px";
  }, 200);
};

const throwTheBallUp = () => {
  const ball = document.querySelector(".ball");
  console.log(ball);

  const currentTransform = window
    .getComputedStyle(ball)
    .getPropertyValue("transform");
  let currentY = parseInt(currentTransform.split(",")[5]);
  let oldCurrent = currentY;

  if (!currentY) {
    currentY = 1;
  }

  // console.log(currentTransform)
  const newY = currentY - 50;
  ball.style.transform = `translateY(${newY}px)`;
  // fallTheBall()

  setTimeout(function () {
    ball.style.transform = `translateY(${newY + 50}px)`;
  }, 500);
  // detectCollision()
};

const throwTheBallRight = () => {
  const ball = document.querySelector(".ball");
  console.log(ball);

  const currentTransform = window
    .getComputedStyle(ball)
    .getPropertyValue("transform");
  let currentX = parseInt(currentTransform.split(",")[4]);
  if (!currentX) {
    currentX = 1;
  }
  const newX = currentX + 50;
  ball.style.transform = `translateX(${newX}px)`;
};

const throwTheBallLeft = () => {
  const ball = document.querySelector(".ball");
  console.log(ball);

  const currentTransform = window
    .getComputedStyle(ball)
    .getPropertyValue("transform");
  let currentX = parseInt(currentTransform.split(",")[4]);

  if (!currentX) {
    currentX = 1;
  }
  const newX = currentX - 50;
  ball.style.transform = `translateX(${newX}px)`;
};

const createBall = () => {
  let ball = document.createElement("div");

  // Appliquer les styles pour la boule
  ball.style.width = "30px";
  ball.style.height = "30px";
  ball.style.borderRadius = "100%";
  ball.style.position = "absolute";
  ball.classList.add("ball");

  ball.style.backgroundColor = "#3b82f6";

  let firstSupport = document.querySelector(".first-support");
  let gameWrapper = document.querySelector(".game-wrapper");

  var position = {
    top: firstSupport.offsetTop,
    left: firstSupport.offsetLeft,
  };

  ball.style.top = position.top - 30 + "px";
  ball.style.left = position.left + 30 + "px";

  console.log(position);
  gameWrapper.appendChild(ball);
};

const createSupport = (className) => {
  const ball = document.querySelector(".ball");
  
  if(className)
  {
    fallSupport(createDiv(className));
  }else if(ball) {
    fallSupport(createDiv());
    const supports = document.querySelectorAll(".support");
    if(supports.length)
    {
      supports.forEach((support) => {
        const distance = Math.sqrt(Math.pow((support.offsetLeft - ball.offsetLeft), 2) + Math.pow((support.offsetTop - ball.offsetTop), 2));
        
        // Mise à jour du support le plus proche
        if (distance < minDistance) {
          closestSupport = support;
          minDistance = distance;
        } 
      })
    }
  }


  
};

const createDiv = (className) => {
  let div = document.createElement("div");

  div.style.width = "100px";
  div.style.height = "30px";
  div.style.position = "absolute";
  div.style.bottom = lastSupportTop + "px";
  div.style.left = randomize() + "px";
  div.style.backgroundColor = "#030712";
  div.classList.add("support");
  lastSupportTop += 30;

  if (className) div.classList.add(className);

  let gameWrapper = document.querySelector(".game-wrapper");
  gameWrapper.appendChild(div);
  return div;
}


const fallSupport = (div) => {
  const ball = document.querySelector(".ball");
  if(ball)
  {
      // const supportRect = div.getBoundingClientRect();
      // const ballRect = ball.getBoundingClientRect();

      // let ballCenter = {
      //   x: ballRect.left + ballRect.width / 2,
      //   y: ballRect.top + ballRect.height / 2
      // }
      
      // let supportCenter = {
      //   x: supportRect.left + supportRect.width / 2,
      //   y: supportRect.top + supportRect.height / 2
      // }

      

      // const supports = document.querySelectorAll(".support");

      // supports.forEach(support => {
        
      // });

      if (ballCenter.x >= relicRect.x && ballCenter.x <= relicRect.x + relicRect.width && ballCenter.y >= relicRect.y && ballCenter.y <= relicRect.y + relicRect.height) {
            console.log("Collision detected")
            
            // Le centre de gravité de la balle se trouve à l'intérieur de la zone virtuelle
            // Faire quelque chose ici
      }
      else {
          console.log("No Collision")
        }
console.log("Pret ", closestSupport)
      // const fallInterval = setInterval(() => {
      //   let ballTopPosition = ball.offsetTop;
      //   // const supportRect = div.getBoundingClientRect();
      //   let supportTopPosition = div.offsetTop;
        
      //   supportTopPosition += 5;
      //   ballTopPosition += 5;

      //   div.style.top = supportTopPosition + 'px';
      //   ball.style.top = ballTopPosition + 'px';
      //   if (ballCenter.x >= relicRect.x && ballCenter.x <= relicRect.x + relicRect.width && ballCenter.y >= relicRect.y && ballCenter.y <= relicRect.y + relicRect.height) {
      //     console.log("Collision detected")
          
      //     // Le centre de gravité de la balle se trouve à l'intérieur de la zone virtuelle
      //     // Faire quelque chose ici
      //   }
      //   else {
      //       console.log("No Collision")
      //     }
      //   }, 400);
      }
 
}


//Génere de façon aléatoire soit 0 soit 300 ou soit 700
const randomize = () => {
  return Math.floor(Math.random() * 701);
};

const detectCollision = () => {
  const ball = document.querySelector(".ball");
  const supports = document.querySelectorAll(".support");

  const ballRect = ball.getBoundingClientRect();
  const ballBottom = ballRect.bottom;

  supports.forEach((support) => {
    const supportRect = support.getBoundingClientRect();
    const supportBottom = supportRect.bottom;

    if (
      ballRect.bottom >= supportRect.top &&
      ballRect.top <= supportRect.bottom &&
      ballRect.right >= supportRect.left &&
      ballRect.left <= supportRect.right
    ) {
      console.log(supportBottom);
      console.log(ballBottom);

      if (ballBottom >= supportBottom - 30) {
        collisionDetected = true;
        // const ballRect = ball.getBoundingClientRect();
        console.log("Applay ");
        // Empêchez la balle de descendre en la positionnant juste au-dessus du support

        ball.style.transform = `translateY(${ball.offsetHeight - 30}px)`;
      }

      // const currentTransform = window.getComputedStyle(support).getPropertyValue('transform');
      // let currentY = parseInt(currentTransform.split(',')[5]);

      // // if(!currentY)
      // // {
      // //     currentY = 1;
      // // }

      // // console.log(currentTransform)
      // const newY = currentY - 30;
      // ball.style.transform = `translateY(${newY}px)`;
      console.log("Collision détectée");
    } else {
      collisionDetected = false;

      console.log("Pas Collision détectée");
    }
  });
};
