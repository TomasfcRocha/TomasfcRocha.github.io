let explorationCount = 0;
let signalCount = 0;

const missionMessage = document.querySelector('#mission-message');
const launchButton = document.querySelector('#launch-button');
const counter = document.querySelector('#counter');
const counterCard = document.querySelector('#counter-card');
const counterHint = document.querySelector('#counter-hint');
const scene = document.querySelector('#space-scene');

function launchMission() {
  missionMessage.textContent = 'Descolagem autorizada. A missão começou!';
  missionMessage.style.color = '#c6f277';
  launchButton.style.backgroundColor = '#e1ffad';
  document.body.style.setProperty('--bg', '#0b1122');
}

function boostMission() {
  missionMessage.textContent = 'Impulso extra activado. Velocidade de dobra em curso!';
  missionMessage.style.color = '#d4a8ff';
  launchButton.style.transform = 'translateY(-3px) scale(1.04)';
  scene.style.filter = 'saturate(1.35)';
}

function changeSignal() {
  signalCount += 1;
  const messages = [
    'Sinal encontrado: uma estrela acabou de piscar.',
    'Sinal encontrado: há vida no horizonte?',
    'Sinal encontrado: mensagem recebida da Terra.'
  ];
  missionMessage.textContent = messages[(signalCount - 1) % messages.length];
  missionMessage.style.color = signalCount % 2 ? '#a9c9ff' : '#c6f277';
  document.querySelector('#signal-button').style.borderColor = '#c6f277';
}

function incrementCounter() {
  explorationCount += 1;
  counter.textContent = String(explorationCount).padStart(2, '0');
  counterHint.textContent = explorationCount === 1
    ? 'A primeira descoberta fica registada. Continua a explorar!'
    : `Já registaste ${explorationCount} descobertas. Excelente trabalho, explorador!`;
  counter.style.transform = 'scale(1.2)';
  counter.style.display = 'inline-block';
  counterCard.style.borderColor = '#c6f277';
  window.setTimeout(() => { counter.style.transform = 'scale(1)'; }, 180);
}

function highlightCounter() {
  counterCard.style.backgroundColor = '#17233a';
  counterHint.style.color = '#f4f3ef';
}

function resetCounter() {
  counterCard.style.backgroundColor = '';
  counterHint.style.color = '';
}

function enterOrbit() {
  scene.classList.add('in-orbit');
  missionMessage.textContent = 'A passar pelo campo de estrelas…';
  missionMessage.style.color = '#d4a8ff';
}

function leaveOrbit() {
  scene.classList.remove('in-orbit');
  scene.style.filter = '';
  missionMessage.textContent = 'Sistemas prontos. A nave aguarda instruções.';
  missionMessage.style.color = '';
  launchButton.style.transform = '';
}

function moveStar(event) {
  const bounds = scene.getBoundingClientRect();
  const x = Math.round(((event.clientX - bounds.left) / bounds.width) * 100);
  const y = Math.round(((event.clientY - bounds.top) / bounds.height) * 100);
  document.querySelector('#coordinates').textContent = `Coordenadas actuais: ${x}, ${y}`;
}

document.querySelector('#year').textContent = new Date().getFullYear();
