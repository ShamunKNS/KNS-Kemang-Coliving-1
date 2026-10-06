# KNS Kemang Coliving — GitHub mapping + header fix

Replace the repository `index.html` and `app.js` with these two files.

## Asset mapping used
- `assets/rooms/standard/`: Standard living area.jpg, Standard loft area.jpg, Standard passage.jpg, Standard toilet.jpg
- `assets/rooms/deluxe/`: Deluxe living area.jpg, Deluxe loft.jpg, Deluxe passage.jpg, Deluxe toilet.jpg
- `assets/rooms/premium1/`: Premium 1 living area.jpg, Premium 1 loft.jpg, Premium 1 toilet.jpg, Premium 1 vanity area.jpg
- `assets/rooms/premium2/`: Premium 2 living area.jpg, Premium 2 loft.jpg, Premium 2 toilet.jpg
- `assets/facilities/`: Communal area.jpg, Front office.jpg, Gym.jpg, Laundry area.jpg

## UI fixes
- Room images use `object-fit: contain` so the full image is visible.
- Room gallery has previous/next controls, counter and dots.
- Facilities is mapped as a gallery tab using the exact repository filenames.
- Navigation category text is larger.
- Hero content is offset below the fixed header.
- Anchor scrolling is offset so section headings are not hidden behind the header.
