let poem = ''
let checkingAPIeventID = null
let loadingPercent = 0

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyCibkQ4NCKfrTcfJz-1Cb1SgIBopsmJRpg",
  authDomain: "poesiaai.firebaseapp.com",
  projectId: "poesiaai",
});

var db = firebase.firestore();


let output = document.getElementById("poemoutput")
let input = document.getElementById("poeminput")
let spinner = document.getElementById("spinner")
let loadingElement = document.getElementById("loading")
let loadingbarElement = document.getElementById("loadingbar")

function cleanPoem(poem){
    console.log(poem)
    // poem = poem.replace("PA:","").replace("RE:","").replace("pa:","").replace("re:","").replace("#","").replace("\n\n","\n").replace(",",",\n").replace(".",".\n").replace("\\","\n")
    // poem = poem.replace("re:","").replace("\N","\n").replace("\\n","\n").replace(",","\n").replace(".","\n")
    // poem = poem.replace("\\","\n").replace('\"','\n').replace(' \'','\n')

   
    poem = poem.replace("re:","")
    poem = poem.replace("\N","\n")
    poem = poem.replace("\\n","\n")
    poem = poem.replace(",","\n")
    poem = poem.replace(".","\n")
    poem = poem.replace(";","\n")
    poem = poem.replace("\\","\n")
    poem = poem.replace(/\\\//g, '\n')
    // poem = poem.replace( \,'\n')
    poem = poem.split(",").join(",\n")
    poem = poem.split(".").join(".\n")
    poem = poem.split("\/").join("\n")
    poem = poem.replace(/\\\//g, '\n')
    poem = poem.replace(/\\/g, '\n')
    // console.log("---",poem)
    lines = poem.split("\n").slice(0, 10).join("\n")
    return lines
}

function FirstRequestToGraph(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
          },
          body: data 
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(json) {
        return json
    })
    .catch(function(err) {
        console.log(`Error: ${err}`)
    });
}

function savePoem(title, poem, language){
  db.collection("poemas").add({
    poem: poem,
    title: title,
    language: language
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });

}

function loadingBarMove(percent) {
  loadingElement.style.display = "block"
  if (percent >= 100) {
    clearInterval(checkingAPIeventID);
    loadingElement.style.display = "none"
  } else {
    percent+=10; 
    loadingbarElement.style.width = percent + '%'; 
  }
}

function loadingModel(){
  loadingPercent += 10
  loadingBarMove(loadingPercent)
  generatePoem()
}

function generatePoem(){
    spinner.style.visibility = "hidden"
    
    initText=''

    let url__ = location.href
    let url_array = url__.split(".")
    let url_length = url_array.length

    let urlAPI = "https://poems.asst.workers.dev"
    var browserLanguage = navigator.language
    // if (browserLanguage.split("-")[0] == "es"){
    if (url_array[url_length-2] == "es"){
        urlAPI = urlAPI + '/?language=es'
        initText = "un lugar, metaverso"
      } else {
        urlAPI = urlAPI + '/?language=en'
        initText = "one place, metaverse"
      }

      if (input.value === '') {
        poem=initText
      } else {
        poem=input.value
      }
    
    console.log(poem)
    FirstRequestToGraph(urlAPI,poem)
      .then(data => {
          console.log(data, checkingAPIeventID)
          if("error" in data && !checkingAPIeventID) {
            checkingAPIeventID = setInterval(loadingModel, 1000)
            console.log(data)
            return
          }else{
            clearInterval(checkingAPIeventID)
            loadingElement.style.display = "none"
            loadingPercent = 0
          }
          toShow = data[0].generated_text
          output.innerText = cleanPoem(toShow.slice(0, toShow.length))
          
          if (input.value !=""){
            savePoem(input.value ,toShow,browserLanguage.split("-")[0])
          }
          
          spinner.style.visibility = "hidden"
        // console.log(toShow); // JSON data parsed by `data.json()` call
      });
}

function generate(element){
  if(event.key === 'Enter') {
    generatePoem()    
  }
}

generatePoem()

input = document.getElementById('poeminput');
input.focus();
input.select();