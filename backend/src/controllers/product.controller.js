import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";

const addProduct = async (req, res) => {
  console.log(req.body);

  const {
    brand,
    title,
    cateogry,
    subCateogry,
    price,
    discount,
    images,
    barcode,
    minOrderQtydeliveryDatestock,
    returnPolicy,
    weight,
  } = req.body;

  //  if(
  //     // !brand ||
  //     // !title ||
  //     // !cateogry ||
  //     !subCateogry ||
  //     !price ||
  //     !images ||
  //     !returnPolicy ||
  //     !weight){
  //         return res.status(400).json({message:'please fill all data correctly'})

  //     }

  try {
    const response = await Product.create({
      brand,
      title,
      cateogry,
      subCateogry,
      price,
      discount,
      images,
      barcode,
      minOrderQtydeliveryDatestock,
      returnPolicy,
      weight,
    });
    console.log("ressss", response);

    if (!response) {
      return res.status(500).json({
        message: "Internal Server erro while saving product data in Database",
      });
    }

    res.status(200).json({
      message: "Products saved in Inventory..!",
      response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server error while saving product",
    });
  }
};

const allProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (!products) {
      res.status(500).json({
        message: "Data base error while Fetching All products",
      });
    }

    res.status(201).json({ products, message: "products fetched succesfully" });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server error while Fetching All products",
    });
  }
};

const singleProduct = async (req, res) => {
  const id = req.params.id;
  // console.log(id);

  try {
    const products = await Product.find({ _id: id });
    if (!products) {
      res.status(500).json({
        message: "Data base error while Fetching single product",
      });
    }

    res
      .status(200)
      .json({ products, message: "single product fetched succesfully" });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server error while Fetching single product",
    });
  }
};

const orderProduct = async (req, res) => {
    const { tprice, customerId, orderedItems,deliveryAddress,deliveryContact,deliveryZip } = req.body; // Ensure correct naming (tprice instead of price)
    console.log(req.body);

    try {
        // Validate input
        if (!tprice || !customerId || !orderedItems || orderedItems.length === 0) {
            return res.status(400).json({ message: "Please fill all data correctly" });
        }

        // Check if the user is valid
        const user = await User.findById(customerId); 
        if (!user) return res.status(400).json({ message: "Invalid member Id" });

        // Validate each product and check stock
        const products = await Product.find({ _id: { $in: orderedItems.map(item => item.product) } });

        if (products.length !== orderedItems.length) {
            return res.status(400).json({ message: "One or more invalid products"});
        }

        // Check stock for each product
        for (let i = 0; i < orderedItems.length; i++) {
            const orderedItem = orderedItems[i];
            const product = products.find(p => p._id.toString() === orderedItem.product);
            if (product.stock < orderedItem.qty) {
                return res.status(501).json({ message: `Product ${product.title} is out of stock ..!` });
            }
        }

        // Create the order
        const response = await Order.create({
            tprice,
            customerId,
            orderedItems,
            deliveryAddress,
            deliveryContact,
            deliveryZip
            
        });

        if (!response) {
            return res.status(500).json({
                message: "Database error while saving order",
            });
        }

        res.status(200).json({ message: "Order Saved", response });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server error while saving order",
        });
    }
};


const viewAllOrders = async (req, res) => {
  try {
    // Find all orders and populate related User and Product data
    const orders = await Order.find()
      .populate({
        path: "customerId",
        // select: 'name email' // Choose fields you want from User model
      })
      .populate({
        path: "orderedItems",
        // select: 'name price stock' // Choose fields you want from Product model
      });

    if (!orders) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json({ message: "Orders fetched successfully", orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error while fetching orders",
    });
  }
};

// const viewAllOrders=async(req,res)=>{

//         try {

//             const response=await Order.find({})

//         } catch (error) {
//             console.log(error);

//         }
// }

export { addProduct, allProducts, singleProduct, orderProduct, viewAllOrders };
