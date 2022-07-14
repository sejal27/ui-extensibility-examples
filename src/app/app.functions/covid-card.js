const axios = require("axios");

exports.main = async (context = {}, sendResponse) => {
  const { state, country } = context;

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
  }


  try {
    const {
        data: { error, message, notes, covid19Site },
      } = await axios.get(
        `https://api.covidtracking.com/v1/states/${state}/info.json`
      );

      sections = [
        {
          type: "tag",
          text: `${state}`,
          variant: "success",
        },
        {
          type: "text",
          format: "markdown",
          text: `**State Notes:** ${notes}`,
        },
        {
          type: "text",
          format: "markdown",
          text: `**State's Covid-19 Site:** [${covid19Site}](${covid19Site})`,
        },
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
    console.log(error, message, notes, covid19Site, country, state);
  }
  
  sendResponse({
    sections,
  });
};
