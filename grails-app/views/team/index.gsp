<%--
  Created by IntelliJ IDEA.
  User: pastel
  Date: 11/4/2020
  Time: 9:51 AM
--%>

<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title>Team</title>
    <asset:stylesheet src="bootstrap.css"/>

    <asset:javascript src="application" />
    <asset:javascript src="spring-websocket" />

    <script type="text/javascript">



       $(function(){
           const app = WS($)
           app.initializeTeam()
       })

    </script>

</head>

<body>
    <div class="container">
        <h2>Team Member Workspace</h2>
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

        <input id="message" />
        <button id="send">Send</button>

        <input id="phase" />
        <button id="set">Set</button>
    </div>

</body>
</html>