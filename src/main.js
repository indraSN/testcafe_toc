function createConfirmToken(url, email, journalNo, journalTitle) {

    let method = "POST";
    let postData = "{\"email\": \"" + email + "\",\"journalNo\": \"" + journalNo + "\", \"journalTitle\" : \""+ journalTitle + "\"}";
    let async = true;
    let HttpRequest = require("xmlhttprequest").XMLHttpRequest;
    let request = new HttpRequest();

    request.open(method, url, async);
    console.log("break0");
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let token = request.responseText;
            return token;
            console.log("break1");
        }
    }

  console.log("break2");
  request.setRequestHeader("Content-Type", "application/json");
  request.setRequestHeader("Accept", "application/json");
  request.send(postData);
  console.log("break3");
}


createConfirmToken('sprcom-toc-alert-qa.dev.cf.private.springer.com/alerts/api/toc/tokens/unsubscribe', 'testspringer1@gmail.com', 41260, 'Journal of Asset Management')