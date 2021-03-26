<%--
  Created by IntelliJ IDEA.
  User: pastel
  Date: 11/9/2020
  Time: 6:18 AM
--%>

<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title>
        <g:layoutTitle default="Premortem"/>
    </title>

    <asset:stylesheet src="bootstrap.css"/>

%{--    <asset:javascript src="application" />--}%
    <asset:javascript src="spring-websocket" />

    <g:layoutHead/>
</head>

<body>
    <div class="container">

        <g:render template="/lists" />
        <br/>
        <g:render template="/message" />

        <g:layoutBody/>

    </div>
</body>
</html>