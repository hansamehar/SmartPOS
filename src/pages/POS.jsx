import React, { useContext, useEffect, useState } from "react";
import Menu from "../components/Menu";
import { Authcontext } from "../contexts/ContextAPI";
import { getProductAPI } from "../services/allAPI";
import serverURL from "../services/serverURL";
import Cart from "../components/Cart";
import { useDispatch } from "react-redux";
import { additems } from "../redux/slices/CartSlice";

const POS = () => {
  const { user } = useContext(Authcontext);
  const dispatch = useDispatch();

  const [allProducts, setAllProducts] = useState([]);
  const [searchkey, setSearchkey] = useState("");

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

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
  }, [searchkey]);

  useEffect(() => {
    const uniqueCategories = new Set();
    allProducts.forEach((product) => {
      uniqueCategories.add(product.category);
    });
    setCategories([...uniqueCategories]);
  }, [allProducts]);

  const filteredproducts = selectedCategory
    ? allProducts.filter((product) => product.category === selectedCategory)
    : allProducts;

  const handleAddToCart = (product) => {
    dispatch(additems(product));
  };
  const scrollBoxStyle = {
    overflowX: "auto",
    whiteSpace: "nowrap",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    WebkitOverflowScrolling: "touch",
    width:'700px'
  };

  return (
    <>
      <Menu />
      <div className="maindiv">
        <div className="position-absolute" >
          <div className="px-2 py-1" style={{marginRight:'31%',backgroundColor:'#f3f4f1'}}>
          <div
          className="d-flex justify-content-between align-items-center pb-2"
        >
          <h5>Choose Category</h5>
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
        </div>
            <div style={scrollBoxStyle}>
              <button
                style={{
                  backgroundColor: "#d9f275",
                }}
                onClick={() => setSelectedCategory("")}
                className="btn m-2 mb-4"
              >
                All
              </button>
              {categories.map((item, index) => (
                <button
                  style={
                    selectedCategory == item
                      ? { backgroundColor: "#d9f275" }
                      : { color: "#1d1d32",borderColor:'#1d1d32' }
                  }
                  className="btn m-2 mb-4   "
                  onClick={() => setSelectedCategory(item)}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="d-flex gap-3 flex-wrap justify-content-between">
              {filteredproducts?.length > 0 ? (
                filteredproducts.map((product) => (
                  <div
                    onClick={() => handleAddToCart(product)}
                    key={product?._id}
                    className="rounded shadow p-2"
                    style={{ width: "120px", backgroundColor: "white" }}
                  >
                    <img
                      width={"110px"}
                      height={"110px"}
                      src={`${serverURL}/uploads/${product?.productImg}`}
                      alt="no img"
                      
                    />
                    <hr />
                    <div>
                      <h6>{product?.name}</h6>
                      <span>${product?.price}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-danger  fs-5 text-center">No Products</div>
              )}
            </div>
          </div>
          <div className="w-25 position-fixed end-0 top-0 h-100 p-3 d-flex flex-column bg-white">
            <Cart />
          </div>
        </div>
      </div>
    </>
  );
};

export default POS;
