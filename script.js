document.addEventListener('DOMContentLoaded', () => {
    const csvPath = './data/datos.csv'; 

    fetch(csvPath)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo encontrar el archivo CSV en la ruta especificada.');
            }
            return response.text();
        })
        .then(data => {
            renderTable(data);
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('table-container').innerHTML = 
                `<p style="color: red;">Error al cargar los datos: ${error.message}</p>`;
        });
});

function renderTable(csvText) {
    const container = document.getElementById('table-container');
    const rows = csvText.split('\n').filter(row => row.trim() !== '');
    
    if (rows.length === 0) {
        container.innerHTML = '<p>El archivo CSV está vacío.</p>';
        return;
    }

    let tableHTML = '<table>';

    rows.forEach((row, index) => {
        const columns = row.split(',');
        tableHTML += '<tr>';
        
        columns.forEach(col => {
            if (index === 0) {
                tableHTML += `<th>${col.trim()}</th>`;
            } else {
                tableHTML += `<td>${col.trim()}</td>`;
            }
        });

        tableHTML += '</tr>';
    });

    tableHTML += '</table>';
    container.innerHTML = tableHTML;
}