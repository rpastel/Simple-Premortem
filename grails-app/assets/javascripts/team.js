// Required for WS JavaScript function
//= require application

$(function(){
    console.log("In team.js running")
    const app = WS($)
    app.initializeTeam()
})