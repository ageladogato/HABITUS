# Habitus

A shared habit tracker for two accountability buddies. Each of you has an avatar who lives out your daily goals in one of ten cities (Beijing, Paris, Rome, Tokyo, New York, San Francisco, Athens, London, Copenhagen, Delhi), with live local time, weather that follows your progress, a sidekick, coins, a shop and a big shared goal.

**Live app:** https://ageladogato.github.io/HABITUS/

## Run it

Open `index.html` in any browser. No install, no server.

## Where data is saved

- **On the claude.ai link:** everything is stored in the page's shared database, so both buddies see each other's progress from any device.
- **On GitHub Pages (or any other copy):** if `FIREBASE_CONFIG` in `src/01b-firebase.js` is filled in, everything is stored in that Firebase project, so both buddies see each other's progress there too. If it is left as `null`, data stays in that one browser (the corner says "Saved on this device only").

The claude.ai page and the Firebase project are two separate databases.

### Setting up Firebase (free, about 5 minutes)

1. Go to https://console.firebase.google.com, click **Create a project**, give it a name, and finish (Google Analytics can be off).
2. **Build → Authentication → Get started → Sign-in method → Anonymous → Enable → Save.**
3. **Build → Firestore Database → Create database**, pick a location, start in **production mode**.
4. In Firestore, open the **Rules** tab, replace everything with the rules below and click **Publish**:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{coll}/{doc} {
         allow read, write: if request.auth != null && coll in ['config', 'logs', 'picnic', 'messages'];
       }
     }
   }
   ```
5. **Project settings (gear icon) → General → Your apps → Web (`</>`)**, register an app (no hosting needed), and copy the `firebaseConfig` object.
6. Paste it into `src/01b-firebase.js` as `const FIREBASE_CONFIG = { ... };`, run `python3 build.py`, and push.
7. **Authentication → Settings → Authorized domains**: add `<username>.github.io`.

Anyone who has the site's address can open it and see or change the data, so only share the link with your buddy.

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
