const API_NINJAS_KEY = process.env.VUE_APP_API_NINJAS_KEY;
const UNSPLASH_KEY = process.env.VUE_APP_UNSPLASH_KEY;

export async function fetchAnimalHabitat(name) {
  try {
    const response = await fetch(
      `https://api.api-ninjas.com/v1/animals?name=${name}`,
      { headers: { "X-Api-Key": API_NINJAS_KEY } }
    );
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return data[0]?.characteristics?.habitat || "Habitat information unavailable";
  } catch {
    return "Habitat information unavailable";
  }
}

export async function fetchAnimalDescription(name) {
  try {
    const response = await fetch(
      `https://api.api-ninjas.com/v1/animals?name=${name}`,
      { headers: { "X-Api-Key": API_NINJAS_KEY } }
    );
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    const characteristics = data[0]?.characteristics || {};
    return characteristics.slogan || `Learn more about the ${name}`;
  } catch {
    return `Learn more about the ${name}`;
  }
}

export async function fetchAnimalImage(name, size = "small") {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${name}&client_id=${UNSPLASH_KEY}`
    );
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (size === "regular") {
      return data.results[0]?.urls?.regular || null;
    }
    return data.results[0]?.urls?.small || null;
  } catch {
    return null;
  }
}
