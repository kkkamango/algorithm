// 데이터 베이스를 조회
module.exports.setup = function(app, db){
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
  });

  app.get('/db/applications', (req, res, next) => {
    let result = {
      rsp: 'fail',
    }
    db.all('SELECT * FROM tbl_applications ORDER BY date desc', (err, rows) => {
      if (!err) {
        result.rsp = 'ok'
        result.data = rows
        res.json(result)
      } else {
        res.json(result)
      }
    })
  })

  app.get('/db/notification/:id', (req, res, next) => {
    let result = {
      rsp: 'fail',
    }
    db.get(
      `SELECT * FROM tbl_notification WHERE expiration > date('now') AND id > ${req.params.id} ORDER BY id desc`,
      (err, row) => {
        if (!err) {
          result.rsp = !row ? 'nodata' : 'ok'
          if (row) {
            result.data = row
          }
          res.json(result)
        } else {
          result.error = err.message
          res.json(result)
        }
      }
    )
  })

  app.get('/db/notifications/', (req, res, next) => {
    let result = {
      rsp: 'fail',
    }
    db.all(`SELECT * FROM tbl_notification`, (err, rows) => {
      if (!err) {
        result.rsp = 'ok'
        result.data = rows
        res.json(result)
      } else {
        result.error = err.message
        res.json(result)
      }
    })
  })

  app.get('/db/blog', (req, res, next) => {
    let result = {
      rsp: 'fail',
    }
    db.all(`SELECT * FROM tbl_blog order by id desc`, (err, rows) => {
      if (!err) {
        result.rsp = 'ok'
        result.data = rows
        res.json(result)
      } else {
        result.error = err.message
        res.json(result)
      }
    })
  })

  // 테스트용
  app.get('/db/accounts', (req, res, next) => {
    let result = {
      rsp: 'fail',
    }
    db.all('SELECT * FROM tbl_accounts', (err, rows) => {
      return res.json({
        rsp: 'ok',
        data: rows,
      })
    })
  })
}
