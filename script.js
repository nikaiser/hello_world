const canvas = document.getElementById('blobCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawGhost(x, y, time) {
    ctx.save();
    
    // Backdrop shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 10;

    // Body
    ctx.beginPath();
    ctx.moveTo(x - 60, y + 100);
    ctx.quadraticCurveTo(x - 70, y - 80, x, y - 100);
    ctx.quadraticCurveTo(x + 70, y - 80, x + 60, y + 100);
    
    // Drips
    for (let i = -50; i <= 50; i += 20) {
        const dripHeight = 50 + Math.sin(time * 2 + i) * 15;
        ctx.lineTo(x + i, y + 100 + dripHeight);
    }
    
    ctx.closePath();
    
    // Fill
    let gradient = ctx.createLinearGradient(x, y - 100, x, y + 150);
    gradient.addColorStop(0, 'white');
    gradient.addColorStop(1, '#e0e0e0');
    ctx.fillStyle = gradient;
    ctx.fill();

    // Eyes
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.ellipse(x - 25, y - 30, 15, 22, 0, 0, Math.PI * 2);
    ctx.ellipse(x + 25, y - 30, 15, 22, 0, 0, Math.PI * 2);
    ctx.fill();

    // Eye highlights
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.ellipse(x - 30, y - 35, 5, 7, 0, 0, Math.PI * 2);
    ctx.ellipse(x + 20, y - 35, 5, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    // Mouth
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.ellipse(x, y + 20, 8, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Top curl
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(x, y - 100);
    ctx.quadraticCurveTo(x + 30, y - 130, x + 40, y - 120);
    ctx.stroke();

    ctx.restore();

    // Dripping effect
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    for (let i = -50; i <= 50; i += 20) {
        const dropY = y + 150 + Math.sin(time * 3 + i) * 10;
        ctx.beginPath();
        ctx.arc(x + i, dropY, 4, 0, Math.PI * 2);
        ctx.fill();
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const time = Date.now() / 1000;
    const x = canvas.width / 2;
    const y = canvas.height / 2;

    // Background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawGhost(x, y, time);
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function speak(text) {
    const speechBubble = document.getElementById('speechBubble');
    speechBubble.textContent = text;
    speechBubble.style.display = 'block';
    
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);

    utterance.onend = () => {
        speechBubble.style.display = 'none';
    };
}
    // You can call speak() function with any text to make the ghost speak
speak("You are invited to our gathering at 112 School St [02143] @7PM.");