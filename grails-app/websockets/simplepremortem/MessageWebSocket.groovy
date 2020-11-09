package simplepremortem

import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo

class MessageWebSocket {


    @MessageMapping("/message")
    @SendTo("/topic/message")
    String message(String message) {
        return message
    }

}
