const placeholderImages = {
  lion: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600&h=400&fit=crop",
  tiger: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=600&h=400&fit=crop",
  elephant: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=600&h=400&fit=crop",
  giraffe: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&h=400&fit=crop",
  warthog: "https://images.unsplash.com/photo-1516376284030-5f8308e2e2c1?w=600&h=400&fit=crop",
  zebra: "https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=600&h=400&fit=crop",
  monkey: "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=600&h=400&fit=crop",
  panda: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=600&h=400&fit=crop",
  leopard: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=600&h=400&fit=crop",
  buffalo: "https://images.unsplash.com/photo-1535338454528-1b22dc2e2f2e?w=600&h=400&fit=crop",
  cheetah: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=600&h=400&fit=crop",
  gorilla: "https://images.unsplash.com/photo-1580855003478-9e347aa14070?w=600&h=400&fit=crop",
};

const conservationStatus = {
  Lion: "Vulnerable",
  Tiger: "Endangered",
  Elephant: "Endangered",
  Giraffe: "Vulnerable",
  Warthog: "Least Concern",
  Zebra: "Near Threatened",
  Monkey: "Least Concern",
  Panda: "Vulnerable",
  Leopard: "Vulnerable",
  Buffalo: "Near Threatened",
  Cheetah: "Vulnerable",
  Gorilla: "Critically Endangered",
};

const animalNames = Object.keys(conservationStatus);

const carouselAnimals = [
  {
    id: 1,
    name: "African Lion",
    slug: "lion",
    description: "The majestic king of the jungle that lives in prides. Lions are the only cats that live in groups called prides.",
    imageUrl: placeholderImages.lion,
    conservationStatus: conservationStatus.Lion,
  },
  {
    id: 2,
    name: "Bengal Tiger",
    slug: "tiger",
    description: "The largest cat species with distinctive stripes. Each tiger's stripe pattern is unique, like human fingerprints.",
    imageUrl: placeholderImages.tiger,
    conservationStatus: conservationStatus.Tiger,
  },
  {
    id: 3,
    name: "African Elephant",
    slug: "elephant",
    description: "Gentle giants with incredible intelligence and memory. They can remember watering holes from decades past.",
    imageUrl: placeholderImages.elephant,
    conservationStatus: conservationStatus.Elephant,
  },
  {
    id: 4,
    name: "Masai Giraffe",
    slug: "giraffe",
    description: "The tallest living terrestrial animal with long necks. Their necks contain the same number of vertebrae as humans (7).",
    imageUrl: placeholderImages.giraffe,
    conservationStatus: conservationStatus.Giraffe,
  },
];

export { placeholderImages, conservationStatus, animalNames, carouselAnimals };
