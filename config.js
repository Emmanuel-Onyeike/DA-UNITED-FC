// config.js
// Define variables globally so all HTML pages can access them
var SUPABASE_URL = "https://mddlkobjiquicopymipy.supabase.co";
var SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kZGxrb2JqaXF1aWNvcHltaXB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzMTk1NzksImV4cCI6MjA4MTg5NTU3OX0.QQhDBtqFpgs12DZNmhlsHm2Xf0OllR_5LT3i0A-5IjQ";
// Also define with alternate names for compatibility
var PROJECT_URL = SUPABASE_URL;
var ANON_KEY = SUPABASE_KEY;

const supabaseHeaders = {
    "apikey": SUPABASE_KEY,
    "Authorization": `Bearer ${SUPABASE_KEY}`,
    "Content-Type": "application/json"
};

// Get Data
async function getData(table, query = '') {
    try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}${query}`, {
            method: 'GET',
            headers: supabaseHeaders
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
    } catch (e) {
        console.error(`Failed to fetch ${table}:`, e);
        return null;
    }
}

// Post Data
async function postData(table, data) {
    try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
            method: 'POST',
            headers: { ...supabaseHeaders, "Prefer": "resolution=merge-duplicates" },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
    } catch (e) {
        console.error(`Failed to post to ${table}:`, e);
        return null;
    }
}

// Update Data
async function updateData(table, id, updates) {
    try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
            method: 'PATCH',
            headers: supabaseHeaders,
            body: JSON.stringify(updates)
        });
        return res.ok;
    } catch (e) {
        console.error(`Failed to update ${table}:`, e);
        return false;
    }
}
