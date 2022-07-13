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
    const { make, vin } = context.propertiesToSend;
    const apiUrl = "https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinExtended/" + vin + "?format=json"
    const {
        data: { vinData }
    } = await axios.get(apiUrl);

    const sections = [
        {
            "type": "text",
            "format": "markdown",
            "text": "VIN Information for " + vin + " obtained using [NHTSA API](https://vpic.nhtsa.dot.gov/api/)"
          },
          {
            "type": "tag",
            "text": make,
            "variant": "success"
          }
        {
            "type":"text",
            "format":"markdown",
            "text": vinData
        },
        {
            "type": "buttonRow",
            "buttons": [
              {
                "type": "button",
                "variant": "primary",
                "text": "View raw JSON",
                "onClick": {
                    "type": "IFRAME",
                    "width": 800,
                    "height": 600,
                    "uri": apiUrl,
                }
              }
            ]
        },
        
    ];
    sendResponse({
        sections
    });
};
