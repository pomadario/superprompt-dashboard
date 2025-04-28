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
// Funzione per caricare moduli GPT attivi
async function caricaModuliAttivi() {
    try {
        const response = await fetch('assets/moduli_attivi_superprompt.json');
        const moduli = await response.json();
        const tableBody = document.getElementById("moduli-table-body");
        tableBody.innerHTML = "";
        moduli.forEach((modulo) => {
            const row = document.createElement("tr");
            row.innerHTML = `
              <td>${modulo.id}</td>
              <td>${modulo.nome}</td>
              <td>${modulo.categoria}</td>
              <td>${modulo.modalita}</td>
              <td><span>${modulo.stato}</span></td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Errore nel caricamento dei moduli:', error);
    }
}

// Richiama subito la funzione al caricamento pagina
document.addEventListener('DOMContentLoaded', () => {
    caricaModuliAttivi();
});
