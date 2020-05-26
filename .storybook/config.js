import { configure } from "@storybook/vue";

import "../src/plugins/vuetify";
import "vuetify/src/styles/main.sass";
import "@mdi/font/css/materialdesignicons.css";

const req = require.context("../src", true, /.stories.(j|t)s$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
