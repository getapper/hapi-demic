// HELPERS
import LOG from 'root/helpers/log';

// LIBS
import bcrypt from 'bcrypt';
import aguid from 'aguid';
import JWT from 'jsonwebtoken';
import _ from 'lodash';
import { ObjectID } from 'mongodb';

const plugin = {
  async register (server, {
    authDb,
    jwtSecret,
    expiresIn
  }) {
    const {
      User
    } = server.models;

    const sessionCache = server.cache({
      segment: 'session',
      expiresIn: expiresIn
    });

    const verifyPassword = async (password, cryptedPassword) => bcrypt.compare(password, cryptedPassword);

    const initSession = async (userId) => {
      const session = {
        valid: true,
        id: aguid(),
        exp: new Date().getTime() + expiresIn
      };
      await sessionCache.set({
        id: session.id,
        segment: 'session'
      }, {
        ...session,
        userId
      }, expiresIn);
      return JWT.sign(session, jwtSecret);
    };

    const deleteSession = async (session) => {
      await sessionCache.drop({
        id: session.id,
        segment: 'session'
      });
    };

    const validate = async (decoded, req) => {
      let isValid;
      try {
        const session = await sessionCache.get(decoded.id);
        if (session) {
          isValid = session.valid;
        } else {
          isValid = false;
        }
        if (isValid) {
          const user = new User();
          const userId = authDb === 'mongo' ? new ObjectID(session.userId) : session.userId;
          const exists = await user.getById(userId);
          if (!exists) {
            isValid = false;
          } else {
            req.user = _.omit(user, ['password']);
            req.session = session;
          }
        }
      } catch (e) {
        LOG(e, 1);
        isValid = false;
      } finally {
        return {
          isValid
        };
      }
    };

    const expose = {
      verifyPassword,
      initSession,
      validate,
      deleteSession
    };

    server.decorate('server', 'authManager', expose);
    server.decorate('request', 'authManager', expose);
  },
  name: 'hapi-auth-manager',
  version: '0.0.0'
};

export default {
  plugin
};
