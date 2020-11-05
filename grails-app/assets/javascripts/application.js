// This is a manifest file that'll be compiled into application.js.
//
// Any JavaScript file within this directory can be referenced here using a relative path.
//
// You're free to add application-wide JavaScript to this file, but it's generally better
// to create separate JavaScript files as needed.
//
//= require jquery-3.3.1.min
//= require bootstrap
//= require popper.min
//= require_self

var WS = function ($) {

    /*
     * Code shared with Team and Facilitator
     */
    // initial phase setting
    let _phase = null
    $("#names-section").hide()
    $("#reasons-section").hide()
    $("#solutions-section").hide()


    // Create web socket and client
    const _socket = new SockJS( '/stomp' )
    const _client = Stomp.over( _socket )
    // General connect and subscribe functions
    const connect = (channel, handler) => {
        _client.connect({}, () => {
            _client.subscribe(channel, handler)
        })
    }
    const subscripe = (channel, handler) => {
        const subscription = _client.subscribe(channel, handler)
        return subscription
    }

    // handling which list the message should appear in
    handleList = ( message ) => {
        console.log('In handleList, message: ', message)
        const msg = JSON.parse(message.body)
        if( msg.length ) {
            let listId
            switch( _phase ){
                case "NAMES":
                    listId = '#names-list'
                    break
                case "REASONS":
                    listId = '#reasons-list'
                    break
                case "SOLUTIONS":
                    listId = '#solutions-list'
                    break
                default:
                    console.log('In switch default. Should not get here.')
            }
            $(listId).append('<li>' + msg + '</li>')
        }
        else {
            console.log('no message body')
        }
    } // end handleList

    // Setting the send message widget and setting the channel.
    const initializeSend = (channel) => {

        // Send button sends message to the list channel
        $("#send").click( () => {
            _client.send(channel, {}, JSON.stringify($("#message").val()))
            $("#message").val("")
        })

        // So enter keypress clicks the send button
        // https://stackoverflow.com/questions/18160342/jquery-how-to-trigger-click-event-on-pressing-enter-key/18160428
        // https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
        $("#message").keypress( (event) => {
            if (event.which == 13) {  // 13 is keycode for enter
                $("#send").click()
                return false
            }
        })
    } // end initializeSend

    const setPhase = (phase) => {
        _phase = phase
    }


    return {

        initializeTeam: () => {
            console.log('initializeTeam')
            connect('/topic/list', handleList )
            initializeSend('/topic/list')

            // For development
            $("#set").click(function () {
                _phase = $("#phase").val()
                switch (_phase) {
                    case "SOLUTIONS":
                        $("#solutions-section").show()
                    case "REASONS":
                        $("#reasons-section").show()
                    case "NAMES":
                        $("#names-section").show()
                        break
                    default:
                        let _phase = null
                        $("#names-section").hide()
                        $("#reasons-section").hide()
                        $("#solutions-section").hide()
                }
                $("#phase").val("")
            })
            $("#phase").keypress( (event) => {
                if ( event.which == 13 ) {  // 13 is keycode for enter
                    $("#set").click()
                    return false
                }
            })
            // end for development

        } // end initializeTeam
    }
} // end WS