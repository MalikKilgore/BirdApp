<template>
  <v-lazy
    v-model="isActive"
    :options="{
      threshold: 0.5,
    }"
    transition="fade-transition"
  >
    <v-card class="mx-auto">
      <v-card-title>
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            alt="user avatar"
            src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ user }}</v-list-item-title>
        </v-list-item-content>
      </v-card-title>

      <v-card-text class="headline font-weight-bold">
        {{ content }}
      </v-card-text>
      <v-card-actions>
        <v-list-item class="grow">
          <v-img
            v-if="media"
            max-height="250"
            max-width="350"
            contain
            :src="media"
          ></v-img>

          <v-row align="center" justify="end">
            <v-icon class="mr-1" @click="leaveALike"> mdi-heart </v-icon>
            <span class="subheading mr-2">{{ likes }}</span>
            <span class="mr-1">·</span>
            <v-icon class="mr-1"> mdi-share-variant </v-icon>
            <span class="subheading">{{ retweets }}</span>
          </v-row>
        </v-list-item>
      </v-card-actions>
    </v-card>
  </v-lazy>
</template>

<script>
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'
import { db, tweetStore, storage, storageRef } from "../firebase/firebase";

export default {
  name: "Tweet",
  props: ["content", "likes", "media", "user", "retweets"],
  data: () => ({
    id: null,
    isActive: false,
    //Assign a doc id that can be saved/used to delete Tweets
  }),

  methods: {
    leaveALike() {
      this.likes++;
      //UPDATE IN FIREBASE TOO
    },
    deleteTweet() {},
  },
};
</script>
