# Store listing — WORLD PRODUCT WORD HUNT

Copy-paste values for the Orion Store "Submit an app" form (and any other
community store that reads a GitHub repo).

## 1 · Source

| Field | Value |
|---|---|
| Repo URL | `https://github.com/technicalnihilist-lgtm/world-product-word-hunt` |

Releases live in that repo; the latest release (`v1.0.1`) carries exactly one
APK, so Orion's automatic "first APK in the release" picker finds it. v1.0.1 is
the mobile-first build; it is signed with the same key as v1.0.0, so it installs
as an update.

## 2 · Details

| Field | Value |
|---|---|
| Name | `World Product Word Hunt` |
| Category | `Games` → `Puzzle` / `Word` (not Utility) |
| Author | `technicalnihilist-lgtm` |
| App ID | `com.worldproduct.wordhunt` |

## 3 · Store listing

**Description**

> Find the correct spelling of real products from all over the world, hidden in
> a letter grid. Phones, cars, shoes, snacks, watches, consoles, cookware —
> 282 real product names across 17 categories and 26 countries, with more added
> by the built-in content agent.
>
> Swipe the letters in any direction — across, down, diagonally, forwards or
> backwards — to spell a product. Every find unlocks a card with the brand, the
> category, the country of origin and a link to its Wikipedia article.
>
> • Six modes: Easy, Medium, Hard, Expert, endless Unlimited, and a Daily
>   Challenge that is the same puzzle for everyone today
> • Coins, hints, XP, levels, stars, 12 achievements, streaks, daily rewards and
>   a local leaderboard
> • Five interface languages: English, हिन्दी, Español, Français, Deutsch
> • Dark and light themes, generated sound effects and music, haptics
>
> Works completely offline. No ads, no accounts, no analytics, no internet
> permission — the only permission the app asks for is vibration. About 160 KB.

**Icon URL**

```
https://raw.githubusercontent.com/technicalnihilist-lgtm/world-product-word-hunt/main/assets/icons/icon-512.png
```

512×512 PNG.

## 4 · Release

| Field | Value |
|---|---|
| Package name | `com.worldproduct.wordhunt` |
| Release keyword | leave **Auto** (first APK in the release) |
| versionName / versionCode | `1.0.1` / `2` |
| minSdk / targetSdk | 24 (Android 7.0) / 34 |
| Signing cert SHA-256 | `fdc216f2751af8caa197855c2df0ab8cf2ce598526287ae7b10f0cc66fc7842b` |
| APK SHA-256 | `cb9add262b4cfe4f909da17d1a1c3c997e284acb5561f78a658bc299300496a5` |
| Permissions | `android.permission.VIBRATE` only — no `INTERNET` |

## 5 · Screenshots (direct image links)

```
https://raw.githubusercontent.com/technicalnihilist-lgtm/world-product-word-hunt/main/screenshots/14-mobile-game.jpg
https://raw.githubusercontent.com/technicalnihilist-lgtm/world-product-word-hunt/main/screenshots/13-mobile-home.jpg
https://raw.githubusercontent.com/technicalnihilist-lgtm/world-product-word-hunt/main/screenshots/17-mobile-expert.jpg
https://raw.githubusercontent.com/technicalnihilist-lgtm/world-product-word-hunt/main/screenshots/01-home.jpg
https://raw.githubusercontent.com/technicalnihilist-lgtm/world-product-word-hunt/main/screenshots/04-game-expert.jpg
```

Phone-first set (the store is browsed on phones): `14-mobile-game`,
`13-mobile-home`, `17-mobile-expert`, `20-mobile-scrolled`, `15-mobile-modes`.

Extras if the form wants more:
`screenshots/02-modes.jpg`, `screenshots/03-game-easy.jpg`, `screenshots/05-pause.jpg`,
`screenshots/06-win.jpg`, `screenshots/07-settings-dark.jpg`,
`screenshots/08-settings-light-hindi.jpg`, `screenshots/09-credits.jpg`,
`screenshots/10-achievements.jpg`, `screenshots/11-leaderboard.jpg`,
`screenshots/12-howto.jpg`, `screenshots/15-mobile-modes.jpg`.

## Notes for the reviewer

* The app is one self-contained `index.html` inside the APK's assets; the
  Android layer is a WebView shell (`android/src/.../MainActivity.java`).
* Product names are trademarks of their owners and appear only to identify real
  products in a puzzle. Not affiliated with Wikipedia, the Wikimedia
  Foundation, or any brand named in the catalogue.
* Images from Wikimedia Commons keep their licence and author in
  `data/credits.json`; where no reusable image exists the card draws a generated
  monogram instead.
