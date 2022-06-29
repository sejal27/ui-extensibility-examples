const axios = require('axios');

/**
 * Hardcoded IDs and other values that should change per portal
 */
const config = {
  portalId: 881540471,
  membershipListId: 1,
};

async function isMemberOfList(vid, listId, token) {
  return axios
    .get(`https://api.hubspotqa.com/contacts/v1/lists/${listId}/contacts/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(result => {
      const contacts = result.data.contacts;
      return !!contacts.filter(contact => `${contact.vid}` === `${vid}`).length;
    });
}

/**
 * Main "fetch function": see "webhooks" tab in the official docs:
 * https://developers.hubspot.com/docs/api/crm/extensions/custom-cards
 *
 * Note: for the "sections" config that renders custom components, there's early
 * documenation being gathered in the project repo for now:
 * https://git.hubteam.com/HubSpot/ui-extensibility#shape-of-the-json-payload
 */
exports.main = async (context = {}, sendResponse) => {
  const {
    associatedObjectId,
    hs_emailconfirmationstatus,
    hs_content_membership_registered_at,
  } = context;

  const isMember = await isMemberOfList(
    associatedObjectId,
    config.membershipListId,
    context.secrets.PRIVATE_APP_ACCESS_TOKEN
  );

  let sections;
  let actions;
  let settingsAction;
  let primaryAction;

  /**
   * Use Case: this is the rare exception where the user has not opted in to
   * receive emails from HubSpot. This part is pretty contrived, but it lets us
   * highlight the ability to trigger a workflow to execute any custom logic
   */
  if (
    !hs_emailconfirmationstatus ||
    hs_emailconfirmationstatus === 'Confirmation Pending'
  ) {
    sections = [
      {
        type: 'alert',
        titleText: 'Email Delivery Blocked',
        bodyText: `Resending registration email won't work. See knowledgebase article for details.`,
        variant: 'danger',
      },
      {
        type: 'button',
        onClick: {
          type: 'IFRAME',
          width: 1200,
          height: 750,
          uri: 'https://knowledge.hubspot.com/email/what-is-the-marketing-email-confirmation-status-contact-property',
          label: 'Learn more',
        },
        text: `Learn more`,
      },
      {
        type: 'button',
        onClick: {
          type: 'SERVERLESS_ACTION_HOOK',
          serverlessFunction: 'workflow',
          // associatedObjectProperties: ['email', 'firstname', 'conditionalone'],
        },
        text: `Notify Contact`,
      },
    ];

    /**
     * Use Case: contact is a member of the access list, they can
     * access the members-only reporting section of the site
     */
  } else if (isMember) {
    if (hs_content_membership_registered_at) {
      // They've actually registered for the site
      sections = [
        {
          type: 'alert',
          titleText: 'Fully Registered',
          bodyText: 'This contact has full access to private content.',
          variant: 'success',
        },
      ];
    } else {
      // They've received the registration email, but haven't registered yet
      sections = [
        {
          type: 'alert',
          titleText: 'Awaiting Registration',
          bodyText: 'Contact was granted access, but has not yet registered.',
          variant: 'warning',
        },
        {
          type: 'button',
          onClick: {
            type: 'SERVERLESS_ACTION_HOOK',
            serverlessFunction: 'workflow',
            // associatedObjectProperties: [
            //   'email',
            //   'firstname',
            //   'conditionalone',
            // ],
          },
          text: `Send Reminder`,
        },
      ];
    }

    actions = getDropdownActionList();
    settingsAction = getContentSettingsIFrame();
  } else {
    /**
     * Use Case: contact is NOT a member of the access list, so no
     * access to the members-only reporting section at all
     */
    sections = [
      {
        type: 'alert',
        titleText: 'Public content only',
        bodyText:
          'This contact has not registered, so can only access public pages.',
        variant: 'info',
      },
      {
        type: 'button',
        onClick: {
          type: 'SERVERLESS_ACTION_HOOK',
          serverlessFunction: 'grant',
          // associatedObjectProperties: ['email', 'firstname', 'conditionalone'],
        },
        text: `Grant Access`,
      },
    ];
    primaryAction = getMemberRegistrationIFrame();
  }

  sendResponse({
    results: [
      {
        objectId: 1,
        sections,
        title: `Membership Status`,
        actions,
      },
    ],
    settingsAction,
    primaryAction,
  });
};

/**
 * Utility functions for building JSON for common actions:
 */

function getContentSettingsIFrame() {
  return {
    type: 'IFRAME',
    width: 1200,
    height: 750,
    uri: `https://app.hubspotqa.com/content/${config.portalId}/edit/43256011354/settings`,
    label: 'Settings',
  };
}

function getDropdownActionList() {
  return [
    {
      type: 'CONFIRMATION_SERVERLESS_ACTION_HOOK',
      serverlessFunction: 'revoke',
      confirmationMessage:
        "Are you sure you want to revoke this user's site access?",
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      associatedObjectProperties: ['protected_account'],
      label: 'Revoke access',
    },
    {
      type: 'IFRAME',
      width: 1200,
      height: 750,
      uri: `https://app.hubspotqa.com/contacts/${config.portalId}/objects/0-1/views/1003073/list`,
      label: 'View Access List',
    },
    getMemberRegistrationIFrame(),
  ];
}

function getMemberRegistrationIFrame() {
  return {
    type: 'IFRAME',
    width: 1200,
    height: 750,
    uri: 'https://knowledge.hubspot.com/website-pages/require-member-registration-to-access-private-content',
    label: 'Knowledge Base',
  };
}
