import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../UserContext/CartContext";
import { toast } from "react-toastify";
import Loading from "./../Loading/Loading";
import { Link } from "react-router-dom";
import fiendCart from "../../assets/Shopping_cart_icon.svg.f8fe30e7c8486fa64804.png";

``;

export default function Cart() {
  let { displayCart, deleteCartItem, UpdatItem, setCounter, counter } =
    useContext(CartContext);
  const [display, setDisplay] = useState(null);
  const [isloading, setIsloading] = useState(true);
  const [cartPrice, setCartPrice] = useState([]);
  const [cart, setCart] = useState(null);

  async function UpdatCart(id, count) {
    // setIsloading(true)
  
    
    let { data } = await UpdatItem(id, count);
    setDisplay(data?.data);
    setCart(data);
    
    if (data?.status == "success") {
      // setIsloading(false)
      toast.success("Product added successfully ");
    }
  }
  async function UpdatCart2(id, count) {
    // setIsloading(true)
    
    if (count < 1) {
      deleteItem(itemId)
    };
    let { data } = await UpdatItem(id, count);
    setDisplay(data?.data);
    setCart(data);
    
    if (data?.status == "success") {
      // setIsloading(false)
      toast.error("Product remove successfully ");
    }
  }

  async function getDisplayCart() {
    setIsloading(false);
    let { data } = await displayCart();

    if (data.status == "success") {
      setIsloading(true);
      setDisplay(data?.data);
      setCart(data);

      
      setCartPrice(data?.data?.totalCartPrice);
      setCart(data);
      setCounter(data);
    }
  }
 
  async function deleteItem(itemId) {
    // setIsloading(false)

    let { data } = await deleteCartItem(itemId);
    
    setDisplay(data?.data);
    setCart(data);
    if (data.status == "success") {
      // setIsloading(true)
      toast.error("Product removed successfully from cart");
      setCounter(data);
    }
  }
  
  useEffect(() => {
    getDisplayCart();
  }, []);

  return (
    <>
      {display?.products.length == 0 ? (
        <div>
          <div className="row">
            <div className="flex flex-col justify-center items-center mt-10 mb-5">
              <img src={fiendCart} alt="empty cart" className="w-1/4 " />

              <h4 className="text-main text-3xl font-bold pb-2">
                Your cart is empty
              </h4>
              <p className="text-secondary text-center mt-3 pb-2">
                Looks like you haven't added anything to your cart. <br />
                Go ahead & explore top products
              </p>
              <Link
                to="/proudct"
                className="btn-out3 mt-3 bg-main text-white font-bold "
              >
                Explore Our Products
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {isloading ? (
            <div className="relative my-6 shadow-md sm:rounded-lg">
              <table className="w-full lg:w-3/4 mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 p-1">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-5 py-3">
                      <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Product
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Qty
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {display?.products.map((item) => (
                    <tr
                      key={item?.product?.id}
                      className="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      <td className="p-0">
                        <img
                          src={item.product.imageCover}
                          className="w-3/4 md:w-32 max-w-full max-h-full"
                          alt="Apple Watch"
                        />
                      </td>
                      <td className="px-0 py-4 font-semibold text-gray-900 dark:text-white">
                        {item?.product?.title.split(" ").slice(0, 2).join(" ")}
                      </td>
                      <td className="px-0 py-4">
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              UpdatCart2(item?.product?.id, item?.count - 1)
                            }
                            className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 1h16"
                              />
                            </svg>
                          </button>
                          <span>{item?.count}</span>
                          <button
                            onClick={() =>
                              UpdatCart(item?.product?.id, item?.count + 1)
                            }
                            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-2 py-4 font-semibold text-gray-900 dark:text-white">
                        {item?.price}EGP
                      </td>
                      <td className="px-0 py-4">
                        <button
                          onClick={() => deleteItem(item?.product?.id)}
                          className="btn-rem "
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <div className="mb-10 mt-3  flex justify-end items-end   ">
                  <Link
                    to={`/ShippingAddress/${cart?.data?._id}`}
                    className="btn-out3 text-medium text-center   "
                  >
                    Buy Now{" "}
                    <i className="fa-solid text-center text-sm lg:text-medium fa-arrow-right fa-fade fa-lg text-white"></i>{" "}
                    {cartPrice}EGP
                  </Link>
                </div>
              </table>
            </div>
          ) : (
            <Loading />
          )}
        </div>



        
      )}

      
    </>
  );
}
