# ShortURL

Production-ready GitHub Pages URL shortener using HTML5, CSS3, Vanilla JavaScript, Tailwind CDN, and Supabase.

## Features

- Create short URLs
- GitHub Pages compatible redirects
- Supabase storage
- Click tracking
- Duplicate protection
- URL validation
- Copy and share support
- Responsive glass UI
- Dark gradient design
- Expiring links

## Screenshots

_Add screenshots here._

## Installation

1. Clone this repository.
2. Create a Supabase project.
3. Run `supabase.sql` in Supabase SQL Editor.
4. Add your URL and anon key in `config.js`.
5. Enable GitHub Pages from repository settings.

## Supabase Setup

Use only the Publishable anon key. Never expose service role keys.

## GitHub Pages Deployment

Settings → Pages → Deploy from main branch.

Your URL:

```
https://username.github.io/ShortURL/
```

## Troubleshooting

- Check Supabase keys in config.js.
- Confirm RLS policies exist.
- Confirm GitHub Pages is enabled.

## License

MIT License
