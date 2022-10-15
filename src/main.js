import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";

const app = createApp(App);

app.provide("isEmailValid", (email, regex) => email.toLowerCase().match(regex));
app.provide("router", (link) => router.push({ name: link }));
app.provide("length", {
  notes: 500,
  email: 50,
  username: 100,
  password: {
    min: 8,
    max: 14,
  },
});
app.provide("json", "application/json");
app.provide(
  "emailRegex",
  "^(?=.{1,50}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$"
);
app.use(router);
app.mount("#app");
