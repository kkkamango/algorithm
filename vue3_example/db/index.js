const sqlite3 = require('sqlite3');
const express = require('express');
const TYPE = require('./type.js');
const get = require('./get.js');
const initial = require('./initial.js');

const cors = require('cors');
// const { response } = require('express');
const app = express();

app.disable('x-powered-by');
app.use(cors());
// 정적파일 저장소, express가 static 파일을 전송
app.use('/assets', express.static('assets'));

const PORT = 8000;
let db = new sqlite3.Database( 'database.db', (err) => {
  if (!err) {
    initial.run(db, TYPE.about_me);
    initial.run(db, TYPE.resume);
    initial.run(db, TYPE.applications);
    initial.run(db, TYPE.notification);
  }
});

app.listen(PORT, () => {
  console.log(`Listening... ${PORT}`);
});

get.setup(app, db);
