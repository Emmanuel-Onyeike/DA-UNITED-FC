// config.js
// Global Project Connectivity Variables for D.A UNITED Engine Matrix
const SUPABASE_URL = "https://mddlkobjiquicopymipy.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kZGxrb2JqaXF1aWNvcHltaXB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzMTk1NzksImV4cCI6MjA4MTg5NTU3OX0.QQhDBtqFpgs12DZNmhlsHm2Xf0OllR_5LT3i0A-5IjQ";

/**
 * Shared data retrieval pipeline
 * Pulls current dynamic block states from the site_content table
 * @param {string} id - The structural target document row hook
 */
async function getLivePayload(id) {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/site_content?id=eq.${id}`, {
            headers: { 
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP network handshake fault: ${response.status}`);
        }
        
        const rows = await response.json();
        return rows[0] ? rows[0].data : null;
    } catch (e) {
        console.error(`[CRITICAL] Database initialization fault for structural target key [${id}]:`, e);
        return null;
    }
}