const express = require("express");
const cors = require("cors");
const webpush = require("web-push");

// Middlewares
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Constantes
let pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/faSvlADaISU:APA91bGxp4NKbI43TUuqepBNQqo5JH9e4KEfbjPXJQthbXAZFFd2rnn-G8Q5d8ynSNmXeykACp3s5KE9T1A6P5sPDfyMIyjrd8DRTACNep5NHlWE_sJST0RjaNTeKzWuQripiS9jhv0o",
  expirationTime: null,
  keys: {
    p256dh:
      "BOPRNTCxTxHeZR4h3Uc8SNBgqgvwnaTh9Z8yO01omtFNE2SFIJYBBQbV2AZMGi5rvVkTGye4emMynwtDpceBVkg",
    auth: "1wLpDj1PjPh9ObjAGuAcKQ",
  },
};

const vapidKeys = {
  publicKey:
    "BM3P1qPU5Lezc6gvx91FCPE9eYtifpcSD_PGfvSlQpoIPwvlVj_kqezyLCMJZHOgngmgCV9bCuJpXLIOfolM07M",
  privateKey: "qheWo1DOFC4R2SF6pUbkuMghP1M0BnN8wPXTOVA779Q",
};

webpush.setVapidDetails(
  "mailto:juan.grajalesu@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// Routes
app.get("/", async (req, res) => {
  const payload = JSON.stringify({
    title: "Título de Notificación",
    message: "Mensaje de la notificación",
  });
  try {
    console.log({ pushSubscription, payload });
    await webpush.sendNotification(pushSubscription, payload);
    await res.send("Enviado");
  } catch (e) {
    console.log(e);
  }
});

app.post("/subscription", (req, res) => {
  pushSubscription = { ...req.body.pushSubscription };
  res.sendStatus(200).json();
});

app.listen(8000, () => console.log("Server listening on port 8000"));
