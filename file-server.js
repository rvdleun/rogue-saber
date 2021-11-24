const express = require('express');
const app = express();
const port = 3110;
const router = express.Router();
const cors = require('cors');

let config = {
  title: "",
  scenes: [],
  sceneJson: {},
  assetPaths: {},
}

app.use(cors());

app.use(express.static(`${__dirname}/dist`));

app.use('/', router);

router.use(express.json({limit: '10000mb'}));
router.use(express.urlencoded({limit: '10000mb', extended: false }));

router.post('/setScenePlayerConfig', (req, res, next) => {
  config = req.body;
  res.send("Ok");
});

let setScenePlayerConfigOK = () => {};

router.get('/getScenePlayerConfig', (req, res, next) => {
  setScenePlayerConfigOK = () => {
    res.send(config);
  };

  process.send("getScenePlayerConfig");
});

router.get('*', (req, res, next) => {
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

app.listen(port);
