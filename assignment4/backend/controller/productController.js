const { PrismaClient } = require("@prisma/client");
require("dotenv").config();
const prisma = new PrismaClient();
const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  }
);

// GET all products
const getAllProducts = async (req, res) => {
  const products = await prisma.product.findMany({
    include: {
      categoryImage: true,
      includes: true,
      productImage: true,
      gallery: true,
      others: {
        include: {
          image: true,
        },
      },
    },
  });
  res.json({ ...products });
};

// GET products by category
const getProducts = async (req, res) => {
  const { category } = req.params;
  const products = await prisma.product.findMany({
    where: {
      category: category,
    },
    include: {
      categoryImage: true,
      includes: true,
      productImage: true,
      gallery: true,
      others: {
        include: {
          image: true,
        },
      },
    },
  });
  res.json({ ...products });
};

// POST new image
const postImage = async (req, res) => {
  const resp = req.file;
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401); // unauthorized
  const token = authHeader.split(" ")[1];

  const { data: userVerification, error: userError } =
    await supabase.auth.getUser(token);

  if (userError) {
    return res.sendStatus(403); //forbidden i.e invalid token
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userVerification.user.id,
      },
    });
    if (user.isAdmin) {
      const { data, error } = await supabase.storage
        .from("assets")
        .upload(
          `${req.body.productName}/mobile/${resp.originalname}`,
          resp.buffer,
          {
            contentType: resp.mimetype,
          }
        );
      // console.log(data, error);

      const { data: imageURL } = supabase.storage
        .from("assets")
        .getPublicUrl(`${req.body.productName}/mobile/${resp.originalname}`);
      res.json({ imageURL });
    } else {
      throw new Error("You are not admin");
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// POST a new product
const postProduct = async (req, res) => {
  const data = req.body;
  try {
    const product = await prisma.product.create({
      data: {
        slug: data.slug,
        name: data.name,
        cartName: data.cart,
        productImage: {
          create: {
            mobile: data.pictures.productImage.imageURL.publicUrl,
            tablet: data.pictures.productImage.imageURL.publicUrl,
            desktop: data.pictures.productImage.imageURL.publicUrl,
          },
        },
        category: data.category,
        categoryImage: {
          create: {
            mobile: data.pictures.categoryImage.imageURL.publicUrl,
            tablet: data.pictures.categoryImage.imageURL.publicUrl,
            desktop: data.pictures.categoryImage.imageURL.publicUrl,
          },
        },
        new: data.new,
        price: data.price,
        description: data.description,
        features: data.features,
        includes: {
          create: data.included,
        },
        gallery: {
          create: [
            {
              mobile: data.pictures.galleryOne.imageURL.publicUrl,
              tablet: data.pictures.galleryOne.imageURL.publicUrl,
              desktop: data.pictures.galleryOne.imageURL.publicUrl,
            },
            {
              mobile: data.pictures.galleryTwo.imageURL.publicUrl,
              tablet: data.pictures.galleryTwo.imageURL.publicUrl,
              desktop: data.pictures.galleryTwo.imageURL.publicUrl,
            },
            {
              mobile: data.pictures.galleryThree.imageURL.publicUrl,
              tablet: data.pictures.galleryThree.imageURL.publicUrl,
              desktop: data.pictures.galleryThree.imageURL.publicUrl,
            },
          ],
        },
        others: {
          create: [
            {
              slug: "zx9-speaker",
              name: "ZX9 Speaker",
              cartName: "Zx9",
              category: "speakers",
              itemId: "5c471dfd-e911-414b-b668-866213773677",
              image: {
                create: {
                  mobile:
                    "https://delyvsmuliqlbeccucrz.supabase.co/storage/v1/object/public/assets/shared/mobile/image-zx9-speaker.jpg",
                  tablet:
                    "https://delyvsmuliqlbeccucrz.supabase.co/storage/v1/object/public/assets/shared/tablet/image-zx9-speaker.jpg",
                  desktop:
                    "https://delyvsmuliqlbeccucrz.supabase.co/storage/v1/object/public/assets/shared/desktop/image-zx9-speaker.jpg",
                },
              },
            },
            {
              slug: "xx99-mark-one-headphones",
              name: "XX99 Mark I",
              cartName: "XX99 MK I",
              category: "headphones",
              itemId: "28458f73-ed44-443e-9eb2-4f2d9cf96232",
              image: {
                create: {
                  mobile:
                    "https://delyvsmuliqlbeccucrz.supabase.co/storage/v1/object/public/assets/shared/mobile/image-xx99-mark-one-headphones.jpg",
                  tablet:
                    "https://delyvsmuliqlbeccucrz.supabase.co/storage/v1/object/public/assets/shared/tablet/image-xx99-mark-one-headphones.jpg",
                  desktop:
                    "https://delyvsmuliqlbeccucrz.supabase.co/storage/v1/object/public/assets/shared/desktop/image-xx99-mark-one-headphones.jpg",
                },
              },
            },
            {
              slug: "xx59-headphones",
              name: "XX59",
              cartName: "XX59",
              category: "headphones",
              itemId: "ffa15121-a3df-470b-ae72-827f36ecc7d0",
              image: {
                create: {
                  mobile:
                    "https://delyvsmuliqlbeccucrz.supabase.co/storage/v1/object/public/assets/shared/mobile/image-xx59-headphones.jpg",
                  tablet:
                    "https://delyvsmuliqlbeccucrz.supabase.co/storage/v1/object/public/assets/shared/tablet/image-xx59-headphones.jpg",
                  desktop:
                    "https://delyvsmuliqlbeccucrz.supabase.co/storage/v1/object/public/assets/shared/desktop/image-xx59-headphones.jpg",
                },
              },
            },
          ],
        },
      },
      include: {
        categoryImage: true,
        includes: true,
        productImage: true,
        gallery: true,
        others: true,
      },
    });
    res.status(200).json({ success: "product added Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE a product
const deleteProduct = async (req, res) => {
  const data = req.body;
  try {
    const user = await prisma.product.delete({
      where: {
        id: data.productId,
      },
    });
    res.status(200).json({ success: "product deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const pid = req.params;
  const data = req.body;
  try {
    const product = await prisma.product.update({
      where: {
        id: pid.id,
      },
      data: {
        slug: data.slug,
        name: data.name,
        cartName: data.cart,
        productImage: {
          deleteMany: {},
          create: {
            mobile: data.pictures.productImage.imageURL.publicUrl,
            tablet: data.pictures.productImage.imageURL.publicUrl,
            desktop: data.pictures.productImage.imageURL.publicUrl,
          },
        },
        category: data.category,
        categoryImage: {
          deleteMany: {},
          create: {
            mobile: data.pictures.categoryImage.imageURL.publicUrl,
            tablet: data.pictures.categoryImage.imageURL.publicUrl,
            desktop: data.pictures.categoryImage.imageURL.publicUrl,
          },
        },
        new: data.new,
        price: data.price,
        description: data.description,
        features: data.features,
        includes: {
          deleteMany: {},
          create: data.included,
        },
        gallery: {
          deleteMany: {},
          create: [
            {
              mobile: data.pictures.galleryOne.imageURL.publicUrl,
              tablet: data.pictures.galleryOne.imageURL.publicUrl,
              desktop: data.pictures.galleryOne.imageURL.publicUrl,
            },
            {
              mobile: data.pictures.galleryTwo.imageURL.publicUrl,
              tablet: data.pictures.galleryTwo.imageURL.publicUrl,
              desktop: data.pictures.galleryTwo.imageURL.publicUrl,
            },
            {
              mobile: data.pictures.galleryThree.imageURL.publicUrl,
              tablet: data.pictures.galleryThree.imageURL.publicUrl,
              desktop: data.pictures.galleryThree.imageURL.publicUrl,
            },
          ],
        },
      },
    });

    const othersImage = await prisma.others.updateMany({
      where: {
        itemId: pid.id,
      },
      data: {
        itemId: product.id,
      },
    });

    res.status(200).json({ success: "product updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const totalPrice = (products) => {
  let total = 0;
  for (let i = 0; i < products.length; i++) {
    total += products[i].price * products[i].quantity;
  }
  return total;
};

// POST new order
const postOrder = async (req, res) => {
  const data = req.body;
  let flag = false;
  const productIds = data.products.map((product) => product.id);
  const productPriceMap = {};

  const dbProducts = await prisma.product.findMany({
    where: {
      id: { in: productIds },
    },
    select: {
      id: true,
      price: true,
    },
  });

  if (dbProducts.length === 0 || dbProducts.length != data.products.length) {
    return res.status(401).json({ error: "ids were changed" });
  }

  for (let i = 0; i < dbProducts.length; i++) {
    productPriceMap[dbProducts[i].id] = dbProducts[i].price;
  }

  for (let i = 0; i < data.products.length; i++) {
    if (productPriceMap[data.products[i].id] != data.products[i].price) {
      flag = true;
      break;
    }
  }

  if (flag) {
    return res.status(401).json({ error: "Price changed" });
  }

  try {
    const order = await prisma.orders.create({
      data: {
        User: { connect: { id: data.userId } },
        name: data.name,
        email: data.email,
        phoneNumber: data.phone,
        address: data.address,
        zip: data.zip,
        city: data.city,
        country: data.country,
        paymentMethod: data.paymentMethod,
        totalAmount: totalPrice(data.products) + 50,
        products: {
          create: data.products.map((product) => ({
            name: product.name,
            quantity: product.quantity,
            price: product.price,
            imageURL: product.imageURL,
          })),
        },
      },
    });

    res.json({ message: "Order placed Successfully" });
  } catch (error) {
    return res.status(401).json({ error });
  }
};

// GET an order
const getOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const orders = await prisma.orders.findMany({
      where: {
        userId: id,
      },
      orderBy: {
        date: "desc",
      },
      include: {
        products: true,
      },
    });
    res.json({ ...orders });
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  getProducts,
  postImage,
  postProduct,
  postOrder,
  getOrder,
  getAllProducts,
  deleteProduct,
  updateProduct,
};
