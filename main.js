/* ==========================================
   LUCIDE ICONS
========================================== */

if (window.lucide) {

  lucide.createIcons();

}


/* ==========================================
   LOADING SCREEN
========================================== */

window.addEventListener("load", () => {

  const loader = document.querySelector(".loader");

  setTimeout(() => {

    loader.style.opacity = "0";

    loader.style.pointerEvents = "none";

    setTimeout(() => {

      loader.style.display = "none";

    }, 600);

  }, 800);

});


/* ==========================================
   CURSOR GLOW
========================================== */

const cursorGlow =
  document.querySelector(".cursor-glow");


window.addEventListener(
  "mousemove",
  (event) => {

    cursorGlow.style.left =
      event.clientX + "px";

    cursorGlow.style.top =
      event.clientY + "px";

  }
);


/* ==========================================
   THREE.JS SCENE
========================================== */

const canvas =
  document.getElementById("bg-canvas");


const scene =
  new THREE.Scene();


const camera =
  new THREE.PerspectiveCamera(

    60,

    window.innerWidth /
    window.innerHeight,

    1,

    2000

  );


camera.position.z = 500;


/* RENDERER */

const renderer =
  new THREE.WebGLRenderer({

    canvas,

    alpha: true,

    antialias: true

  });


renderer.setSize(

  window.innerWidth,

  window.innerHeight

);


renderer.setPixelRatio(

  Math.min(

    window.devicePixelRatio,

    2

  )

);


/* ==========================================
   PARTICLE UNIVERSE
========================================== */

const particleCount = 1200;


const particleGeometry =
  new THREE.BufferGeometry();


const particlePositions =
  new Float32Array(

    particleCount * 3

  );


for (

  let i = 0;

  i < particleCount * 3;

  i += 3

) {

  particlePositions[i] =

    (Math.random() - 0.5)

    * 1800;


  particlePositions[i + 1] =

    (Math.random() - 0.5)

    * 1400;


  particlePositions[i + 2] =

    (Math.random() - 0.5)

    * 1200;

}


particleGeometry.setAttribute(

  "position",

  new THREE.BufferAttribute(

    particlePositions,

    3

  )

);


const particleMaterial =
  new THREE.PointsMaterial({

    size: 3,

    color: 0x38bdf8,

    transparent: true,

    opacity: 0.7,

    blending:

      THREE.AdditiveBlending

  });


const particles =
  new THREE.Points(

    particleGeometry,

    particleMaterial

  );


scene.add(particles);


/* ==========================================
   FLOATING TORUS
========================================== */

const torusGeometry =
  new THREE.TorusKnotGeometry(

    120,

    25,

    180,

    32

  );


const torusMaterial =
  new THREE.MeshBasicMaterial({

    color: 0x34d399,

    wireframe: true,

    transparent: true,

    opacity: 0.16

  });


const torus =
  new THREE.Mesh(

    torusGeometry,

    torusMaterial

  );


torus.position.set(

  280,

  50,

  -200

);


scene.add(torus);


/* ==========================================
   FLOATING ICOSAHEDRON
========================================== */

const icoGeometry =
  new THREE.IcosahedronGeometry(

    70,

    2

  );


const icoMaterial =
  new THREE.MeshBasicMaterial({

    color: 0x38bdf8,

    wireframe: true,

    transparent: true,

    opacity: 0.12

  });


const ico =
  new THREE.Mesh(

    icoGeometry,

    icoMaterial

  );


ico.position.set(

  -350,

  -150,

  -300

);


scene.add(ico);


/* ==========================================
   FLOATING RINGS
========================================== */

const ringGeometry =
  new THREE.TorusGeometry(

    150,

    2,

    16,

    100

  );


const ringMaterial =
  new THREE.MeshBasicMaterial({

    color: 0x38bdf8,

    transparent: true,

    opacity: 0.2

  });


const ring =
  new THREE.Mesh(

    ringGeometry,

    ringMaterial

  );


ring.position.set(

  -200,

  250,

  -400

);


ring.rotation.x =

  Math.PI / 2;


scene.add(ring);


/* ==========================================
   MOUSE PARALLAX
========================================== */

let mouseX = 0;

let mouseY = 0;


window.addEventListener(

  "mousemove",

  (event) => {

    mouseX =

      event.clientX

      -

      window.innerWidth / 2;


    mouseY =

      event.clientY

      -

      window.innerHeight / 2;

  }

);


/* ==========================================
   RESIZE
========================================== */

window.addEventListener(

  "resize",

  () => {

    camera.aspect =

      window.innerWidth /

      window.innerHeight;


    camera.updateProjectionMatrix();


    renderer.setSize(

      window.innerWidth,

      window.innerHeight

    );

  }

);


/* ==========================================
   ANIMATION
========================================== */

const clock =
  new THREE.Clock();


function animate() {

  requestAnimationFrame(animate);


  const time =

    clock.getElapsedTime();


  /* PARTICLES */

  particles.rotation.y =

    time * 0.03;


  particles.rotation.x =

    time * 0.01;


  /* TORUS */

  torus.rotation.x =

    time * 0.15;


  torus.rotation.y =

    time * 0.25;


  torus.position.y =

    50 +

    Math.sin(time)

    * 25;


  /* ICOSAHEDRON */

  ico.rotation.x =

    time * 0.2;


  ico.rotation.y =

    time * 0.15;


  ico.position.y =

    -150 +

    Math.sin(time * 0.7)

    * 35;


  /* RING */

  ring.rotation.z =

    time * 0.1;


  /* CAMERA PARALLAX */

  camera.position.x +=

    (

      mouseX * 0.08

      -

      camera.position.x

    )

    * 0.03;


  camera.position.y +=

    (

      -mouseY * 0.08

      -

      camera.position.y

    )

    * 0.03;


  camera.lookAt(

    scene.position

  );


  renderer.render(

    scene,

    camera

  );

}


animate();


/* ==========================================
   REALISTIC 3D PROJECT CARD
========================================== */

const cards =
  document.querySelectorAll(

    ".tilt-card"

  );


cards.forEach(

  (card) => {


    card.addEventListener(

      "mousemove",

      (event) => {


        const rect =

          card.getBoundingClientRect();


        const x =

          event.clientX -

          rect.left;


        const y =

          event.clientY -

          rect.top;


        const centerX =

          rect.width / 2;


        const centerY =

          rect.height / 2;


        const rotateX =

          (y - centerY)

          / 15;


        const rotateY =

          (centerX - x)

          / 15;


        card.style.transform =

          `perspective(1200px)

          rotateX(${-rotateX}deg)

          rotateY(${rotateY}deg)

          scale(1.03)`;


      }

    );


    card.addEventListener(

      "mouseleave",

      () => {


        card.style.transform =

          `perspective(1200px)

          rotateX(0deg)

          rotateY(0deg)

          scale(1)`;


      }

    );


  }

);


/* ==========================================
   SCROLL REVEAL
========================================== */

const reveals =
  document.querySelectorAll(

    ".reveal"

  );


function revealOnScroll() {


  reveals.forEach(

    (element) => {


      const position =

        element.getBoundingClientRect()

        .top;


      const screenHeight =

        window.innerHeight;


      if (

        position <

        screenHeight - 100

      ) {

        element.classList.add(

          "active"

        );

      }


    }

  );

}


window.addEventListener(

  "scroll",

  revealOnScroll

);


revealOnScroll();


/* ==========================================
   COUNTER ANIMATION
========================================== */

const counters =
  document.querySelectorAll(

    ".counter"

  );


counters.forEach(

  (counter) => {


    const target =

      Number(

        counter.dataset.target

      );


    let current = 0;


    const interval =

      setInterval(

        () => {


          current++;


          counter.textContent =

            current + "+";


          if (

            current >= target

          ) {

            clearInterval(

              interval

            );

          }


        },

        80

      );


  }

);