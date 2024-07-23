import React, { useState } from "react";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";

const Products = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Product 1", quantity: 10 },
    { id: 2, name: "Product 2", quantity: 20 },
  ]);

  const [currentProduct, setCurrentProduct] = useState(null);

  const addProduct = (product) => {
    setProducts([...products, { ...product, id: products.length + 1 }]);
  };

  const updateProduct = (product) => {
    setProducts(products.map((p) => (p.id === product.id ? product : p)));
    setCurrentProduct(null);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const editProduct = (product) => {
    setCurrentProduct(product);
  };

  const clearCurrentProduct = () => {
    setCurrentProduct(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Inventory Management System</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <ProductForm
            addProduct={addProduct}
            currentProduct={currentProduct}
            updateProduct={updateProduct}
            clearCurrentProduct={clearCurrentProduct}
          />
        </div>
        <div>
          <ProductList
            products={products}
            editProduct={editProduct}
            deleteProduct={deleteProduct}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
