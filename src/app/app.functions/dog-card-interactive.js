const axios = require('axios');


/**
 * Main "fetch function": see "webhooks" tab in the official docs:
 * https://developers.hubspot.com/docs/api/crm/extensions/custom-cards
 *
 * Note: for the "sections" config that renders custom components, there's early
 * documenation being gathered in the project repo for now:
 * https://git.hubteam.com/HubSpot/ui-extensibility#shape-of-the-json-payload
 */
exports.main = async (context = {}, sendResponse) => {
    const {
        data: { message }
    } = await axios.get("https://dog.ceo/api/breeds/image/random");

    // const {
    //     data: { fact }
    // } = await axios.get("https://catfact.ninja/fact");

    const sections = [
        {
            "type": "image",
            "src": message,
            "alt": "A dog, enjoy 🎉!"
        },
        {
            "type": "buttonRow",
            "buttons": [
              {
                "type": "button",
                "variant": "primary",
                "text": "Generate new picture & fact",
                "onClick": {
                    "type": "SERVERLESS_ACTION_HOOK",
                    "serverlessFunction": "dogCardPremium"
                  }
              },
              {
                "type": "button",
                "text": "View in Modal",
                "onClick": {
                    "type": "IFRAME",
                    "width": 600,
                    "height": 600,
                    "uri": message,
                }
              }
            ]
        },
    ];

    sendResponse({
        sections
    });
};
