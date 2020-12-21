<template>
  <v-lazy id="home" ref="home">

  </v-lazy>
</template>

<script>
// @ is an alias to /src
import Vue from "vue";
import Tweet from "@/components/Tweet.vue";
import {
  db,
  tweetStore,
  storage,
  storageRef,
  imagesRef,
  videosRef,
  avatarsRef,
} from "../firebase/firebase";


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
      const database = tweetStore;
      const tweetConstructor = Vue.extend(Tweet);
      //const home1 = this.$refs.home.appendChild()
      const home2 = document.getElementById('home')
      
      //Firebase Snapshot Listener
      this.unsubscribe = database
        .orderBy("createdOn")
        .onSnapshot(function(snapshot) {
          snapshot.docChanges().forEach(function(change) {
            //ADDED TWEETS
            if (change.type === "added") {
              const tweetInstance = new tweetConstructor({
                propsData: {
                  content: change.doc.data().content,
                  likes: change.doc.data().likes,
                  retweets: change.doc.data().retweets,
                  media: change.doc.data().media,
                  user: change.doc.data().user 
                }
              })
            // tweetInstance.$slots.default = ['yeah so what', 7, 'no media', 'Malik :D']
            tweetInstance.$mount();
            home2.appendChild(tweetInstance.$el)

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
  mounted() {
    this.renderTweets();
  },
};
</script>
<style scoped lang="scss">

</style>
