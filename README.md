ZOO APP

Zoo-App is a Single-Page Application (SPA) built using HTML, Vue.js, Vue Router, and Bootstrap CSS. It showcases various animals with descriptions and images, dynamically fetched from API Ninjas(for descriptions) and UnsplashAPI(for images).Addition it stores login/Registration information and information recorded in the forms in Firebase

## Installation and Setup

## Project setup

````bash
npm install -g @vue/cli

To run this project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/your-username/zoo-app.git

````

2. Navigate into the project directory:

   ```bash
   cd zoo-app
   ```

3. Install the dependencies:

   ```bash
   npm install bootstrap
   npm install @popperjs/core
   npm install firebase
   ```

4. Start the development server:

   ```bash
   npm run build
   npm run serve
   ```

5. Open your browser and go to `your-local-host` to view the app.

## API Integration

API Ninjas
Description API:
This app fetches animal descriptions from [API Ninjas](https://api-ninjas.com/api/animals).

- To use this API, get an API key from API Ninjas and replace `'YOUR_API_NINJAS_KEY'` in the `AnimalList.vue` and `AnimalDetail.vue` files.

Unsplash API
Image API
Animal images are fetched from [Unsplash](https://unsplash.com/developers).

- To use this API, get an API key from Unsplash and replace `'YOUR_UNSPLASH_ACCESS_KEY'` in the `AnimalList.vue` and `AnimalDetail.vue` files.
