function init() {
    //loadSounds();

    // Initialize world and stage.
    worldWidth = 600;
    worldHeight = 500;

    canvas = document.getElementById("demoCanvas");
    stage = new createjs.Stage(canvas);

    stage.snapToPixelEnabled = true;
    //stage.enableMouseOver(30);

    // make our goal (a yellow square)
    goalColor = createjs.Graphics.getRGB(255,255,50);
    goal = new createjs.Shape();
    goal.graphics.beginFill(goalColor).drawRect(300,250,50,50);// robot at position (10,20) and has size 10X10 px
    goal.regX = 25;
    goal.regY = 25;
    stage.addChild(goal);

    // some basic display text
    goalText = new createjs.Text("Goal", "14px Arial");
    goalText.x = goalPosX; goalText.y = goalPosY;
    goalText.regX = 15;
    goalText.regY = 15;
    stage.addChild(goalText);

    // make our robot (a red square)
    robotColor = createjs.Graphics.getRGB(255,0,0);
    robot = new createjs.Bitmap("robot.png");
    robot.x = 100;
    robot.y = 400;
    robot.initx = robot.x;
    robot.inity = robot.y;
    robot.xpos = 0;
    robot.ypos = 0;
    robot.dx = 1;
    robot.dy = 0;
    robot.regX = 15;
    robot.regY = 15;
    robot.rotation = 12;
    robot.initialRotation = robot.rotation;
    robot.turning = false;
    // This is what you change
    current_state_position={x:robot.xpos, y:robot.ypos, rotation:robot.rotation/57.29578};


    //adding the robot to our stage so it can be visually seen.
    stage.addChild(robot);

    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener("tick", tick_game);
    createjs.Ticker.addEventListener("tick", tick_render);
    this.document.onkeydown = keyPressHandleDown;

    stage.update();
}

function keyPressHandleDown(event){
    switch(event.keyCode) {
        case 37: //keycode left
            moveScreenLeft = true;
            console.log("moving left");
            break;
        case 38: //keycode up
            moveScreenUp = true;
            console.log("moving up");
            break;
        case 39: //keycode right
            moveScreenRight = true;
            console.log("moving right");
            break;
        case 40: //keycode down
            moveScreenDown = true;
            console.log("moving down");
            break;
    }
}

function tick_game(event) {
    current_state_position.x = robot.x - robot.initx;
    current_state_position.y = robot.y - robot.inity;
    current_state_position.rotation = robot.rotation/57.29578;
    updateCommand();
    if(robot.turning){
        robot.turning = false; 
    } else {
        //set_robot_turn
        robot.xpos += robot.dx;
        robot.ypos += robot.dy;

        var robotYMove = 0.3+robot.dx * Math.sin(robot.rotation/57.29578) + robot.dy * Math.cos(robot.rotation/57.29578);
        var robotXMove = robot.dx * Math.cos(robot.rotation/57.29578) - robot.dy * Math.sin(robot.rotation/57.29578);
        robot.x += robotXMove;
        robot.y += robotYMove;
    }
}

function tick_render(event) {
    stage.update(event);
}

function getCorrectionAngle(){
    return Math.atan(robot.y/robot.x) * 57.29578;
}

function get_robot_turn(){
    return robot.rotation/57.29578 + robot.initialRotation/57.29578;
}

function add_robot_turn(rot){

    if(Math.abs(rot) > 0.001){
        //robot.turning = true;
    }
    robot.rotation += rot*57.29578 + (Math.random()-0.5)*20;
}

function set_robot_turn(rot){
    robot.rotation = rot*57.29578 + robot.initialRotation*57.29578;
}

function set_robot_dx(spd){
    robot.dx = spd;
}

function set_robot_dy(spd){
    robot.dy = spd;
}

function get_robot_dx(spd){
    return robot.dx;
}

function get_robot_dy(spd){
    return robot.dy;
}

function get_robot_x(){
    return robot.xpos;
}

function get_robot_y(){
    return robot.ypos;
}
