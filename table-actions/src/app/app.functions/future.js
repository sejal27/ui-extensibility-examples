
exports.main = async (context = {}, sendResponse) => {
  console.log(context);

  sendResponse({
    message: `This could do something in the background in the future for example send an api request to another system or trigger a workflow in hubspot. Start dreaming because the future is here 🔮.`,
  });
};
