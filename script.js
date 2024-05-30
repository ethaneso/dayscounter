document.addEventListener("DOMContentLoaded", function() {
    const countdownContainer = document.getElementById('countdown');
    const counterElement = document.getElementById('counter');
    const tomatoCounterElement = document.getElementById('tomato-counter');
    const tomatoDisplayElement = document.getElementById('tomato-display');
    const startTomatoButton = document.getElementById('start-tomato');
    const pauseTomatoButton = document.getElementById('pause-tomato');
    const playTomatoButton = document.getElementById('play-tomato');
    const resetTomatoButton = document.getElementById('reset-tomato');
    const hoursInput = document.getElementById('hours');
    const minutesInput = document.getElementById('minutes');
    const alarmSound = document.getElementById('alarm-sound');
    const today = new Date();  // Dynamic current date
    const endDate = new Date('2027-12-31');

    const totalDays = Math.floor((endDate - today) / (1000 * 60 * 60 * 24));
    let pastDays = 0;

    const years = [2024, 2025, 2026, 2027];
    years.forEach(year => {
        const yearContainer = document.createElement('div');
        yearContainer.classList.add('year-container');

        const yearTitle = document.createElement('div');
        yearTitle.classList.add('year-title');
        yearTitle.textContent = `Year ${year}`;
        yearContainer.appendChild(yearTitle);

        const daysGrid = document.createElement('div');
        daysGrid.classList.add('days-grid');
        yearContainer.appendChild(daysGrid);

        let startDate = new Date(`${year}-01-01`);
        const yearEndDate = new Date(`${year}-12-31`);
        let dayOfYear = 1;

        while (startDate <= yearEndDate) {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('day');
            dayDiv.textContent = dayOfYear; // Show day of the year

            if (startDate <= today) {
                dayDiv.classList.add('past');
                pastDays++;
            } else {
                dayDiv.classList.add('future');
            }

            daysGrid.appendChild(dayDiv);
            startDate.setDate(startDate.getDate() + 1);
            dayOfYear++;
        }

        countdownContainer.appendChild(yearContainer);
    });

    const remainingDays = totalDays > 0 ? totalDays : 0;
    counterElement.textContent = `Days left: ${remainingDays}`;

    let tomatoInterval;
    let remainingTime = 0;

    function startTomatoCounter(hours, minutes) {
        const now = new Date();
        const endTime = new Date();
        endTime.setHours(now.getHours() + hours);
        endTime.setMinutes(now.getMinutes() + minutes);
        remainingTime = endTime - now;

        tomatoInterval = setInterval(updateTomatoCounter, 1000);
    }

    function updateTomatoCounter() {
        if (remainingTime <= 0) {
            clearInterval(tomatoInterval);
            tomatoDisplayElement.textContent = "Tomato counter finished!";
            alarmSound.play();
            return;
        }

        const now = new Date();
        remainingTime -= 1000;

        const remainingHours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
        const remainingMinutes = Math.floor((remainingTime / (1000 * 60)) % 60);
        const remainingSeconds = Math.floor((remainingTime / 1000) % 60);

        tomatoDisplayElement.textContent = `Time left: ${remainingHours}h ${remainingMinutes}m ${remainingSeconds}s`;
    }

    function pauseTomatoCounter() {
        clearInterval(tomatoInterval);
    }

    function playTomatoCounter() {
        tomatoInterval = setInterval(updateTomatoCounter, 1000);
    }

    function resetTomatoCounter() {
        clearInterval(tomatoInterval);
        tomatoDisplayElement.textContent = '';
        hoursInput.value = '';
        minutesInput.value = '';
        remainingTime = 0;
    }

    startTomatoButton.addEventListener('click', function() {
        const hours = parseInt(hoursInput.value) || 0;
        const minutes = parseInt(minutesInput.value) || 0;
        clearInterval(tomatoInterval);
        startTomatoCounter(hours, minutes);
    });

    pauseTomatoButton.addEventListener('click', pauseTomatoCounter);
    playTomatoButton.addEventListener('click', playTomatoCounter);
    resetTomatoButton.addEventListener('click', resetTomatoCounter);
});
