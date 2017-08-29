function getXhrObject(){
  // ### Construction de l’objet XMLHttpRequest selon le type de navigateur
  if(window.XMLHttpRequest){
    return new XMLHttpRequest();
  }	else if(window.ActiveXObject) {
    return new ActiveXObject("Microsoft.XMLHTTP");
  } else {
    // XMLHttpRequest non supporté par le navigateur
    console.log("Votre navigateur ne supporte pas les objets XMLHTTPRequest...");
    return;
  }
}

function Request(args){
  if(args.url){
    this.target = args.target;
    this.url = args.url;
  }
  if(args.method){
    this.method = args.method;
  } else {
    this.method = "GET";
  }
  if(args.json || args.json===false){
    this.json = args.json;
  } else {
    this.json = true;
  }
  if(args.callback){
    this.callback = args.callback;
  }
  if(args.target){
    this.target = args.target;
  }
  if(args.data){
    this.data = args.data;
  } else if(args.formData){
    this.formData = args.formData;
  }
  this.additionnalData = args.additionnalData;
  this.xhr = getXhrObject();
}

Request.prototype.open = function(){
  var self = this;
  this.xhr.open(this.method, this.url, true);
  this.opened = true;
  this.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  this.xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  this.xhr.onreadystatechange = function() {
    if(this.readyState === 4 && this.status === 200) {
      var response = this.responseText;
      self.success = true;
      if(typeof self.callback === "function") {
        self.callback(response);
      } else {
        console.log("Response successfull but no callback");
      }
    }
  }
  return this;
}

Request.prototype.send = function(){
  if(!this.opened){
    console.warn("Objet XHR ouvert automatiquement");
    this.open();
  }

  //Si données en string ou en json
  // if(this.data){
    var data = "";
    if(this.data && this.json){
      console.log(this.data);
      data = "json="+JSON.stringify(this.data);
    } else {
      console.log(typeof this.data);
      if(this.data && typeof this.data === "string"){
        data = this.data;
      }
    }

  this.xhr.send(data);
  return this;
}
