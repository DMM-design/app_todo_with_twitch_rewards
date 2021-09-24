<template>
    <div class="pagination">
      <button
        type="button"
        class="page-link"
        v-if="currentPage != 1"
        @click="currentPage--, setPage(currentPage)">
          Previous
      </button>
      <button
        v-for="page in pages.slice(currentPage-1, currentPage+5)"
        :key="page"
        @click="currentPage = page, setPage(page)">
          {{page}}
      </button>
      <button
        type="button"
        @click="currentPage++, setPage(currentPage)"
        v-if="currentPage < pages.length"
         class="page-link">
         Next
      </button>
    </div>
</template>
<script>
import { ref } from 'vue';

export default {
  name: 'CustomPagination',
  props: {
    lengthArrElement: String,
  },
  setup(props, context) {
    const currentPage = ref(1);
    const numberOfPages = Math.ceil(props.lengthArrElement / 10);
    const pages = ref([]);
    for (let index = 1; index <= numberOfPages; index += 1) { pages.value.push(index); }

    const setPage = (page) => context.emit('getPage', page);

    return {
      pages,
      currentPage,
      setPage,
    };
  },
};
</script>
<style lang="scss" scoped>
  $btnColor: #117daf;
  $txtColor: #ffffff;
  $boxShadow: #0000007c;

  .pagination{
    button{
      border: none;
      background-color: $btnColor;
      color: $txtColor;
      box-shadow: 0px 2px 0px $boxShadow;
      padding: 15px;
      margin-left: 5px;
      font-size: 16px;
      font-family: "Ubuntu";
      &:active{box-shadow:none;}
      &:hover{cursor: pointer;}
    }
  }
</style>
