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

## Assets
Images and other assets must be self-hosted and linked through the various API methods shown below.

Various assets were retrieved from Riot Games resources and/or U.GG. These assets are copyrighted and **should not be used in a commercial setting.**

I'm hosting a public CDN at _cdn.mkn.cx/lolreplay_ with various assets already, feel free to use them. (e.g., if you want the image to the Mountain Drake, you can access it via [cdn.mkn.cx/lolreplay/mountain.png](https://cdn.mkn.cx/lolreplay/mountain.png).