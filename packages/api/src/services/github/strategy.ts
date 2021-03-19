import { serializeUser, deserializeUser } from "passport";
import { Strategy as GithubStrategy } from "passport-github2";

import { User, UserData } from "models/User";

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

const strategyConfig = {
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3001/auth/github/callback",
};

interface GithubProfileDTO {
  id: string;
  profileUrl: string;
  username?: string;
}

const authCallback = async (
  accessToken: string,
  _,
  profile: GithubProfileDTO,
  done
) => {
  try {
    let { username, profileUrl } = profile;
    username = username || profileUrl.split("/").slice(-1)[0];
    const userInfo = { accessToken, username };
    await User.create(userInfo);
    return done(null, userInfo);
  } catch (e) {
    throw new Error(e);
  }
};

serializeUser((user: UserData, done) => done(null, user));
deserializeUser((obj: UserData, done) => done(null, obj));

export default new GithubStrategy(strategyConfig, authCallback);
