const axios = require("axios");
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");
const generateAccessToken = require('../../helpers/paypal');

// Define PayPal API URL
const PAYPAL_API = "https://api-m.sandbox.paypal.com";

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cart, // Changed from cartItems
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      cartId,
    } = req.body;

    // Validate required fields
    if (!userId || !cart || !addressInfo || !totalAmount) {
      return res.status(400).json({
        success: false,
        message: "Missing required order information",
      });
    }

    // Get PayPal access token
    const accessToken = await generateAccessToken();

    // Map cart items for PayPal API
    const items = cart.map((item) => ({
      name: item.name,
      sku: item.id,
      unit_amount: {
        currency_code: "USD",
        value: Number(parseFloat(item.price).toFixed(2)),
      },
      quantity: item.quantity,
    }));

    // Calculate total value from items
    const totalValue = parseFloat(totalAmount).toFixed(2);

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
          },
        ],
        application_context: {
          return_url: "http://localhost:5173/shop/paypal-return",
          cancel_url: "http://localhost:5173/payment-cancelled",
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("PayPal order creation response:", data);

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

    console.log("Approval URL:", approvalURL);
    if (!approvalURL) {
      console.error("Error: Approval URL not found");
      return res.status(500).json({
        success: false,
        message: "Error finding PayPal approval URL",
      });
    }

    // Create a new order in our database first
    const newlyCreatedOrder = new Order({
      userId,
      cartId,
      cart,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount: parseFloat(totalAmount),
      orderDate,
      orderUpdateDate,
      paymentId: "", // Initially empty, to be updated later
      payerId: "",
    });

    // Save the order in the database
    await newlyCreatedOrder.save();

    console.log("Order created in database with ID:", newlyCreatedOrder._id);

    // Update our order with PayPal's order ID
    newlyCreatedOrder.paymentId = data.id;
    await newlyCreatedOrder.save();

    // Return success response with approval URL and order ID
    return res.status(201).json({
      success: true,
      approvalURL,
      orderId: newlyCreatedOrder._id,
      paypalOrderId: data.id,
    });
  } catch (error) {
    console.error("PayPal Order Creation Error:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: error.message || "Some error occurred!",
    });
  }
};


const capturePayment = async (req, res) => {
  try {
    const { paypalOrderId, payerId, orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({ 
        success: false,
        message: "Order ID is required" 
      });
    }

    // Find the order in our database
    let order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order cannot be found",
      });
    }

    // Generate PayPal access token
    const accessToken = await generateAccessToken();

    // Capture the payment with PayPal
    const { data } = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders/${paypalOrderId}/capture`,
      {},
      { 
        headers: { 
          Authorization: `Bearer ${accessToken}`, 
          "Content-Type": "application/json" 
        } 
      }
    );

    console.log("PayPal payment capture response:", data);

    // Update our order with payment details
    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paypalOrderId;  // storing PayPal Order ID here
    order.payerId = payerId;

    // Update product stock
    for (let item of order?.cart) {
      let product = await Product.findById(item.productId);

      if (!product) {
        console.warn(`Product not found: ${item.productId}`);
        continue;
      }

      if (product.totalStock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Not enough stock for product: ${product.title}`,
        });
      }

      product.totalStock -= item.quantity;
      await product.save();
    }

    // Remove the cart after successful payment
    if (order?.cartId) {
      await Cart.findByIdAndDelete(order.cartId);
    }

    await order.save();

    // Return success response
    res.status(200).json({
      success: true,
      message: "Order confirmed",
      data: order,
    });
  } catch (error) {
    console.error("Payment Capture Error:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: error.message || "Error capturing payment",
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
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
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
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

module.exports = {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
};