const axios = require("axios");

exports.main = async (context = {}, sendResponse) => {
  // const { firstname, lastname } = context.propertiesToSend;
  const sections = [
    {
      type: "text",
      format: "markdown",
      text: "Contact loves Tesla. He is planning to gift one to all of his family on his birthday, so look out for more deals",
    },
  ];

  sendResponse({
    sections,
  });
};
