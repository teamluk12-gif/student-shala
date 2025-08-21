// Sample PG data (replace with API later)
const PG_DATA = [
  { id:1, name:"Shri Ram PG", city:"Delhi", gender:"Male",  budget:6000, lat:28.614, lng:77.209 },
  { id:2, name:"Krishna Boys PG", city:"Delhi", gender:"Male", budget:6500, lat:28.616, lng:77.215 },
  { id:3, name:"Girls Hostel PG", city:"Delhi", gender:"Female", budget:7000, lat:28.618, lng:77.205 },
  { id:4, name:"Bliss Stay", city:"Bangalore", gender:"Unisex", budget:7500, lat:12.9719, lng:77.5937 },
];

let map, markers = [];

// Initialize map
function initMap(center=[28.6139, 77.2090], zoom=13){
  map = L.map('map').setView(center, zoom);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);
}

// Add markers to map
function renderMarkers(items){
  // clear previous
  markers.forEach(m => map.removeLayer(m));
  markers = [];

  items.forEach(pg => {
    const marker = L.marker([pg.lat, pg.lng]).addTo(map)
      .bindPopup(`<b>${pg.name}</b><br>${pg.city} • ₹${pg.budget}/mo • ${pg.gender}`);
    markers.push(marker);
  });

  // fit bounds if we have multiple items
  if (items.length > 1) {
    const group = L.featureGroup(markers);
    map.fitBounds(group.getBounds().pad(0.2));
  } else if (items.length === 1){
    map.setView([items[0].lat, items[0].lng], 16);
  }
}

// Read filters from query string and form
function getQueryFilters(){
  const q = new URLSearchParams(location.search);
  return {
    location: (q.get('location') || '').trim(),
    budget: Number(q.get('budget')) || null,
    gender: (q.get('gender') || '').trim()
  };
}

// *** LOGIC FIX ***
// Centralized filtering logic
function filterData(data, filters) {
  const { location, budget, gender, searchText } = filters;
  
  return data.filter(pg => {
    const matchLocation = !location || pg.city.toLowerCase().includes(location.toLowerCase());
    const matchBudget = !budget || pg.budget <= budget;
    const matchGender = !gender || pg.gender.toLowerCase() === gender.toLowerCase();
    const matchSearch = !searchText || pg.name.toLowerCase().includes(searchText.toLowerCase());
    
    return matchLocation && matchBudget && matchGender && matchSearch;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const form = document.getElementById("mapFilters");

  // Determine center by first matched city if provided
  const initialFilters = getQueryFilters();
  let center = [28.6139, 77.2090]; // Delhi fallback
  if (initialFilters.location && /bangalore/i.test(initialFilters.location)) {
    center = [12.9719, 77.5937];
  }

  initMap(center);

  // Function to handle updates from any filter source
  function updateMap() {
    const formFilters = {
      location: form.location.value.trim(),
      budget: Number(form.budget.value) || null,
      gender: form.gender.value,
      searchText: searchInput.value.trim()
    };
    
    const filteredList = filterData(PG_DATA, formFilters);
    renderMarkers(filteredList);
    
    // Update query string for better UX (optional but good practice)
    const qs = new URLSearchParams({
        location: formFilters.location,
        budget: formFilters.budget || '',
        gender: formFilters.gender,
    });
    // Remove empty values for cleanliness
    for (const [k,v] of [...qs.entries()]) if (!v) qs.delete(k);
    history.replaceState({}, "", `${location.pathname}?${qs.toString()}`);
  }

  // Pre-fill form from URL query parameters
  if (form){
    if (initialFilters.location) form.querySelector("#f-location").value = initialFilters.location;
    if (initialFilters.budget) form.querySelector("#f-budget").value = initialFilters.budget;
    if (initialFilters.gender) form.querySelector("#f-gender").value = initialFilters.gender;
  }
  
  // Initial render based on URL
  updateMap(); 

  // Hook up event listeners
  if (searchInput) {
    searchInput.addEventListener("input", updateMap);
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      updateMap();
    });
  }
});