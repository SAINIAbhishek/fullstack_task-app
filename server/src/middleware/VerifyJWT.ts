import asyncHandler from 'express-async-handler';
import AuthHelper from '../helpers/AuthHelper';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TOKEN_INFO } from '../config';

const verifyJWT = asyncHandler((req, res) => {
  const token = AuthHelper.getAccessToken(req.headers.authorization); // Express headers are auto converted to lowercase

  const accessTokenPayload = jwt.verify(token, TOKEN_INFO.accessTokenSecret);
  AuthHelper.validateTokenData(<JwtPayload>accessTokenPayload, 'Unauthorized');
});

export default verifyJWT;
