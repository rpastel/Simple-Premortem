package simplepremortem

import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo

class ListWebSocket {

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

}