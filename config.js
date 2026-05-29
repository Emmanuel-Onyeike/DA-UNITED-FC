// config.js
// Global Supabase Configuration for D.A UNITED

const SUPABASE_URL = "https://mddlkobjiquicopymipy.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kZGxrb2JqaXF1aWNvcHltaXB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzMTk1NzksImV4cCI6MjA4MTg5NTU3OX0.QQhDBtqFpgs12DZNmhlsHm2Xf0OllR_5LT3i0A-5IjQ";

/**
 * Default fetch headers for Supabase
 */
const supabaseHeaders = {
    "apikey": SUPABASE_ANON_KEY,
    "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
    "Content-Type": "application/json"
};

/**
 * Get data from any table
 * @param {string} table - Table name (e.g. 'players', 'news', 'kits')
 * @param {string} query - Optional query string (e.g. ?select=*&order=created_at.desc)
 */
async function getData(table, query = '') {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}${query}`, {
            method: 'GET',
            headers: supabaseHeaders
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`[ERROR] Failed to fetch from ${table}:`, error);
        return null;
    }
}

/**
 * Insert or Update data
 * @param {string} table - Table name
 * @param {object|array} data - Data to insert/update
 */
async function postData(table, data) {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
            method: 'POST',
            headers: {
                ...supabaseHeaders,
                "Prefer": "resolution=merge-duplicates"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`[ERROR] Failed to post to ${table}:`, error);
        return null;
    }
}

/**
 * Update existing record
 * @param {string} table - Table name
 * @param {string} id - Record ID
 * @param {object} updates - Fields to update
 */
async function updateData(table, id, updates) {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
            method: 'PATCH',
            headers: supabaseHeaders,
            body: JSON.stringify(updates)
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        return true;
    } catch (error) {
        console.error(`[ERROR] Failed to update ${table}:`, error);
        return false;
    }
}

/**
 * Shared utility to get live payload (your original function improved)
 */
async function getLivePayload(id) {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/site_content?id=eq.${id}`, {
            headers: supabaseHeaders
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const rows = await response.json();
        return rows[0] ? rows[0].data : null;
    } catch (e) {
        console.error(`[CRITICAL] Failed to get payload for [${id}]:`, e);
        return null;
    }
}

// Export everything for use in other files
export {
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    supabaseHeaders,
    getData,
    postData,
    updateData,
    getLivePayload
};
