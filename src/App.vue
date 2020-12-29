<template>
  <v-app :style="{background: $vuetify.theme.themes[theme].background}" id="main">
    <!-- Overlay for creating tweets -->
    <v-overlay :absolute="absolute" :value="overlay">
      <v-card>
        <v-form @submit.prevent method="post" ref="form">
          <v-card-title>
            <v-text-field
              v-model="user"
              :counter="10"
              label="user"
              required
            ></v-text-field>
            <v-btn color="accent" elevation="2" @click="overlay = false">
              X
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-textarea
              v-model="content"
              :counter="240"
              label="content"
              filled
              name="input-7-4"
              required
            ></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-file-input
              v-model="media"
              hide-input
              show-size
              small-chips
              truncate-length="15"
            ></v-file-input>
            <v-btn class="mr-4" type="submit" @click="sendTweet">
              submit
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-overlay>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <!-- App Options -->
          <v-col cols="12" sm="2">
            <v-sheet id="leftColumn" rounded="lg" min-height="268">
              <v-card height="400" width="256" class="mx-auto">
                <v-navigation-drawer permanent>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="title">
                        The Bird App
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        A Simple Twitter Clone
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list dense nav>
                    <!-- <v-tabs centered class="ml-n9" color="grey darken-1">
                      <v-tab to="/"> Home </v-tab>
                    </v-tabs>
                    <br />
                    <v-tabs centered class="ml-n9" color="grey darken-1">
                      <v-tab to="/profile"> Profile </v-tab>
                    </v-tabs> -->

                    <v-btn
                      elevation="2"
                      outlined
                      rounded
                      x-large
                      @click="toggleTheme"
                      >Theme</v-btn
                    >
                    <v-btn
                      class="newTweet"
                      elevation="2"
                      outlined
                      rounded
                      x-large
                      @click="toggleOverlay"
                      >Tweet</v-btn
                    >
                  </v-list>
                </v-navigation-drawer>
              </v-card>
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
          <!--
          <v-col cols="12" sm="2">
            <v-sheet id="rightColumn" rounded="lg" min-height="268">
                
            </v-sheet>
          </v-col>
          -->
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import router from "./router";
import Vuetify from "vuetify/lib/framework";
import colors from "vuetify/lib/util/colors";
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
        this.overlay = false;
      } else {
        tweetStore.doc().set({
          createdOn: new Date(),
          content: this.content,
          user: this.user,
          media: null,
          likes: Math.floor(Math.random() * 2340),
          retweets: Math.floor(Math.random() * 860),
        });
        this.overlay = false;
      }
    },
    toggleTheme() {
      switch (this.$vuetify.theme.dark) {
        case false:
          this.$vuetify.theme.dark = true;
          break;
        case true:
          this.$vuetify.theme.dark = false;
          break;
      }
    },
    capFirst(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
  },
};
</script>
<style lang="scss">
.theme--light.v-application {
  background: #ffffff;
  color: rgba(0, 0, 0, 0.87);
}
.theme--dark.v-application {
  background: #121212;
  color: #ffffff;
}
</style>
