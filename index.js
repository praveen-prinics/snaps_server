const fs = require('fs');
const ini = require('ini');
const express = require('express');
const app = express();

var port = process.env.PORT || 3000;

app.use(express.json());


/*let printers = [
    { id: 1, enabled: true, ribbon: 40, paper: 20 },
    { id: 2, enabled: true, ribbon: 30, paper: 15 },
    { id: 3, enabled: true, ribbon: 20, paper: 5 },
    { id: 4, enabled: true, ribbon: 10, paper: 10 },
]*/

const iniFile = __dirname+'/print_count.ini';
let printers = ini.parse(fs.readFileSync(iniFile, 'utf-8'));

app.get('/printers', (req, res) => {
    res.json(printers);
});
app.get('/printers/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const printer = printers["PRINTER"+req.params.id] //printers.find(printer => printer.id === id);
    if (printer) {
        res.json(printer);
    } else {
        res.status(404).send('Item not found');
    }
});

app.put('/printers/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedPrinter = req.body;
    const printer = printers["PRINTER"+req.params.id] //printers.findIndex(printer => printer.id === id);
    console.log(updatedPrinter)
    console.log(printer)
    if (printer !== null) {
        //printers[index] = { ...printers[index], ...updatedPrinter, id: id }; // Ensure ID remains unchanged
        if(updatedPrinter.ribbon > 0 && updatedPrinter.paper > 0) {
            printer.enabled = true;
        } else {
            printer.enabled = false;
        }
        printer.ribbon = updatedPrinter.ribbon;
        printer.paper = updatedPrinter.paper;

        const iniText = ini.stringify(printers);
        console.log(iniText);
        fs.writeFileSync(iniFile, iniText);

        res.json(printer);
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