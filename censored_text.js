var dummy_txt = "テキストを黒塗りしてツイートするやつ";
var s = "▓";
var th = 0.5;
var kwd = ["名詞","動詞","助動詞","形容詞"];
var mecapi_url = "http://yapi.ta2o.net/apis/mecapi.cgi";

function main(t,fn){
  $.ajax({
    url: mecapi_url,
    type: 'GET',
    dataType: 'JSONP',
    scriptCharset: 'utf-8',
    data: {
      sentence: t,
      response: "surface,pos",
      format: "json"
    }
  })
  .done(function(r){
    fn(getCensored(r));
  });
};

function getCensored(obj){
  var ret = [];
  $.each(obj,function(i,o){
    var sfc = o.surface;
    var pos = o.pos.split(","); 
    if($.inArray(pos[0],kwd)>=0){
      if(Math.random()>th){
        ret.push((function(n){var r = [];for(var i=0;i<n;i++){ r.push(s) };return r.join('')})(sfc.length));
      }else{
        ret.push(sfc);
      }
    }else{
      ret.push(sfc);
    }
  });
  return ret.join('');
};

function tweet(t){
  location.href = "http://twitter.com/home?status="+encodeURI(t)+"&copytype=0";
};

$(function(){
  var params = $.parseQuery();

  if(params.text){
    main(params.text, tweet);
  }else{
    $("#cont").css({width:"30em",height:"5em"}).text(dummy_txt);
    $("#doing").attr('disabled',false).live('click',function(){
      $("#doing").attr('disabled',true);
      main($("#cont").val(), tweet);
    });
  }
});