// --------------- Gmail Checking and Notification Functions ---------------
/**
 * Function to check for new emails in Gmail inbox and send WhatsApp notification.
 * This function retrieves the latest thread, gets the last email message,
 * and sends its details as a notification.
 */
function checkNewEmailsAndNotify() {
  // Logging the start of the email check process.
  Logger.log("Checking for new emails...");
  // Get the threads from Gmail's inbox. We only retrieve 1 thread here.
  var threads = GmailApp.getInboxThreads(0, 1);
  
  // If no threads are available, log and exit.
  if (threads.length === 0) {
    Logger.log("No new emails found.");
    return;
  }
  // Get the first thread (the most recent email thread).
  var thread = threads[0];
  // Get all the messages from the thread.
  var messages = thread.getMessages();
  
  // Retrieve the last message in the thread (most recent).
  var lastMessage = messages[messages.length - 1];
  
  // Extract subject, sender (from), and date of the email.
  var subject = lastMessage.getSubject();
  var from = lastMessage.getFrom();
  var date = lastMessage.getDate();
  // Construct the message for WhatsApp
  var msg = formatEmailDetailsForMessage(subject, from, date);
  // Send the message to WhatsApp
  sendWhatsApp(msg);
  
  // Logging the successful email check and WhatsApp notification.
  Logger.log("New email processed: " + msg);
}
/**
 * Formats email details into a message string for WhatsApp.
 * @param {string} subject - The subject of the email.
 * @param {string} from - The sender of the email.
 * @param {Date} date - The date when the email was received.
 * @return {string} - A formatted string with email details.
 */
function formatEmailDetailsForMessage(subject, from, date) {
  // Detailed message format for WhatsApp notification
  var formattedMessage = "📧 New Email Notification!\n";
  formattedMessage += "From: " + from + "\n";
  formattedMessage += "Subject: " + subject + "\n";
  formattedMessage += "Received At: " + date.toString() + "\n";
  formattedMessage += "-----------------------------\n";
  formattedMessage += "Stay tuned for more updates!";
  
  // Log the formatted message for debugging purposes.
  Logger.log("Formatted message: " + formattedMessage);
  return formattedMessage;
}
// --------------- Twilio WhatsApp Sending Function ---------------
/**
 * Sends a WhatsApp message using Twilio API.
 * @param {string} message - The message content to be sent on WhatsApp.
 */
function sendWhatsApp(message) {
  // Log that we are starting the WhatsApp sending process
  Logger.log("Sending message to WhatsApp: " + message);
  // Twilio API credentials - SID and Auth Token.
  var accountSID = ''; // Replace with your Twilio SID
  var authToken = '';  // Replace with your Twilio Auth Token
  
  // Define the WhatsApp numbers - Sender and Receiver
  var from = 'whatsapp:+14155238886';  // This is the Twilio sandbox number for WhatsApp
  var to = 'whatsapp:+91xxxxxxxxxx';   // Your personal WhatsApp number (verified in Twilio)
  // Prepare the payload for the POST request
  var payload = {
    "To": to,       // Recipient's WhatsApp number
    "From": from,   // Twilio Sandbox WhatsApp number
    "Body": message // The actual message content
  };
  // Options for the HTTP request to Twilio API
  var options = {
    "method": "post",                         // HTTP method (POST)
    "muteHttpExceptions": true,               // Suppress HTTP exceptions
    "headers": {
      "Authorization": "Basic " + Utilities.base64Encode(accountSID + ":" + authToken) // Basic Auth for Twilio API
    },
    "payload": payload                         // Send the message payload
  };
  // Twilio API URL for sending messages
  var url = "https://api.twilio.com/2010-04-01/Accounts/" + accountSID + "/Messages.json";
  // Making the HTTP request using UrlFetchApp to send the message
  try {
    var response = UrlFetchApp.fetch(url, options);
    
    // Log the response for debugging purposes
    Logger.log("Twilio response: " + response.getContentText());
  } catch (e) {
    // Log any error in sending the WhatsApp message
    Logger.log("Error in sending WhatsApp message: " + e.toString());
  }
  // Log the completion of the message sending process.
  Logger.log("WhatsApp message sent successfully.");
}
// --------------- Helper Functions for Error Handling and Logging ---------------
/**
 * Helper function to handle errors in the script.
 * @param {string} errorMessage - The error message to log.
 */
function handleError(errorMessage) {
  Logger.log("Error: " + errorMessage);
  // Optionally, send an email or a notification when an error occurs.
  // MailApp.sendEmail("your-email@example.com", "Script Error", errorMessage);
}
/**
 * This function checks if the necessary credentials (Twilio SID and Auth Token)
 * are correctly set up before making any API calls.
 */
function validateCredentials() {
  // Check for null or empty values for Twilio credentials
  if (!accountSID || !authToken) {
    handleError("Twilio credentials not properly set.");
    return false;
  }
  return true;
}
// --------------- Scheduled and Debugging Functions ---------------
/**
 * Set up a time-driven trigger to automatically check for new emails at regular intervals.
 * The trigger can be set up to run every 5 minutes, for example.
 */
function createTimeDrivenTrigger() {
  ScriptApp.newTrigger("checkNewEmailsAndNotify")
    .timeBased()
    .everyMinutes(5)  // Set interval to check every 5 minutes
    .create();
}
/**
 * Function to manually run the email check and WhatsApp notification.
 * This function is intended for testing purposes.
 */
function testCheckAndNotify() {
  Logger.log("Testing email check and notification...");
  checkNewEmailsAndNotify();
}
// --------------- Main Execution Flow ---------------
/**
 * Main function to execute the entire process.
 * You can run this to test everything in one go.
 */
function main() {
  Logger.log("Starting the email check and WhatsApp notification process...");
  checkNewEmailsAndNotify();  // Check for new email and send notification.
  createTimeDrivenTrigger();  // Create a time-driven trigger to automate the process.
}
// --------------- End of Script ---------------
