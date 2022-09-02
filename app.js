const express = require('express');

const Contenedor = require('./contenedor.js');
const contenedor = new Contenedor();

const app = express();

const server = app.listen(8080 , () => console.log('Server Up'));

app.use(express.json()); // uso de middleware

app.get('/api/productos' , (req , res) => {
	contenedor.getAll()
		.then((productos) => {
			if (productos.length === 0) {
				res.json({error: 'no hay productos cargados'});
			} else {
				res.json(productos);
			}
		}
		)
})

app.get('/api/productoRandom' , (req , res) => {
	const num = Math.floor(Math.random() * 10);

	contenedor.getById(num)
		.then((producto) => {
			if (producto === undefined) {
				res.json({error: `producto con id: ${num} no encontrado`});
			} else {
				res.json(producto);
			}
		})
})


