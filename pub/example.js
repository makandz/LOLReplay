// Global options
let size = 400;
backgroundImage = "http://ddragon.leagueoflegends.com/cdn/6.8.1/img/map/map11.png";

// main generate call
function generate() {
  document.querySelector("#main").innerHTML = "";
  let lr = new LOLReplay(
    document.querySelector("#main"),
    {
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
        obj: {
          setDragon: null,
          setPit: null
        },
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
    },

    {
      backgroundImage:  backgroundImage,
      height: size,
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

  );

  lr.initialize();
}

function smallSize() {
  size = 200;
  generate();
}

function largeSize() {
  size = 350;
  generate();
}

function defaultMap() {
  backgroundImage = "http://ddragon.leagueoflegends.com/cdn/6.8.1/img/map/map11.png";
  generate();
}

function customMap() {
  backgroundImage = "https://2.bp.blogspot.com/--A1wNZhS868/U7L4xKhbQTI/AAAAAAAAS04/rfzak1JCZFY/s412/srdb3-1.jpg";
  generate();
}

generate(); // once on load