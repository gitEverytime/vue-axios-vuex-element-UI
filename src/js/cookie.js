export const cookieUtil = {
  set :function(name,value,expires,path,domain,secure){ //设置cookie
    var cookieText=encodeURIComponent(name)+'='+
      encodeURIComponent(value);
    if(expires instanceof Date){
      cookieText+=';expires='+expires.toGMTString();
    }
    if(path){
      cookieText+=';path='+path;
    }
    if(domain){
      cookieText+=';domain='+domain;
    }
    if(secure){
      cookieText+=';secure';
    }
    document.cookie=cookieText;
  },
  get:function(name){                                    //读取cookie
    var cookieName=encodeURIComponent(name)+'=',
      cookieStart=document.cookie.indexOf(cookieName),
      cookieValue=null;
    if(cookieStart>-1){
      var cookieEnd=document.cookie.indexOf(';',cookieStart);
      if(cookieEnd==-1){
        cookieEnd=document.cookie.length;
      }
      cookieValue=decodeURIComponent(document.cookie.substring(cookieStart+cookieName.length,cookieEnd))
    }
    return cookieValue;
  },
  unset:function(name,path,domain,secure){
    this.set(name,'',new Date(0),domain,path)
  },
  setCookieDate:function (day) {                           //设置过期时间
    var date=null;
    if(typeof day=='number'&&day>0){
      date=new Date();
      date.setDate(date.getDate()+day);
    }else{
      throw new Error('!!')
    }
    return date;
  },
  delCookie:function (name) {
    let exp = new Date();
    exp.setTime(exp.getTime() + (-1 * 24 * 60 * 60 * 1000));
    let cval = this.get(name);
    document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
  }
}
