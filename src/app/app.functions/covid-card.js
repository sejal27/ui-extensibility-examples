const axios = require("axios");

exports.main = async (context = {}, sendResponse) => {
  const { state, country } = context.propertiesToSend;

  let sections = [];
  if (country !== "US" || !state) {
    sections = [
      {
        type: "alert",
        title:
          "Important",
        variant: "warning",
        body: {
          type: "text",
          format: "markdown",
          text: "This card **requires** that the contact live to have state/country properties set. Additionally we only currently support providing US based data.",
        },
      },
    ];
    sendResponse({
      sections,
    });
  }

  const apiURL = "https://api.covidtracking.com/v1/states/" + state.toLowerCase() + "/current.json";
  try {
    const {
        data: { hospitalizedCurrently, death, deathIncrease, lastUpdateEt },
      } = await axios.get(apiURL);

      sections = [
        {
          type: "tag",
          text: `${state}`,
          variant: "success",
        },
        {
            "type": "statistics",
            "items": [
              {
                "label": "Hospitalized Currently",
                "number": hospitalizedCurrently.toString(),
                "description": {
                  "type": "text",
                  "format": "markdown",
                  "text": "# of people hospitalized as of " + lastUpdateEt.toString()
                }
              },
              {
                "label": "Deaths",
                "number": death.toString(),
                "description": {
                  "type": "trend",
                  "value": deathIncrease.toString(),
                  "direction": "increase"
                }
              }
              
            ]
          }
      ];

  } catch (error) {
    sections = [
        {
            type: "tag",
            text: `${state}`,
            variant: "error",
        },
        {
          type: "alert",
          title:
            "Problems with fetching covid data",
          variant: "danger",
          body: {
            type: "text",
            format: "markdown",
            text: `This card experienced an error: ${error}. You can learn more about this api at the [The Covid Tracking Project](https://covidtracking.com/)`,
          },
        },
    ];
    console.log(error, country, state);
  }
  
  sendResponse({
    sections,
  });
};
