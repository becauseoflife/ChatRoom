// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    // API 调用都保持和云函数当前所在环境一致
    env: cloud.DYNAMIC_CURRENT_ENV
})

// 数据库
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()

    let userInfo = event.userinfo
    console.log('userInfo is >>> ', userInfo)



    return {
        event,
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
    }
}