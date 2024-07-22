const express = require('express');
const app = express();
const morgan = require('morgan');
const ErrorHandler = require('./ErrorHandler');

// Middleware untuk logging menggunakan morgan
app.use(morgan('dev'));

// Middleware contoh pertama
// app.use((req, res, next) => {
//     console.log('Middleware pertama');
//     next();
//     console.log('Middleware setelah next() di middleware pertama');
// });

// // Middleware contoh kedua
// app.use((req, res, next) => {
//     console.log('Middleware kedua');
//     next();
// });

// Middleware untuk menambahkan waktu request ke objek req
// app.use((req, res, next) => {
//     req.timeRequest = Date.now();
//     console.log(`${req.method} ${req.url}`);
//     next();
// });

// Middleware untuk autentikasi
const auth = (req, res, next) => {
    const { password } = req.query;
    if (password === 'admin') {
        return next();
    }
    throw new ErrorHandler(401, 'Perlu masukan password');
};

// Route utama
app.get('/', (req, res) => {
    console.log(req.timeRequest); // Untuk melihat waktu request di console
    res.send('Hello World');
});

// Route tambahan
app.get('/halaman', (req, res) => {
    res.send('Halaman');
});

// Route untuk memicu error
app.get('/error', (req, res) => {
    bird.fly(); // Ini akan menyebabkan error karena bird tidak terdefinisi
});

// Route admin dengan middleware auth
app.get('/admin', auth, (req, res) => {
    res.send('Admin');
});

// Route untuk memicu error generik
app.get('/general/error', (req, res) => {
    throw new ErrorHandler();
});

// Middleware untuk menangani error
app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong" } = err;
    res.status(status).send({ error: message });
});

// Middleware untuk menangani 404 (Not Found)
app.use((req, res) => {
    res.status(404).send('Not Found');
});

// Memulai server di port 3000
app.listen(3000, () => {
    console.log('Listening on port 3000');
});



