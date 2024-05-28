document.addEventListener("DOMContentLoaded", function() {
    const countdownContainer = document.getElementById('countdown');
    const counterElement = document.getElementById('counter');
    const today = new Date();
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

        while (startDate <= yearEndDate) {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('day');

            if (startDate <= today) {
                dayDiv.classList.add('past');
                pastDays++;
            } else {
                dayDiv.classList.add('future');
            }

            daysGrid.appendChild(dayDiv);
            startDate.setDate(startDate.getDate() + 1);
        }

        countdownContainer.appendChild(yearContainer);
    });

    const remainingDays = totalDays - pastDays;
    counterElement.textContent = `Days left: ${remainingDays}`;
});
