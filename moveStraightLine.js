var WORLD_TO_GAME_CONST = 20;


var goalPosX = 5*WORLD_TO_GAME_CONST; // center of goal mat x pos
var goalPosY = -4*WORLD_TO_GAME_CONST; // center of goal mat y pos

DESIRED_STATE_X = 4 * WORLD_TO_GAME_CONST;
DESIRED_STATE_Y = 0 * WORLD_TO_GAME_CONST;

var STOP_THRESHOLD = 0.1 * WORLD_TO_GAME_CONST;

//get_robot_x() // x value of robot coordinates
//get_robot_y() // y value of robot coordinates
//get_robot_dx() // x speed of robot in robot coordinates, positive makes robot go forward
//get_robot_dx() // y speed of robot in robot coordinates, positive makes robot go right and vice versa
//get_robot_turn() // which direction the robot is facing towards in terms of radians.
//set_robot_dx(spd)
//set_robot_dy(spd)
//set_robot_turn(rot); // change robot's turning by rot radians. Robot will stand in place while turning.
//add_robot_turn(rot); // change robot's turning by rot radians. Robot will stand in place while turning.

destination_position = {x: 200, y: -154};

function updateCommand(){
    // here is where you do stuff;
    // by default, the robot moves in a straight line.
    var offset_from_dest = {
        x: current_state_position.x - destination_position.x,
        y: current_state_position.y - destination_position.y
    }; 
    var distance_remaining = Math.sqrt(offset_from_dest.x*offset_from_dest.x + offset_from_dest.y*offset_from_dest.y);

    var robotXVel = distance_remaining > STOP_THRESHOLD ? 1 : 0;
    var robotYVel = 0;

    set_robot_dx(robotXVel);
    set_robot_dy(robotYVel);

    var robotTurnAmt = getCorrectionAngleToDestination();
    if(distance_remaining > STOP_THRESHOLD){
        add_robot_turn(robotTurnAmt);
    }
    
}

function getCorrectionAngleToDestination(){
    var destx = destination_position.x;
    var desty = destination_position.y;
    var posx = current_state_position.x;
    var posy = current_state_position.y;
    console.log(posy);
    // normalize to angle from north
    var angle_to_destination = angle_from_north(destx-posx, desty-posy);
    //console.log(angle_to_destination)
    //console.log(angle_to_destination);

    var current_angle = current_state_position.rotation;
    return angle_to_destination-current_angle;//angle_to_destination - current_angle;
}

function angle_from_north(x, y){
    var normx = x/Math.sqrt(x*x+y*y);
    var normy = y/Math.sqrt(x*x+y*y);

    //console.log(normx);
    //console.log(normy);
    var northx = 1;
    var northy = 0;

    var acute_angle = Math.acos(northx*normx+northy*normy);
    //console.log(acute_angle*57.29578);
    var horizontal_component = y;

    return horizontal_component < 0 ? 2*3.1415926 - acute_angle : acute_angle;
}