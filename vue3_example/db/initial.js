// 각 테이블을 함수로 분리
const TYPE = require('./type.js');

function fn_about_me(db){
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

function fn_resume(db){
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
            db.run(query);
          });
        }
      }
  );
}

function fn_application(db){
  db.run(
    'CREATE TABLE IF NOT EXISTS tbl_applications (id INT, name TEXT , content TEXT, date DATE, platform TEXT, url TEXT, image TEXT, UNIQUE(name, date))',
    (err) => {
      if (!err) {
        const applications = [
          {
            id: 1,
            name: '힘을 찾아런',
            content:
              '아주 간단한 런닝 게임인 "힘을 찾아런"을 소개합니다. 별다른 생각 없이 시간을 죽이기에 적합한 게임입니다. 플레이 제약을 통한 스트레스 없이 무제한으로 즐길 수 있으며, 골드 역시 스트레스 받지 않을정도로 드립니다. 점프 하나로 모험을 떠나고 보스를 물리치세요!',
            date: '2017-07-01',
            platform: 'Android',
            url:
              'https://play.google.com/store/apps/details?id=com.dopt.rfp1&hl=ko&gl=US',
            image: 'http://localhost:8000/assets/runforpower.png',
          },
          {
            id: 2,
            name: 'DongAutoClicker',
            content:
              '게임을 즐기거나 자동화 테스트를 위해 마우스를 정해진 패턴대로 움직이게 할 수 있는 프로그램입니다.',
            date: '2018-10-14',
            platform: 'Windows',
            url: 'https://m.blog.naver.com/armigar/221377064681',
            image: 'http://localhost:8000/assets/dongautoclicker.png',
          },
        ]

        applications.forEach((item) => {
          const query = `INSERT OR IGNORE INTO tbl_applications (id, name, content, date, platform, url, image) VALUES (${item.id}, '${item.name}', '${item.content}', '${item.date}', '${item.platform}' , '${item.url}', '${item.image}')`
          db.run(query)
        })
      }
    }
  )
}

function fn_notification(db) {
  db.run(
    'CREATE TABLE IF NOT EXISTS tbl_notification (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT, expiration DATE, type TEXT)',
    (err) => {
      if (!err) {
        let query = 'DELETE from tbl_notification'
        db.run(query)

        query = `INSERT INTO tbl_notification (content, expiration, type) VALUES ('사이트 공사중입니다. 일부 사용에 제약이 있을 수 있습니다', '2099-12-31', 'warning')`
        db.run(query)
      }
    }
  )
}

module.exports.run = function (db, type){
  if (type == TYPE.about_me){
    fn_about_me(db);
  } else if (type == TYPE.resume){
    fn_resume(db);
  } else if (type == TYPE.applications){
    fn_application(db);
  } else if (type == TYPE.notification){
    fn_notification(db);
  }
}
