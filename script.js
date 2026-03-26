document.addEventListener('DOMContentLoaded', () => {
    const csvPath = 'data/datos.csv'; 
    const container = document.getElementById('table-container');

    // Estado inicial visual para confirmar que el JS se ejecuta
    container.innerHTML = '<p>Ejecutando script...</p>';

    fetch(csvPath)
        .then(response => {
            if (!response.ok) {
                // Lanza un error específico si el archivo no se encuentra
                throw new Error(`Error HTTP: ${response.status} - No se encontró el archivo CSV`);
            }
            return response.text();
        })
        .then(csvText => {
            crearTabla(csvText);
        })
        .catch(err => {
            console.error('Error detallado:', err);
            // Muestra el error en la pantalla principal
            container.innerHTML = `<p style="color: #e74c3c; font-weight: bold; padding: 20px;">
                ❌ Error detectado: ${err.message}. <br><br>
                Revisa la consola (F12) o asegúrate de estar corriendo el proyecto con Live Server.
            </p>`;
        });
});

function crearTabla(data) {
    const container = document.getElementById('table-container');
    const filas = data.split('\n').filter(fila => fila.trim() !== '');
    
    if (filas.length === 0) {
        container.innerHTML = '<p>El archivo CSV está vacío o en blanco.</p>';
        return;
    }

    let htmlBus = '<table><thead><tr>';
    
    // Encabezados
    const encabezados = filas[0].split(',');
    encabezados.forEach(header => {
        htmlBus += `<th>${header.trim()}</th>`;
    });
    htmlBus += '</tr></thead><tbody>';

    // Filas de datos
    for (let i = 1; i < filas.length; i++) {
        const celdas = filas[i].split(',');
        htmlBus += '<tr>';
        celdas.forEach(celda => {
            htmlBus += `<td>${celda.trim()}</td>`;
        });
        htmlBus += '</tr>';
    }

    htmlBus += '</tbody></table>';
    container.innerHTML = htmlBus;
}