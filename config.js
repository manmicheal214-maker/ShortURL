/*
==========================================================
GitHub Pages URL Shortener
Configuration File
==========================================================

Replace the values below with YOUR Supabase project details.

You can find them here:

Supabase Dashboard
→ Settings
→ API

Do NOT put your database password here.

Only use:
• Project URL
• Publishable (anon) key

==========================================================
*/

const CONFIG = {

    // ----------------------------------------------------
    // Supabase
    // ----------------------------------------------------

    SUPABASE_URL: "https://YOUR_PROJECT.supabase.co",

    SUPABASE_ANON_KEY:
        "YOUR_SUPABASE_PUBLISHABLE_KEY",

    // ----------------------------------------------------
    // App
    // ----------------------------------------------------

    APP_NAME: "Shorten",

    CODE_LENGTH: 6,

    MAX_GENERATION_ATTEMPTS: 10,

    ENABLE_DUPLICATE_CHECK: true,

    ENABLE_CLICK_COUNTER: true,

    ENABLE_EXPIRY: false,

    DEFAULT_EXPIRY_DAYS: 30,

    // ----------------------------------------------------
    // UI
    // ----------------------------------------------------

    COPY_SUCCESS_TEXT: "Copied!",

    COPY_DEFAULT_TEXT: "Copy",

    CREATE_BUTTON_TEXT: "Shorten URL",

    LOADING_BUTTON_TEXT: "Creating...",

    // ----------------------------------------------------
    // Validation
    // ----------------------------------------------------

    MIN_URL_LENGTH: 10,

    MAX_URL_LENGTH: 4096

};

// Freeze configuration
Object.freeze(CONFIG);
