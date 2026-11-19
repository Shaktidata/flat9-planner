# Flat 9 Planner

A 3D planner for Flat 9 (Pune). Open it in any browser to furnish the flat:
- add IKEA PS 2026 and generic items such as TVs, fridges, ACs and beds
- drag, turn and raise items
- change the floor tiles and wall paint
- see the IKEA shopping list and total

**Live site:** https://shaktidata.github.io/flat9-planner/

Each visitor's layout is saved in their own browser. To share a layout, open **List & cost**, click **Copy layout code**, and send the code; the other person uses **Paste a layout**.

## Making changes

1. Edit `src/app.html` (the planner) or a home in `src/properties/`.
2. Run `python3 build.py`. It writes `index.html` for GitHub Pages and `dist/preview.html` for the private Claude preview.
3. Check the preview, then open a pull request. Merging to `main` updates the live site within a minute or two.

## Adding another home

Copy `src/properties/flat9.js` to `src/properties/<id>.js`, give it a new `id` and `name`, and change its walls, doors, windows, rooms and built-ins. Run `build.py` and the home appears in the **Home** menu. Each home keeps its own saved layout.

## Files

- `src/app.html`: the planner (3D engine and interface)
- `src/properties/*.js`: one file per home
- `build.py`: inlines the homes into the planner and builds the pages
- `index.html`: the built page that GitHub Pages serves
- `.nojekyll`: tells Pages to serve the files as they are
