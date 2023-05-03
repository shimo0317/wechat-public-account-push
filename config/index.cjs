/* eslint-disable */

/**
 * 此项目配置为方便新人使用，已缩减至最简配置。
 * 如若想使用更多功能，请查考文档中的 【3. config参数说明】 
 * 自行添加属性，以支持更多个性化功能
 */
const USER_CONFIG = {

  // 使用微信测试号：公众号APP_ID
  APP_ID: 'wx8b8810bb2fb0ffd5',

  // 使用微信测试号：公众号APP_SECRET
  APP_SECRET: 'ab67721c32519b1942c27f0ca1e9e57a',

  PROVINCE: '浙江',
  CITY: '龙泉',

  USERS: [
    {
      // 想要发送的人的名字
      name: '宝贝',
      // 使用微信测试号：扫码关注你的微信测试号后生成的一段字符串，在测试号后台能看到
      id: 'olZu46DoCO6KXoZll0jIjJGpkip4',
      // 使用微信测试号：你想对他发送的模板消息的模板ID
      useTemplateId: 'O4ryO-AryCB7wgYtxljVaD9Z-QBOOrPFWtfr8HiMneg',
      // 新历生日, 仅用作获取星座运势, 格式必须为MM-DD
      horoscopeDate: '01-27',
      festivals: [
        // 注意：此条配置日期为阴历日期，因为`type`中 “生日” 之前有 * 符号
        {
          type: '生日', name: '我', year: '2000', date: '03-17',
        },
        // 注意：此条配置日期为阳历日期，因为`type`中 “生日” 之前没有 * 符号
        {
          type: '生日', name: '你', year: '2001', date: '01-27',
        },
        {
          type: '节日', name: '相遇', year: '2023', date: '02-19',
        },
      ],
      // 我们在一起已经有xxxx天了的配置
      customizedDateList: [
        // 在一起的日子
        { keyword: 'love_day', date: '2023-02-19' },
        // 结婚纪念日
        { keyword: 'marry_day', date: '2022-09-09' },
      ],
    },
  ],
/**
 * 获取随机颜色
 * @returns
 */
export const getColor = () => {
  if (config.IS_SHOW_COLOR === false) {
    return undefined
  }
  return `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0')}`
}

/**
 * 生成一个从min 到 max 的随机数
 * @param {*} min
 * @param {*} max
 * @returns
 */
export const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

/**
 * 对生日时间倒计时进行排序
 * @param {*} list
 * @returns
 */
export const sortBirthdayTime = (list) => {
  list = cloneDeep(list)
  list.forEach((item) => {
    const { type } = item
    item.useLunar = /^\*/.test(type)
    item.type = (type || '').replace(/^\*/, '')
    if (item.useLunar) {
      let yearOffset = -1
      let diffDay = -1
      do {
        const [month, day] = item.date.split('-')
        const lunar = Lunar.fromYmd(selfDayjs().year() + yearOffset, Number(month), Number(day))
        const solar = lunar.getSolar()
        diffDay = Math.ceil(selfDayjs(`${solar.getYear()}-${solar.getMonth()}-${solar.getDay()}`).diff(selfDayjs(), 'day', true))
        yearOffset++
      } while (diffDay < 0)
      item.diffDay = diffDay
    } else {
      const diffDay = Math.ceil(selfDayjs(`${selfDayjs().format('YYYY')}-${item.date}`).diff(selfDayjs(), 'day', true))
      if (diffDay >= 0) {
        item.diffDay = diffDay
      } else {
        item.diffDay = Math.ceil(selfDayjs(`${selfDayjs().add(1, 'year').format('YYYY')}-${item.date}`).diff(selfDayjs(), 'day', true))
      }
    }
  })
  return list.sort((a, b) => (a.diffDay > b.diffDay ? 1 : -1))
}

/**
 * 根据月日获取星座信息
 * @param {string} date
 * @returns
 */
export const getConstellation = (date) => {
  const year = selfDayjs().year()
  const constellationCn = ['白羊', '金牛', '双子', '巨蟹', '狮子', '处女', '天秤', '天蝎', '射手', '摩羯', '水瓶', '双鱼']
  const constellationEn = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
  const [month, day] = date.split('-').map(Number)
  const solar = Solar.fromYmd(year, month, day)
  const cn = solar.getXingZuo()
  return {
    cn,
    en: constellationEn[constellationCn.indexOf(cn)],
  }
}


  // 【推送完成提醒】模板id, 用来看自己有没有发送成功的那个模板
  CALLBACK_TEMPLATE_ID: '',

  CALLBACK_USERS: [
    {
      name: '自己',
      // 使用微信测试号：自己的微信id，扫码关注你的微信测试号后生成的一段字符串，在测试号后台能看到
      id: '',
    }
  ],

}

module.exports = USER_CONFIG

