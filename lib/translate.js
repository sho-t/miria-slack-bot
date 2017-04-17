export class Translate {

  constructor() {

  }
  
  exec(target) {
    var LANG_JA = "ja";
    var LANG_EN = "en";
    var lang_param = {"ja" : "日本語", "en" : "英語"}

    var first = /^(\S+)\s((?:\s|\S)+)$/
    var convert_lan = first.exec(target)[1]
    var original_lan = (convert_lan == LANG_JA) ? LANG_EN : LANG_JA;
                                  
    var original_msg = first.exec(target)[2]

  }

  trans(text, from , to){
    var convert_msg = LanguageApp.translate(text, from , to); 
    var message = "*" + text + "* は" + lang_param[convert_lan] + "で ";
    message += "```" + convert_msg + "``` って言うらしいですよ :blush:"
  
    return message;
  }
    
}
