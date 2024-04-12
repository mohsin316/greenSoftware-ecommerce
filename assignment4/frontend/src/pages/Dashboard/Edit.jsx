// styles
import "./Edit.css";

// imports
import { Link } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import Loader from "../../assets/shared/loader.json";

import {
  useGetAllProductsQuery,
  useDeleteProductMutation,
} from "../../features/productsApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectCurrentUser } from "../../features/authSlice";
import { useLogoutMutation } from "../../features/authApiSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Edit() {
  const { isSuccess, data, isLoading } = useGetAllProductsQuery();
  const [deleteProduct, { isLoading: deleteLoading }] =
    useDeleteProductMutation();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const { user } = useSelector(selectCurrentUser);

  const handleDelete = async (productId) => {
    try {
      const response = await deleteProduct({
        productId,
        uid: user.id,
      }).unwrap();
      toast.success("Product Deleted!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      if (error.originalStatus === 401) {
        await logout();
        dispatch(logOut());
      } else {
        toast.error("Something went wrong...", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  return (
    <>
      <ToastContainer />

      <section className="editing-section">
        <h1>List of products</h1>

        {isLoading && (
          <Player className="loader" autoplay loop src={Loader}></Player>
        )}

        {deleteLoading && (
          <>
            <div className="picture-loading">
              <Player autoplay loop src={Loader}></Player>
            </div>
          </>
        )}
        <div className="editing-products-container">
          {isSuccess &&
            data.ids.map((productId) => (
              <div key={productId}>
                <picture>
                  <source
                    media="(max-width: 700px)"
                    srcSet={`${data.entities[productId].productImage[0].mobile}`}
                  />
                  <source
                    media="(max-width: 1000px)"
                    srcSet={`${data.entities[productId].productImage[0].tablet}`}
                  />
                  <img
                    src={`${data.entities[productId].productImage[0].desktop}`}
                    alt="product image"
                  />
                </picture>
                <strong className="item-name">
                  {data.entities[productId].name}
                </strong>
                <div className="price-category">
                  <strong>
                    Type:- <span>{data.entities[productId].category}</span>{" "}
                  </strong>
                  <strong>
                    Price:- <span>$ {data.entities[productId].price}</span>
                  </strong>
                </div>
                <p>
                  {data.entities[productId].description
                    .substring(0, 120)
                    .concat("...")}
                </p>
                <div className="edit-delete-button-container">
                  <Link to={`${productId}`}>Update</Link>
                  <button
                    disabled={deleteLoading}
                    onClick={() => handleDelete(productId)}
                  >
                    delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}
