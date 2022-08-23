const axios = require("axios");
const asana = require("asana");

exports.main = async (context = {}, sendResponse) => {
  const sections = [
    {
      type: "heading",
      text: "Add a new task",
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
          text: "Add Task",
          onClick: {
            type: "SUBMIT",
            serverlessFunction: "simple-card",
          },
        },
      ],
    },
  ];

  try {
    const client = asana.Client.create().useAccessToken(process.env.ASANA_PAT);

    if (context.event && context.event.type === "SUBMIT") {
      await client.tasks.createTask({
        name: context.event.payload.formState.taskName,
        notes: context.event.payload.formState.taskNotes,
        projects: ["1202831513432446"],
        pretty: true,
      });
    }
    sendResponse({
      sections,
      message: {
        type: "SUCCESS",
        body: "Task added to Asana!",
      },
    });
  } catch (error) {
    sendResponse({
      message: {
        type: "ERROR",
        body: `Error: ${error.message}`,
      },
    });
  }
};
