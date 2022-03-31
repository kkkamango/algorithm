const sqlite3 = require('sqlite3');
const express = require('express');
const cors = require('cors');
const { response } = require('express');
const app = express();

app.disable('x-powered-by');
app.use(cors());

const PORT = 8000;
let db = new sqlite3.Database( 'database.db', (err) => {
  if (!err) {
    db.run(
      `CREATE TABLE IF NOT EXISTS TBL_ABOUT_MYSELF (NAME TEXT, EMAIL TEXT) 
        UNIQUE(NAME, EMAIL))`,
      (err2) => {
        db.run(
          `INSERT OR IGNORE INTO TBL_ABOUT_MYSELF (NAME, EMAIL) VALUES ('DOPT', 'test@gmail.com')`
        )
      }
    );
  }
});

db.run(
  `CREATE TABLE IF NOT EXISTS TBL_MY_RESUME (DATE DATE, TITLE TEXT, CONTENT TEXT, URL TEXT,
    UNIQUE(DATE, TITLE))`,
    (err2) => {
      if (!err2){
        const resume = [
          {
            date : '1986-01-23',
            title : '출생',
            content : '생일 축하 합니다~!',
            URL : null
          }, {
            date : '2014-04-01',
            title : '개발자로 시작',
            content : '새로운 커리어로 도전',
            URL : null
          }, {
            date : '2021-06-07',
            title : 'github 시작',
            content : '개발 관련 스터디를 위한 github 시작',
            URL : 'https://github.com/kkkamango'
          },          
        ];

        resume.forEach(item => {
          const query = `INSERT OR IGNORE INTO TBL_MY_RESUME 
            (DATE, TITLE, CONTENT, URL) 
            VALUES('${item.date}', '${item.title}', '${item.content}', '${item.URL}')`;
          db.run(qurey);
        });
      }
    }
);

app.listen(PORT, () => {
  console.log(`Listening... ${PORT}`);
});

app.get('/', (req, res, next) => {
  res.json({rsp : 'ok'});
});

app.get('/db/about-me', (req, res, next) => {
  let result = {rsp : 'fail'};

  db.get("SELECT * FROM TBL_ABOUT_MYSELF", (err, row) => {
    if (!err){
      result.data = row;
      db.all('SELECT * FROM TBL_MY_RESUME ORDER BY DATE DESC', (err2, rows) => {
        if (!err2){
          result.rsp = 'ok';
          result.data.resume = rows;
          res.json(result);
        } else {
          res.json(result);
        }
      });
    } else {
      res.json(result);
    }
  });

  db.get("SELECT * FROM TBL_ABOUT_MYSELF", (err, row) => {
    if (!err) {
      result.data = row;
      db.all('SELECT * FROM TBL_MY_RESUME ORDER BY DATE DESC', (err2, rows) => {
        if (!err2){
          result.rsp = 'ok';
          result.data.resume = rows;
          res.json(result);
        } else {
          res.json(result);
        }
      });
    } else {
      res.json(result);
    }
  })
});
