const paypalClient = require("../../helpers/paypal");
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");
const generateAccessToken = require('../../helpers/paypal');

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId,
    } = req.body;

    const accessToken = await generateAccessToken();

    // Map cart items for PayPal API
    const items = cartItems.map((item) => ({
      name: item.title,
      sku: item.productId,
      price: item.price.toFixed(2),
      currency: "USD",
      quantity: item.quantity,
    }));

    // Calculate total order value
    const totalValue = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    ).toFixed(2);

    // Make request to PayPal API to create an order
    const { data } = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders`,
      {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: totalValue,
              breakdown: {
                item_total: {
                  currency_code: "USD",
                  value: totalValue,
                },
              },
            },
            items: items,
            shipping: {
              address: {
                address_line_1: addressInfo.address,
                address_line_2: addressInfo.addressLine2 || "", // Optional
                admin_area_1: addressInfo.state,
                admin_area_2: addressInfo.city,
                postal_code: addressInfo.pincode,
                country_code: "US",  // Replace with the correct country code
              },
            },
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Check if the response contains data and links
    if (!data || !data.links) {
      console.error("Error creating PayPal order: Missing links");
      return res.status(500).json({
        success: false,
        message: "Error while creating PayPal payment",
      });
    }

    // Extract approval URL from the response
    const approvalURL = data.links.find(
      (link) => link.rel === "approve"
    )?.href;

    if (!approvalURL) {
      console.error("Error: Approval URL not found");
      return res.status(500).json({
        success: false,
        message: "Error finding PayPal approval URL",
      });
    }

    // Save order data in the database
    const newlyCreatedOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount: parseFloat(totalValue),
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
    });

    await newlyCreatedOrder.save();

    // Return success response with approval URL and order ID
    return res.status(201).json({
      success: true,
      approvalURL, // Return approval URL for the frontend
      orderId: newlyCreatedOrder._id,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
    console.error("PayPal Order Creation Error:", e.response?.data || e.message);
    throw new Error("Error creating PayPal order");
  }
};


app.post("/api/orders", async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart || cart.length === 0) {
      return res.status(400).json({ error: "Cart cannot be empty" });
    }
    const order = await createOrder(cart);
    res.json({ orderID: order.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const createPayment = async(req,res) =>{
    try{
      const {cart} = req.body;
      if (!cart || cart.length === 0) {
        return res.status(400).json({ error: "Cart cannot be empty" });
      }
      const order = await createOrder(cart);
      res.json({orderId : order.id});
    }
    catch(error){
      res.status(500).json({
        error : error.message
      })
    }
}



const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;

    let order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order can not be found",
      });
    }

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId;

    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Not enough stock for this product ${product.title}`,
        });
      }

      product.totalStock -= item.quantity;

      await product.save();
    }

    const getCartId = order.cartId;
    await Cart.findByIdAndDelete(getCartId);

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order confirmed",
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports = {
  createPayment,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
};
