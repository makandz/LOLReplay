hljs.highlightAll();

// BASIC
const basicOptions = {
  backgroundImage: "http://ddragon.leagueoflegends.com/cdn/6.8.1/img/map/map11.png",
  height: 250,
  turretImage: "https://cdn.mkn.cx/lolreplay/turret.png",
  dragons: {
    mountain: "https://cdn.mkn.cx/lolreplay/mountain.png",
  },
  monsters: {
    rift: "https://cdn.mkn.cx/lolreplay/rift.png",
  }
}

const basicData = {
  champions: [{
    name: "Morgana",
    img: "https://static.u.gg/assets/lol/riot_static/11.23.1/img/champion/Morgana.png",
    player: "Tommy",
    team: 0
  }],
  frames: [{
    obj: {
      setPit: ['rift', "Rift Herald"],
    },
    0: {
      pos: [12, 12],
      gold: 50,
      score: [0, 0, 0]
    },
  }]
}

const basic = new LOLReplay(
  document.querySelector("#basic"),
  basicData,
  basicOptions
);

basic.initialize();


// Objective capturing
const objectiveOptions = {
  backgroundImage: "http://ddragon.leagueoflegends.com/cdn/6.8.1/img/map/map11.png",
  height: 250,
  turretImage: "https://cdn.mkn.cx/lolreplay/turret.png",
  dragons: {
    elder: "https://cdn.mkn.cx/lolreplay/elder.png",
  },
  monsters: {
    rift: "https://cdn.mkn.cx/lolreplay/rift.png",
  }
}

const objectiveData = {
  champions: [{
    name: "Yone",
    img: "https://static.u.gg/assets/lol/riot_static/11.23.1/img/champion/Yone.png",
    player: "ShadowTraveler",
    team: 1
  }],
  frames: [{
    obj: {
      setDragon: 'elder',
      spawnTurrets: [0, 4, 5, 6, 7]
    },
    0: { pos: [12, 12], gold: 3000, score: [5, 6, 12] },
  }, {
    0: { pos: [11, 12], gold: 3000, score: [5, 6, 12] },
  }, {
    obj: { destroyTurrets: [6] },
    0: { pos: [11, 12], gold: 3250, score: [5, 6, 12] },
  }, {
    0: { pos: [10, 12], gold: 3250, score: [5, 6, 12] },
  }, {
    0: { pos: [10, 11], gold: 3250, score: [5, 6, 12] },
  }, {
    0: { pos: [9, 10], gold: 3250, score: [5, 6, 12] },
  }, {
    0: { pos: [8, 9], gold: 3250, score: [5, 6, 12] },
  }, {
    obj: { destroyTurrets: [5] },
    0: { pos: [8, 9], gold: 3450, score: [5, 6, 12] },
  }, {
    0: { pos: [9, 10], gold: 3450, score: [5, 6, 12] },
  }, {
    0: { pos: [10, 11], gold: 3450, score: [5, 6, 12] },
  }, {
    0: { pos: [11, 11], gold: 3450, score: [5, 6, 12] },
  }, {
    0: { pos: [12, 11], gold: 3450, score: [5, 6, 12] },
  }, {
    0: { pos: [13, 10], gold: 3450, score: [5, 6, 12] },
  }, {
    0: { pos: [14, 10], gold: 3450, score: [5, 6, 12] },
  }, {
    0: { pos: [15, 10], gold: 3450, score: [5, 6, 12] },
  }, {
    0: { pos: [16, 10], gold: 3450, score: [5, 6, 12] },
  }, {
    0: { pos: [17, 10], gold: 3450, score: [5, 6, 12] },
  }, {
    0: { pos: [18, 9], gold: 3450, score: [5, 6, 12] },
  }, {
    0: { pos: [19, 9], gold: 3450, score: [5, 6, 12] },
  }, {
    0: { pos: [19, 8], gold: 3450, score: [5, 6, 12] },
  }, {
    obj: { setDragon: null },
    0: { pos: [19, 8], gold: 3650, score: [5, 6, 12] },
  }]
}

const objective = new LOLReplay(
  document.querySelector("#objectives"),
  objectiveData,
  objectiveOptions
);

objective.initialize();


// Champion interactions

const gameData = {
  champions: [{
    name: "Lee Sin",
    img: "https://static.u.gg/assets/lol/riot_static/11.23.1/img/champion/LeeSin.png",
    player: "Zurita",
    team: 0
  }, {
    name: "Kayn",
    img: "https://static.u.gg/assets/lol/riot_static/11.23.1/img/champion/Kayn.png",
    player: "Kanye",
    team: 0
  }, {
    name: "Garen",
    img: "https://static.u.gg/assets/lol/riot_static/11.23.1/img/champion/Garen.png",
    player: "Xander0927",
    team: 1
  }, {
    name: "Yasuo",
    img: "https://static.u.gg/assets/lol/riot_static/11.23.1/img/champion/Yasuo.png",
    player: "ShadowTraveler",
    team: 1
  }],

  frames: [{
    obj: {
      spawnTurrets: [...Array(22).keys()],
      setDragon: 'mountain',
      setPit: ['baron', "Baron Nashor"]
    },
    0: {pos: [0, 0], gold: 0, score: [0, 0, 0]},
    1: {pos: [0, 0], gold: 0, score: [0, 0, 0]},
    2: {pos: [25.5, 25.5], gold: 0, score: [0, 0, 0]},
    3: {pos: [25.5, 25.5], gold: 0, score: [0, 0, 0]}
  }, {
    0: {pos: [1.5, 2], gold: 0, score: [0, 0, 0]},
    1: {pos: [1, 1], gold: 0, score: [0, 0, 0]},
    2: {pos: [25, 25.5], gold: 0, score: [0, 0, 0]},
    3: {pos: [24.5, 25.5], gold: 0, score: [0, 0, 0]}
  }, {
    0: {pos: [3.5, 4], gold: 0, score: [0, 0, 0]},
    1: {pos: [2, 4], gold: 0, score: [0, 0, 0]},
    2: {pos: [23, 25.5], gold: 0, score: [0, 0, 0]},
    3: {pos: [22.5, 23.5], gold: 0, score: [0, 0, 0]}
  }, {
    0: {pos: [5.5, 6], gold: 0, score: [0, 0, 0]},
    1: {pos: [3, 6], gold: 0, score: [0, 0, 0]},
    2: {pos: [21, 24.5], gold: 0, score: [0, 0, 0]},
    3: {pos: [20.5, 21.5], gold: 0, score: [0, 0, 0]}
  }, {
    0: {pos: [7.5, 8], gold: 0, score: [0, 0, 0]},
    1: {pos: [3, 8], gold: 0, score: [0, 0, 0]},
    2: {pos: [20, 22.5], gold: 0, score: [0, 0, 0]},
    3: {pos: [19, 19.5], gold: 0, score: [0, 0, 0]}
  }, {
    0: {pos: [9.5, 10], gold: 0, score: [0, 0, 0]},
    1: {pos: [4, 10], gold: 0, score: [0, 0, 0]},
    2: {pos: [17, 20.5], gold: 0, score: [0, 0, 0]},
    3: {pos: [17, 17.5], gold: 0, score: [0, 0, 0]}
  }, {
    0: {pos: [11.5, 12], gold: 0, score: [0, 0, 0]},
    1: {pos: [4, 12], gold: 0, score: [0, 0, 0]},
    2: {pos: [15, 19], gold: 0, score: [0, 0, 0]},
    3: {pos: [15, 15.5], gold: 0, score: [0, 0, 0]}
  }, {
    0: {pos: [12.5, 13], gold: 0, score: [0, 0, 0]},
    1: {pos: [6, 14], gold: 0, score: [0, 0, 0]},
    2: {pos: [12, 18], gold: 0, score: [0, 0, 0]},
    3: {pos: [14, 14.5], gold: 0, score: [0, 0, 0]}
  }, {
    0: {pos: [12, 13.5], gold: 0, score: [0, 0, 0]},
    1: {pos: [6, 17], gold: 0, score: [0, 0, 0]},
    2: {pos: [10, 16.5], gold: 0, score: [0, 0, 0]},
    3: {pos: [13.5, 14], gold: 0, score: [0, 0, 0]}
  }, {
    0: {pos: [11, 14], gold: 0, score: [0, 0, 0]},
    1: {pos: [8, 17], gold: 0, score: [0, 0, 0]},
    2: {pos: [11, 15], gold: 0, score: [0, 0, 0]},
    3: {pos: [12.5, 14], gold: 0, score: [0, 0, 0]}
  }, {
    0: {pos: [0, 0], gold: 0, score: [0, 1, 0]},
    1: {pos: [9, 17], gold: 0, score: [0, 0, 0]},
    2: {pos: [10, 15], gold: 50, score: [0, 0, 1]},
    3: {pos: [11.5, 14], gold: 350, score: [1, 0, 0]}
  }, {
    0: {pos: [2, 2], gold: 0, score: [0, 1, 0]},
    1: {pos: [10, 16], gold: 0, score: [0, 0, 0]},
    2: {pos: [10.5, 15], gold: 50, score: [0, 0, 1]},
    3: {pos: [11.5, 14], gold: 350, score: [1, 0, 0]}
  }, {
    0: {pos: [4, 4], gold: 25, score: [0, 1, 1]},
    1: {pos: [10, 15], gold: 200, score: [1, 0, 0]},
    2: {pos: [25.5, 25.5], gold: 50, score: [0, 1, 1]},
    3: {pos: [11, 15], gold: 350, score: [1, 0, 0]}
  }, {
    0: {pos: [6, 6], gold: 25, score: [0, 1, 1]},
    1: {pos: [0, 0], gold: 200, score: [1, 1, 0]},
    2: {pos: [25.5, 25.5], gold: 75, score: [0, 1, 2]},
    3: {pos: [10, 15], gold: 550, score: [2, 0, 0]}
  }]
};

const gameOptions = {
  backgroundImage:  "http://ddragon.leagueoflegends.com/cdn/6.8.1/img/map/map11.png",
  height: 250,
  turretImage: "https://cdn.mkn.cx/lolreplay/turret.png",
  dragons: {
    chemtech: "https://cdn.mkn.cx/lolreplay/chemtech.png",
    cloud: "https://cdn.mkn.cx/lolreplay/cloud.png",
    hextech: "https://cdn.mkn.cx/lolreplay/hextech.png",
    infernal: "https://cdn.mkn.cx/lolreplay/infernal.png",
    mountain: "https://cdn.mkn.cx/lolreplay/mountain.png",
    ocean: "https://cdn.mkn.cx/lolreplay/ocean.png",
    elder: "https://cdn.mkn.cx/lolreplay/elder.png"
  },
  monsters: {
    rift: "https://cdn.mkn.cx/lolreplay/rift.png",
    baron: "https://cdn.mkn.cx/lolreplay/baron.png"
  }
}

let game = new LOLReplay(
  document.querySelector("#game"),
  gameData,
  gameOptions
);

game.initialize();

// customize
const customOptions = {
  backgroundImage: "https://2.bp.blogspot.com/--A1wNZhS868/U7L4xKhbQTI/AAAAAAAAS04/rfzak1JCZFY/s412/srdb3-1.jpg",
  height: 400,
  turretImage: "http://assets.stickpng.com/images/58482d7fcef1014c0b5e4a5a.png",
  dragons: {
    mountain: "https://s3.cointelegraph.com/storage/uploads/view/bad02e8b57a64d349aa5eec318298b4b.png",
  },
  turrets: [
    { pos: [11, 11], team: 0},
    { pos: [17, 17], team: 1}
  ],
  player: {
    repeat: false,
    autoplay: false,
    disabled: true
  }
}

const customData = {
  champions: [{
    name: "Just right",
    img: "https://i.kym-cdn.com/photos/images/newsfeed/001/070/061/d96.jpg",
    player: "Mark",
    team: 0
  }],
  frames: [{
    obj: { spawnTurrets: [0, 1] },
    0: {
      pos: [2.5, 2.5],
      gold: 203910832,
      score: [0, 99, 0]
    },
  }]
}

const customize = new LOLReplay(
  document.querySelector("#customize"),
  customData,
  customOptions
);

customize.initialize();

const devOptions = {
  backgroundImage: "http://ddragon.leagueoflegends.com/cdn/6.8.1/img/map/map11.png",
  height: 250,
  turretImage: "https://cdn.mkn.cx/lolreplay/turret.png",
  dragons: {
    mountain: "https://cdn.mkn.cx/lolreplay/mountain.png",
  },
  monsters: {
    rift: "https://cdn.mkn.cx/lolreplay/rift.png",
  },
  hooks: {
    onStartToggle: () => alert("Start toggle was called"),
    onChampionClick: (e) => alert("Champion was clicked: " + e.name),
    onInitialization: (e) => console.log("Dev version loaded")
  },
  overrides: {
    minimumPlaySpeed: 0.125,
    maxPlaySpeed: 8
  }
}

const devData = {
  champions: [{
    name: "Morgana",
    img: "https://static.u.gg/assets/lol/riot_static/11.23.1/img/champion/Morgana.png",
    player: "Tommy",
    team: 0
  }],
  frames: [{
    obj: {
      setPit: ['rift', "Rift Herald"],
    },
    0: {
      pos: [12, 12],
      gold: 50,
      score: [0, 0, 0]
    },
  }]
}

const dev = new LOLReplay(
  document.querySelector("#dev"),
  devData,
  devOptions
);

dev.initialize();