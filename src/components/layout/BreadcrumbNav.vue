<template>
  <nav class="breadcrumb-nav" aria-label="Breadcrumb">
    <div class="container">
      <ol class="breadcrumb-list">
        <li v-for="(crumb, index) in crumbs" :key="crumb.path" class="breadcrumb-item">
          <router-link v-if="index < crumbs.length - 1" :to="crumb.path" class="breadcrumb-link">
            {{ crumb.label }}
          </router-link>
          <span v-else class="breadcrumb-current" aria-current="page">{{ crumb.label }}</span>
          <i v-if="index < crumbs.length - 1" class="fas fa-chevron-right breadcrumb-sep" aria-hidden="true"></i>
        </li>
      </ol>
    </div>
  </nav>
</template>

<script>
export default {
  name: "BreadcrumbNav",
  props: {
    crumbs: {
      type: Array,
      required: true,
      validator: (v) => v.every((c) => c.label && c.path),
    },
  },
};
</script>

<style scoped>
.breadcrumb-nav {
  padding: 0.75rem 0;
  background: transparent;
}

.breadcrumb-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: var(--text-sm);
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.breadcrumb-link {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: color var(--transition-fast);
  font-weight: 400;
}

.breadcrumb-link:hover {
  color: var(--color-gold-light);
}

.breadcrumb-current {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

.breadcrumb-sep {
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.3);
}

:not(.page-header) ~ .breadcrumb-nav .breadcrumb-link,
.breadcrumb-nav:not(.page-header .breadcrumb-nav) .breadcrumb-link {
  color: var(--color-warm-gray);
}

.breadcrumb-nav:not(.page-header .breadcrumb-nav) .breadcrumb-current {
  color: var(--color-charcoal);
}

.breadcrumb-nav:not(.page-header .breadcrumb-nav) .breadcrumb-sep {
  color: var(--color-light-border);
}
</style>
