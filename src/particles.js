export const forceCanvasResize = () => {
  const canvas = document.getElementById("backgroundCanvas");
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = document.body.scrollHeight;
  }
};

export const generateRandomParticles = (numParticles) => {
  const canvas = document.getElementById("backgroundCanvas");
  const ctx = canvas.getContext("2d");
  let particles = [];
  const colors = ["#FFFFFF", "#FFCC00", "#FF6699", "#66CCFF", "#00CC99"];

  // Resize canvas to fill the page
  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = document.body.scrollHeight;
    createParticles(); // Buat ulang partikel saat ukuran canvas berubah
  };

  // Create particles
  const createParticles = () => {
    particles = []; // Reset the array
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: Math.random() * 2 - 1, // Rentang kecepatan: -1 hingga 1
        speedY: Math.random() * 2 - 1, // Rentang kecepatan: -1 hingga 1
      });
    }
  };

  // Draw particles on the canvas
  const drawParticles = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Ensure particles stay within canvas bounds
      if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
    });
    requestAnimationFrame(drawParticles);
  };

  // Initialize canvas and particles
  resizeCanvas();
  drawParticles();

  // Update canvas size on resize and scroll
  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("scroll", resizeCanvas);

  // Cleanup event listeners on component unmount
  return () => {
    window.removeEventListener("resize", resizeCanvas);
    window.removeEventListener("scroll", resizeCanvas);
  };
};
