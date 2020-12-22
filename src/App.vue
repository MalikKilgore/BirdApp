<template>
  <v-app id="inspire">
    <!-- Overlay for creating tweets-->
    <v-overlay :absolute="absolute" :value="overlay">
      <v-form @submit.prevent method="post" ref="form">
        <v-text-field
          v-model="user"
          :counter="10"
          label="user"
          required
        ></v-text-field>

        <v-textarea
          v-model="content"
          :counter="240"
          label="content"
          filled
          name="input-7-4"
          required
        ></v-textarea>

        <v-file-input
          v-model="media"
          hide-input
          show-size
          small-chips
          truncate-length="15"
        ></v-file-input>
        <v-btn class="mr-4" type="submit" @click="sendTweet"> submit </v-btn>
      </v-form>

      <v-btn color="success" @click="overlay = false"> Hide Overlay </v-btn>
    </v-overlay>

    <v-app-bar app color="white" flat>
      <v-avatar
        :color="$vuetify.breakpoint.smAndDown ? 'grey darken-1' : 'transparent'"
        size="32"
      ></v-avatar>

      <v-tabs centered class="ml-n9" color="grey darken-1">
        <v-tab to="/"> Home </v-tab>
        <v-tab to="/profile"> Profile </v-tab>
      </v-tabs>
      <v-avatar
        class="hidden-sm-and-down"
        color="grey darken-1 shrink"
        size="32"
      ></v-avatar>
    </v-app-bar>
    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="12" sm="2">
            <v-sheet id="leftColumn" rounded="lg" min-height="268">
              <!-- USER PROFILE DISPLAYED HERE -->
              <v-btn
                class="newTweet"
                elevation="3"
                fab
                rounded
                @click="toggleOverlay"
                >Tweet</v-btn
              >
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="8">
            <v-sheet
              id="timelineCol"
              min-height="70vh"
              rounded="lg"
              max-height="400"
            >
              <!-- TWEETS (Cards) LOAD HERE -->
              <router-view />
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="2">
            <v-sheet id="rightColumn" rounded="lg" min-height="268">
              <!--  -->
              <v-btn
                class="newTweet"
                elevation="3"
                fab
                rounded
                @click="toggleOverlay"
                >Tweet</v-btn
              >
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import router from "./router";
import { db, tweetStore, storage, storageRef } from "./firebase/firebase";

export default {
  data: () => ({
    absolute: true,
    overlay: false,
    user: "",
    content: "",
    media: null,
    downloadURL: "",
  }),
  methods: {
    toggleOverlay() {
      switch (this.overlay) {
        case false:
          this.overlay = true;
          break;
        case true:
          this.overlay = false;
          break;
      }
    },
    async uploadMedia() {
      const file = storageRef.child(`files/${this.media.name}`);
      await file.put(this.media);
    },
    async sendTweet() {
      if (this.media != null) {
        await this.uploadMedia();
        const file = storageRef.child(`files/${this.media.name}`);
        const dlURL = await file.getDownloadURL();

        tweetStore.doc().set({
          createdOn: new Date(),
          content: this.content,
          user: this.user,
          media: dlURL,
          likes: Math.floor(Math.random() * 2340),
          retweets: Math.floor(Math.random() * 860),
        });
      } else {
        tweetStore.doc().set({
          createdOn: new Date(),
          content: this.content,
          user: this.user,
          media: null,
          likes: Math.floor(Math.random() * 2340),
          retweets: Math.floor(Math.random() * 860),
        });
      }
    },
  },
};
</script>
<style scoped lang="scss">
#timelineCol {
}
#leftColumn {
}
</style>
