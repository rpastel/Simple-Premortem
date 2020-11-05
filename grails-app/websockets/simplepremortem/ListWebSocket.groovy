package simplepremortem

import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo

class ListWebSocket {

    @MessageMapping("/list")
    @SendTo("/topic/list")
    String list(String message) {
        println 'In ListWebSocket, message: '+ message
        return message
    }

}