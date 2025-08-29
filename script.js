
const totalDots = 30;
let countdownInterval = null;
let targetDate = null;

function createDots(circleId) {
    const circle = document.getElementById(circleId);
    const dotsContainer = document.createElement('div');
    dotsContainer.classList.add('dots');

    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dotsContainer.appendChild(dot);
    }

    circle.appendChild(dotsContainer);
}

['days-circle', 'hours-circle', 'minutes-circle', 'seconds-circle'].forEach(id => createDots(id));

function updateDots(circleId, value, max) {
    const circle = document.getElementById(circleId);
    const dots = circle.querySelectorAll('.dot');
    const activeDots = Math.round((value / max) * totalDots);

    dots.forEach((dot, index) => {
        if (index < activeDots) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        clearInterval(countdownInterval);
        alert('Countdown Finished!');
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = String(days).padStart(2, '0');
    document.getElementById('hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');

    updateDots('days-circle', days, 30);
    updateDots('hours-circle', hours, 24);
    updateDots('minutes-circle', minutes, 60);
    updateDots('seconds-circle', seconds, 60);
}

document.getElementById('start-btn').addEventListener('click', () => {
    const dateValue = document.getElementById('date-input').value;
    const timeValue = document.getElementById('time-input').value;

    if (!dateValue || !timeValue) {
        alert('Please select both date and time.');
        return;
    }

    targetDate = new Date(`${dateValue}T${timeValue}`).getTime();

    if (countdownInterval) clearInterval(countdownInterval);
    countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();
});

document.getElementById('stop-btn').addEventListener('click', () => {
    clearInterval(countdownInterval);
});

document.getElementById('reset-btn').addEventListener('click', () => {
    clearInterval(countdownInterval);
    targetDate = null;
    document.getElementById('days').innerText = '00';
    document.getElementById('hours').innerText = '00';
    document.getElementById('minutes').innerText = '00';
    document.getElementById('seconds').innerText = '00';
    document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
});
