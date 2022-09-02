const fs = require('fs');

const pathToFile = './productos.txt';

class Contenedor {
  constructor() {
    this.pathToFile = pathToFile;
  }

  async save(product) {
    let id = await this.getAll();
    id = id.length + 1;
    product.id = id;
    let products = await this.getAll();
    products.push(product);
    await fs.promises.writeFile(this.pathToFile, JSON.stringify(products, null, 2));
    return id;
  }

  async getById(id) {
    let products = await this.getAll();
    let product = products.find(product => product.id === id);
    return product;
  }

  async getAll() {
    try {
      let products = await fs.promises.readFile(this.pathToFile, 'utf-8');
      products = JSON.parse(products);
      return products;
    } catch (error) {
      return [];
    }
  }

  async deleteById(id) {
    let products = await this.getAll();
    let product = products.find(product => product.id === id);
    if (product) {
      products = products.filter(product => product.id !== id);
      await fs.promises.writeFile(this.pathToFile, JSON.stringify(products, null, 2));
      return product;
    } else {
      return null;
    }
  }

  async deleteAll() {
    await fs.promises.writeFile(this.pathToFile, JSON.stringify([], null, 2));
  }
}

module.exports = Contenedor;
