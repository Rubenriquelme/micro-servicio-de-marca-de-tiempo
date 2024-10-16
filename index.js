const express = require('express');
const app = express();

// Sirve los archivos estáticos
app.use(express.static('public'));

// Ruta para la API
app.get('/api/:date?', (req, res) => {
    let date;
    if (!req.params.date) {
        date = new Date();
    } else if (!isNaN(req.params.date)) {
        date = new Date(parseInt(req.params.date));
    } else {
        date = new Date(req.params.date);
    }

    if (date.toString() === "Invalid Date") {
        return res.json({ error: "Invalid Date" });
    }

    res.json({
        unix: date.getTime(),
        utc: date.toUTCString()
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
