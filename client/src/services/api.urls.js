export const API_URLS = {
  saveSentEmails: {
    endpoint: "save",
    method: "POST",
  },
  saveDraftEmails: {
    endpoint: "save-draft",
    method: "POST",
  },
  getEmailFromType: {
    // to find the type so as to show mails accordingly
    endpoint: "emails",
    method: "GET", // to fetch according to selected option
  },
  toggleStarredMails: {
    endpoint: "starred",
    method: "POST",
  },
  deleteEmails: {
    endpoint: "delete",
    method: "DELETE",
  },
  moveEmailsToBin: {
    endpoint: "bin",
    method: "POST",
  },
};
