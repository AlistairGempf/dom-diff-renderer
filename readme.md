# DOM diff renderer

## Running the example

1. Clone the repo
2. Run `npm start` from inside the repo
3. Go to http://127.0.0.1:8080/
4. Note the console output, DOM changes and visual changes of the rendered HTML

## Huh?

React is a well-known, widely-used javascript library for rendering HTML. One of its selling points is the way it updates the HTML DOM. It only updates elements that NEED updating. It does this by "rendering" everything first in memory (known as the virtual DOM) and comparing it to the previous version.

This is my attempt to do something similar.

## How?

1. Render everything in JS to HTML, keeping everything that was rendered
2. On re-render, compare the new tree to the one stored in memory from the previous render
3. Render only the differences and store result in memory

### Comparing VDOM trees

Based on https://reactjs.org/docs/reconciliation.html.

This repo does a breadth-first search, checking each element of the DOM has the same type as it did in the previous render. If it does not, it and all of its children are re-rendered. Otherwise its children are checked.