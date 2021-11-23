'use strict';

// LOLReplay - Copyright @ Makan

/**
 * Main function that initializes the LOLReplay object.
 * @param container Container to start the component in
 * @param data A LOLReplay data object
 * @param options A LOLReplay options object
 */
function LOLReplay(container, data, options) {
  this.containerDom = null;
  this.mapDom = null;
  this.keyframe = null;
  this.scoreDom = null;
  this.champions = [];

  this.data = data;
  this.container = container;
  this.backgroundImage = options.backgroundImage ?? "http://ddragon.leagueoflegends.com/cdn/6.8.1/img/map/map11.png";
  this.height = options.height ?? 500;
}

LOLReplay.prototype = {
  /**
   * Initializes the LOLReplay component.
   */
  initialize: function() {
    // *** general map stuff ***
    // Map background
    this.containerDom = document.querySelector(this.container);
    this.mapDom = document.createElement("div");
    this.mapDom.classList.add("lol-replay-map");
    this.mapDom.style.position = "relative";
    this.containerDom.append(this.mapDom);

    this.mapDom.innerHTML = `
      <img
        src="${this.backgroundImage}"
        class="background"
        alt="LOLReplay background"
        style="height: ${this.height}px; width: ${this.height}px;"
      />
    `;

    // Players
    this.data.champions.forEach(champion => {
      let championDom = document.createElement("img");
      championDom.src = champion.img;
      championDom.alt = champion.name;
      championDom.classList.add("champion", `team${champion.team}`);
      championDom.width = this.height / 14;
      this.mapDom.append(championDom);
      this.champions.push({
        dom: championDom,
        score: [0, 0, 0],
        gold: 0
      });
    });

    this.viewKeyframe(0); // render the first frame

    // *** general scoreboard stuff ***
    this.scoreDom = document.createElement("div");
    this.scoreDom.classList.add("lol-replay-score");

    // parse champion scores
    let championScores = "";
    this.champions.forEach((champion, index) => {
      championScores += `
        <h4 class="title team${this.data.champions[index].team}">
          ${this.data.champions[index].name} (${this.data.champions[index].player}) -
          <span class="kda">${this.champions[index].score.join("/")}</span> -
          <span class="gold">${this.champions[index].gold}</span> Gold
        </h4>
      `;
    });

    this.scoreDom.innerHTML = `
      <h2 class="champion-title">Champions</h2>
      <div class="scoreboard">
        <div class="score" data-id="0">
          ${championScores}
        </div>
      </div>
      
      <h2 class="objectives-title">Objectives</h2>
    `;

    this.containerDom.append(this.scoreDom);
  },

  /**
   * Adjusts champion and various other attributes to match a specific keyframe.
   * @param keyframe Keyframe to adjust to
   */
  viewKeyframe: function(keyframe) {
    if (!(keyframe in this.data.keyframes) || this.keyframe === keyframe)
      return;

    for (const [champId, action] of Object.entries(this.data.keyframes[keyframe])) {
      let championDom = this.champions[champId].dom;
      let position = action.pos;
      championDom.style.left = `${position[0] * (this.height / 28)}px`;
      championDom.style.bottom = `${position[1] * (this.height / 28)}px`;
    }

    this.keyframe = keyframe;
  }
}
