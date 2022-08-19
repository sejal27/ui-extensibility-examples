const axios = require("axios");
const asana = require("asana");

exports.main = async (context = {}, sendResponse) => {
  const client = asana.Client.create().useAccessToken(process.env.ASANA_PAT);
  if (context.event && context.event.type === "SUBMIT") {
    client.tasks.createTask({
      name: context.event.payload.formState.taskName,
      notes: context.event.payload.formState.taskNotes,
      projects: ["1202716730818738"],
      pretty: true,
    });
  }

  const sections = [
    {
      type: "text",
      format: "markdown",
      text: "This contact loves Tesla!**",
    },
    {
      type: "divider",
      distance: "small",
    },
    {
      type: "text",
      format: "markdown",
      text: "**All Contacts**",
    },
    {
      type: "form",
      content: [
        {
          type: "input",
          name: "taskName",
          inputType: "text",
          label: "Task Name",
          initialValue: "",
        },
        {
          type: "input",
          name: "taskNotes",
          inputType: "text",
          label: "Task Notes",
          initialValue: "",
        },
        {
          type: "button",
          text: "Submit Form",
          onClick: {
            type: "SUBMIT",
            serverlessFunction: "simple-card",
          },
        },
      ],
    },
  ];

  sendResponse({
    sections,
  });
};
