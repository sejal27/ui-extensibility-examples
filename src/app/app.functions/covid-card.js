const axios = require("axios");

exports.main = async (context = {}, sendResponse) => {
  const { state, country } = context;

  let sections = [];
  if (country !== "us" || !state) {
    sections = [
      {
        type: "alert",
        title:
          "Want to use search data directly from Google to inform your content strategy?",
        variant: "warning",
        body: {
          type: "text",
          format: "markdown",
          text: "This card **requires** that the contact live to have state/country properties set. Additionally we only currently support providing US based data.",
        },
      },
    ];
  }

  const {
    data: { error, message, notes, covid19Site },
  } = await axios.get(
    `https://api.covidtracking.com/v1/states/${state}/info.json`
  );

  console.log(error, message, notes, covid19Site, country, state);

  if (error) {
    sections = [
      {
        type: "alert",
        title:
          "Want to use search data directly from Google to inform your content strategy?",
        variant: "danger",
        body: {
          type: "text",
          format: "markdown",
          text: `This card experienced an error, ${message}. You can learn more about this api at the [The Covid Tracking Project](https://covidtracking.com/)`,
        },
      },
    ];
  } else {
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
  }

  sendResponse({
    sections,
  });
};
