import Email from "../model/email.js";

export const saveSendEmails = async (request, response) => {
  // saving emails in database
  try {
    const email = await new Email(request.body); // whole payload comes in request and it is send to email for validation
    email.save(); // to save in database
    // in const email some underscore is added by mongoose
    response.status(200).json("email saved successfully"); // response sended to user
  } catch (error) {
    response.status(500).json(error.message); // error and error message is passed
  }
};

export const getEmails = async (request, response) => {
  // getting emails from database to show to user
  try {
    let emails;

    if (request.params.type === "starred") {
      emails = await Email.find({ starred: true, bin: false }); // find function to fetch emails from mongodb database in respect to this particular key
    } else if (request.params.type === "bin") {
      emails = await Email.find({ bin: true });
    } else if (request.params.type === "allmail") {
      emails = await Email.find({});
    } else if (request.params.type === "inbox") {
      emails = [];
    } else {
      emails = await Email.find({ type: request.params.type });
    }

    response.status(200).json(emails); // sending status and json object having data of type(key you sent in mongodb db)
  } catch (error) {
    response.status(500).json(error.message);
  }
};

export const toggleStarredEmail = async (request, response) => {
  try {
    await Email.updateOne(
      { _id: request.body.id },
      { $set: { starred: request.body.value } }
    );
    response.status(201).json("Value is updated");
  } catch (error) {
    response.status(500).json(error.message);
  }
};

export const deleteEmails = async (request, response) => {
  try {
    await Email.deleteMany({ _id: { $in: request.body } });
    response.status(200).json("emails deleted successfully");
  } catch (error) {
    response.status(500).json(error.message);
  }
};

export const moveEmailsToBin = async (request, response) => {
  try {
    await Email.updateMany(
      { _id: { $in: request.body } },
      { $set: { bin: true, starred: false, type: "" } }
    );
  } catch (error) {
    response.status(500).json(error.message);
  }
};
