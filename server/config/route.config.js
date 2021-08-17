import JwtPassport from "passport-jwt";

// Database Model
import { UserModel } from "../database/user";

const JWTStratergy = JwtPassport.Strategy;
const ExtractJwt = JwtPassport.ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "ZomatoAPP", //should be same as in database/user/index.js->line 19
};

export default (passport) => {
  passport.use(
    new JWTStratergy(options, async (jwt__payload, done) => { //jwt-payload->data
      try {
        const doesUserExist = UserModel.findById(jwt__payload.user);
        if (!doesUserExist) return done(null, false);

        return done(null, doesUserExist);
      } catch (error) {
        throw new Error(error);
      }
    })
  );
};
