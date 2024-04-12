// styles
import "./Create.css";

// imports
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { usePostImageMutation } from "../../features/productsApiSlice";
import { usePostProductMutation } from "../../features/productsApiSlice";

import { Player } from "@lottiefiles/react-lottie-player";
import Loader from "../../assets/shared/loader.json";
// toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// rtkq
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectCurrentUser } from "../../features/authSlice";
import { useLogoutMutation } from "../../features/authApiSlice";

const checkoutSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be 2 or more characters." }),
  slug: z
    .string()
    .trim()
    .min(2, { message: "Slug must be 2 or more characters." }),
  cart: z
    .string()
    .trim()
    .min(2, { message: "Cart name must be 2 or more characters." }),
  description: z
    .string()
    .trim()
    .min(25, { message: "Description must be 25 or more characters." }),
  features: z
    .string()
    .trim()
    .min(50, { message: "Description must be 50 or more characters." }),
  category: z.string(),
  new: z.boolean(),
  price: z.coerce
    .number({
      required_error: "Age is required",
      invalid_type_error: "Age must be a number",
    })
    .gte(50, "Must be 50 and above"),
});

export default function Create() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setFocus,
    setError,
    clearErrors,
    reset,
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { new: false, category: "headphones" },
  });

  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const [postImage, { isLoading }] = usePostImageMutation();
  const [postProduct, { isLoading: loading, isSuccess }] =
    usePostProductMutation();
  const { user } = useSelector(selectCurrentUser);

  const [quantity, setQuantity] = useState("");
  const [item, setItem] = useState("");
  const [includedItems, setIncludedItems] = useState([]);
  const [pictures, setPictures] = useState({
    productImage: null,
    categoryImage: null,
    galleryOne: null,
    galleryTwo: null,
    galleryThree: null,
  });

  const [pictureError, setPictureError] = useState(false);
  const [includedItemsError, setIncludedItemsError] = useState(false);

  const handleLogout = async () => {
    await logout();
    dispatch(logOut());
  };

  const setIncludes = () => {
    if (item && quantity) {
      setIncludedItems((prevItems) => {
        return [...prevItems, { quantity: Number(quantity), item }];
      });
      setItem("");
      setQuantity("");
    }
  };

  const setPicture = async (e, pictureType) => {
    clearErrors("slug");

    const values = getValues("slug");
    if (!values) {
      setError("slug", {
        type: "custom",
        message: "Please enter Slug name first to upload image",
      });
      setFocus("slug");
      return;
    }

    let selected = e.target.files[0];
    if (!selected) {
      return;
    }
    if (!selected.type.includes("image")) {
      setPictureError("Please select images.");
      return;
    }
    const formData = new FormData();
    formData.append("image", selected);
    formData.append("productName", values);
    if (pictureType === "galleryOne") {
      try {
        const response = await postImage(formData).unwrap();
        setPictures((prev) => {
          return { ...prev, galleryOne: response };
        });
      } catch (error) {
        if (error.status === 401) {
          handleLogout();
        }
      }
    }
    if (pictureType === "galleryTwo") {
      try {
        const response = await postImage(formData).unwrap();
        setPictures((prev) => {
          return { ...prev, galleryTwo: response };
        });
      } catch (error) {
        if (error.status === 401) {
          handleLogout();
        }
      }
    }
    if (pictureType === "galleryThree") {
      try {
        const response = await postImage(formData).unwrap();
        setPictures((prev) => {
          return { ...prev, galleryThree: response };
        });
      } catch (error) {
        if (error.status === 401) {
          handleLogout();
        }
      }
    }
    if (pictureType === "productImage") {
      try {
        const response = await postImage(formData).unwrap();
        setPictures((prev) => {
          return { ...prev, productImage: response };
        });
      } catch (error) {
        if (error.status === 401) {
          handleLogout();
        }
      }
    }
    if (pictureType === "categoryImage") {
      try {
        const response = await postImage(formData).unwrap();
        setPictures((prev) => {
          return { ...prev, categoryImage: response };
        });
      } catch (error) {
        if (error.status === 401) {
          handleLogout();
        }
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Product Added!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      reset();
    }
  }, [isSuccess]);

  const onSubmit = async (data) => {
    setPictureError(false);
    setIncludedItemsError(false);

    if (Object.values(pictures).includes(null)) {
      setPictureError("Please include all 5 images.");
      return;
    }
    if (includedItems.length === 0) {
      setIncludedItemsError(true);
      return;
    }
    try {
      window.scrollTo(0, 0);
      const response = await postProduct({
        ...data,
        included: includedItems,
        pictures,
        uid: user.id,
      }).unwrap();
    } catch (error) {
      if (error.originalStatus === 401) {
        handleLogout();
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
      <section className="add-product-section">
        {isLoading && (
          <>
            <div className="picture-loading">
              <Player autoplay loop src={Loader}></Player>
            </div>
          </>
        )}
        {loading && (
          <>
            <div className="picture-loading">
              <Player autoplay loop src={Loader}></Player>
            </div>
          </>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Add a new product</h1>
          <div className="basic-details">
            <label>
              Slug
              <input
                placeholder="zx7-speaker1"
                {...register("slug")}
                type="text"
                id="slug"
              />
              {errors.slug && (
                <small className="error">{errors.slug.message}</small>
              )}
            </label>
            <label>
              Cart name
              <input
                placeholder="zx7"
                {...register("cart")}
                type="text"
                id="cart"
              />
              {errors.cart && (
                <small className="error">{errors.cart.message}</small>
              )}
            </label>
            <label>
              Name
              <input
                placeholder="ZX7 Speaker1"
                {...register("name")}
                type="text"
                id="name"
              />
              {errors.name && (
                <small className="error">{errors.name.message}</small>
              )}
            </label>
            <label>
              Price
              <input type="number" {...register("price")} />
              {errors.price && (
                <small className="error">{errors.price.message}</small>
              )}
            </label>
            <div className="category-checkbox">
              <label>
                Category
                <select {...register("category", { required: true })}>
                  <option value="headphones">headphones</option>
                  <option value="speakers">speakers</option>
                  <option value="earphones">earphones</option>
                </select>
              </label>
              <label className="checkbox">
                New
                <input type="checkbox" {...register("new")} />
              </label>
            </div>
          </div>
          <div className="descriptive-information">
            <label>
              Description
              <textarea
                {...register("description")}
                placeholder="Stream high quality sound wirelessly with minimal to no loss. The ZX7 speaker uses high-end audiophile...."
              />
              {errors.description && (
                <small className="error">{errors.description.message}</small>
              )}
            </label>
            <label>
              Features
              <textarea
                {...register("features")}
                placeholder="Reap the advantages of a flat diaphragm tweeter cone. This provides a fast response rate and excellent..."
              />
              {errors.features && (
                <small className="error">{errors.features.message}</small>
              )}
            </label>
          </div>
          <div className="includes">
            <strong>includes</strong>
            <label>
              Item
              <input
                type="text"
                onChange={(e) => setItem(e.target.value)}
                value={item}
              />
            </label>
            <label>
              Quantity
              <input
                type="number"
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
              />
            </label>
            <button type="button" onClick={setIncludes}>
              add
            </button>
            {includedItems.length >= 1 &&
              includedItems.map((item, index) => (
                <small key={index}>
                  {item.item} x{item.quantity}
                </small>
              ))}
          </div>
          <div className="pictures">
            <label>
              <span>product image</span>
              <input
                type="file"
                onChange={(e) => setPicture(e, "productImage")}
              />
            </label>
            <label>
              <span>category image</span>
              <input
                type="file"
                onChange={(e) => setPicture(e, "categoryImage")}
              />
            </label>
            <label>
              <span>galleryOne</span>
              <input
                type="file"
                onChange={(e) => setPicture(e, "galleryOne")}
              />
            </label>
            <label>
              <span>galleryTwo</span>
              <input
                type="file"
                onChange={(e) => setPicture(e, "galleryTwo")}
              />
            </label>
            <label>
              <span>galleryThree</span>
              <input
                type="file"
                onChange={(e) => setPicture(e, "galleryThree")}
              />
            </label>
          </div>
          <button className="submit" disabled={loading || isLoading}>
            submit
          </button>
          {pictureError && <strong className="error">{pictureError}</strong>}
          {includedItemsError && (
            <strong className="error">
              Please include at least 1 item and quantity
            </strong>
          )}
        </form>
      </section>
    </>
  );
}
