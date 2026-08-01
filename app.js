/* ShortURL application logic */

let supabaseClient;

const $ = (id) => document.getElementById(id);

function toast(message) {
    const el = $("toast");
    if (!el) return;
    el.textContent = message;
    setTimeout(() => el.textContent = "", 2500);
}

function validUrl(value) {
    try {
        const url = new URL(value);
        return url.protocol === "http:" || url.protocol === "https:";
    } catch {
        return false;
    }
}

function generateCode(length) {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.from({length}, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

async function createShortUrl() {
    const input = $("url");
    const button = $("shorten");
    const longUrl = input.value.trim();

    if (!validUrl(longUrl)) {
        toast("Enter a valid URL");
        return;
    }

    button.disabled = true;
    button.textContent = "Creating...";

    try {
        for (let attempt = 0; attempt < 10; attempt++) {
            const code = generateCode(CONFIG.CODE_LENGTH);

            const { data: duplicate } = await supabaseClient
                .from("short_urls")
                .select("short_code")
                .eq("short_code", code)
                .maybeSingle();

            if (duplicate) continue;

            const { error } = await supabaseClient
                .from("short_urls")
                .insert({short_code: code, long_url: longUrl});

            if (!error) {
                showResult(code);
                return;
            }
        }
        throw new Error("Could not generate code");
    } catch (error) {
        toast(error.message);
    } finally {
        button.disabled = false;
        button.textContent = "Shorten";
    }
}

function showResult(code) {
    const url = `${location.origin}${location.pathname}?c=${code}`;
    $("result").hidden = false;
    $("result").innerHTML = `<p class="short-link">${url}</p><button id="copy">Copy</button>`;
    $("copy").onclick = () => navigator.clipboard.writeText(url).then(() => toast("Copied"));
}

async function redirectShortUrl() {
    const code = new URLSearchParams(location.search).get("c");
    if (!code || !supabaseClient) return;

    const { data } = await supabaseClient
        .from("short_urls")
        .select("long_url,expires_at,clicks")
        .eq("short_code", code)
        .maybeSingle();

    if (!data) return;

    if (data.expires_at && new Date(data.expires_at) < new Date()) {
        toast("This link expired");
        return;
    }

    await supabaseClient
        .from("short_urls")
        .update({clicks: data.clicks + 1})
        .eq("short_code", code);

    location.href = data.long_url;
}

function init() {
    if (!CONFIG.SUPABASE_URL || !CONFIG.SUPABASE_ANON_KEY) {
        toast("Configure Supabase first");
        return;
    }

    supabaseClient = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);

    $("shorten")?.addEventListener("click", createShortUrl);
    $("url")?.addEventListener("keydown", e => {
        if (e.key === "Enter") createShortUrl();
    });

    redirectShortUrl();
}

document.addEventListener("DOMContentLoaded", init);
