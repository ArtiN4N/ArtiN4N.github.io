class asciiArt {
  static ship = "<pre class='ascii'>                                                   █</pre><pre class='ascii'>                                                   ▌</pre><pre class='ascii'>                                               .▄█████████╩</pre><pre class='ascii'>                                           ╗█████████████</pre><pre class='ascii'>                                          ██████████████</pre><pre class='ascii'>                                         ██████████████─</pre><pre class='ascii'>                                        ███████████████</pre><pre class='ascii'>                                       ▐███████████████</pre><pre class='ascii'>                                       █████████████████</pre><pre class='ascii'>                                       █████████████████</pre><pre class='ascii'>                                       ██████████████▌╞██</pre><pre class='ascii'>                                  █    ███████████████▀█▐▒</pre><pre class='ascii'>                                  █  ,z'██████████████%█▀█</pre><pre class='ascii'>                                  ███ë    └   ╝████████▐█b█</pre><pre class='ascii'>,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,, ██████▒. ▄▄, █▌╬█▌,.╠▄█████,,,,,,,,,,,,,,,,,,,</pre><pre class='ascii'>║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║███████████████████████████╣║║║║║║║║║║║║║║║║║║</pre><pre class='ascii'>║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║Ñ█████████████████████████▀║║║║║║║║║║║║║║║║║║║</pre><pre class='ascii'>║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║╫Ñ║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║</pre><pre class='ascii'>║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║</pre><pre class='ascii'>║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║║</pre> "
  constructor(name) {
    this.name = name;
  }
  get text() {
    return this.findText(this.name);
  }
  findText() {
    
  }
}

function replaceAscii(asciiName) {

}

var asciiShip;
let navigator = new FileNavigator(asciiShip);
let updateToHtml = [];
navigator.readSomeLines(0, function (err, index, lines, isEof, progress) {updateToHtml = lines;});

for (int i = 0; i < updateToHtml.size(); i++) {
  let newElement = document.createElement("p");
  newElement.innerHTML = "CONTENTS";
  document.getElementById("ID").appendChild(newElement);
}

