package simplepremortem

import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo

class MessageWebSocket {

    @MessageMapping("/message")
    @SendTo("/topic/message")
    String phase(String message) {
        println 'In MessageWebSocket, message: '+ message
        return message
    }

}
