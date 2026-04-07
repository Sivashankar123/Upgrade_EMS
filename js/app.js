/**
 * UPGRAD EVENT MANAGEMENT SYSTEM - CORE LOGIC
 */

// 1. Hardcoded Admin Credentials
const ADMIN_EMAIL = "admin@upgrad.com";
const ADMIN_PASS = "12345";

// 2. Initialize Local Database (using LocalStorage)
let events = JSON.parse(localStorage.getItem("events")) || [
    { id: "101", name: "Dev Tech", category: "Tech & Innovations", date: "2026-03-04", time: "15:15", url: "https://upgrad.com" },
    { id: "102", name: "MCT Summit", category: "Tech & Innovations", date: "2026-03-09", time: "14:15", url: "https://upgrad.com" }
];

// Save to LocalStorage
const saveEvents = () => localStorage.setItem("events", JSON.stringify(events));

// 3. Authentication Functions
function login(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;

    if (email === ADMIN_EMAIL && pass === ADMIN_PASS) {
        localStorage.setItem("isAdmin", "true");
        window.location.href = "events.html";
    } else {
        alert("Invalid Login Details!");
    }
}

function logout() {
    localStorage.removeItem("isAdmin");
    window.location.href = "login.html";
}

function checkAuth() {
    if (localStorage.getItem("isAdmin") !== "true") {
        alert("Unauthorized! Please login as Admin.");
        window.location.href = "login.html";
    }
}

// 4. CRUD Operations
function addEvent(e) {
    e.preventDefault();
    const newEvent = {
        id: document.getElementById("evId").value,
        name: document.getElementById("evName").value,
        category: document.getElementById("evCat").value,
        date: document.getElementById("evDate").value,
        time: document.getElementById("evTime").value,
        url: document.getElementById("evUrl").value
    };
    events.push(newEvent);
    saveEvents();
    alert("Event Added Successfully!");
    location.reload();
}

function deleteEvent(id) {
    events = events.filter(ev => ev.id !== id);
    saveEvents();
    renderAdminEvents(events);
}

// 5. Search Logic
function searchEvents() {
    const term = document.getElementById("searchBox").value.toLowerCase();
    const filtered = events.filter(ev => 
        ev.id.includes(term) || 
        ev.name.toLowerCase().includes(term) || 
        ev.category.toLowerCase().includes(term)
    );
    renderAdminEvents(filtered);
}

