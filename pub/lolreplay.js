'use strict';

const mousePos = { x: 0, y: 0 }
onmousemove = (e) => {
  mousePos.x = e.clientX;
  mousePos.y = e.clientY;
}

function showCardPopup(img, title, description, link) {
  document.querySelectorAll('.lol-replay-card').forEach(e => e.remove());

  let parsedLink = link ? `
    <p><a href="${link.url}" target="_blank">
      ${link.title}</a></p>
  ` : "";

  const cardDom = document.createElement("div");
  cardDom.style.top = `${mousePos.y}px`;
  cardDom.style.left = `${mousePos.x}px`;
  cardDom.classList.add('lol-replay-card');

  cardDom.innerHTML = `
    <div class="popup-container">
      <div class="image">
        <img src="${img}" alt="${title}" />
      </div>
      <div class="text">
        <h3>${title}</h3>
        <hr />
        <p>${description}</p>
        ${parsedLink}
      </div>
      <div class="close" onclick="document.querySelectorAll('.lol-replay-card').forEach(e => e.remove());">
        x
      </div>
    </div>
  `;

  document.body.appendChild(cardDom);
}

// -- MAIN OBJECTS
class LRMap {
  /**
   * LOLReplay map object used for map DOM manipulation.
   * @param height The height of the map, width will match.
   * @param backgroundImage The background image of choice.
   * @param turretImage Image for turrets
   * @param turrets Turrets override data object
   */
  constructor(height, backgroundImage, turretImage, turrets) {
    this.mapDom = null;
    this.renderedTurrets = 0;

    this.height = height;
    this.backgroundImage = backgroundImage;
    this.turretImage = turretImage;

    // use default turret data if none is defined
    this.turrets = turrets ?? [
      { pos: [2, 3.5] },
      { pos: [1.5, 7.5] },
      { pos: [2, 12] },
      { pos: [1, 19] },
      { pos: [6, 6.5] },
      { pos: [8.75, 8.5] },
      { pos: [10.25, 11.5] },
      { pos: [3, 2] },
      { pos: [7.5, 2] },
      { pos: [12.25, 2.25] },
      { pos: [18.5, 1.5] },
    ];
  }

  /**
   * Initializes the map DOM on the screen
   * @param container The container to append to
   */
  initialize(container) {
    // Setup the map dom and it's attributes
    this.mapDom = document.createElement("div");
    this.mapDom.id = "lr_map";
    this.mapDom.innerHTML = `
      <!-- map -->
      <img
        src="${this.backgroundImage}"
        class="lr-background"
        alt="LOLReplay map"
        style="height: ${this.height}px; width: ${this.height}px;"
      />
      <!-- dragon -->
      <img
        id="lr_map_dragon"
        alt="dragon"
        width="${Math.round(this.height / 14)}"
        style="left: ${17.75 * (this.height / 28)}px; bottom: ${7.25 * (this.height / 28)}px; visibility: hidden;"
      />
      <!-- pit -->
      <img
        id="lr_map_pit"
        alt="rift pit"
        width="${Math.round(this.height / 14)}"
        style="left: ${8 * (this.height / 28)}px; bottom: ${18.5 * (this.height / 28)}px; visibility: hidden;"
      />
    `;

    const spawnTurret = (team, pos, index) => {
      this.renderedTurrets++;
      this.mapDom.innerHTML += `
        <img
          src="${this.turretImage}"
          class="lr-map-turret team${team}"
          width="${Math.round(this.height / 20)}"
          alt="turret"
          style="left: ${pos[0] * (this.height / 28)}px; bottom: ${pos[1] * (this.height / 28)}px;"
          data-id="${index}"
        />
      `;
    }

    let turretIndex = 0;
    this.turrets.forEach((turret) => {
      spawnTurret(turret.team ?? 1, turret.pos, turretIndex++);
      if (!('team' in turret))
        spawnTurret(0, [26.25 - turret.pos[0], 26.8 - turret.pos[1]],
          turretIndex + this.turrets.length - 1);
    });

    container.append(this.mapDom);
  }

  /**
   * Takes in a champion and adds it to the map.
   * @param champion The LRChampion object to add
   */
  addChampion(champion) {
    this.mapDom.innerHTML += `
      <img
        src="${champion.img}"
        alt="${champion.name} champion"
        class="lr-map-champion team${champion.team}"
        width="${Math.round(this.height / 14)}"
        data-id="${champion.id}"
        onclick="showCardPopup('${champion.img}', '${champion.name}', 'Played by ${champion.player}', 
          { url: 'https://u.gg/lol/profile/na1/${champion.player}/overview', title: 'U.GG Profile' })"
      />
    `;
  }

  /**
   * Updates a champions location on the map.
   * @param championId The champion id to update
   * @param newX The new X location
   * @param newY The new Y location
   */
  updateChampionPosition(championId, newX, newY) {
    let championDom = document.querySelector(`.lr-map-champion[data-id="${championId}"]`);
    championDom.style.setProperty('left', `${newX * (this.height / 28)}px`);
    championDom.style.bottom = `${newY * (this.height / 28)}px`;
  }

  /**
   * Updates the turrets views based on an inputted array of visible IDs.
   * @param turrets List of turret IDs that are visible to the user
   */
  updateTurretDisplay(turrets) {
    [...Array(this.renderedTurrets).keys()].forEach((turretIndex) => {
      document.querySelector(`.lr-map-turret[data-id="${turretIndex}"]`).style.visibility =
        turrets.includes(turretIndex) ? "visible" : "hidden";
    });
  }

  /**
   * Updates the current dragon shown on the map
   * @param dragon The dragon to be shown, null for none
   * @param dragonImages List of all dragon images, it'll index this based on name
   */
  updateDragonDisplay(dragon, dragonImages) {
    const dragonDom = document.querySelector(`#lr_map_dragon`);
    if (dragon === null) {
      dragonDom.style.visibility = "hidden";
    } else {
      dragonDom.src = dragonImages[dragon];
      dragonDom.style.visibility = "visible";
    }
  }

  /**
   * Updates the current rift pit shown on the map
   * @param pit The monster to appear within the pit
   * @param pitImages List of all pit images, it'll index this based on name
   */
  updatePitDisplay(pit, pitImages) {
    const pitDom = document.querySelector(`#lr_map_pit`);
    if (pit === null) {
      pitDom.style.visibility = "hidden";
    } else {
      pitDom.src = pitImages[pit];
      pitDom.style.visibility = "visible";
    }
  }
}

class LRChampion {
  /**
   * A LOLReplay champion object to store various champion details and functions.
   * @param id Champion ID
   * @param name Champion name
   * @param img Champion thumbnail
   * @param player The player name managing champion
   * @param team 0: blue side, 1: red side
   * @constructor
   */
  constructor(id, name, img, player, team) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.player = player;
    this.team = team;
    this.gold = 0;
    this.score = [0, 0, 0];
  }

  /**
   * Set the champion gold
   * @param gold
   */
  setGold(gold) {
    this.gold = gold;
  }

  /**
   * Set the champion score
   * @param score
   */
  setScore(score) {
    this.score = score;
  }
}

class LRScoreboard {
  /**
   * LOLReplay scoreboard, used to manage various DOM aspects
   */
  constructor() {
    this.scoreDom = null;
    this.playerScoreDom = null;
  }

  /**
   * Initializes and renders the leaderboard DOM on screen.
   * @param container
   */
  initialize(container, maxHeight) {
    this.scoreDom = document.createElement("div");
    this.scoreDom.id = "lr_score";
    this.scoreDom.style.height = `${maxHeight}px`;
    this.scoreDom.innerHTML += `
      <h1>Player Scores</h1>
      <div id="lr_score_players"></div>
      
      <h1>Objectives</h1>
      <h2 id="lr_score_rift"></h2>
      <h2 id="lr_score_dragon"></h2>
      <p id="lr_score_noobj">No objectives on the map</p>
    `;

    this.playerScoreDom = this.scoreDom.querySelector("#lr_score_players");
    container.append(this.scoreDom);
  }

  /**
   * Adds a champion to the leaderboard
   * @param champion
   */
  addChampion(champion) {
    let scoreDom = document.createElement("div");
    scoreDom.dataset.id = champion.id;
    scoreDom.innerHTML = `
      <h2 class="team${champion.team}">
        <span class="name">${champion.name}</span>
        (<span>${champion.player}</span>) - 
        KDA: <span class="score">${champion.score.join("/")}</span> -
        Gold: <span class="gold">${champion.gold}</span>
      </h2>
    `;

    this.playerScoreDom.append(scoreDom);
    this.scoreDom = scoreDom;
  }

  /**
   * Updates the champion gold on the scoreboard
   * @param championId Champion ID to update
   * @param gold Gold to set
   */
  updateGold(championId, gold) {
    let scoreDom = document.querySelector(`[data-id="${championId}"] .gold`);
    scoreDom.innerText = gold;
  }

  /**
   * Updates the champion score on the scoreboard
   * @param championId Champion ID to update
   * @param kda KDA to set (in array form)
   */
  updateScore(championId, kda) {
    let scoreDom = document.querySelector(`[data-id="${championId}"] .score`);
    scoreDom.innerText = kda.join("/");
  }

  updateObjectives(dragon, rift) {
    const noObjectiveDom = document.querySelector("#lr_score_noobj");
    const riftDom = document.querySelector("#lr_score_rift");
    const dragonDom = document.querySelector("#lr_score_dragon");

    // hide by default
    dragonDom.style.display = "none";
    riftDom.style.display = "none";

    // figure out which needs to show
    if (dragon === null && rift === null) {
      noObjectiveDom.style.display = "block";
    } else {
      noObjectiveDom.style.display = "none";

      // dragon pit
      if (dragon !== null) {
        dragonDom.innerText = `${dragon} Drake (~> Dragon Pit)`;
        dragonDom.style.display = "block";
      }

      // Rift pit
      if (rift !== null) {
        riftDom.innerText = `${rift} (~> Rift Pit)`;
        riftDom.style.display = "block";
      }
    }
  }
}

class LRSlider {
  /**
   * Slider and frame DOMs to manage various frame info to the user.
   * @param LOLReplayObject The base LOLReplay object to manage callbacks and frames.
   */
  constructor(LOLReplayObject) {
    this.LOLReplayObject = LOLReplayObject;
    this.playInterval = null;

    this.sliderDom = null;
    this.frameCounterDom = null;
    this.sliderMainDom = null;
    this.playButtonDom = null;
    this.previousButtonDom = null;
    this.nextButtonDom = null;
    this.slowButtonDom = null;
    this.fastButtonDom = null;

    this.replaySpeed = 1;
  }

  /**
   * Initialize the sliders on the display.
   * @param container Container to append to
   */
  initialize(container) {
    let sliderDom = document.createElement("div");
    sliderDom.id = "lr_slider";
    sliderDom.innerHTML = `
      <div class="lr-slider-frame">
        <span class="frame">0</span>/${this.LOLReplayObject.data.frames.length - 1}
      </div>
      <div class="lr-slider-main">
        <input type="range" min="0" max="${this.LOLReplayObject.data.frames.length - 1}" value="0" />
      </div>
      <div class="lr-slider-controls">
        <input type="button" value="-" id="lr_slider_slow" title="Decrease play speed" />
        <input type="button" value="<<" id="lr_slider_previous" title="Previous frame" />
        <input type="button" value="Start (x1)" id="lr_slider_play" title="Start/Stop toggle" />
        <input type="button" value=">>" id="lr_slider_next" title="Next frame" />
        <input type="button" value="+" id="lr_slider_fast" title="Increase play speed" />
      </div>
    `;

    container.innerHTML += `
      <div class="break"></div>
    `;

    this.sliderDom = sliderDom;
    this.frameCounterDom = this.sliderDom.querySelector(".lr-slider-frame span.frame");
    this.sliderMainDom = this.sliderDom.querySelector(".lr-slider-main input");
    this.playButtonDom = this.sliderDom.querySelector(".lr-slider-controls #lr_slider_play");
    this.previousButtonDom = this.sliderDom.querySelector(".lr-slider-controls #lr_slider_previous");
    this.nextButtonDom = this.sliderDom.querySelector(".lr-slider-controls #lr_slider_next");
    this.slowButtonDom = this.sliderDom.querySelector(".lr-slider-controls #lr_slider_slow");
    this.fastButtonDom = this.sliderDom.querySelector(".lr-slider-controls #lr_slider_fast");
    container.append(sliderDom);

    // adding change event handler for slider and start/stop
    this.sliderMainDom.addEventListener('change', (e) => this.onFrameChange(e));
    this.playButtonDom.addEventListener('click', () => this.onStartToggle());

    // speed buttons
    const updatePlayButtonSpeedText = (speed) => this.playButtonDom.value = `Start (x${speed})`;
    this.fastButtonDom.addEventListener('click', () => {
      this.replaySpeed = Math.min(4, this.replaySpeed * 2);
      updatePlayButtonSpeedText(this.replaySpeed);
    });

    this.slowButtonDom.addEventListener('click', () => {
      this.replaySpeed = Math.max(0.25, this.replaySpeed / 2);
      updatePlayButtonSpeedText(this.replaySpeed);
    });

    // frame buttons
    this.nextButtonDom.addEventListener('click', () => this.LOLReplayObject.viewFrame(++this.LOLReplayObject.frame));
    this.previousButtonDom.addEventListener('click', () => this.LOLReplayObject.viewFrame(--this.LOLReplayObject.frame));
  }

  /**
   * Event called when frame change is requested by the user.
   * @param event Event object from the slider
   */
  onFrameChange(event) {
    let frameIndex = parseInt(event.target.value);
    this.LOLReplayObject.viewFrame(frameIndex);
  }

  /**
   * Handles button status and text displaying when frames update, this
   * is called from the main LOLReplay.
   */
  onFrameUpdate() {
    const currentFrame = this.LOLReplayObject.frame;
    this.frameCounterDom.innerText = currentFrame;
    this.sliderMainDom.value = currentFrame;

    // buttons disabled if the video player is playing
    this.previousButtonDom.disabled = this.playInterval !== null;
    this.nextButtonDom.disabled = this.playInterval !== null;
    this.slowButtonDom.disabled = this.playInterval !== null;
    this.fastButtonDom.disabled = this.playInterval !== null;

    if (this.playInterval !== null) return; // don't continue if playing

    // First frame disable button
    if (currentFrame <= 0) {
      this.previousButtonDom.disabled = true;
    } else if (currentFrame >= this.LOLReplayObject.data.frames.length - 1) { // last frame disable next
      this.nextButtonDom.disabled = true;
    }
  }

  /**
   * Start toggle event called when requested to start/stop by the user.
   */
  onStartToggle() {
    if (this.playInterval !== null) {
      this.playButtonDom.value = `Start (x${this.replaySpeed})`;
      clearInterval(this.playInterval);
      this.playInterval = null;
    } else {
      this.playButtonDom.value = `Stop (x${this.replaySpeed})`;
      this.playInterval = setInterval(() => {
        if (this.LOLReplayObject.frame <= this.LOLReplayObject.data.frames.length - 2)
          this.LOLReplayObject.viewFrame(++this.LOLReplayObject.frame);
        else
          this.onStartToggle();
      }, (1 / this.replaySpeed) * 900);
    }

    this.onFrameUpdate();
  }
}

class LOLReplay {
  /**
   * LOLReplay public API interface. This will generate the LOLReplay object.
   * @param container Container to append to, this is a DOM
   * @param data LOLReplay data object
   * @param options LOLReplay options object
   */
  constructor(container, data, options) {
    // DOM
    this.map = null;
    this.scoreboard = null;

    // objects/more
    this.champions = [];
    this.objectives = [];
    this.frame = 0;

    this.container = container;
    this.data = data;
    this.options = options;
  }

  /**
   * Initialize the LOLReplay elements within it's container.
   */
  initialize() {
    let currentObjectives = {
      turrets: [],
      dragon: null,
      pitObjective: null,
      pitName: null
    };

    // Loop through and generate parse into objectives
    this.data.frames.forEach((frame) => {
      if ('obj' in frame) {
        for (const [objective, value] of Object.entries(frame.obj)) {
          switch (objective) {
            // Keep track of spawned turrets, make sure no dupes
            case "spawnTurrets":
              value.forEach((e) => {
                if (!(e in currentObjectives.turrets))
                  currentObjectives.turrets.push(e);
              });
              break;

            // Destroy a turret from the map
            case "destroyTurrets":
              value.forEach((e) => currentObjectives.turrets.splice(currentObjectives.turrets.indexOf(e), 1));
              break;

            // Dragon in the dragon pit
            case "setDragon":
              currentObjectives.dragon = value;
              break;

            // Monster in the rift pit
            case "setPit":
              if (value !== null) {
                currentObjectives.pitObjective = value[0];
                currentObjectives.pitName = value[1];
              }

              break;
          }
        }

        delete frame.obj; // don't need this anymore, parsed
      }

      // push and deep copy
      this.objectives.push(currentObjectives);
      currentObjectives = JSON.parse(JSON.stringify(currentObjectives));
    });

    // Initialize the map
    this.map = new LRMap(
      this.options.height,
      this.options.backgroundImage,
      this.options.turretImage,
      this.options.turrets
    );

    this.map.initialize(this.container);

    // Initialize the scoreboard
    this.scoreboard = new LRScoreboard();
    this.scoreboard.initialize(this.container, this.options.height);

    // Setup the champions objects
    this.data.champions.forEach((champion, championIndex) => {
      let champObject = new LRChampion(
        championIndex,
        champion.name,
        champion.img,
        champion.player,
        champion.team
      );

      this.champions.push(champObject); // insert into champs storage array
      this.map.addChampion(champObject); // add the champion to the map
      this.scoreboard.addChampion(champObject); // add champion to the scoreboard
    });

    // Initialize the sliders
    this.slider = new LRSlider(this);
    this.slider.initialize(this.container);

    // Render first frame
    this.viewFrame(0);
  }

  /**
   * Jump to a specific frame within the LOLReplay data. LOLReplay must be initialized.
   * @param frameIndex Frame ID to jump to
   */
  viewFrame(frameIndex) {
    if (frameIndex >= this.data.frames.length)
      return;

    for (const [championId] of Object.entries(this.data.frames[frameIndex])) {
      // @todo championFrame makes webstorm linting complain... not a bug just weird
      for (const [action, value] of Object.entries(this.data.frames[frameIndex][championId])) {
        switch (action) {
          // -- Player actions
          // Position update
          case 'pos':
            this.map.updateChampionPosition(championId, value[0], value[1]);
            break;

          // Gold update
          case 'gold':
            this.champions[championId].setGold(value);
            this.scoreboard.updateGold(championId, value);
            break;

          // Score update
          case 'score':
            this.champions[championId].setScore(value);
            this.scoreboard.updateScore(championId, value);
            break;

          // Can't find action
          default:
            console.warn("Action:", action, "not valid!");
            break;
        }
      }
    }

    // -- objectives
    // pit objective
    this.scoreboard.updateObjectives(this.objectives[frameIndex].dragon, this.objectives[frameIndex].pitName);
    this.map.updatePitDisplay(this.objectives[frameIndex].pitObjective, this.options.monsters);
    // dragons
    this.map.updateDragonDisplay(this.objectives[frameIndex].dragon, this.options.dragons);
    // turrets
    this.map.updateTurretDisplay(this.objectives[frameIndex].turrets);

    // Misc frame management
    this.frame = frameIndex; // update frame index
    this.slider.onFrameUpdate();
  }
}