<template>
  <section class="section">
    <div class="container">
      <h1
        :style="{ marginBottom: '5rem' }"
        class="title has-text-centered is-size-1"
      >
        Repo Catalogue
      </h1>
      <div class="columns is-multiline">
        <div
          v-for="repo in repos"
          :key="repo.projectName"
          class="card column is-3"
        >
          <div
            :style="{ backgroundColor: '#' + repo.colorHex }"
            class="card-image"
          >
            <a :href="`/repos/${repo.slug}`">
              <figure
                :style="{ maxWidth: '20%', margin: '0 auto', padding: '2em 0' }"
                v-html="repo.svgLogo"
              ></figure>
            </a>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <h3 class="title">{{ repo.projectName }}</h3>
                <a class="subtitle" :href="repo.repoUrl">GitHub</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  asyncData({ payload }) {
    return { repos: payload }
  }
}
</script>
<style></style>
