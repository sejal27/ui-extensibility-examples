const axios = require('axios');


exports.main = async (context = {}, sendResponse) => {
    const { quantity = 0 } = context.state;
    const { firstname = "Jumproper" } = context.propertiesToSend;
    let message = "Test Message";

    context = {
          quantity: quantity + 1
    };
    let sections = [
      {
        "type":"text",
        "format":"markdown",
        "text": `Hi ${firstname}! You currently have ${quantity} jumprope(s) in your cart.`
      },
      {
        "type": "button",
        "text": "Add 1 more jumprope to cart",
        "variant": "primary",
        "onClick":
        {
          "type": "SERVERLESS_ACTION_HOOK",
          "serverlessFunction": "jumpropeCart"
        }
      }
    ];

    if(quantity > 4){
      context = {};
      sections = [
        {
          "type": "button",
          "text": "Purchase 5 Jumpropes",
          "variant": "primary",
          "onClick":
            {
              "type": "SERVERLESS_ACTION_HOOK",
              "serverlessFunction": "jumpropePurchase"
            }
        }
      ];
    }
    sendResponse({
        sections,
        context,
        message
    });
};
