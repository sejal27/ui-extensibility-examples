const axios = require('axios');

exports.main = async (context = {}, sendResponse) => {
    const { quantity = 0 } = context.state;

    let sections = [];
    let cost = quantity * 3.50;
    let message = "This is your purchase message";
    sections = [
      {
        "type":"text",
        "format":"markdown",
        "text": `You have purchased ${quantity} jumpropes. Each jumprope cost tree fiddy totaling ${cost}`
      }
    ];

    sendResponse({
            sections,
            message
        });
};
