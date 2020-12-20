<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script>
// @ is an alias to /src
import Tweet from "@/components/Tweet.vue";

export default {
  name: "Home",
  data: () => ({
    unsubscribe: null,
  }),
  components: {
    Tweet,
  },
  methods: {
    renderTweets() {
      // const database = usersCollection;
      // const user = store.state.currentUser;
      // const directNavList = document.querySelector(".directNavList");

      this.unsubscribe = database
        .orderBy("createdOn")
        .onSnapshot(function(snapshot) {
          snapshot.docChanges().forEach(function(change) {
            //ADDED TWEETS
            if (change.type === "added") {
             
            }
            //MODIFIED TWEETS
            if (change.type === "modified") {

            }
            //DELETED TWEETS
            if (change.type === "removed") {

            }
          });
        });
    },
  },
};
</script>
<style scoped lang="scss"></style>
