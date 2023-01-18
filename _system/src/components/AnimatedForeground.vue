<template>
  <canvas aria-hidden="true" id="animatedFgCanvas"></canvas>
</template>

<script>
export default {
  name: "AnimatedForeground",
  methods: {
    getRandomInt: function (min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
    }
  },
  mounted: function () {
    const particleImage = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDUwIDUwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MjsiPgogICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoNC4wNDg1MSwwLDAsNC4wNDg1MSwtNTEuMDk4NSwtNDMuODk3OCkiPgogICAgICAgIDxjaXJjbGUgY3g9IjE4Ljc5NyIgY3k9IjE3LjAxOCIgcj0iNi4xNzUiIHN0eWxlPSJmaWxsOndoaXRlOyIvPgogICAgPC9nPgo8L3N2Zz4K"
    let ctx
    let canvasHeight = window.innerHeight
    let canvasWidth = window.innerWidth
    let canvas = document.getElementById("animatedFgCanvas")
    let maximumParticles = 10
    let sausageImage = new Image()
    let particles = []
    ctx = canvas.getContext("2d");
    canvas.height = canvasHeight
    canvas.width = canvasWidth
    sausageImage.src = particleImage
    canvas.height = canvasHeight;
    canvas.width = canvasWidth;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    for(let i = 0; i < maximumParticles; i++) {
      let speed = Math.random() + 3 - 1
      particles.push({
        direction: Math.random() < 0.5 ? 0 : 1,
        speed: speed,
        size: 6 * speed,
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight
      })
    }
    function drawparticles() {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)
      for(let i = 0; i < maximumParticles; i++){
        let particle = particles[i];
        let rotationRadians = particle.rotation * Math.PI / 180
        ctx.save();
        ctx.translate(particle.x, particle.y);
        if (particle.rotationDirection === 1) {
          ctx.rotate(rotationRadians)
        } else {
          ctx.rotate(rotationRadians * -1)
        }
        ctx.drawImage(sausageImage, -particle.size / 2, -particle.size / 2, particle.size, particle.size);
        ctx.restore();
      }
      moveparticles()
    }
    function moveparticles() {
      for(let i = 0; i < maximumParticles; i++) {
        let particle = particles[i]
        if (particle.direction === 0) {
          particle.x += 1;
        } else {
          particle.x -= 1;
        }
        
        particle.y += Math.pow(particle.speed, 2) + 0.001;
        if (
          particle.y > canvasHeight + 50 ||
          particle.x > canvasWidth + 50 ||
          particle.x < -50
        ) {
          particles[i] = {
            direction: Math.random() < 0.5 ? 0 : 1,
            speed: particle.speed,
            size: particle.size,
            x: Math.random()*canvasWidth,
            y: -50
          }
        }
      }
    }
    function animationStep () {
      drawparticles()
      window.requestAnimationFrame(animationStep);
    }
    window.requestAnimationFrame(animationStep)
  }
}
</script>

<style scoped>
#animatedFgCanvas {
  display: none;
  left: 0;
  opacity: 1;
  pointer-events: none;
  position: fixed;
  top: 0;
  z-index: 2;
  filter: blur(6px);
}

@media (prefers-reduced-motion: no-preference) and (prefers-color-scheme: dark)  {
  #animatedFgCanvas {
    display: block;
  } 
}
</style>