    const express = require('express');
    const app = express();
    
    var port = process.env.PORT || 3000;

    app.use(express.json());

    let printers = [
        { id: 1, enabled: true, ribbon: 40, paper: 20 },
        { id: 2, enabled: true, ribbon: 30, paper: 15 },
        { id: 3, enabled: true, ribbon: 20, paper: 5 },
        { id: 4, enabled: true, ribbon: 10, paper: 10 },
    ]

    app.get('/printers', (req, res) => {
        res.json(printers);
    });
    app.get('/printers/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const printer = printers.find(printer => printer.id === id);
        if (printer) {
            res.json(printer);
        } else {
            res.status(404).send('Item not found');
        }
    });

    app.put('/printers/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const updatedPrinter = req.body;
        const index = printers.findIndex(printer => printer.id === id);
        if (index !== -1) {
            printers[index] = { ...printers[index], ...updatedPrinter, id: id }; // Ensure ID remains unchanged
            res.json(printers[index]);
        } else {
            res.status(404).send('Printer not found');
        }
    });

    app.get('/', function(req, res) {
        res.sendFile(__dirname + '/index.html');
    });

    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });