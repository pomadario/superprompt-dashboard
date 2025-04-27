document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('assets/progress.json');
        const data = await response.json();
        document.getElementById('live-status').innerText = `Progress: ${data.progress}% - Status: ${data.status}`;
        const ctx = document.getElementById('progressChart').getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Completed', 'Remaining'],
                datasets: [{ data: [parseFloat(data.progress), 100 - parseFloat(data.progress)], backgroundColor: ['#00FF00', '#333'] }]
            }
        });
    } catch (error) {
        console.error('Errore nel caricamento dei dati:', error);
    }
});
function toggleNightMode() { document.body.classList.toggle('night-mode'); }