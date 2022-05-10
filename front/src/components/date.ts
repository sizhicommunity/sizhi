// var minute = 1000 * 60;
// var hour = minute * 60;
// var day = hour * 24;

// 计算时间差
export function handleDate(dateTimeStamp:number) :string{
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
  var result = '';
  var now = new Date().getTime();
  var diffValue = now - dateTimeStamp;
 
  if (diffValue < 0) {
    console.log('时间不对劲,服务器创建时间与当前时间不同步');
    return (result = '刚刚');
  }
  var dayC = diffValue / day;
  var hourC = diffValue / hour;
  var minC = diffValue / minute;
  if (parseInt(dayC+"") > 30) {
    result = '' + formatDate(new Date(dateTimeStamp), 'yyyy-MM-dd');
  } else if (parseInt(dayC + '') > 1) {
    result = '' + parseInt(dayC + '') + '天前';
  } else if (parseInt(dayC + '') == 1) {
    result = '昨天';
  } else if (hourC >= 1) {
    result = '' + parseInt(hourC + '') + '小时前';
  } else if (minC >= 5) {
    result = '' + parseInt(minC + '') + '分钟前';
  } else result = '刚刚';
  return result;
}
/**
 * 格式化时间
 * @param date Date 时间
 * @param format 格式化 "yyyy-MM-dd hh:mm:ss www"=format
 * @returns {string} 格式化后字符串
 */

export function formatDate(date:Date, format:string):string {
  // if (typeof date == 'string') {
  //   if (date.indexOf('T') >= 0) {
  //     date = date.replace('T', ' ');
  //   }
  //   date = new Date(Date.parse(date.replace(/-/g, '/')));
  // }
  var o :any= {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
  };
  var w = [
    ['日', '一', '二', '三', '四', '五', '六'],
    ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  ];
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length),
    );
  }
  if (/(w+)/.test(format)) {
    format = format.replace(RegExp.$1, w[RegExp.$1.length - 1][date.getDay()]);
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length),
      );
    }
  }
  return format;
}
