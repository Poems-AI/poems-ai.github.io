
var zoom = 20;
var position = [51.505, -0.09];
var pointer = null;
var widget = document.getElementById("widget")
var bound1,bound2 = []

var poem = `
A gram of Ethereum falls on the floor 
of a restroom in an art gallery in New York,
Two friends discuss the DAOs 
in a backyard on Kent Avenue,
Elon Musk tweets about fossil fuels 
and my roommate loses thousands of dollars,

Mint me, turn me into something unique,
Token me again and 
give out my little bits to engineers,
Hyper put me in an infinite sequence 
until it overloads,

We are trying to discover 
the deformed mask that hides scammers 
of this non-religion 
whose gods are being invoked 
in real time and live streaming,

What if we are the scammers?
What if this is just an inflated balloon between us?

The fathers are Sathoshi Nakamoto
We continue
distributing helium amongst mortals

Minotaurs that don’t have to learn to way back,
Now they drive horse-drawn 
carriages without fear of getting burnt, 
creating the legend’s code,
constructing the primary material 
with which new realities are written,

Meanwhile,
the artists think that only creativity 
protects purity,
the main reason for creating the piece of art,
this idea spreads like a fine film 
over this level of impertinent reality
like Hephaestus’s net over 
the unfaithful Ares,

The rest will be mud and sand,
blood and guts,
broken glass put back together 
without shine or rhyme,

Let’s get out of this binary logic!
Let’s reach towards a new level of reason!
Let’s debate until we arrive 
at something that isn’t either of us, 
something that is found out of this world, 
but affects this world,

The terrifying hybrid because it’s unknown 
will be the next evolutionary step

Mint me, turn me into something unique,
Token me again 
and give out my little bits to engineers,
Hyper put me in an infinite sequence 
until it overloads




`

// var grayscale = L.tileLayer(mapboxUrl, {id: 'MapID', tileSize: 512, zoomOffset: -1, attribution: mapboxAttribution});



var map = L.map('map').setView(position, zoom); 


// var mymap = L.tileLayer('https://tile.jawg.io/57edef43-19ba-4c3b-837c-37038a3659ac/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
// 	attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// 	minZoom: 0,
// 	maxZoom: 22,
// 	subdomains: 'abcd',
// 	accessToken: 'm9lpIChVnMzST5AL590p4exXv8yC5yKpFdUJJNfCkAIgEjMpsLS5JERPP0LzZXQo'
// }).addTo(map);

var mymap =  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
}).addTo(map);

// var mymap = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
// 	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// 	subdomains: 'abcd',
// 	minZoom: 10,
// 	maxZoom: 20,
// 	ext: 'png'
// }).addTo(map);


// L.marker([51.5, -0.09]).addTo(map)
//     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
//     .openPopup();


function setup(data){
    
    // xSize = 0.00015
    // ySize = 0.0002
    xSize = 0.00007
    ySize = 0.0001
    position = [data.coords.latitude,data.coords.longitude]

    map.panTo(new L.LatLng(position[0],position[1]));

    // L.marker(position).addTo(map)
    // .bindPopup(poem)
    // .openPopup();

    // new L.Marker(position, {
    //     icon: new L.DivIcon({
    //         className: 'my-div-icon',
    //         html: '<div class="poem">📜</div>'
    //     })
    // }).addTo(map)
    // .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    // .openPopup();

    bound1 = [position[0] - xSize/2 ,position[1] - ySize/2]
    bound2 = [position[0] + xSize/2 ,position[1] + ySize/2]
    
    L.rectangle([bound2,bound1], {color: "#FFFFFF", weight: 1}).addTo(map);

    pointer = L.circleMarker(position,{color: "#AAAAFF", radius: 20}).addTo(map);

    var updatepos = setInterval(reposition, 1000)

}

function updateposition(data){
    position = [data.coords.latitude,data.coords.longitude]
    map.panTo(new L.LatLng(position[0],position[1]));
    pointer.setLatLng(position)
    
    if (position[0]-bound1[0] > 0 && bound2[0]-position[0] > 0 && position[1]-bound1[1] > 0 && bound2[1]-position[1] > 0) {
        widget.innerHTML = "<pre>"+poem+"<pre>"
    } else {
        widget.innerHTML = ""
    }

}

function reposition(){
    navigator.geolocation.getCurrentPosition(updateposition)
}



navigator.geolocation.getCurrentPosition(setup)


