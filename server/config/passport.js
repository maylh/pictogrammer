const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const db = require("../config/db");

// Don't really know how this works yet
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Don't really undesstand how this works yet
passport.deserializeUser(function (id, done) {
  const users = db.collection("Users");

  console.log("Trying to deserialize user with ID:", id);

  users
    .doc(id)
    .get()
    .then((user) => {
      console.log("Found user in Firestore:", user.data());
      done(null, user.data());
    })
    .catch((e) => {
      console.error("Failed to deserialize user. Error:", e);
      done(new Error("Failed to deserialize a user"));
    });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: '624230316202-0jkehu5gufvvi5h798h70ei12tvjf69o.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: "http://localhost:8888/auth/google/callback",
    },
    async (request, accessToken, refreshToken, profile, done) => {
      const users = db.collection("Users");

      const user = await users.doc(profile.id).get();

      if (!user.exists) {
        const new_user = {
          id: profile.id,
          name: profile.id,
          role: false,
        };
        //TODO: Handle errors
        const res = await users.doc(profile.id).set(new_user);
        done(null, new_user);
      } else {
        done(null, user.data());
      }
    }
  )
);
