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
    // const {
    //     data: { vinData }
    // } = await axios.get("https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinExtended/" + vin + "?format=json");

    const sections = [
        {
            "type": "alert",
            "title": "Note",
            "body": {
              "type": "text",
              "format": "markdown"
              "text": vin,
            }
        },
        {
            "type":"text",
            "format":"markdown",
            "text": "If you think this contact might be **more interested** in cats, you should share the below fact with them!"
        }        
    ];
    sendResponse({
        sections
    });
};
