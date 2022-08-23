const asana = require("asana");

const client = asana.Client.create().useAccessToken("PERSONAL_ACCESS_TOKEN");
exports.main = async (context = {}, sendResponse) => {
  try {
    const tasks = await client.tasks.getTasks({
      project: "1202831513432446",
      opt_pretty: true,
      opt_fields: ["notes", "name", "status", "completed"],
    }).data;

    let sections = [];

    if (tasks != null) {
      for (task of tasks) {
        const taskStatus = task.completed ? "Done" : "Pending";
        const taskVariant = task.completed ? "Success" : "Error";
        sections.push(
          {
            type: "text",
            format: "markdown",
            text:
              "**Task**: " +
              task.name +
              "[View in Asana](https://app.asana.com/0/1202831513432446/" +
              task.gid +
              ")",
          },
          {
            type: "text",
            format: "markdown",
            text: task.notes,
          },
          {
            type: "tag",
            text: taskStatus,
            variant: taskVariant,
          },
          {
            type: "divider",
            distance: "small",
          },
          {
            type: "button",
            text: "Refresh List",
            onClick: {
              type: "SERVERLESS_ACTION_HOOK",
              serverlessFunction: "show-tasks",
            },
          }
        );
      }
      sendResponse({
        sections,
        message: {
          type: "SUCCESS",
          body: "Task list refreshed!",
        },
      });
    } else {
      const emptySections = [
        {
          type: "text",
          format: "markdown",
          text: "No tasks are defined for this project yet.",
        },
      ];
      sendResponse({
        emptySections,
      });
    }
  } catch (error) {
    sendResponse({
      message: {
        type: "ERROR",
        body: `Error: ${error.message}`,
      },
    });
  }
};
