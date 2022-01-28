

function template(linea){

  return ` <div class="w3-twothird ">
  <h1 class="w3-padding  date">` + linea.fecha + `</h1>
  <a href="`+linea.link +`" target="_blank"> 
  <p class="w3-padding  press_title">` + linea.encabezado + `</p>
  </a>
  </div>
  <div class="w3-third w3-padding ">
  <img src="`+linea.image +`" style="width:50%;height:50%;">
  </div>
  `
  
   }
   
   
function show_news(data){

  var lines=data.split("\n");

  var result = [];

  var headers=lines[0].split("\t");

  for(var i=1;i<lines.length;i++){

      var obj = {};
      var currentline=lines[i].split("\t");

      for(var j=0;j<headers.length;j++){
        console.log(currentline[j])
          obj[headers[j]] = currentline[j].replace("\r",'');
      }

      result.push(obj);

  }

var elemcnt = document.getElementById("#news")
for(var i=0;i<result.length;i++){

    elemcnt.innerHTML += template(result[i])
  }
  console.log(result)
}
   
function load_news(){

  let url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTk58v50HLpkVS5-VfQMeTDRPIBgEbDCk6-6Np2ZwKKx15_MpGZFaQXxmfuvzWnADDl3QCdD9103F3P/pub?output=tsv"
  fetch(url)
  .then(response => response.text())
  .then(data => show_news(data) );

}

console.log(load_news())