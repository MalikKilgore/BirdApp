import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: colors.lightBlue.lighten3,
        secondary: colors.lightBlue.darken2,
        accent: colors.lightBlue.accent2,
        error: colors.red.accent3,
        background: colors.lightBlue.darken4, 
        info: colors.deepPurple.lighten2,
        success: '#4CAF50',
        warning: '#FFC107'
      },
      dark: {
        primary: colors.indigo.darken1,
        secondary: colors.indigo.darken3,
        accent: colors.indigo.accent2,
        error: colors.red.accent4,
        background: colors.indigo.darken4,
        success: '#4CAF50',
        warning: '#FFC107'
      },
    },
  },
});
