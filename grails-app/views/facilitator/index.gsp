<%--
  Created by IntelliJ IDEA.
  User: pastel
  Date: 11/5/2020
  Time: 9:42 AM
--%>

<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title>Facilitator</title>

    <asset:stylesheet src="bootstrap.css"/>

    <asset:javascript src="application" />
    <asset:javascript src="spring-websocket" />

    <script type="text/javascript">

        $(function(){
            const app = WS($)
            app.initializeFacilitator()
        })

    </script>


</head>

<body>
    <div class="container">
        <h2>Facilitator Workspace</h2>
        <div id="names-section">
            <h4>Names:</h4>
            <ul id="names-list"> </ul>
        </div>
        <div id="reasons-section">
            <h4>Reasons:</h4>
            <ul id="reasons-list"> </ul>
        </div>
        <div id="solutions-section">
            <h4>Solutions:</h4>
            <ul id="solutions-list"> </ul>
        </div>

        <input id="phase"/>
        <button id="next">Next Phase</button>
        <p></p>
        <p id="message-sent"></p>
        <input id="message" />
        <button id="send">Send</button>

    </div>

</body>
</html>