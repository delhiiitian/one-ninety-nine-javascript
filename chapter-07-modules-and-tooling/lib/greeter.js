// A module with one main thing to offer uses a default export.
export default function greet(name, timeOfDay = "day") {
  return `Have a good ${timeOfDay}, ${name}!`;
}

// A module can also have named exports next to its default export.
export const supportedLanguages = ["en", "hi"];
