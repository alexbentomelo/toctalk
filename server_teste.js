"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const Smooch = require("smooch-core");
var firebase = require("firebase/app");

require("firebase/auth");
require("firebase/database");

var firebase = require("firebase");

var firebaseConfig = {
  apiKey: "AIzaSyD1gT2f6TezM8T_Vu4Fp1uYKiSOJfCsNzg",
  authDomain: "react-slack-clone-df725.firebaseapp.com",
  databaseURL: "https://react-slack-clone-df725.firebaseio.com",
  projectId: "react-slack-clone-df725",
  storageBucket: "react-slack-clone-df725.appspot.com",
  messagingSenderId: "22109239962",
  appId: "1:22109239962:web:40b2f9dfbe2c62fa"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

var ref = database.ref("messages");
var channel = database.ref("channels");

const smooch = new Smooch({
  keyId: "app_5d237f90c15d720011fc7ca6",
  secret:
    "Xty06UbJcK4xeWAPIWodItG4njn6lOdDI7NQdr-KU4rji7h9j5hS1vP0ws1qYeES32-q_C8_jkEW8aX5Ih7MDg",
  scope: "app"
});

const app = express();
app.use(bodyParser.json());

app.post("/facebook_msgs", function(req, res) {
  //console.log("Webhook PAYLOAD:\n", JSON.stringify(req.body, null, 4));
  //res.send({ express: JSON.stringify(req.body, null, 4) });
  var data = req.body.messages[0];
  console.log("Webhook PAYLOAD0:\n", data);

  var appUserId = req.body.appUser._id;
  //var usersRef = ref.child(req.body.conversation._id).child(appUserId);

  if (data.type !== "text") {
    var datacontent = "";
  } else {
    var datacontent = data.text;
  }
  var channelRef = channel.child(appUserId);
  channelRef.set({
    createdBy: {
      avatar: "",
      name: data.name
    },
    details:
      "Canal Externo Facebook, conversationID: " + req.body.conversation._id,
    id: appUserId,
    name: "Facebook: " + data.name
  });

  var usersRef = ref.child(appUserId);
  usersRef.push().set({
    timestamp: firebase.database.ServerValue.TIMESTAMP,
    content: datacontent,
    user: {
      id: data.authorId,
      name: data.name,
      avatar: ""
    }
  });

  var channel_msg_new = [];
  var old_content = "";
  usersRef.on("child_added", function(snap) {
    if (snap.val().user.avatar != "") {
      channel_msg_new.push(snap.val());
      if (snap.val().content != old_content) {
        smooch.appUsers
          .sendMessage(appUserId, {
            type: "text",
            text: snap.val().content,
            role: "appMaker"
          })
          .then(response => {
            // console.log("API RESPONSE:\n", response);
            res.end();
          })
          .catch(err => {
            // console.log("API ERROR:\n", err);
            res.end();
          });
        old_content = snap.val().content;
      }
      channel_msg_new = [];
    }
  });

  /* if (req.body.trigger === "message:appUser") {
    smooch.appUsers
      .sendMessage(appUserId, {
        type: "text",
        text: snap.val().content,
        role: "appMaker"
      })
      .then(response => {
        res.end();
      })
      .catch(err => {
        res.end();
      });
  }*/
});

app.listen(8000, () => {
  console.log(`App listening on port 8000/facebook_msgs`);
});
