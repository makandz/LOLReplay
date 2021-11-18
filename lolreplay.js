'use strict';

// LOLReplay - Copyright @ Makan
function LOLReplay(container, data, options) {
  this.containerDom = null;

  this.data = data;
  this.container = container;
  this.backgroundImage = options.backgroundImage ?? "http://ddragon.leagueoflegends.com/cdn/6.8.1/img/map/map11.png";
  this.height = options.height ?? 500;
}

LOLReplay.prototype = {
  initialize: function() {
    // Map background
    this.containerDom = document.querySelector(this.container);
    this.containerDom.style.position = "relative";

    this.containerDom.innerHTML = `
      <img
        src="${this.backgroundImage}"
        class="lr-background"
        alt="LOLReplay background"
        style="height: ${this.height}px; width: ${this.height}px;"
      />
    `;

    // Players
    this.data.champions.forEach((champion, index) => {
      let championDom = document.createElement("img");
      championDom.src = champion.img;
      championDom.alt = champion.name;
      championDom.classList.add("lr-champion", `lr-team${champion.team}`);
      championDom.width = this.height / 10;
      championDom.dataset.id = index.toString();
      this.containerDom.append(championDom);
    });

    this.viewKeyframe(0);
  },

  viewKeyframe: function(keyframe) {
    if (!(keyframe in this.data.keyframes))
      return;

    for (const [champId, position] of Object.entries(this.data.keyframes[keyframe])) {
      let championDom = this.containerDom.querySelector(`img[data-id="${champId}"]`);
      championDom.style.left = `${position[0] * (this.height / 20)}px`;
      championDom.style.bottom = `${position[1] * (this.height / 20)}px`;
    }
  }
}
