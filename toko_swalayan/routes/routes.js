const express = require('express')
const stocksCtrl = require('../controller/func')
const multer = require('multer');
const app = express.Router()
const path = require('path')

const upload = multer({
    dest:path.resolve('./tmp')
})
app.use(
    '/uploads',
    express.static(path.resolve('public/images'))
)

app.post('/tambahstok',stocksCtrl.postStock)
app.get('/ambilstok',stocksCtrl.getStocks)
app.get('/ambilstok/:id', stocksCtrl.getStocksById);
app.put('/ubahstok/:id', stocksCtrl.updateStock);
app.delete('/hapus_stok/:id', stocksCtrl.deleteOne);
app.post('/upload-gambar',upload.single('image'),stocksCtrl.uploadGambar)

module.exports = app