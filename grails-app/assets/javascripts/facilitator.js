// Required for WS JavaScript function
//= require application

$(function(){
    console.log("In facilitator.js running")
    var app = WS($)
    app.initializeFacilitator()
})