const fireworks = document.getElementById("fireworks");
const confetti = document.getElementById("confetti");
const ctxF = fireworks.getContext("2d");
const ctxC = confetti.getContext("2d");
const music = document.getElementById("bg-music");
const toggleBtn = document.getElementById("toggleMusic");

let particles = [];
let confettiPieces = [];

fireworks.width = confetti.width = window.innerWidth;
fireworks.height = confetti.height = window.innerHeight;

// Fireworks particle
function createParticle(x, y) {
  const colors = ["#ff0", "#f00", "#0f0", "#00f", "#fff"];
  const angle = Math.random() * 2 * Math.PI;
  const speed = Math.random() * 5 + 2;
  return {
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    radius: 2 + Math.random() * 2,
    life: 100,
    color: colors[Math.floor(Math.random() * colors.length)]
  };
}

function explode(x, y) {
  for (let i = 0; i < 30; i++) {
    particles.push(createParticle(x, y));
  }
}

// Confetti piece
function createConfetti() {
  return {
    x: Math.random() * confetti.width,
    y: Math.random() * -confetti.height,
    size: Math.random() * 8 + 4,
    color: ["#f00", "#0f0", "#fff", "#000"][Math.floor(Math.random() * 4)],
    speed: Math.random() * 3 + 1,
    angle: Math.random() * Math.PI
  };
}

// Populate confetti
for (let i = 0; i < 150; i++) {
  confettiPieces.push(createConfetti());
}

// Draw & animate
function animate() {
  ctxF.clearRect(0, 0, fireworks.width, fireworks.height);
  ctxC.clearRect(0, 0, confetti.width, confetti.height);

  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.05;
    p.life--;
    ctxF.beginPath();
    ctxF.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
    ctxF.fillStyle = p.color;
    ctxF.fill();
    if (p.life <= 0) particles.splice(i, 1);
  });

  confettiPieces.forEach(c => {
    c.y += c.speed;
    c.angle += 0.02;
    ctxC.fillStyle = c.color;
    ctxC.fillRect(c.x, c.y, c.size * Math.cos(c.angle), c.size);
    if (c.y > confetti.height) {
      c.y = 0;
      c.x = Math.random() * confetti.width;
    }
  });

  requestAnimationFrame(animate);
}

// Fireworks every second
setInterval(() => {
  explode(Math.random() * fireworks.width, Math.random() * fireworks.height * 0.5);
}, 1000);

toggleBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    toggleBtn.textContent = "🔈 Music On";
  } else {
    music.pause();
    toggleBtn.textContent = "🔇 Music Off";
  }
});

window.addEventListener("resize", () => {
  fireworks.width = confetti.width = window.innerWidth;
  fireworks.height = confetti.height = window.innerHeight;
});

animate();
