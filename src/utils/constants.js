// 性别
const GENDER = {
  1: '男',
  2: '女'
}
// 家长关系
const RELATION = {
  1: '父亲',
  2: '母亲',
  3: '其他家长'
}
// 角色
const ROLE = {
  0: '老师',
  1: '助教',
  2: '学员',
  4: '巡课',
  5: '课程管理员',
  12: '管理员',
  99: '超级管理员'
}
// 积分来源
const RESOURCE = {
  1: '老师发放',
  2: '完成测评',
  3: '系统赠送'
}
// 房间类型
const ROOMTYPE = {
  0: '一对一',
  3: '一对多'
}
// 学员是否需要密码
const PASSWORDREQUIRED = {
  0: '否',
  1: '是'
}
// 是否允许旁路直播
const ALLOWSIDELINEUSER = {
  0: '否',
  1: '是'
}
// 视频分辨率
const VIDEOTYPE = {
  0: '176x144',
  1: '320x240',
  2: '640x480',
  3: '1280x720',
  4: '1920x1080'
}
// 自动开启音视频
const AUTOOPENAV = {
  0: '不自动开启',
  1: '自动开启'
}
// .h264硬件编码
const VCODEC = {
  0: '不勾选',
  1: '勾选'
}
// 教室布局
const ROOMLAYOUT = {
  1: '视频置顶',
  2: '视频置底',
  3: '视频环绕',
  4: '主讲模式',
  6: '主视频模式',
  7: '纯视频模式',
  51: '常规布局（1V1）',
  52: '主视频布局(1V1)',
  53: '纯视频布局(1V1)'
}

export {
  GENDER,
  RELATION,
  ROLE,
  RESOURCE,
  ROOMTYPE,
  PASSWORDREQUIRED,
  ALLOWSIDELINEUSER,
  VIDEOTYPE,
  AUTOOPENAV,
  VCODEC,
  ROOMLAYOUT
}