function sendMessage() {
    var userInput = document.getElementById("user-input").value;
    document.getElementById("user-input").value = "";
    
    var chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += "<p><strong>You:</strong> " + userInput + "</p>";

    // Send user message to server
    $.ajax({
        type: "POST",
        url: "/get_response",
        data: { user_message: userInput },
        success: function(response) {
            chatBox.innerHTML += "<p><strong>Sam:</strong> " + response + "</p>";
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    });
}

$(document).ready(function() {
    // Focus on input field when the page loads
    $("#user-input").focus();
    
    // Send message when "Send" button is clicked
    $("#send-btn").click(function() {
        sendMessage();
    });
    
    // Press Enter to send message
    $("#user-input").keypress(function(event) {
        if (event.keyCode === 13) {
            sendMessage();
        }
    });
});
