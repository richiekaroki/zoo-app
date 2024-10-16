<template>
  <section class="services py-5">
    <div class="container">
      <h2 class="text-center mb-4">Our Services</h2>
      <div class="row">
        <div class="col-md-4">
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="card-title">Animal Habitat Facts</h5>
              <p class="card-text">
                Discover fascinating habitual facts about various animal
                species.
              </p>
              <!-- Correct path to AnimalList route -->
              <router-link to="/animals" class="btn btn-primary">
                Learn More
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services {
  background-color: #f8f9fa;
}
.card {
  border: none;
}
</style>
