function simulate() {
  //monitorsub("http://www.kujoichigo.work/", "北斗瑤光");
  var response = UrlFetchApp.fetch("http://www.kujoichigo.work/");
  Logger.log(response);
}

function setWebhook() {
  var telegramUrl = "https://api.telegram.org/bot" + botToken;
  var url = telegramUrl + "/setWebhook?url=" + webAppurl;
  var response = UrlFetchApp.fetch(url);
  Logger.log(response);
}

function getBy(element, name, att, type) {
  //att = "class" / "id" ...
  element = element.getChildren(type);
  var child;
  var childreturn = null;

  for (var x = 0; x < element.length; x++) {

    child = element[x];
    if (child.getAttribute(att).getValue() == name) {

      //Logger.log(child + child.getText());
      childreturn = child;
    }
  }

  return childreturn
}

function selfecho(text) {
  var id = 651615754;
  text = encodeURIComponent(text);
  var response = UrlFetchApp.fetch("https://api.telegram.org/bot" + botToken + "/sendMessage?chat_id=" + id + "&text=" + text);
  //https://api.telegram.org/bot1363036292:AAHuVZ6Qt7XoPqG7zOOFf2MNu9-8NnaqQG8/sendMessage?chat_id=651615754&text=lll\ndd
}

function echo(senderid, text) {
  //var id = 651615754;
  text = encodeURIComponent(text);
  var response = UrlFetchApp.fetch("https://api.telegram.org/bot" + botToken + "/sendMessage?chat_id=" + senderid + "&text=" + text);
  //https://api.telegram.org/bot953394954:AAGk32nHSPMHpJCFYdB7xra39jrMGjqW7Pw/sendMessage?chat_id=651615754&text=This is a self-use bot, not available for others 
}

function myFunction() {
  //for(i=0;i<100;i++){
  var tick = Utilities.formatDate(new Date(), "GMT+8:00", "mm");
  if (tick % 5 == 0) {
    //***************************5min*************************
    monitorsub("https://www.washington.edu/studyabroad/newoptions/", "We will post updates here in the coming weeks.");
    //selfecho(tick);
  }

  if (tick % 15 == 0) {
    //***************************15min*************************
    //monitorsub("http://www.kujoichigo.work/", "北斗瑤光");
    //selfecho(tick);
  }

  if (tick == 0) {
    //***************************60min*************************
    var time = Utilities.formatDate(new Date(), "GMT+8:00", "HH:mm");
    //selfecho("It's " + time + " now. I'm still monitoring! :)");
  }
  /*
  Logger.log(tick);
  tick ++;
  tick = tick%60;
*/
  //selfecho(tick)
  //}
}

function monitorsub(url, text) {

  var page = UrlFetchApp.fetch(url).getContentText();
  //Logger.log(page);
  var time = Utilities.formatDate(new Date(), "GMT+8:00", "dd-HH:mm");

  if (page.indexOf(text) != -1) {
    Logger.log("Have Str");
    //selfecho(url + " has not change." + "     @ " + time);
  }
  else {
    Logger.log("Have no Str");
    selfecho(url + " has changed!" + "     @ " + time);
  }

}



function stat() {
  selfecho("Version 0.0.18 running @ " + Utilities.formatDate(new Date(), "GMT+8:00", "dd-HH:mm"));
}


function doGet(e) {
  return ContentService.createTextOutput("Fuck Google? " + JSON.stringify(e));
}

function doPost(e) {
  var rawData = JSON.parse(e.postData.contents);
  var senderid = rawData.message.from.id;
  var text = rawData.message.text;
  var entity = rawData.message.entities[0];
  var selfid = 651615754

  if (senderid != selfid) {

    echo(senderid, "This is a self-use bot, not available for others.")
  }

  else {

    if (JSON.stringify(entity.type) == '"bot_command"') {

      if (rawData.message.entities.length > 1) {
        echo(senderid, "You send several commands, I will only accept the first one.");
      }

      var cmdlen = entity.length;
      var cmdstat = entity.offset;
      var cmd = text.substring(cmdstat, cmdstat + cmdlen);


      if (cmd == "/stat") {
        stat();
      }
    }
    else {

      selfecho("Not a command.");
    }
  }
}