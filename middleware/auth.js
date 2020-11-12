
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const config = require("../config/dev");

exports.authJwt = jwt({
        // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint.
        secret: jwksRsa.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `https://yan-web.eu.auth0.com/.well-known/jwks.json`
        }),
      
        // Validate the audience and the issuer.
        audience: 'https://yan-web.eu.auth0.com/api/v2/',
        issuer: 'https://yan-web.eu.auth0.com/',
        algorithms: [ 'RS256' ]
      });

 exports.checkRole = role => (req, res, next) => {
    const user = req.user;
    const access =  user[config.AUTH0_NAMESPACE + '/roles'].includes(role);
    if(user && access){
      next();
    }else{
      return res.status(401).send("You aer not access rights for this action!");
    }
 }     
