const chatMessages = document.getElementById('chatbot-messages');
const messageInput = document.getElementById('message-input');
let currentScheme = 0;

const colorSchemes = [
    {
        name: 'Default',
        body: '#f0f2f5',
        container: 'white',
        header: '#4a4a4a',
        headerText: 'white',
        inputBg: '#f0f2f5',
        inputText: 'black',
        sendButton: '#0084ff',
        sendButtonText: 'white',
        userMessage: '#0084ff',
        userMessageText: 'white',
        botMessage: '#e4e6eb',
        botMessageText: 'black'
    },
    {
        name: 'Dark Mode',
        body: '#1a1a1a',
        container: '#2a2a2a',
        header: '#333333',
        headerText: '#ffffff',
        inputBg: '#3a3a3a', /* '#2F4F4F' for green*/
        inputText: '#ffffff',
        sendButton: '#2F4F4F', /*4a4a4a for gray*/ 
        sendButtonText: '#ffffff',
        userMessage: '#0084ff',
        userMessageText: '#ffffff',
        botMessage: '#3a3a3a',
        botMessageText: '#ffffff'
    },
    {
        name: 'Warm Vibrant',
        body: '#ffe6cc',
        container: '#fff0e0',
        header: '#ff6b35',
        headerText: '#ffffff',
        inputBg: '#ffbf8a',
        inputText: '#4a4a4a',
        sendButton: '#ff6b35',
        sendButtonText: '#ffffff',
        userMessage: '#ff9a5c',
        userMessageText: '#ffffff',
        botMessage: '#ffcda8',
        botMessageText: '#4a4a4a'
    }
];

function applyColorScheme(scheme) {
    document.body.style.backgroundColor = scheme.body;
    document.getElementById('chatbot-container').style.backgroundColor = scheme.container;
    document.getElementById('chatbot-container').style.boxShadow = `0 4px 20px ${scheme.name === 'Dark Mode' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`;
    document.getElementById('chatbot-header').style.backgroundColor = scheme.header;
    document.getElementById('chatbot-header').style.color = scheme.headerText;
    document.getElementById('user-input').style.backgroundColor = scheme.inputBg;
    messageInput.style.backgroundColor = scheme.inputBg;
    messageInput.style.color = scheme.inputText;
    document.querySelector('#user-input button').style.backgroundColor = scheme.sendButton;
    document.querySelector('#user-input button').style.color = scheme.sendButtonText;

    document.querySelectorAll('.user-message').forEach(el => {
        el.style.backgroundColor = scheme.userMessage;
        el.style.color = scheme.userMessageText;
    });

    document.querySelectorAll('.bot-message').forEach(el => {
        el.style.backgroundColor = scheme.botMessage;
        el.style.color = scheme.botMessageText;
    });
}

function changeColorScheme() {
    currentScheme = (currentScheme + 1) % colorSchemes.length;
    applyColorScheme(colorSchemes[currentScheme]);
}

function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        addMessage('user', message);
        getBotResponse(message);
        messageInput.value = '';
    }
}

function addMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `${sender}-message`);
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Apply current color scheme to new message
    const scheme = colorSchemes[currentScheme];
    if (sender === 'user') {
        messageElement.style.backgroundColor = scheme.userMessage;
        messageElement.style.color = scheme.userMessageText;
    } else {
        messageElement.style.backgroundColor = scheme.botMessage;
        messageElement.style.color = scheme.botMessageText;
    }
}

function getBotResponse(message) {
    let response = "I'm not sure how to respond to that.";
    if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
        response = "Hello! How can I help you today?";
    } else if (message.toLowerCase().includes('how are you')) {
        response = "I'm doing well, thank you for asking! How about you?";
    } else if (message.toLowerCase().includes('bye')) {
        response = "Goodbye! Have a great day!";
    }
    
    setTimeout(() => {
        addMessage('bot', response);
    }, 500);
}

messageInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Apply default color scheme on load
applyColorScheme(colorSchemes[currentScheme]);