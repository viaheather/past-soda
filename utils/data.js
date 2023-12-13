const names = [
  "Shannon",
  "Kortney",
  "Aarez",
  "Michael",
  "Aaron",
  "Brandon",
  "Smith",
  "Jones",
  "Brian",
  "Heather",
  "Kenneth",
  "Xander",
  "Jared",
  "Courtney",
  "Gillian",
  "Clark",
  "Grace",
  "Kelsey",
  "Tamar",
  "Alex",
  "Mark",
  "Ryan",
  "Andrew",
  "Sarah",
  "Nathaniel",
  "Parker",
];

const thoughtContent = [
  "I want to be free",
  "I miss my hobbies",
  "I have no time to myself anymore",
  "There needs to be more vietnamese restaurants around here",
  "I want more cats",
  "I want more dogs",
  "I miss playing video games",
  "I need to stop shopping so much",
  "I want to make projcets that are meaningful to me",
  "Are you we doing okay?",
  "I want to go hiking",
  "What is the plan today?",
  "When are we going to go hiking?",
  "I want to do ceramics",
  "I can't believe I was lucky enough!",
  "Are we really going to pretend that did not happen?",
  "I need to make a grocery list.",
  "I am craving sushi",
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomName = () =>
  `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;

// Function to generate random assignments that we can add to student object.
const getRandomThoughts = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtName: getRandomArrItem(thoughtContent),
      score: Math.floor(Math.random() * (99 - 70 + 1) + 70),
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { getRandomName, getRandomThoughts };
