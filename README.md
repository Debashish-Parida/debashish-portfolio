# Online Portfolio Website V2

Personal portfolio website for Debashish Parida, rebuilt from a single all-in-one HTML file into a cleaner structured project.

## New Version Changes

- Split the previous single HTML file into separate files for better structure and maintenance.
- Added external stylesheet links in `index.html`.
- Moved main styling into `assets/css/style.css`.
- Moved mobile responsive styling into `assets/css/responsive.css`.
- Moved JavaScript behavior into `assets/js/script.js`.
- Updated favicon/profile image path to use `assets/images/DP.png`.
- Added a new `Resume` button beside `Get in Touch` and `in LinkedIn`.
- Updated the `in LinkedIn` and `Resume` buttons so both have the same default style.
- Added blue border and blue text hover styling for both `in LinkedIn` and `Resume`.
- Made the phone number in the hero/top section clickable using a `tel:` link.
- Highlighted the top phone number so visitors can identify it as interactive.
- Kept the existing phone contact card in the contact section unchanged.
- Improved the email modal options for mobile users:
  - Gmail tries to open the Gmail app on supported mobile devices.
  - Outlook tries to open the Outlook app on supported mobile devices.
  - Yahoo Mail tries to open the Yahoo Mail app on supported mobile devices.
  - If the selected app is not installed, the phone may redirect to the app store/download page.
  - Default Mail App uses `mailto:` so the device can show available installed email apps.
- Changed selected Google Drive and Looker Studio links to open through JavaScript instead of placing the raw URLs directly in the HTML.
- Added encoded link handling for Resume, dashboards, and financial reports inside `assets/js/script.js`.

## Project Structure

```
assets/
  css/
    responsive.css
    style.css
  images/
    DP.png
  js/
    script.js
.gitignore
index.html
README.md
```

## Important Notes

- Keep your own `DP.png` image inside `assets/images/`.
- The website can be opened directly from `index.html`.
- Encoded Drive/dashboard links reduce casual copying from the HTML file, but they are not full security encryption. Once a visitor opens a Google Drive or Looker Studio link, the final URL can still be copied from the browser.

## Main Files

- `index.html` contains the page content and links to CSS/JS files.
- `assets/css/style.css` contains the main desktop and shared styling.
- `assets/css/responsive.css` contains mobile responsive rules.
- `assets/js/script.js` contains animations, modal behavior, email app handling, certificate previews, and protected link opening.
- `assets/images/DP.png` is used as the browser tab icon/image asset.
