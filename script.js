const fireflyContainer = document.getElementById('fireflies');
const quantity = 40;

for (let i = 0; i < quantity; i++) {
    const div = document.createElement('div');
    div.classList.add('firefly');

    const x = (Math.random() - 0.5) * window.innerWidth;
    const y = (Math.random() - 0.5) * window.innerHeight;

    div.style.setProperty('--x', `${x}px`);
    div.style.setProperty('--y', `${y}px`);
    div.style.animationDelay = `${Math.random() * 10}s`;

    const size = Math.random() * 3 + 2;
    div.style.width = `${size}px`;
    div.style.height = `${size}px`;

    div.style.left = `${Math.random() * 100}vw`;
    div.style.top = `${Math.random() * 100}vh`;

    fireflyContainer.appendChild(div);
}

/* --- PÉTALOS QUE CAEN UNO A LA VEZ --- */
const PETAL_MIN_DELAY = 1500; // ms entre pétalos
const PETAL_MAX_DELAY = 3500;

function spawnPetal() {
    const petal = document.createElement('div');
    petal.className = 'falling-petal';

    const jar = document.querySelector('.jar-container');
    const jarRect = jar.getBoundingClientRect();

    // Posición inicial sobre la rosa dentro de la cúpula (algo aleatoria)
    const startX = jarRect.left + jarRect.width * (0.4 + Math.random() * 0.2);
    const startY = jarRect.top + 150 + Math.random() * 40;
    petal.style.left = `${startX}px`;
    petal.style.top = `${startY}px`;

    // Tamaño aleatorio (reducido para que coincida mejor con la rosa)
    // rango aproximado base: 0.35 - 0.6 (menos grande que los pétalos de la flor)
    // Ajustamos por el ancho del tarro para comportamiento responsive en móviles
    const baseScaleFactor = Math.min(1, jarRect.width / 300); // 300 es el ancho de referencia
    const scale = (0.35 + Math.random() * 0.25) * baseScaleFactor;
    petal.style.width = `${85 * scale}px`;
    petal.style.height = `${130 * scale}px`;

    // Variables de animación (rotaciones, desplazamiento horizontal y distancia de caída)
    const startRot = `${Math.floor(Math.random() * 40 - 20)}deg`;
    const endRot = `${Math.floor(Math.random() * -80 - 10)}deg`;
    const drift = `${Math.floor(Math.random() * 300 - 150)}px`;
    const fallY = `${Math.floor(window.innerHeight - startY + 120)}px`;
    const duration = `${(4 + Math.random() * 3).toFixed(2)}s`;

    petal.style.setProperty('--start-rot', startRot);
    petal.style.setProperty('--end-rot', endRot);
    petal.style.setProperty('--drift', drift);
    petal.style.setProperty('--fallY', fallY);
    petal.style.setProperty('--duration', duration);

    document.body.appendChild(petal);

    // Al terminar la animación se elimina el elemento
    petal.addEventListener('animationend', () => {
        petal.remove();
    }, { once: true });

    // Programar siguiente pétalo
    const delay = PETAL_MIN_DELAY + Math.random() * (PETAL_MAX_DELAY - PETAL_MIN_DELAY);
    setTimeout(spawnPetal, delay);
}

// Inicia la caída del primer pétalo tras un pequeño retardo
setTimeout(spawnPetal, 1000);
