const MessageDao = require("../services/message-dao");
const dialogflow = require("dialogflow");
const uuid = require("uuid");

exports.createMessage = async (req, res) => {
    const result = await MessageDao.create(req.body);
    res.send(result);
};

exports.sendChat = async (req, res) => {
    // A unique identifier for the given session
    const projectId = "support-aaxago";
    const sessionId = uuid.v4();

    // Create a new session
    const sessionClient = new dialogflow.SessionsClient();
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: req.body.text,
                // The language used by the client (en-US)
                languageCode: "en-US",
            },
        },
    };

    // Send request and log result    
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    console.log(result);
    res.send({
        response: result.fulfillmentText
    });
};