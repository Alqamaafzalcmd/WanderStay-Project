async function geocodeLocation(place) {

    const url =
    `https://nominatim.openstreetmap.org/search?format=json&q=${(place)}&limit=1`;

    const response = await fetch(url, {
        headers: {
            "User-Agent": "wanderlust-project"
        }
    });

    const data = await response.json();

    if (!data || data.length === 0) {
        throw new Error("Location not found. Try a more specific place.");
    }

     console.log(data);
}

module.exports = geocodeLocation;
