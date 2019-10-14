
# 本地
node app.js



# 服务器
在linux上装pm2+nodejs

+ pm2 start app.js 即可运行这个服务
+ pm2 restart 0 0为当前服务的id
+ pm2 list 查看当前pm2服务列表
+ pm2 log 查看服务日志