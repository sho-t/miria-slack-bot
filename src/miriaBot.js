/**
 * miria response function
 * @param {Array} e
 * @return {void}
 */
function doPost(e) {
  // set bot_param
  var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
  var bot_icon = PropertiesService.getScriptProperties().getProperty('SLACK_BOT_ICON');
  var bot_name = 'みりあママ';

  var trigger_word0 = /^ママーーー！$/;
  var trigger_word = /^@mmm\s(\S+)\s((?:\s|\S)+)$/;

  var func = ['cmd', 'trans', 'cod', 'wiki'];
  var text, user, message;
  var mama = {};

  /*
  みりあがコマンド調べるよ
  */
  mama.cmd = function(cmd) {
    var url = 'http://webkaru.net/linux/' + cmd + '-command/';
    var trMatch;
    var optArray = [];
    var COMMAND = {};

    var explanRegexp = /<p>([\s\S]*?)コマンドです。<\/p>/
    var optionTrRegexp = /^<tr>([\s\S]*?)<\/tr>/gm
    var optionRegexp = /<td>([\s\S]*?)<\/td>/gm
    var formatRegecp = new RegExp(cmd +  '\\s\\[.+\\]');

    try{
      var response = UrlFetchApp.fetch(url);
    }catch(e) {
      return message = (cmd == 'tnk') ?
      user + ' ごめんなさい。。 `' + cmd + '` は知らないです。:cry: なんだか変な名前ですね :neutral_face:' :
      user + ' ごめんなさい。。 `' + cmd + '` はわかんないです。:cry:';
    }

    var html = response.getContentText();
    var explan = explanRegexp.exec(html)[1];
    var format = formatRegecp.exec(html)[0];

    while (trMatch = optionTrRegexp.exec(html)) {
      var optMap = {};
      optMap.name = optionRegexp.exec(trMatch)[1];
      optMap.exlan = optionRegexp.exec(trMatch)[1];
      optionRegexp.lastIndex = 0;
      optArray.push(optMap);
    }

    COMMAND.explan = explan;
    COMMAND.format = format;
    COMMAND.option = optArray;

    return formatCmdMsg(COMMAND);
  };

  /*
  みりあがほんやくするよ！
  */
  mama.trans = function(target) {
    var LANG_JA = "ja";
    var LANG_EN = "en";
    var lang_param = {"ja" : "日本語", "en" : "英語"}

    var first = /^(\S+)\s((?:\s|\S)+)$/
    var convert_lan = first.exec(target)[1]
    var original_lan = (convert_lan == LANG_JA) ? LANG_EN : LANG_JA;
                                  
    var original_msg = first.exec(target)[2]

    var convert_msg = LanguageApp.translate(original_msg, original_lan , convert_lan ); 
 
    var message = "*" + original_msg + "* は" + lang_param[convert_lan] + "で ";
    message += "```" + convert_msg + "``` って言うらしいですよ :blush:"
  
    return message;
  }
  
  /*
  みりあがcodicで調べるよ！
  */
  mama.cod = function(args) {
   var codRegexep = /^ *-([cCsShf]+)\s*((?:\s|\S)+)$/,
        helpRegexep = /^\s*-help\s*$/,
        casingMap = {
          "c" : "camel" ,
          "C" : "pascal",
          "s" : "lower underscore",
          "S" : "upper underscore",
          "h" : "hyphen"};

   if (helpRegexep.test(args)) return codicHelp();

    var afterArgs = codRegexep.exec(args) || [2];
    var option = afterArgs[1] || "s";
    var target = afterArgs[2] || args;
    
    option = option.replace(/f/g, "");

    var token = PropertiesService.getScriptProperties().getProperty('CODIC_TOKEN');
    var formData = {
     'text': target,
     'casing' : casingMap[option]
    };

    var apiUrl = 'https://api.codic.jp',
        extUrl = '/v1/engine/translate.json',
        headers = {Authorization : 'Bearer ' + token , charset : 'UTF-8'},
        params ={method : 'post', headers: headers , payload : formData};

    var res = UrlFetchApp.fetch(apiUrl + extUrl , params);
    var job = JSON.parse(res)[0];

    var message = "*" + target  + "* は ";
    message += "```" + job.translated_text + "``` って言うらしいですよ :hushed:";

    return message;
  }

  /*
  みりあがwikiってあげる！
  */
  mama.wiki = function(target) {
    var url = "http://wikipedia.simpleapi.net/api?keyword="+ target +"&output=json";
    var body = "";
    // JSONデータを取得
    var json = UrlFetchApp.fetch(url).getContentText();
    var jsonData = JSON.parse(json);

    if(jsonData == null || jsonData[0] == null
                      || jsonData[0]["body"] == null){
      return  "`" + target + "` はwikiれなかったです。:disappointed:";
    }else{
      body =  "```" + jsonData[0]["body"] +  "```";
    }

    var message = "`" + target + "` について調べましたよ。(﹡ˆ﹀ˆ﹡)♡ \n";
    message += "https://ja.wikipedia.org/wiki/" + target + "\n";
    message += body;

    return message;
  };

  // create instance
  var app = SlackApp.create(token);

  // set post parameter
  text = e.parameter.text;
  user = '@' + e.parameter.user_name;

  if(trigger_word0.test(text)) {
    // nomal response
    message = user + ' はい！ママですよ、どうしたのかな:flushed::sweat_drops:';

  } else if (trigger_word.test(text)) {
    // func response
    var funcValues = trigger_word.exec(text);
    var funcName = funcValues[1];
    var funcOption = funcValues[2];

    message = mama[funcName](funcOption);
  } else {
    // another response
    message = user + ' ごめんなさい。。上手く聞き取れませんでした:cry: \n';
    message += 'ご用がある時は `@mmm [引数] [option]` でお仕事しますよ :yum:';
  }

  return app.postMessage(e.parameter.channel_id, message, {
    username: bot_name,
    icon_url: bot_icon,
  });
}

/**
 * format cmd search result message
 * @param {String} command
 * @return {String}
 */
function formatCmdMsg(command) {
  var expalnMsg = "コマンドですよ。:relieved:\n",
      resMsg = '',
      optTemp = '',
      pre = '```';

  resMsg += command.explan + expalnMsg;
  resMsg += '・書式\n';
  resMsg += pre + command.format + pre;

  if (command.format) {
    command.option.forEach(function(value) {
        optTemp += value.name + '\t' + value.exlan + '\n';
    });
    resMsg += '\n・オプション\n';
    resMsg += pre + optTemp + pre;
  }
 return resMsg;
}

/**
 * Return codic help message
 * @return {String} message
 */
function codicHelp() {
  var pre = '```';
  var message = '`@mmm cod [引数] [文字列]` でcodicで命名検索しますよ :innocent: \n';
  message += '・引数\n' + pre;
  message += '-c \t camelCase\n';
  message += '-C \t CamelCase\n';
  message += '-s \t snake_case\n';
  message += '-S \t SNAKE_CASE\n';
  message += '-help \t show help\n' + pre;

  return message;
}
