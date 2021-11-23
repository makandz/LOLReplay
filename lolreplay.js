'use strict';

// LOLReplay Map
function LRMap(height, backgroundImage) {
  // private attributes
  this.mapDom = null;

  // public attributes
  this.height = height;
  this.backgroundImage = backgroundImage;
}

LRMap.prototype = {
  initialize: function(container) {
    // Setup the map dom and it's attributes
    this.mapDom = document.createElement("div");
    this.mapDom.id = "lr_map";
    this.mapDom.innerHTML = `
      <img
        src="${this.backgroundImage}"
        class="lr-background"
        alt="LOLReplay map"
        style="height: ${this.height}px; width: ${this.height}px;"
      />
    `;


  }
}


// LOLReplay public API
function LOLReplay(container, data, options) {
  // private attributes
  this.map = null;

  // public attributes
  this.data = data;
  this.container = container;
}

LOLReplay.prototype = {
  initialize: function() {
    this.containerDom = document.querySelector(this.container); // sets base LR container dom

    // Initialize the map
    this.map = new LRMap();
  }
}