/* ================================================================
   HERO CANVAS — Mathematical grid & equation animation
   Minimal abstract mathematical background
   ================================================================ */

class MathCanvas {
  constructor(canvasEl) {
    this.canvas = canvasEl;
    this.ctx = canvasEl.getContext('2d');
    this.dpr = window.devicePixelRatio || 1;
    this.particles = [];
    this.connections = [];
    this.symbols = ['∑', '∫', 'π', 'Δ', '∂', 'σ', 'μ', 'λ', 'φ', 'ε', '∞', '√', 'Ω', 'θ', 'α', 'β'];
    this.mouse = { x: -1000, y: -1000 };
    this.animId = null;

    this.resize();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }

  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.canvas.style.width = this.width + 'px';
    this.canvas.style.height = this.height + 'px';
    this.ctx.scale(this.dpr, this.dpr);
  }

  createParticles() {
    const count = Math.min(Math.floor((this.width * this.height) / 18000), 60);
    this.particles = [];

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        symbol: this.symbols[Math.floor(Math.random() * this.symbols.length)],
        size: 10 + Math.random() * 14,
        opacity: 0.04 + Math.random() * 0.08,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.005,
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles();
    });

    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    });
  }

  drawGrid() {
    const ctx = this.ctx;
    const spacing = 80;

    ctx.strokeStyle = 'rgba(201, 168, 76, 0.02)';
    ctx.lineWidth = 0.5;

    // Vertical lines
    for (let x = 0; x < this.width; x += spacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.height);
      ctx.stroke();
    }

    // Horizontal lines
    for (let y = 0; y < this.height; y += spacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.width, y);
      ctx.stroke();
    }
  }

  drawParticles() {
    const ctx = this.ctx;

    this.particles.forEach(p => {
      // Move
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;

      // Wrap around
      if (p.x < -50) p.x = this.width + 50;
      if (p.x > this.width + 50) p.x = -50;
      if (p.y < -50) p.y = this.height + 50;
      if (p.y > this.height + 50) p.y = -50;

      // Mouse interaction — subtle glow
      const dx = p.x - this.mouse.x;
      const dy = p.y - this.mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const mouseEffect = dist < 200 ? (1 - dist / 200) * 0.15 : 0;

      // Draw symbol
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.font = `${p.size}px "Playfair Display", Georgia, serif`;
      ctx.fillStyle = `rgba(201, 168, 76, ${p.opacity + mouseEffect})`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(p.symbol, 0, 0);
      ctx.restore();
    });
  }

  drawConnections() {
    const ctx = this.ctx;
    const maxDist = 150;

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const a = this.particles[i];
        const b = this.particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const opacity = (1 - dist / maxDist) * 0.03;
          ctx.strokeStyle = `rgba(201, 168, 76, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawGrid();
    this.drawConnections();
    this.drawParticles();
    this.animId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animId) cancelAnimationFrame(this.animId);
  }
}

// Auto-initialize on any canvas with the class
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('.hero__canvas');
  if (canvas) {
    new MathCanvas(canvas);
  }
});
