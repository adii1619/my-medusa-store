import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import MessageService from "../../services/message" // Import the class for typing

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  // We explicitly cast the resolved service to our class type
  const messageService = req.scope.resolve<MessageService>("messageService")
  
  if (!messageService) {
    return res.status(500).json({ error: "messageService not found in container" })
  }

  const data = messageService.getWelcomeMessage()
  res.json(data)
}