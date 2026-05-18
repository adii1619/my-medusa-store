export default class MessageService {
  getWelcomeMessage() {
    return {
      message: "This message is coming from a Medusa Service!",
      hint: "Your CS logic belongs in services like this."
    }
  }
}