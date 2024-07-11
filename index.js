let points = [];
let numPoints = 100; // Number of points in the spiral
let maxRadius; // Maximum radius of the spiral
let angleIncrement; // Angle between each point

function setup() {
  createCanvas(windowWidth, windowHeight);
  maxRadius = min(width, height) / 2;
  angleIncrement = 6.28 / numPoints;

  for (let i = 0; i < numPoints; i++) {
    let angle = i * angleIncrement;
    let radius = maxRadius * (i / numPoints);
    let x = width / 2 + cos(angle) * radius;
    let y = height / 2 + sin(angle) * radius;
    points.push({ x: x, y: y, angle: angle, radius: radius });
  }

  animateSpiral();
}

function draw() {
  background(0, 100, 200); // Ocean color
  noFill();
  stroke(255); // Wave color
  strokeWeight(2);

  beginShape();
  for (let i = 0; i < points.length; i++) {
    curveVertex(points[i].x, points[i].y);
  }
  endShape();
}

function animateSpiral() {
  points.forEach((point, index) => {
    gsap.to(point, {
      radius: point.radius + 20 * sin(index * angleIncrement + frameCount * 0.1),
      duration: 2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      onUpdate: () => {
        point.x = width / 2 + cos(point.angle) * point.radius;
        point.y = height / 2 + sin(point.angle) * point.radius;
      }
    });
  });
}
