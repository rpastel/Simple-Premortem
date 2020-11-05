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

    const hideAllPhases = () => {
        $("#names-section").hide()
        $("#reasons-section").hide()
        $("#solutions-section").hide()
    }
    hideAllPhases()

    // Create web socket and client
    const _socket = new SockJS( '/stomp' )
    var _client = Stomp.over( _socket )
    // General connect and subscribe functions
    const connect = (subscriptions ) => {
        _client.connect({}, () => {
            /*
             * Generally subscribe need to be in the connect callback
             * to insure that the connection has been made first
             */
            console.log('In connect callback')
            for ( const i in subscriptions ) {
                console.log('subscription: ', subscriptions)
                _client.subscribe(subscriptions[i].channel, subscriptions[i].handler)
            }
        })
    }

    // handling which list the message should appear in
    const handleList = ( message ) => {
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
    /*
     * Handle phase by progressively showing the list for the phase.
     */
    const handlePhase = ( message ) =>{
        console.log('In handlePhase, message: ', message)
        _phase = JSON.parse(message.body)
        switch (_phase) {
            case "END":
            case "SOLUTIONS":
                $("#solutions-section").show()
            case "REASONS":
                $("#reasons-section").show()
            case "NAMES":
                $("#names-section").show()
                break
            case "INITIAL":
                hideAllPhases()
                break
            default:
                let _phase = null
                hideAllPhases()
        }
    } // end handlePhase

    const handleMessage = ( message ) => {
        console.log('In handleMessage, message: ', message)
        msg = JSON.parse(message.body)
        $('#message-sent').text(msg)
    } // end handleMessage


    const send = (channel, message) => {
        _client.send(channel, {}, JSON.stringify(message))
    }
    /*
     * Sets the send message box and send button. It uses _client to send
     * the message to the channel.
     */
    const initializeSend = (channel) => {

        // Send button sends message to the list channel
        $("#send").click( () => {
            send(channel, $("#message").val())
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



    return {
        /*
         * Method for initializing Facilitator JS and
         * code specific to Facilitator
         */
        initializeFacilitator: () => {
            console.log('In initializeFacilitator')
            // connect('topic/list', handleList)
            const subscriptions = [
                { channel: '/topic/list', handler: handleList },
                { channel: '/topic/phase', handler: handlePhase },
                { channel: '/topic/message', handler: handleMessage }
                ]
            connect( subscriptions )
            initializeSend('/topic/message')

            /*
             * Code for moving through phases. Iterates through an
             * array of phase names and sends the phase name on the
             * phase channel. This is code unique to the Facilitator.
             */
            const phases = ['INITIAL', 'NAMES', 'REASONS', 'SOLUTIONS', 'END']

            let phaseIndex = 0
            $("#phase").val( phases[ phaseIndex ] )

            $("#next").click(() => {
                if ( phaseIndex < phases.length -1 ){
                    phaseIndex++
                    $("#phase").val( phases[ phaseIndex ] )
                    send('/topic/phase', phases[ phaseIndex ])
                }
            })

        }, // end initializeFacilitator

        /*
         * Method for initializing Team JS
         */
        initializeTeam: () => {
            console.log('In initializeTeam')

            const subscriptions = [ { channel: '/topic/list', handler: handleList },
                { channel: '/topic/phase', handler: handlePhase },
                { channel: '/topic/message', handler: handleMessage }
                ]
            connect( subscriptions )
            initializeSend('/topic/list')

            /*
             * This code is for development of the Team page without Facilitator.
             * It simulates moving through phases.
             */

            // $("#set").click(function () {
            //     _phase = $("#phase").val()
            //     switch (_phase) {
            //         case "SOLUTIONS":
            //             $("#solutions-section").show()
            //         case "REASONS":
            //             $("#reasons-section").show()
            //         case "NAMES":
            //             $("#names-section").show()
            //             break
            //         default:
            //             let _phase = null
            //             $("#names-section").hide()
            //             $("#reasons-section").hide()
            //             $("#solutions-section").hide()
            //     }
            //     $("#phase").val("")
            // })
            // $("#phase").keypress( (event) => {
            //     if ( event.which == 13 ) {  // 13 is keycode for enter
            //         $("#set").click()
            //         return false
            //     }
            // })

        } // end initializeTeam
    }
} // end WS