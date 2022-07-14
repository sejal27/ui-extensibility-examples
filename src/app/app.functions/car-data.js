const axios = require('axios');

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
