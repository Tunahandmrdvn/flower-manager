import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthProductService from "./../services/AuthProductService";
// import  ProductService   from "./../services/ProductService";

const CreateProduct = () => {
  const [addProduct, setAddProduct] = useState({
    flowerName: "",
    description: "",
    price: "",
    stockCount: "",
    image: "",
  });

  const [isProductValid, setIsProductValid] = useState({
    flowerName: true,
    description: true,
    price: true,
    stockCount: true,
    image: true,
  });

  const [productError, setProductError] = useState("");
  const [productSuccess, setProductSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsProductValid({ ...addProduct });
    if (!Object.values(addProduct).every((val) => val)) {
      return;
    }

    const productResult = AuthProductService.products(addProduct);
    if (productResult) {
      setAddProduct({
        flowerName: "",
        description: "",
        price: "",
        stockCount: "",
        image: "",
      });
      setProductSuccess(true);
      return;
    }
    setProductError("Hata Mesajı");
  };
  return (
    <>
      {productSuccess ? (
        <section>
          <h2>Create Product Successfully!</h2>
          <p>
            <Link to="/Products">
              <span>Products</span>
            </Link>
          </p>
        </section>
      ) : (
        <section>
          <h2>Create Product</h2>
          <form
            id="product-form"
            className="product-form"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label htmlFor="flowerName">Flower Name</label>
              <input
                type="text"
                id="flowerName"
                value={addProduct.flowerName}
                onChange={(event) =>
                  setAddProduct((prevProduct) => ({
                    ...prevProduct,
                    flowerName: event.target.value.trim(),
                  }))
                }
              />
              {!isProductValid.flowerName && (
                <span className="validation">Flower Name is not valid</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                value={addProduct.description}
                onChange={(event) =>
                  setAddProduct((prevProduct) => ({
                    ...prevProduct,
                    description: event.target.value.trim(),
                  }))
                }
              />
              {!isProductValid.description && (
                <span className="validation">Description is not valid</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="description">Price</label>
              <input
                type="number"
                id="description"
                value={addProduct.price}
                onChange={(event) =>
                  setAddProduct((prevProduct) => ({
                    ...prevProduct,
                    price: event.target.value.trim(),
                  }))
                }
              />
              {!isProductValid.price && (
                <span className="validation">Price is not valid</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="description">StockCount</label>
              <input
                type="number"
                id="description"
                value={addProduct.stockCount}
                onChange={(event) =>
                  setAddProduct((prevProduct) => ({
                    ...prevProduct,
                    stockCount: event.target.value.trim(),
                  }))
                }
              />
              {!isProductValid.stockCount && (
                <span className="validation">StockCount is not valid</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="description">Image</label>
              <input
                type="file"
                id="description"
                value={addProduct.image}
                onChange={(event) =>
                  setAddProduct((prevProduct) => ({
                    ...prevProduct,
                    image: event.target.value,
                  }))
                }
              />
              {!isProductValid.image && (
                <span className="validation">Image is not valid</span>
              )}
            </div>
            <div className="form-group">
              <button type="submit">Create Product</button>
            </div>
          </form>
        </section>
      )}
    </>
  );
};

export default CreateProduct;
