package simplepremortem

import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo

class PhaseWebSocket {

    @MessageMapping("/phase")
    @SendTo("/topic/phase")
    String phase(String message) {
        println 'In PhaseWebSocket, message: '+ message
        return message
    }

}
