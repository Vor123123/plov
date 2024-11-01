const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const startButton = document.getElementById('start-button');
const chatContainer = document.getElementById('chat-container');
const messageSound = new Audio('other/fak.wav');
const helpSound = new Audio('other/2.wav');

const businessResponses = {
    "Trump Organization: This is my main company that oversees all my business operations, including real estate, hotels, and golf courses.": new Audio('other/b1.wav'),
    "Trump Tower: An iconic skyscraper in New York City that serves as Trump's flagship project, featuring offices, luxury condos, and retail space.": new Audio('other/b2.wav'),
    "Trump Casinos (Trump Hotels and Casinos): I've operated a network of casinos and hotels, including Trump Taj Mahal and Trump Plaza in Atlantic City. Unfortunately, these businesses faced financial difficulties and eventually closed.": new Audio('other/b3.wav'),
    "Trump Golf: This collection of golf clubs spans the globe, including locations in Scotland and the U.S. I take pride in developing and promoting this segment of my business.": new Audio('other/b4.wav'),
    "Trump Productions: My production company is involved in creating television shows, most notably the popular reality series 'The Apprentice.'": new Audio('other/b5.wav'),
    "Trump Winery: Located in Virginia, my winery produces award-winning wines. I'm actively involved in the business and its marketing.": new Audio('other/b6.wav'),
    "Trump Merchandise: Through this brand, I offer a variety of products, including clothing, accessories, and souvenirs featuring my name and logo.": new Audio('other/b7.wav'),
    "Trump International Hotel: This luxury hotel in Washington, D.C., opened in 2016 in a historic former post office building, and it has become a popular venue for politicians and business leaders.": new Audio('other/b8.wav'),
    "Trump Building: I manage several commercial and residential properties in New York and other cities, generating a steady stream of rental income.": new Audio('other/b9.wav'),
    "Trump Ice: I once produced bottled water under the Trump Ice brand, which was sold in various retail locations.": new Audio('other/b10.wav'),
};

const quotesResponses = {
    "Make America Great Again!": new Audio('other/q1.wav'),
    "I will be the greatest jobs president that God ever created.": new Audio('other/q2.wav'),
    "You're fired!": new Audio('other/q3.wav'),
    "Sometimes by losing a battle you find a new way to win the war.": new Audio('other/q4.wav'),
    "The point is that you can't be too greedy.": new Audio('other/q5.wav'),
    "We will build a great wall, and Mexico will pay for it!": new Audio('other/q6.wav'),
    "I have a great relationship with the blacks.": new Audio('other/q7.wav'),
    "I could stand in the middle of Fifth Avenue and shoot somebody, and I wouldn't lose any voters.": new Audio('other/q8.wav'),
    "The media is the enemy of the people.": new Audio('other/q9.wav'),
    "Our country is in serious trouble.": new Audio('other/q10.wav'),
};

let currentSound = null;

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});
startButton.addEventListener('click', startChat);

function startChat() {
    document.querySelector('.header').style.display = 'block';
    chatContainer.style.display = 'flex';
    startButton.style.display = 'none';
    displayInitialMessage();
}

function sendMessage() {
    const message = userInput.value.trim();
    if (message) {
        addMessage(`- ${message}`);
        userInput.value = '';
        botResponse(message);
    }
}

function addMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function stopCurrentSound() {
    if (currentSound) {
        currentSound.pause();
        currentSound.currentTime = 0;
    }
}

function botResponse(userMessage) {
    let response;

    switch (userMessage.toLowerCase()) {
        case 'business':
            response = getRandomBusinessResponse();
            break;
        case 'quotes':
            response = getRandomQuoteResponse();
            break;
        case 'help':
            response = 'Trump: Here is a list of available commands: business, quotes';
            playHelpSound();
            break;
        default:
            response = 'Trump: I don’t understand you. Try typing ‘help’ to see the available commands.';
    }

    setTimeout(() => {
        addMessage(response);
        if (userMessage.toLowerCase() === 'business') {
            playBusinessSound(response);
        } else if (userMessage.toLowerCase() === 'quotes') {
            playQuoteSound(response);
        }
    }, 500);
}

function getRandomBusinessResponse() {
    const responses = Object.keys(businessResponses);
    return responses[Math.floor(Math.random() * responses.length)];
}

function getRandomQuoteResponse() {
    const responses = Object.keys(quotesResponses);
    return responses[Math.floor(Math.random() * responses.length)];
}

function playBusinessSound(response) {
    const sound = businessResponses[response];
    stopCurrentSound();
    currentSound = sound;
    sound.currentTime = 0;
    sound.play();
}

function playQuoteSound(response) {
    const sound = quotesResponses[response];
    stopCurrentSound();
    currentSound = sound;
    sound.currentTime = 0;
    sound.play();
}

function displayInitialMessage() {
    const initialMessage = "Trump: Hi. I'm the president and you can only ask about business and my quotes. Write 'help' if you don't understand something.";
    addMessage(initialMessage);
    stopCurrentSound();
    currentSound = messageSound;
    currentSound.play();
}

function playHelpSound() {
    stopCurrentSound();
    currentSound = helpSound;
    helpSound.currentTime = 0;
    helpSound.play();
}
