import { useState } from "react";
import { updatedProduct } from "../apiCalls/utils";

const EditProduct = ({ product, onClose, onUpdate }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      if (!editedProduct) {
        console.error('No product to update.');
        return;
      }
  
      const updatedProductData = await updatedProduct({
        ...editedProduct,
        productId: editedProduct.id,
      });
      onUpdate(updatedProductData);
      onClose();
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };
  

  return (
    <div className="edit-product-modal">
      <h2>Edit Product</h2>
      <form>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={editedProduct.name}
          onChange={handleInputChange}
        />

        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={editedProduct.description}
          onChange={handleInputChange}
        />

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={editedProduct.price}
          onChange={handleInputChange}
        />

        <label htmlFor="imgUrl">Image URL:</label>
        <input
          type="text"
          id="imgUrl"
          name="imgUrl"
          value={editedProduct.imgUrl}
          onChange={handleInputChange}
        />

        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={editedProduct.category}
          onChange={handleInputChange}
        />
        <div>
        <button type="button" onClick={handleUpdate}>
          Update Product
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;

