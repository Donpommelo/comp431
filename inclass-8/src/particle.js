const random = (min=0, max=800) =>
    Math.random() * (max - min) + min

// default values
const particle = ({
    mass=random(5, 30),
    position=[random(), random()],
    velocity=[random(-0.1, 0.1), random(-0.1, 0.1)],
    acceleration=[0, 0]
} = {}) => {
    return {acceleration, velocity, position, mass}
}

const update = ({acceleration, velocity, position, mass}, delta, canvas) => {
	// IMPLEMENT ME

	var vX = velocity[0] + (delta * acceleration[0]);
	var vY = velocity[1] + (delta * acceleration[1]);
	
	var newVel = [vX, vY];
	
	var X = position[0] + (delta * newVel[0]);
	var Y = position[1] + (delta * newVel[1]);
		
	if (X < 0) {
		X = canvas.width + X;
	}
	if (X > canvas.width) {
		X = X - canvas.width;
	}
	if (Y < 0) {
		Y = canvas.height + Y;
	}
	if (Y > canvas.width) {
		Y = Y - canvas.height;
	}
	
	var newPos = [X, Y];
	
    return { mass, acceleration, velocity: newVel, position: newPos }
}

export default particle

export { update }
