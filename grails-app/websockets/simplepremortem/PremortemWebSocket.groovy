package simplepremortem

import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo

class PremortemWebSocket {

    @MessageMapping("/list")
    @SendTo("/topic/list")
    String list(String message) {
        /*
         * I have not been able to figure out to get print or logging to work in this.
         * Even moving the method to controller does not help.
         * I tried:
         * https://sergiodelamo.com/blog/grails-tips-how-to-log-from-a-none-grails-artifact.html
         * does not.
         */
        return message
    }

    @MessageMapping("/phase")
    @SendTo("/topic/phase")
    String phase(String message) {
        return message
    }

    @MessageMapping("/message")
    @SendTo("/topic/message")
    String message(String message) {
        return message
    }

}