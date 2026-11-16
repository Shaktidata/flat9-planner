# Flat 9 Planner

A 3D planner for Flat 9 (Pune). Open it in any browser to furnish the flat:
- add IKEA PS 2026 and generic items such as TVs, fridges, ACs and beds
- drag, turn and raise items
- change the floor tiles and wall paint
- see the IKEA shopping list and total

**Live site:** https://shaktidata.github.io/flat9-planner/

Each visitor's layout is saved in their own browser. To share a layout, open **List & cost**, click **Copy layout code**, and send the code; the other person uses **Paste a layout**.

## Making changes

1. Edit `src/planner.html`. Claude also publishes this same file as a private preview page first.
2. Run `python3 build.py` to regenerate `index.html`.
3. Commit and push to `main`. GitHub Pages updates the live site within a minute or two.

## Files

- `src/planner.html`: the planner page (source)
- `build.py`: wraps the source into a full web page
- `index.html`: the built page that GitHub Pages serves
- `.nojekyll`: tells Pages to serve the files as they are
