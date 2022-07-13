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
            "type": "alert",
            "title": "Note",
            "body": {
              "type": "text",
              "format": "markdown",
              "text": "VIN Information for " + vin + " obtained using [NHTSA API](https://vpic.nhtsa.dot.gov/api/)"
            }
        },
        {
            "type":"text",
            "format":"markdown",
            "text": "If you think this contact might be **more interested** in cats, you should share the below fact with them!"
        },
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
                    "uri": vinData,
                }
              }
            ]
        },
        
    ];
    sendResponse({
        sections
    });
};
