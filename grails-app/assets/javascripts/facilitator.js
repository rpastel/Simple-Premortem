// Required for WS JavaScript function
//= require application

$(function(){
    console.log("In facilitator.js running")
    const app = WS($)
    app.initializeFacilitator()
})