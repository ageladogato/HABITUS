# Habitus

A shared habit tracker for two accountability buddies. Each of you has an avatar who lives out your daily goals in one of ten cities (Beijing, Paris, Rome, Tokyo, New York, San Francisco, Athens, London, Copenhagen, Delhi), with live local time, weather that follows your progress, a sidekick, coins, a shop and a big shared goal.

## Run it

Open `index.html` in any browser. No install, no server.

## Where data is saved

- **On the published claude.ai link:** everything is stored in the artifact’s shared database, so both buddies see the same data from any device.
- **Anywhere else** (opening `index.html` locally, GitHub Pages, etc.): data is saved in the browser’s `localStorage`, so it lives on that one device only. The corner of the page says “Saved on this device only”.

To share data between two people outside claude.ai, point the storage layer (`localStore()` and `dbStore()` in `src/01-core.js`) at a backend such as Firebase or Supabase. Every read and write already goes through that one layer.

## Project layout

```
index.html        built file: don’t edit by hand, run build.py
build.py          stitches src/ into index.html
src/
  template.html   page shell (header, tabs, dialogs)
  styles.css      all styles and animations
  build-order.txt the order script files are joined in
  01-core.js                        state, storage, dates, goals, stats
  02-items-and-plants.js            goal icons, treats, plants, cats
  03-avatars.js                     faces, hair, clothes, portrait avatar
  04-wardrobe-and-shop.js           outfits, accessories, shop catalogue
  05-figure-poses.js                full-body figure, poses, arm and leg animation
  06-weather-icons-and-skies.js
  07-city-backdrops.js              trees and the original city skylines
  08-weather-banner-street.js       weather effects, banner, Garden street
  09-london-copenhagen-delhi.js
  10-sidekicks.js                   the eight sidekick animals
  11-lighting-rooms-passersby.js    perspective rooms, lighting, passers-by
  12-outdoor-activities.js          outdoor activity scenes and captions
  13-indoor-helpers.js              window views, dishes
  14-restaurants-study-worship.js   indoor scene engine and scene router
  15-bedrooms.js                    cultural bedrooms
  16-city-sports.js
  17-sports-upgraded.js             ballet, racket sports, cricket, swimming
  18-social-scenes.js               picnic, coffee, cinema, date
  19-eateries-cafes-faith.js
  20-crowds-bakery-gyros.js
  21-goal-tree.js
  22-render-pages.js                Day, Calendar and Garden tabs, shop
  23-setup-wizard-and-events.js     setup and Settings, click handlers, start-up
```

All scripts share one scope: `01-core.js` opens a wrapper with `(() => {` and the last file closes it with `})();`. When adding a file, list it in `build-order.txt`.

## Editing workflow

1. Edit files in `src/`.
2. Run `python3 build.py` (Python 3, no packages needed; Node.js is optional and adds a syntax check).
3. Open `index.html` to test. Setting motion to “Still” in Settings → Preferences helps when checking layouts.
4. Commit your `src/` changes together with the rebuilt `index.html`.

## Publishing on GitHub Pages (optional)

Repository → Settings → Pages → Deploy from a branch → `main`, root folder. The site goes live at `https://<username>.github.io/<repo-name>/`. Data there is per-device (see above).

## Working together

- Add your collaborator under Repository → Settings → Collaborators.
- Work on separate branches (`git checkout -b new-city`) and merge through pull requests.
- Most features live in their own file, so two people can usually work in parallel. `index.html` is generated, so if it conflicts, rebuild it after merging.
