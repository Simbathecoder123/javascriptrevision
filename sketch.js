//3 main function in js. function setup, setting up the environment.
//Then draw function, like app.js, where the actual execution happens, repeated on every frame
//preload, loads everything(images, sounds, gifs, etc.)
var car, penguinimg, penguin, ballimg, ball, playbutton, wall1, wall2, wall3, wall4, wall5, wall6
var box, reward, rewardsGroup, reward1, reward1Group
var gameState = "wait"
var wallimg
var bgimg
var health = 10
var totalHealth = 200



function preload() {
  penguinimg = loadImage("penguinSprite.png")
  ballimg = loadAnimation("enemy1.png", "enemy2.png", "enemy3.png", "enemy4.png", "enemy5.png", "enemy6.png")
  wallimg = loadImage("image.png")
  bgimg = loadImage("bg1.jpg")


}


function setup() {
  // to ensure that display is compatable with any screen
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if (isMobile) {
    canW = displayWidth
    canH = displayHeight
    createCanvas(displayWidth + 80, displayHeight)
  }
  else {
    canW = windowWidth
    canH = windowHeight
    createCanvas(windowWidth, windowHeight)

  }

  // console.log(isMobile +"width: "+canW +"height: "+ canH)

  playbutton = createButton("START THE GAME")
  playbutton.position(canW / 2, canH / 2)
  playbutton.mousePressed(startgame)

  penguin = createSprite(100, height - 50, 50, 10)
  penguin.addImage("idle", penguinimg)

  penguin.scale = 0.5


  ball = createSprite(300, height - 100, 10, 10)

  // spritename.addAnimation("SOME TAG NAME", VARIBALE HAVING IMAGE)
  ball.addAnimation("ballrolling", ballimg)
  ball.scale = 1.75


  wall1 = createSprite(50, 160, 50, 300)
  wall2 = createSprite(250, 450, 50, 300)
  wall3 = createSprite(650, 300, 50, 300)
  wall4 = createSprite(950, 200, 50, 300)
  wall5 = createSprite(1250, 350, 50, 300)
  wall6 = createSprite(425, 400, 50, 300)

  wall1.visible = false
  wall2.visible = false
  wall3.visible = false
  wall4.visible = false
  wall5.visible = false
  wall6.visible = false

  wall1.addImage("wall1", wallimg)
  wall2.addImage("wall2", wallimg)
  wall3.addImage("wall3", wallimg)
  wall4.addImage("wall4", wallimg)
  wall5.addImage("wall5", wallimg)
  wall6.addImage("wall6", wallimg)


  rewardsGroup = new Group()
  reward1Group = new Group()

}

function draw() {
  // console.log(frameCount)
  console.log(frameRate())
  if (gameState === "wait") {
    background("orange")
    ball.visible = false
    penguin.visible = false
  }


  if (gameState == "play") {
    playbutton.hide()

    background(bgimg)
    wall1.visible = true
    wall2.visible = true
    wall3.visible = true
    wall4.visible = true
    wall5.visible = true
    wall6.visible = true

    show_health()
    const SQUARE_SIZE = 20;



    function drawRandomSquare() {

      if (frameCount % 60 == 0) {

        var x, w
        var y, h
        x = Math.round(random(20, width - 20))
        y = Math.round(random(20, height - 20))
        w = Math.round(random(5, 50))
        h = Math.round(random(5, 50))
        reward = createSprite(x, y, w, h)
        reward.shapeColor = "black"
        rewardsGroup.add(reward)
      }

      if (frameCount % 100 == 0) {

        var x, w
        var y, h
        x = Math.round(random(20, width - 20))
        y = Math.round(random(20, height - 20))
        w = Math.round(random(5, 50))
        h = Math.round(random(5, 50))
        reward1 = createSprite(x, y, w, h)
        reward1.shapeColor = "red"
        reward1Group.add(reward1)
      }


    }

    drawRandomSquare()



    ball.visible = true
    penguin.visible = true
    ball.velocityX = Math.round(random(-1, -10))
    ball.velocityY = Math.round(random(-1, -10))



    if (ball.x > width) {
      ball.x = 10
    }


    if (ball.x < 0) {
      ball.x = width - 10
    }


    // keyDown checks which key was pressed


    if (ball.y > height) {
      ball.y = 10
    }

    if (ball.y < 0) {
      ball.y = height - 10
    }

    penguin.x = mouseX - 50
    penguin.y = mouseY - 50

    if (mouseX > width) {
      mouseX = 10
    }

    if (mouseX < 20) {
      mouseX = 70
    }

    if (penguin.isTouching(ball)) {
      penguin.scale -= 0.01
      ball.visible = false
      if (health > 0) {
        health -= 1
      }
      ball.velocityX += 1
    }

    if (penguin.isTouching(wall1)) {
      penguin.scale -= 0.02
      wall1.visible = false
      if (health > 0) {
        health -= 1
      }
      ball.velocityY += 1
    }
    if (penguin.isTouching(wall2)) {
      penguin.scale -= 0.02
      wall2.visible = false
      if (health > 0) {
        health -= 1
      }
      ball.velocityX += 1
    }
    if (penguin.isTouching(wall3)) {
      penguin.scale -= 0.02
      wall3.visible = false
      if (health > 0) {
        health -= 1
      }
      ball.velocityY += 1
    }
    if (penguin.isTouching(wall4)) {
      penguin.scale -= 0.02
      wall4.visible = false
      if (health > 0) {
        health -= 1
      }
      ball.velocityX += 1
    }
    if (penguin.isTouching(wall5)) {
      penguin.scale -= 0.02
      wall5.visible = false
      if (health > 0) {
        health -= 1
      }
      ball.velocityY += 1
    }
    if (penguin.isTouching(wall6)) {
      penguin.scale -= 0.02
      wall6.visible = false
      if (health > 0) {
        health -= 1
      }
      ball.velocityX += 1
    }

    // we use group to group together similar items
    // to create new group syntax is : name of object= new Group()
    // to select a particular item in group we use "get"

    for (var i = 0; i < rewardsGroup.length; i++) {
      if (penguin.isTouching(rewardsGroup.get(i))) {
        penguin.scale = 0.5
        rewardsGroup.get(i).remove()
      }
    }
    for (var i = 0; i < reward1Group.length; i++) {
      if (penguin.isTouching(reward1Group.get(i))) {
        health += 10
        reward1Group.get(i).remove()
      }
    }

    if (health <= 2) {
      gameState = "over"
    }
    if (health >= 200) {
      gameState = "popuplevel2"
    }

  }

  // if (gameState = "popuplevel2") {
  //   popLevel2()

  // }


  if (gameState == "level2") {
    background("cyan")
  }

  if (gameState == "over") {
    gameover()
  }


  drawSprites()
}


function windowResized() {

  resizeCanvas(windowWidth, windowHeight)
}


function startgame() {

  swal({
    title: "The Game STARTS NOW!!",
    text: "ESCAPE THE ENEMY!!!",
    imageUrl: "enemy3.png",
    imageSize: "200x200",
    confirmButtonText: "START ",
    confirmButtonColor: "green"
  },
    function () { gameState = "play" })
}

function popLevel2() {
  swal({
    title: "LEVEL 2",
    text: "GOOD JOB! NOW GO TO LEVEL 2",
    confirmButtonText: "LEVEL 2",
    confirmButtonColor: "green"
  },
    function () { gameState = "level2" })
}


function show_health() {
  // totalHealth = createSprite(200,20,30,300)
  fill(0)
  rect(100, 50, totalHealth, 20)

  fill(255, 0, 0)
  rect(100, 51, health, 19)

}


function gameover() {
  swal({
    title: "GAME OVER",
    text: "YOU LOST",
    confirmButtonText: "RESTART",
    confirmButtonColor: "green"
  },
    function () {
      window.location.reload()
    }
  )

}


// project
// use a textured background, add ur player,rewards and obstacles
// add some enemy.. when player touches the enemy he should
// reduce to half the size n when he touches the obstacle
// he should reduce by 25%


//22-Oct
// create a reward system every time player
// touches that reward it regains it original size
// these rewards need to come randomly on the screen at
// random time and location
// create health bar which will increase on getting rewards
// create anothe health bar which will decrease on touching the obstacles
// now the player will not reduced in size on touching obstacles instead
// health 2 will decrease
//

// 30th oct
// add images
// create different scores for reward1 n 2
// one will affect health other will affect size
// obstacles too should reduce the health
// at no condition health should go below 0
// make the obstacle move around randomly
