// Set the 'development' environment configuration object
module.exports = {
  sessionSecret: "developmentSessionSecret",
  // Remote URI
  //   dbUri: `mongodb://${process.env.SPUSER || "dbuser"}:${
  //     process.env.SPPASS || "!SP321"
  //   }@ds123603.mlab.com:23603/software-project`,
  // Local URI
  dbUri:
    "mongodb+srv://jad:Rz0zZT2A0vdhYLcU@cluster0.mjyy9.gcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
};
