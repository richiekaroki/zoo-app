export const animalFacts = [
  "Lions are the only cats that live in social groups called prides.",
  "A tiger's roar can be heard from almost 2 miles away.",
  "Elephants are the only animals that can't jump.",
  "Giraffes only need 30 minutes of sleep per day.",
  "A group of flamingos is called a flamboyance.",
  "Cheetahs can accelerate faster than most sports cars.",
  "Dolphins sleep with one eye open.",
  "A octopus has three hearts and blue blood.",
  "Koalas sleep up to 22 hours a day.",
  "Penguins can hold their breath for over 20 minutes.",
  "A group of wolves is called a pack.",
  "Butterflies taste with their feet.",
];

export const loadingMessages = [
  "Waking up the animals...",
  "Checking the habitat...",
  "Gathering wildlife facts...",
  "Consulting our naturalists...",
  "Scanning the savanna...",
  "Listening to the forest...",
];

export function getRandomFact() {
  return animalFacts[Math.floor(Math.random() * animalFacts.length)];
}

export function getRandomLoadingMessage() {
  return loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
}
