<template>
  <div>
    <section
      :style="{ backgroundColor: '#' + repo.colorHex }"
      class="hero has-text-centered"
    >
      <div class="hero-body">
        <div class="container">
          <figure
            :style="{ maxWidth: '10%', margin: '0 auto' }"
            v-html="repo.svgLogo"
          ></figure>
          <h1 class="title has-text-light is-size-1">
            {{ repo.projectName }}
          </h1>
        </div>
      </div>
    </section>
    <div class="container" :style="{ paddingTop: '2rem' }">
      <p>
        <span class="is-size-5">Description:</span> {{ repoData.description }}
      </p>
      <p>
        <span class="is-size-5">Stars:</span> {{ repoData.stargazers_count }}
      </p>
      <p><span class="is-size-5">Forks:</span> {{ repoData.forks_count }}</p>
    </div>
  </div>
</template>

<script>
export default {
  asyncData({ params, error, payload, $axios }) {
    return { repo: payload }
  },
  data() {
    return { repoData: {} }
  },
  mounted() {
    this.$nextTick(async () => {
      const repoUrlParts = this.repo.repoUrl.split('/')
      const repoOwner = repoUrlParts[repoUrlParts.length - 2]
      const repo = repoUrlParts[repoUrlParts.length - 1]
      const result = await this.$axios.$get(
        `https://api.github.com/repos/${repoOwner}/${repo}`
      )
      this.repoData = result
    })
  }
}
</script>

<style></style>
