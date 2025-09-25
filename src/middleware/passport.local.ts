import { prisma } from "config/client";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { comparePassword } from "services/client/user.service";
import { getUserWithRoleById } from "services/client/auth.service";




const configPassportLocal = () => {
    passport.use(new LocalStrategy({
        passReqToCallback: true
    }, async function verify(req, username, password, callback) {
        const { session } = req as any;
        if (session?.message?.length) {
            session.message = [];
        }

        // check user exits in database
        const user = await prisma.user.findUnique({
            where: { username }
        })
        if (!user) {
            // throw new Error(`Username: ${username} not found`);
            return callback(null, false, { message: 'username/password invalid' });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            // throw new Error(`Invalid password`);
            return callback(null, false, { message: 'username/password invalid' });
        }
        return callback(null, user as any)

    }));

    passport.serializeUser(async function (user: any, callback) {
        const { id, username } = user;
        // query to database
        const userInDB = await getUserWithRoleById(id)

        if (!userInDB) {
            return callback(new Error('User not found'), null);
        }

        return callback(null, { ...userInDB });
    });

    passport.deserializeUser(async function (user: any, callback) {
        const userInDB = await getUserWithRoleById(user.id);

        if (!userInDB) {
            return callback(new Error('User not found'), null);
        }

        return callback(null, userInDB);
    });

}

export default configPassportLocal;