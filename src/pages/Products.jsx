import React, { useContext, useEffect, useState } from "react";
import Menu from "../components/Menu";
import AddProduct from "../components/AddProduct";
import { getProductAPI, removeProductAPI } from "../services/allAPI";
import "../styles/Common.css";
import EditProduct from "../components/EditProduct";
import serverURL from "../services/serverURL";
import { Authcontext } from "../contexts/ContextAPI";

const Products = () => {
    const { user, setUser } = useContext(Authcontext);
  
  const [responseFromAdd, setResponsefromAdd] = useState([]);
  const [responseFromEdit, setResponsefromEdit] = useState([]);

  const [allProducts, setAllProducts] = useState([]);
  const [searchkey, setSearchkey] = useState("");

  const getProducts = async () => {
    try {
      const result = await getProductAPI(searchkey);
      if (result.status == 200) {
        setAllProducts(result.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProducts();
  }, [responseFromAdd, responseFromEdit, searchkey]);

  const deleteProduct = async (id) => {
    const token = sessionStorage.getItem("token");
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (token && user.role == "admin") {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
    try {
      const result = await removeProductAPI(id,reqHeader);
      if (result.status == 200) {
        alert("product deleted");
        getProducts();
      } else {
        alert(result.response.data);
      }
    } catch (e) {
      console.log(e);
    }
  } else {
    console.log("unauthorized");
  }
  };

  return (
    <>
      <Menu />
      <div className="maindiv">
        <div className="d-flex justify-content-between align-items-center">
          <form class="w-50">
            <input
              onChange={(e) => setSearchkey(e.target.value)}
              class="form-control "
              type="text "
              placeholder="Search Products"
              style={{
                boxShadow: "none",
              }}
            />
          </form>
        {user?.role == "admin" &&  <AddProduct setResponsefromAdd={setResponsefromAdd} />}
        </div>

        <h4 className="my-3">Inventory :</h4>
        <div className="table-responsive">
          <table className="table table-bordered ">
            <thead>
              <tr>
                <td className="fw-bolder">ID</td>
                <td className="fw-bolder">Product</td>
                <td className="fw-bolder">Category</td>
                <td className="fw-bolder">Price</td>
                <td className="fw-bolder">Brand</td>
                <td className="fw-bolder">Stock</td>
                <td className="fw-bolder">Action</td>
              </tr>
            </thead>
            <tbody>
              {allProducts?.length > 0 ? (
                allProducts.map((product, index) => (
                  <tr className="align-middle" key={product?._id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        className="m-1"
                        width={"90px"}
                        height={"90px"}
                        src={`${serverURL}/uploads/${product?.productImg}`}
                        alt="no img"
                      />
                      {product?.name}
                    </td>
                    <td>{product?.category}</td>
                    <td>${product?.price}</td>
                    <td>{product?.brand}</td>
                    {Number(product?.stock) > 20 ? (
                      <td>{product?.stock}</td>
                    ) : (
                      <td>
                        {product?.stock}
                        <span
                          style={{
                            fontSize: "13px",
                            backgroundColor: "#c2a4f9",
                          }}
                          className="rounded text-light d-block p-1 m-1"
                        >
                          low
                        </span>
                      </td>
                    )}
                    <td>
                      <EditProduct
                        product={product}
                        setResponsefromEdit={setResponsefromEdit}
                      />
                      {user?.role == "admin" && <button
                        onClick={() => deleteProduct(product?._id)}
                        className="btn"
                        style={{ color: "#c474bc " }}
                      >
                        <i class="fa-solid fa-trash"></i>
                      </button>}
                    </td>
                  </tr>
                ))
              ) : (
                <div className="text-danger  fs-5 text-center">No Products</div>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Products;
