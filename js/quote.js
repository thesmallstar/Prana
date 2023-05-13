const quotes = [
    "Time and tide wait for no man. - Geoffrey Chaucer",
    "Time is a great healer, but a poor beautician. - Lucille S. Harper",
    "Time is a precious thing. Never waste it. - Unknown",
    "Time is a created thing. To say 'I don't have time,' is like saying, 'I don't want to. - Lao Tzu",
    "Time flies over us, but leaves its shadow behind. - Nathaniel Hawthorne",
    "Time is what we make of it, always has been, always will be. - Unknown",
    "Time is a dressmaker specializing in alterations. - Faith Baldwin",
    "The trouble is, you think you have time. - Buddha",
    "Time is a circus, always packing up and moving away. - Ben Hecht",
    "Time is a thief, and one day it will rob us all. - Unknown",
    "The future is something which everyone reaches at the rate of sixty minutes an hour, whatever he does, whoever he is. - C.S. Lewis",
    "Time flies like an arrow; fruit flies like a banana. - Anthony G. Oettinger",
    "Time is a precious gift that should not be wasted. - Unknown",
    "The future is something that everyone should be looking forward to, because we all have to spend the rest of our lives there. - Unknown",
    "Time is the school in which we learn, time is the fire in which we burn. - Delmore Schwartz",
    "Lost time is never found again. - Benjamin Franklin",
    "Time is the wisest counselor of all. - Pericles",
    "The two most powerful warriors are patience and time. - Leo Tolstoy",
    "Time flies over us, but leaves its shadow behind. - Unknown",
    "Time is the only thing we have control over. What we do with it is up to us. - Unknown",
    "Time is the longest distance between two places. - Tennessee Williams",
    "Time is free, but it's priceless. You can't own it, but you can use it wisely. - Unknown",
    "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
    "In three words I can sum up everything I've learned about life: it goes on. - Robert Frost",
    "Life is too short to waste time hating anyone. - Unknown",
    "Life is what happens when you're busy making other plans. - John Lennon",
    "You only live once, but if you do it right, once is enough. - Mae West",
    "Life is 10% what happens to us and 90% how we react to it. - Charles R. Swindoll",
    "Life is a journey, and if you fall in love with the journey, you will be in love forever. - Peter Hagerty",
    "Life is like a camera. Focus on the good times, develop from the negatives, and if things don't work out, take another shot. - Unknown",
    "Life is a daring adventure or nothing at all. - Helen Keller",
    "Life is  like riding a bicycle. To keep your balance, you must keep moving. - Albert Einstein",
    "The purpose of our lives is to be happy. - Dalai Lama",
    "Don't wait for life to happen, make it happen. - Unknown",
    "Life is a one-time offer, use it well. - Unknown"
];



var footerText = document.querySelector("#footer-text");
var random = Math.floor(Math.random() * quotes.length);
footerText.innerHTML = quotes[random];