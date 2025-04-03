const paypalClient = require("../../helpers/paypal");
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");



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


    // sangams code for payment old 

    const create_payment_json = {
      intent: "CAPTURE",
      payment_source : {

      }
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:5173/shop/paypal-return",
        cancel_url: "http://localhost:5173/shop/paypal-cancel",
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.title,
              sku: item.productId,
              price: item.price.toFixed(2),
              currency: "USD",
              quantity: item.quantity,
            })),
          },
          amount: {
            currency: "USD",
            total: totalAmount.toFixed(2),
          },
          description: "description",
        },
      ],
    };


    //  dummy json fill here 
    const payment_json = {
      intent: "CAPTURE",
      payment_source: {
        paypal: {
          experience_context: {
            "payment_method_preference": "IMMEDIATE_PAYMENT_REQUIRED",
            "landing_page": "LOGIN",
            "shipping_preference": "GET_FROM_FILE",
            "user_action": "PAY_NOW",
            "return_url": "https://example.com/returnUrl",
            "cancel_url": "https://example.com/cancelUrl"
          }
        }
      },
      "purchase_units": [
        {
          "invoice_id": "TEST12345",
          "amount": {
            "currency_code": "USD",
            "value": "150.00",
            "breakdown": {
              "item_total": {
                "currency_code": "USD",
                "value": "140.00"
              },
              "shipping": {
                "currency_code": "USD",
                "value": "10.00"
              }
            }
          },
          "items": [
            {
              "name": "Wireless Mouse",
              "description": "Ergonomic wireless mouse",
              "unit_amount": {
                "currency_code": "USD",
                "value": "40.00"
              },
              "quantity": "1",
              "category": "PHYSICAL_GOODS",
              "sku": "mouse-001",
              "image_url": "https://example.com/images/mouse.jpg",
              "url": "https://example.com/product/mouse"
            },
            {
              "name": "Mechanical Keyboard",
              "description": "RGB Mechanical Gaming Keyboard",
              "unit_amount": {
                "currency_code": "USD",
                "value": "100.00"
              },
              "quantity": "1",
              "category": "PHYSICAL_GOODS",
              "sku": "keyboard-002",
              "image_url": "https://example.com/images/keyboard.jpg",
              "url": "https://example.com/product/keyboard"
            }
          ]
        }
      ]
    }
    

// new daa i trued once

    const paypalOrderData = {
      intent: "CAPTURE",
      payment_source: {
        paypal: {
          experience_context: {
            payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",
            landing_page: "LOGIN",
            shipping_preference: "GET_FROM_FILE",
            user_action: "PAY_NOW",
            return_url: "http://localhost:5173/shop/paypal-return",
            cancel_url: "http://localhost:5173/shop/paypal-cancel"
          }
        }
      },
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: totalAmount.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: itemTotal
              },
              shipping: {
                currency_code: "USD",
                value: (totalAmount - itemTotal).toFixed(2)
              }
            }
          },
          items: items
        }
      ]
    };







     // Format items for PayPal
     const items = cartItems.map((item) => ({
      name: item.title,
      description: item.title,
      sku: item.productId,
      unit_amount: {
        currency_code: "USD",
        value: item.price.toFixed(2),
      },
      quantity: item.quantity,
      category: "DIGITAL_GOODS"
    }));

    const itemTotal = cartItems.reduce(
      (sum, item) => sum + (item.price * item.quantity),
      0
    ).toFixed(2);


    const paypalOrderResponse = await paypalClient.createOrder(paypalOrderData);

    

    const newlyCreatedOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId: paypalOrderResponse.id, // Store PayPal's order ID
      payerId,
    });

    await newlyCreatedOrder.save();

    const approvalURL = paypalOrderResponse.links.find(
      (link) => link.rel === "payer-action"
    ).href;


    res.status(201).json({
      success: true,
      approvalURL,
      orderId: newlyCreatedOrder._id,
    });
  } catch (e) {
    console.error("PayPal order creation error:", e);
    res.status(500).json({
      success: false,
      message: "Error occurred while creating order",
      error: e.message,
    });
  }
};


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
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
};
