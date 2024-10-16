<template>
  <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img
          src="https://via.placeholder.com/800x400?text=Lion"
          class="d-block w-100"
          alt="Lion"
        />
        <div class="carousel-caption d-none d-md-block">
          <h5>Lion</h5>
          <p>The king of the jungle.</p>
        </div>
      </div>
      <div class="carousel-item">
        <img
          src="https://via.placeholder.com/800x400?text=Tiger"
          class="d-block w-100"
          alt="Tiger"
        />
        <div class="carousel-caption d-none d-md-block">
          <h5>Tiger</h5>
          <p>The mighty predator.</p>
        </div>
      </div>
      <div class="carousel-item">
        <img
          src="https://via.placeholder.com/800x400?text=Elephant"
          class="d-block w-100"
          alt="Elephant"
        />
        <div class="carousel-caption d-none d-md-block">
          <h5>Elephant</h5>
          <p>The gentle giant.</p>
        </div>
      </div>
    </div>

    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExample"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExample"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "AnimalCarousel",
};
</script>

<style scoped>
.carousel-caption {
  background-color: rgba(0, 0, 0, 0.6);
  padding: 10px;
}
</style>
