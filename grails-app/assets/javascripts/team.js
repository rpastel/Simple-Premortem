// Required for WS JavaScript function
//= require application

$(function(){
    console.log("In team.js running")
    var app = WS($)
    app.initializeTeam()
})