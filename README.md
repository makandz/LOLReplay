# LOLReplay
## Online Demo
Can be found at [rocky-peak-17595.herokuapp.com](https://rocky-peak-17595.herokuapp.com/)

## Getting Started
To get started, import the required script and CSS file. The script can be loaded in the head or body.

```html
<link rel='stylesheet' href='path/to/lolreplay.css' />
<script src='path/to/lolreplay.js'></script>
```
The app can now be initialized with

```html
<script>
  const LR = LOLReplay(
    document.querySelector('#main'),
    { ... data ... },
    { ... options ... }
  );
</script>
```

To understand more about the required data values and inputs, please visit the documentation page at [rocky-peak-17595.herokuapp.com/docs.html](https://rocky-peak-17595.herokuapp.com/docs.html)