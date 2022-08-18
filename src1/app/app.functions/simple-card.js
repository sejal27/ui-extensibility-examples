const axios = require('axios');

exports.main = async (context = {}, sendResponse) => {
    const {firstname, lastname} = context.propertiesToSend;
    const sections = [
        {
            "type": "alert",
            "variant":"success",
            "title": "Contact Highlights Card",
            "body": {
              "type": "text",
              "text": firstname + " " + lastname + " loves Tesla."
            }
          },
          {
            "type": "buttonRow",
            "buttons": [
              {
                "type": "button",
                "variant": "primary",
                "text": "Create Quote"
              }
            ]
          }
        
    ];

    sendResponse({
        sections
    });
};
