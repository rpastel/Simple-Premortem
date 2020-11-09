<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <meta name="layout" content="app"/>
    <title>Team</title>

    <script type="text/javascript">
       $(function(){
           const app = WS($)
           app.initializeTeam()
       })
    </script>
</head>

<body>
<!-- Used for developing with out a Facilitator view -->
%{--<g:render template="/phase" />--}%
</body>

</html>