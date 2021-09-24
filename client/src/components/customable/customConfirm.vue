<template>
    <div class="custom-confirm">
        <header>
            <h3>{{content}}</h3>
        </header>
        <p></p>
        <footer>
            <button class="btn btn-cancel" @click="booleanHandler(false)">CANCEL</button>
            <button class="btn btn-delete" @click="booleanHandler(true)">DELETE</button>
        </footer>
    </div>
</template>
<script>
export default {
  props: {
    content: String,
  },
  setup(props, context) {
    function booleanHandler(bool) {
      context.emit('isConfirmed', bool);
    }
    return {
      booleanHandler,
    };
  },
};
</script>
<style scoped lang="scss">
  $confirmAlert: #0e59af;
  $txtcolor: #ffffff;

  .custom-confirm{
    position: fixed;
    top: 20px;
    right: 20px;
    width: 200px;
    height: 150px;
    color: $txtcolor;
    background: $confirmAlert;
    border-radius: 15px;
    footer{
      display: flex;
      justify-content: space-around;
      .btn{
        height: 40px;
        border: none;
        border-radius: 15px;
        box-shadow: 0px 3px 0px black;
        &:hover{cursor:pointer;}
        &:active{box-shadow:none;}
      }
    }
  }
</style>
