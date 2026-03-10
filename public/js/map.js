var map = L.map('map');
let coordinates = [parseFloat(lat),parseFloat(lon)];
// console.log(coordinates);
map.setView(coordinates, 12);// default region and zoom 12


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">Wanderlust</a>'
}).addTo(map);




var marker = L.marker(coordinates).addTo(map)// listing.geometry.listing
            .bindPopup(`<b>${lct}</b><p>Exact location will be provided after booking</p>`).openPopup();

var circle = L.circle(coordinates, {
    color: '#4ff18b',
    fillColor: '#16A34A',
    fillOpacity: 0.2,
    radius: 3000,
}).addTo(map);




 
