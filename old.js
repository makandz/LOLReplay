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
  this.champions = [];
  this.scoreDoms = {};

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
    this.scoreDom.container = document.createElement("div");
    this.scoreDom.classList.add("lol-replay-score");

    this.scoreDom.container.innerHTML = `
      <h2 class="champion-title">Champions</h2>
      <div class="scoreboard"></div>
      
      <h2 class="objectives-title">Objectives</h2>
      <p>todo</p>
    `;

    this.scoreDoms.scoreboard = this.scoreDoms.container.querySelector("scoreboard");

    // parse champion scores
    // this.champions.forEach((champion, index) => {
    //   let tempDom = document.createElement("div");
    //   tempDom.classList.add("score");
    //   tempDom.innerHTML = `
    //     <h4 class="title team${this.data.champions[index].team}">
    //       ${this.data.champions[index].name} (${this.data.champions[index].player}) -
    //       <span class="kda">${this.champions[index].score.join("/")}</span> -
    //       <span class="gold">${this.champions[index].gold}</span> Gold
    //     </h4>
    //   `;
    //
    //   this.champions[index].scoreDom = tempDom;
    // });

    this.containerDom.append(this.scoreDom.container);
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

      if ('pos' in action) {
        championDom.style.left = `${action.pos[0] * (this.height / 28)}px`;
        championDom.style.bottom = `${action.pos[1] * (this.height / 28)}px`;
      }

      if ('gold' in action) {

      }
    }

    this.keyframe = keyframe;
  }
}
