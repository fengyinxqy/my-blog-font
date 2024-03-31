<template>
  <div class="flex">
    <personal-card />
    <article-list />
  </div>
</template>

<script>
import PersonalCard from '@/components/personal-card.vue'
import ArticleList from './components/article-list.vue'
export default {
  name: 'ArticleView',
  components: {
    PersonalCard,
    ArticleList
  },
  data () {
    return {

    }
  },

  mounted () {

  },

  methods: {

  }
}
</script>
