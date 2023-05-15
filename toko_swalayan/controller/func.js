const fs = require('fs');
let stocks = [];
const path = require('path');

function cekData() {
    data = fs.readFileSync('./dataStocks/stocks.js', 'utf8');
    stocks = JSON.parse(data);
    return stocks
}

function generateId() {
    cekData()
    let lastId;
    if (stocks.length > 0) {
        lastId = stocks[stocks.length - 1].id;
    } else {
        lastId = 0;
    }
    const newId = parseInt(lastId) + 1;
    return newId;
};

function changeId(data) {
    const id = data.id;
    const newData = {
        id,
        ...data
    };
    return newData
}

function saveData(stock) {
    console.log(stock)
    if (!fs.existsSync("./dataStocks/stocks.js")) {
        fs.writeFileSync("./dataStocks/stocks.js", JSON.stringify(stocks))
        return stock
    } else {
        fs.writeFileSync("./dataStocks/stocks.js", JSON.stringify(stocks))
        return stock
    }
}

function postStock(req, res) {
    reqBody = req.body
    const stock = reqBody
    console.log(stock)
    if (!fs.existsSync("./dataStocks/stocks.js")) {
        fs.mkdirSync("./dataStocks")
        stock.id = 1;
        stocks.push(changeId(stock));
        console.log(changeId(stock))
        saveData(changeId(stock))
        res.send(changeId(stock))
    } else if (fs.existsSync("dataStocks/stocks.js")) {
        const data = fs.readFileSync("dataStocks/stocks.js", 'utf8');
        if (data.length < 1) {
            stock.id = 1;
            stocks.push(changeId(stock));
            console.log(changeId(stock))
            saveData(changeId(stock))
            res.send(changeId(stock))
        } else {
            cekData()
            stock.id = generateId();
            stocks.push(changeId(stock));
            console.log(changeId(stock))
            saveData(changeId(stock))
            res.send(changeId(stock))
        }
    }
    else {
        cekData()
        stock.id = generateId();
        stocks.push(changeId(stock));
        console.log(changeId(stock))
        saveData(changeId(stock))
        res.send(changeId(stock))
    }
}

function getStocks(req, res) {
    res.send({
        data: cekData()
    })
}

function getStocksById(req, res) {
    stokId = req.params.id;
    stokId = parseInt(stokId)
    cekData();
    const stock = stocks.find((s) => s.id === stokId);
    if (stock) {
        res.send({
            data: stocks.find(item => item.id === stokId)
        })
        console.log(stocks.find(item => item.id === stokId))
    } else {
        res.send({
            message: 'Data stock tidak ditemukan'
        })
        console.log(stocks.find(item => item.id === stokId))
    }
}

function updateStock(req, res) {
    cekData()
    stokId = parseInt(req.params.id);
    const index = stocks.findIndex((s) => s.id === stokId);
    if (index !== -1) {
        const updatedStock = req.body;
        stocks[index] = {
            id: stokId,
            nama: updatedStock.nama,
            harga: updatedStock.harga,
            barcode: updatedStock.barcode
        };
        res.send({
            success: true,
            message: `Stock with id ${stokId} has been updated!`,
            data: stocks[index]
        });
        saveData(stocks[index])
    } else {
        res.send({
            success: false,
            message: `Stock with id ${stokId} not found!`,
            data: null
        });
    }
}
function deleteOne(req, res) {
    cekData();
    const stokId = parseInt(req.params.id);
    const index = stocks.findIndex((s) => s.id === stokId);

    if (index !== -1) {
        const deletedStock = stocks.splice(index, 1)[0];
        res.send({
            success: true,
            message: `Stock with id ${stokId} has been deleted!`,
            data: deletedStock
        });
        saveData(deletedStock)
    } else {
        res.send({
            message: "GAGAL HAPUS"
        })
    }
}


function uploadGambar(req, res) {
    const metaData = req.file;
    console.log(metaData)
    const originalName = metaData.originalname;
    const oldPath = metaData.path;
    if (!fs.existsSync("gambar")) {
        fs.renameSync(oldPath, path.resolve(`gambar/${originalName}`))
        res.send({ message: 'ngiriim gambar' });
    } else {
        fs.renameSync(oldPath, path.resolve(`gambar/${originalName}`))
        res.send({ message: 'ngiriim gambar' });
    }

}

module.exports = {
    postStock,
    getStocks,
    getStocksById,
    updateStock,
    deleteOne,
    uploadGambar,
}