import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    tprice: {
      type: Number,
      required: true,
      min: 0,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderedItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        qty: {
          type: Number,
          min: 0,
          default: 1,
        },
      },
    ],
    deliveryAddress: {
      type: String,
      required: true,
    },
    deliveryContact: {
      type: String,
      required: true,
    },
    deliveryZip: {
      type: Number,
      required: true,
      min: 6,
    },
  },
  { timestamps: true }
);

export const Order = new mongoose.model("Order", orderSchema);
