const express = require("express");
const app = express();
const port = 3110;
const router = express.Router();
const cors = require("cors");
const fs = require("fs");
const https = require("https");
const mkcert = require("mkcert");
const path = require("path");

const rogueConfig = require("./rogue-config.json");
const useHttps = rogueConfig.useHttps;

(async () => {

if (useHttps) {
  let certificateExists = fs.existsSync(path.join(__dirname, "/node_modules/.cache/rogue-engine-local/server.crt"));

  if (certificateExists) {
    const certificateTtl = 1000 * 60 * 60 * 24;
    const certificateStat = fs.statSync(path.join(__dirname, "/node_modules/.cache/rogue-engine-local/server.crt"));

    const now = new Date();

    // if cert is old, remove it.
    if ((now - certificateStat.ctime) / certificateTtl > 30) {
      fs.unlinkSync(path.join(__dirname, "/node_modules/.cache/rogue-engine-local/server.crt"))

      certificateExists = false;
    }
  }

  if (!certificateExists) {

    const cacheDirExists = fs.existsSync(path.join(__dirname, "/node_modules/.cache"));

    if (!cacheDirExists) {
      fs.mkdirSync(path.join(__dirname, "/node_modules/.cache"));
    }

    const reLocalDirExists = fs.existsSync(path.join(__dirname, "/node_modules/.cache/rogue-engine-local"));

    if (!reLocalDirExists) {
      fs.mkdirSync(path.join(__dirname, "/node_modules/.cache/rogue-engine-local"));
    }

    const ca = await mkcert.createCA({
      organization: "Vortalix",
      countryCode: "UK",
      state: "Merseyside",
      locality: "Liverpool",
      validityDays: 35
    });

    const cert = await mkcert.createCert({
      domains: ["127.0.0.1", "localhost", "192.168.0.*"],
      validityDays: 35,
      caKey: ca.key,
      caCert: ca.cert
    });

    fs.writeFileSync(path.join(__dirname, "/node_modules/.cache/rogue-engine-local/ca.key"), ca.key);
    fs.writeFileSync(path.join(__dirname, "/node_modules/.cache/rogue-engine-local/ca.crt"), ca.cert);
    fs.writeFileSync(path.join(__dirname, "/node_modules/.cache/rogue-engine-local/server.key"), cert.key);
    fs.writeFileSync(path.join(__dirname, "/node_modules/.cache/rogue-engine-local/server.crt"), `${cert.cert}\n${ca.cert}`);
  }
}

let config = {
  title: "",
  scenes: [],
  sceneJson: {},
  assetPaths: {},
}

app.use(cors());

app.use(express.static(`${__dirname}/dist`));

app.use("/", router);

router.use(express.json({limit: "10000mb"}));
router.use(express.urlencoded({limit: "10000mb", extended: false }));

router.post("/setScenePlayerConfig", (req, res, next) => {
  config = req.body;
  res.send("Ok");
});

let setScenePlayerConfigOK = () => {};

router.get("/getScenePlayerConfig", (req, res, next) => {
  setScenePlayerConfigOK = () => {
    res.send(config);
  };

  process.send("getScenePlayerConfig");
});

router.get("*", (req, res, next) => {
  req.url = replaceEscapeCharacters(req.url);
  req.path = replaceEscapeCharacters(req.path);
  // use req.path, instead of req.url, to discard any query parameter (like webpack hashes)
  res.sendFile(`${__dirname}` + req.url);
});

const replaceEscapeCharacters = ( text ) => {
  text = text.replace( '%20', ' ' );
  if( text.includes('%20') )
    return replaceEscapeCharacters( text );
  else
    return text;
}

process.on("message", (message) => {
  if (message === "setScenePlayerConfigOK") {
    setScenePlayerConfigOK();
  }
});

if (useHttps) {
  let privateKey  = fs.readFileSync(path.join(__dirname, "/node_modules/.cache/rogue-engine-local/server.key"), "utf8");
  let certificate = fs.readFileSync(path.join(__dirname, "/node_modules/.cache/rogue-engine-local/server.crt"), "utf8");

  const customKeyPath = path.join(__dirname, "Certificates", "server.key");
  const customCertPath = path.join(__dirname, "Certificates", "server.crt");

  const customKeyExists = fs.existsSync(customKeyPath);
  const customCertExists = fs.existsSync(customCertPath);

  if (customKeyExists && customCertExists) {
    privateKey = fs.readFileSync(customKeyPath, "utf8");
    certificate = fs.readFileSync(customCertPath, "utf8");
  }

  const credentials = {key: privateKey, cert: certificate};

  const server = https.createServer(credentials, app);
  server.listen(port);
} else {
  app.listen(port);
}

})();
