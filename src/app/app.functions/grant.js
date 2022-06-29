const axios = require('axios');

/**
 * Hardcoded IDs and other values that should change per portal
 */
const config = {
  membershipListId: 1,
};

async function addContactToList(vid, listId, token) {
  return axios({
    url: `https://api.hubapiqa.com/contacts/v1/lists/${listId}/add`,
    method: 'POST',
    data: { vids: [vid] },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(result => {
    return result.data;
  });
}

exports.main = async (context = {}, sendResponse) => {
  const { associatedObjectId, secrets = {} } = context;

  await addContactToList(
    associatedObjectId,
    config.membershipListId,
    secrets.PRIVATE_APP_ACCESS_TOKEN
  );

  sendResponse({
    message: `Access granted, they'll receive an email to complete registration.`,
  });
};
