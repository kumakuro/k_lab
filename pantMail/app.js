var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//设置跨域访问
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.post('/postmail', function (req, res) {
  if (!req.body) return res.sendStatus(400);

  var mailObj = {
    email: req.body.email,
    nickname: req.body.nickname,
    title: req.body.title,
    link: req.body.link,
  }

 

  var response = {
    errno: '',
    data: mailObj,
    message: '',
  }


  const params = {
    host: 'smtp.qq.com',
    secureConnection: true,
    post: 465,
    secure: true,
    auth: {
      user: 'XXXXXXXXXX@qq.com',
      pass: 'dgpqvbnteddpbgfe'
    }
  };

  // const params = {
  //   host: 'smtp.163.com',
  //   secureConnection: true,
  //   post: 465,
  //   secure: true,
  //   auth: {
  //     user: 'xxxxxxxx@163.com',
  //     pass: '123qwe'
  //   }
  // };

  console.log('*******************POSTMAIL***********************\n', '邮件信息--->',mailObj,'\n','发送主体---->',params);

  const mailOptions = {
    from: params.auth.user, // sender address
    to: mailObj.email, // list of receivers
    subject: '下载--【' + mailObj.title + '】', // Subject line
    html: '<div>' + mailObj.nickname + '，您好，</div><br>' +
      '<div>【<a href="' + mailObj.link + '">点击下载：' + mailObj.title + '</a>】</div>' ,
    attachments: [{
      filename: 'XXXXXX',
      path: 'http://omxx7cyms.bkt.clouddn.com/contact_qrcode.png',
      cid: '0001'
    }, {
      filename: mailObj.title,
      path: mailObj.link,
    }]
  };

  var transporter = nodemailer.createTransport(params);
  transporter.sendMail(mailOptions, function (error, info) {

    if (error) {
      switch (error.responseCode) {
        case 552:
          console.log('552--->超出邮件大小', error.response);
          response.errno = 99552;
          response.message = '超出邮件限制大小' + error.response;
          break;
        default:
          console.log('default error--->', error);
          response.errno = 99989;
          response.error = error;
          break;
      }

      res.json(response)
    } else {
      console.log('Message sent: ' + info.response);
      response.errno = 0;
      response.message = '发送邮件成功！';
      res.json(response)
    }
  });
})

//配置服务端口
var server = app.listen(3389, function () {

  var host = server.address().address;

  var port = server.address().port;

  console.log('Example app listening at http://%s', host, port);
})
