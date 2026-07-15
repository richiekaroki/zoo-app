const API_NINJAS_KEY = process.env.VUE_APP_API_NINJAS_KEY;
const UNSPLASH_KEY = process.env.VUE_APP_UNSPLASH_KEY;

export async function fetchAnimalHabitat(name) {
  const response = await fetch(
    `https://api.api-ninjas.com/v1/animals?name=${name}`,
    { headers: { "X-Api-Key": API_NINJAS_KEY } }
  );
  const data = await response.json();
  return data[0]?.characteristics?.habitat || "Habitat not available";
}

export async function fetchAnimalDescription(name) {
  const response = await fetch(
    `https://api.api-ninjas.com/v1/animals?name=${name}`,
    { headers: { "X-Api-Key": API_NINJAS_KEY } }
  );
  const data = await response.json();
  const characteristics = data[0]?.characteristics || {};
  return characteristics.slogan || `Information about ${name}`;
}

export async function fetchAnimalImage(name, size = "small") {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${name}&client_id=${UNSPLASH_KEY}`
  );
  const data = await response.json();
  if (size === "regular") {
    return data.results[0]?.urls?.regular || "https://via.placeholder.com/600x400?text=Animal+Image";
  }
  return data.results[0]?.urls?.small || "https://via.placeholder.com/300x200";
}
