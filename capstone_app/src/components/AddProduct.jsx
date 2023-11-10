import { createProduct } from "../apiCalls/utils";
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css'

export default function AddProduct() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    imgUrl: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.imgUrl || !newProduct.category) {
      console.error("Please fill in all fields");
      return;
    }
    try {
      await createProduct(newProduct);

      setNewProduct({
        name: "",
        description: "",
        price: "",
        imgUrl: "",
        category: "",
      });

      // Handle success (e.g., show a success message)
      console.log("Product added successfully!");
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={newProduct.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            name="imgUrl"
            value={newProduct.imgUrl}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={newProduct.category}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
