<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <meta name="layout" content="app"/>
    <title>Facilitator</title>

    <script type="text/javascript">
        $(function(){
            const app = WS($)
            app.initializeFacilitator()
        })
    </script>
</head>

<body>

    <p></p>
    <g:render template="/phase" />

</body>
</html>