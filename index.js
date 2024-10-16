const express = require('express');
const app = express();

// Ruta principal para la API de marca de tiempo
app.get('/api/:date?', (req, res) => {
    let dateParam = req.params.date;
    let date;

    // Si no hay parámetro de fecha, usa la fecha actual
    if (!dateParam) {
        date = new Date();
    } else {
        // Si el parámetro es numérico, parsearlo como timestamp
        if (!isNaN(dateParam)) {
            date = new Date(parseInt(dateParam));
        } else {
            // Si no es numérico, intenta parsearlo como una cadena de fecha
            date = new Date(dateParam);
        }
    }

    // Manejo de fechas inválidas
    if (date.toString() === "Invalid Date") {
        return res.json({ error: "Invalid Date" });
    }

    // Devolver respuesta con unix y utc
    res.json({
        unix: date.getTime(),
        utc: date.toUTCString()
    });
});

// Servidor escuchando en el puerto 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
