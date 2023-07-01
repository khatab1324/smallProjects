console.log(gsap);
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); //ctx=context //and context it huge api that you can draw through it
canvas.width = innerWidth; //it same window.innerWidth but if you write innerWidth the browser will understand
canvas.height = innerHeight;

// ============================creat player===================
class Player {
  constructor(x, y, raduis, color) {
    //now when we pass new player we can give it new color new raduis new...
    // proprity position and shap and color
    this.x = x;
    this.y = y;
    this.raduis = raduis;
    this.color = color;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.raduis, 0, Math.PI * 2); //for draw circal
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

// ============================creat projectile==================
class Projectile {
  constructor(x, y, raduis, color, vilocity) {
    //vilocity becuase we know the obj is moving
    this.x = x;
    this.y = y;
    this.raduis = raduis;
    this.color = color;
    this.vilocity = vilocity;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.raduis, 0, Math.PI * 2); //for draw circal
    ctx.fillStyle = this.color;
    ctx.fill(); //fill the circal
  }
  update() {
    this.draw(); //now we update the draw inside this proprity
    this.x = this.x + this.vilocity.x;
    this.y = this.y + this.vilocity.y;
  }
}
// =====================creat Enemy=======================
class Enemy {
  constructor(x, y, raduis, color, vilocity) {
    //vilocity becuase we know the obj is moving
    this.x = x;
    this.y = y;
    this.raduis = raduis;
    this.color = color;
    this.vilocity = vilocity;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.raduis, 0, Math.PI * 2); //for draw circal
    ctx.fillStyle = this.color;
    ctx.fill(); //fill the circal
  }
  update() {
    this.draw(); //now we update the draw inside this proprity
    this.x = this.x + this.vilocity.x;
    this.y = this.y + this.vilocity.y;
  }
}

function spawnEnemy() {
  setInterval(() => {
    const raduis = Math.random() * (50 - 20) + 20; //that give the interval between 20 and 50 that mean the min is 20 and max is 50
    let x;
    let y;
    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - raduis : canvas.width + raduis; //its say if radnom is less than 0.5 make the enemy come form left if its greater then 0.5 let the enemy come form right
      y = Math.random() * canvas.height;
    } else {
      x = Math.random() * canvas.width;
      y = Math.random() < 0.5 ? 0 - raduis : canvas.height + raduis;
    }
    const color = `hsl(${Math.random() * 360},50%,50%)`;
    const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
    const vilocity = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };

    enemies.push(
      //puch class

      new Enemy(x, y, raduis, color, vilocity)
    );
  }, 600);
}

//================================animation ==================================

let animationId;
let lifes = 3;
function animate() {
  //its draw every thing
  animationId = requestAnimationFrame(animate); //now it loop over and over and draw...
  ctx.fillStyle = "rgb(0,0,0,0.09)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  firstPlayer.draw(); //to draw the player after clear all canves
  //  ===this for progectiles===
  projectiles.forEach((projectile, index) => {
    projectile.update();
    // delete projectile if it out of screen and I put it here to update it
    if (
      projectile.x + projectile.raduis < 0 ||
      projectile.x - projectile.raduis > canvas.width ||
      projectile.y + projectile.raduis < 0 ||
      projectile.y - projectile.raduis > canvas.height
    ) {
      setTimeout(() => {
        projectiles.splice(index, 1);
      }, 0);
    }
  });
  // ===this for draw enemy===
  enemies.forEach((enemy, index) => {
    //give it name index
    //this is draw the enemy
    enemy.update();
    const distanceBetweenPlayerAndEnemy = Math.hypot(
      firstPlayer.x - enemy.x,
      firstPlayer.y - enemy.y
    );

    if (distanceBetweenPlayerAndEnemy - enemy.raduis - firstPlayer.raduis < 1) {
      lifes -= 1;
      console.log(lifes);
      if (lifes === 0) {
        cancelAnimationFrame(animationId);
      }
      enemies.splice(index, 1); //delete enemy if it touch the player
    }
    // this for new projectile that to calc the destance not update
    projectiles.forEach((projectile, projectilesindex) => {
      //give it name projectilesindex
      const distanceBetweenProjAndEnemy = Math.hypot(
        projectile.x - enemy.x,
        projectile.y - enemy.y
      ); //stand for hypotenuse that destans between two point
      // when enemy and projectile touch
      if (distanceBetweenProjAndEnemy - enemy.raduis - projectile.raduis < 1) {
        // there flash boge when remove form array to remove it use setTimeout
        if (enemy.raduis - 15 > 15) {
          gsap.to(enemy, {
            //its shirnk the enemy if they large
            raduis: enemy.raduis - 15,
          });
          setTimeout(() => {
            projectiles.splice(projectilesindex, 1);
          }, 0);
        } else {
          setTimeout(() => {
            enemies.splice(index, 1);
            projectiles.splice(projectilesindex, 1);
          }, 0);
        }
      }
    });
  });
}

// =============lists==============
const projectiles = [];
const enemies = [];

// =========make player
const firstPlayer = new Player(
  canvas.width / 2,
  canvas.height / 2,
  30,
  "white"
);

addEventListener("click", (event) => {
  console.log(projectiles);
  // calculate the angle that where the projectile should go ,and that depend where you press
  const angle = Math.atan2(
    event.clientY - canvas.height / 2,
    event.clientX - canvas.width / 2
  );
  console.log(angle);
  projectiles.push(
    new Projectile(canvas.width / 2, canvas.height / 2, 15, "orange", {
      //this vilacity
      x: Math.cos(angle) * 5,
      y: Math.sin(angle) * 5,
    })
  );
});
animate();
spawnEnemy();
