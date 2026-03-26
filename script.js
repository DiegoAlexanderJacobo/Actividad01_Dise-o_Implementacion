document.addEventListener('DOMContentLoaded', () => {
    const csvPath = 'data/datos.csv'; 
    const container = document.getElementById('table-container');

    container.innerHTML = '<p>Cargando datos...</p>';

    fetch(csvPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status} - No se encontró el archivo CSV`);
            }
            return response.text();
        })
        .then(csvText => {
            crearTabla(csvText);
        })
        .catch(err => {
            console.error('Error detallado:', err);
            container.innerHTML = `<p style="color: #e74c3c; font-weight: bold; padding: 20px;">
                ❌ Error detectado: ${err.message}.
            </p>`;
        });
});

function crearTabla(data) {
    const container = document.getElementById('table-container');
    const filas = data.split('\n').filter(fila => fila.trim() !== '');
    
    if (filas.length === 0) {
        container.innerHTML = '<p>El archivo CSV está vacío.</p>';
        return;
    }

    let htmlBus = '<table><thead><tr>';
    
    const encabezados = filas[0].split(',');
    encabezados.forEach(header => {
        htmlBus += `<th>${header.trim()}</th>`;
    });
    htmlBus += '</tr></thead><tbody>';

    const limite = Math.min(filas.length, 21);

    for (let i = 1; i < limite; i++) {
        const celdas = filas[i].split(',');
        htmlBus += '<tr>';
        celdas.forEach(celda => {
            htmlBus += `<td>${celda.trim()}</td>`;
        });
        htmlBus += '</tr>';
    }

    htmlBus += '</tbody></table>';
    
    // Si hay más datos ocultos, podemos mostrar un mensajito útil al final
    if (filas.length > 21) {
        htmlBus += `<p style="text-align: center; color: #7f8c8d; font-size: 0.9em; margin-top: 10px;">
            Mostrando las primeras 20 filas de un total de ${filas.length - 1} registros.
        </p>`;
    }

    container.innerHTML = htmlBus;
}