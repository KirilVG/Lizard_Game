export const heightOffset = 0.99;
//player
export const playerHitBoxHeightScale = 1;
export const playerHitBoxWidthScale = 0.75;
export const playerIMGHeightScale = 1.5;
export const playerIMGWidthScale = 0.75;
export const playerPathHeight = 430;
export const playerPathWidth = 157;
//cactus
export const cactusHitBoxHeightScale = 0.6;
export const cactusHitBoxWidthScale = 0.6;
export const cactusIMGHeightScale = 1.6;
export const cactusIMGWidthScale = 0.6;
export const cactusSpeedMultiplier = 1;
export const cactusPathHeight = 12800;
export const cactusPathWidth = 5800;
//small cactus
export const smallCactusHitBoxHeightScale = 0.6;
export const smallCactusHitBoxWidthScale = 0.6;
export const smallCactusIMGHeightScale = 0.6;
export const smallCactusIMGWidthScale = 0.6;
export const smallCactusSpeedMultiplier = 1;
export const smallCactusPathHeight = 8900;
export const smallCactusPathWidth = 12500;
//worm
export const wormHitBoxHeightScale = 0.8;
export const wormHitBoxWidthScale = 0.8;
export const wormIMGHeightScale = 0.8;
export const wormIMGWidthScale = 0.8;
export const wormSpeedMultiplier = 1;
export const wormPathHeight = 12900;
export const wormPathWidth = 9600;
//discoConsumable
export const discoConsumableHitBoxHeightScale = 0.8;
export const discoConsumableHitBoxWidthScale = 0.8;
export const discoConsumableIMGHeightScale = 0.8;
export const discoConsumableIMGWidthScale = 0.8;
export const discoConsumableSpeedMultiplier = 1;
export const discoConsumablePathHeight = 12600;
export const discoConsumablePathWidth = 12600;
export const discoConsumableDeathChance = 5;
//bird
export const birdHitBoxHeightScale = 1.2;
export const birdHitBoxWidthScale = 2.7;
export const birdIMGHeightScale = 1.2;
export const birdIMGWidthScale = 2.7;
export const birdSpeedMultiplier = 1.2;
export const birdPathHeight = 7200;
export const birdPathWidth = 12750;
//lane
export const laneHeightScale = 12;
export const lineSepaRatorWidthScale = 0.05;
//value
export const initialValueMultiplier = 1;
export const valueMultiplier = 1.1;
//fuel
export const maxFuel = 100;
export const fuelLos = 0.075;
//speed
export const speedScale = 0.05;
//spawn timers
export const initialObstacleSpawnTime = 6000;
export const initialConsumableSpawnTime = 10000;
//animation
export const undergroundAnimationTime = 800;
export const inAirAnimationTime = 800;
export const jumpHeightScale = 1.2;
export const undergroundAnimationOpacity = 0.3;
//font
export const fontScale = 0.5;
//score
export const initialScore = 0;
export const scoreMultiplier = 0.1;
export const pointsNeededToIncreaseScore = 100;
//levels
export const levelUnder = "underground";
export const levelGround = "ground";
export const levelAir = "air";
//directions
export const dirUp = "up";
export const dirDown = "down";
export const dirLeft = "left";
export const dirRight = "right";
export const directions = {
  ArrowDown: dirDown,
  ArrowUp: dirUp,
  ArrowLeft: dirLeft,
  ArrowRight: dirRight,
};
//disco handlers
export const discoModeScoreM=2;
export const discoModeDuration = 900;
export let useDiscoMode = false;
export function setDiscoMode(value) {
  useDiscoMode = value;
}
export let discoModeRemainder=0;
export function setDiscoModeRemainder(value) {
  if(value<0) {
    discoModeRemainder=0;
    setDiscoMode(false);
  } 
  else {
    discoModeRemainder = value;
    setDiscoMode(true);
  }
}
//day/night cycle
export const pointsNeededToChangeDayNightCycle = 500;
export function setDayNightCycle() {
  primaryColor = "white";
  secondaryColor = "black";
}
export function switchDayNightCycle() {
  let temp=primaryColor;
  primaryColor=secondaryColor;
  secondaryColor=temp;
}
//settings
export const displayHitBoxes = false;
export const maximumNumberOfScores = 10;
export const hitBoxOpacity = 0.5;
export const minLanesNum = 3;
export const maxLanesNum = 100;
export const colors = [
  "white",
  "red",
  "blue",
  "green",
  "pink",
  "yellow",
  "gray",
  "orange",
  "violet",
];
export let primaryColor = "white";
export let secondaryColor = "black";
//paths
export const playerPath = `M0.705,270.191
c0.668-2.699,2.87-4.689,4.807-6.684c1.275-1.312,2.51-2.841,3.14-4.52c-4.316-5.865-6.144-13.627-6.139-21.036
c0.003-4.808,0.913-9.947,3.426-13.907c0.443-1.87,1.369-3.584,2.869-4.821c2.352-1.937,5.601-2.457,8.636-2.198
c3.036,0.258,5.963,1.208,8.929,1.905c5.334,1.254,10.858,1.685,16.323,1.298c-4.794-4.323-9.26-8.857-11.566-14.751
c-5.452-13.929,2.943-37.338-4.209-50.474c3.201-2.72,2.803-8.56-0.737-10.821c1.141-2.334,2.283-4.667,3.424-7.001l-3.681-2.197
c2.938-3.265,3.569-8.402,1.509-12.28c3.235-1.133,4.889-5.429,3.25-8.439c-0.421-0.773-1.025-1.482-1.159-2.351
c-0.291-1.881,1.634-3.264,3.242-4.281c3.193-2.018,9.683-11.714,6.593-11.826c-3.302-0.12-6.603-0.239-9.905-0.359
c-0.814,0.24-1.667,0.338-2.522,0.24c-2.442-0.282-4.592-1.848-6.094-3.793c-1.502-1.945-2.443-4.257-3.32-6.553
c-1.265-3.314-2.449-6.739-2.507-10.286c-0.004-0.246,0.007-0.495,0.017-0.743c-3.295-1.787-6.591-3.575-9.886-5.363
c-0.44-0.238-0.954-0.669-0.758-1.129c0.12-0.281,0.453-0.393,0.752-0.458c2.477-0.536,5.077,0.07,7.348,1.224
c-2.429-3.745-4.063-8.01-4.683-12.428c-0.072-0.51,0.591-0.794,0.893-0.377c3.2,4.408,5.948,9.141,8.207,14.097
c0.246-0.19,0.502-11.501,1.117-16.979c0.909-1.6,1.711,2.148,1.905,3.54c0.602,4.316,0.68,8.704,0.239,13.039
c0.151,0.035,0.083,0.019,0.234,0.054c1.008-2.703,2.284-5.307,3.821-7.748c0.292-0.463,1.002-0.292,1.086,0.249
c0.338,2.17,0.294,4.399-0.137,6.553c-0.325,1.628-0.922,3.234-1.938,4.533c2.23,4.209,4.461,8.419,6.691,12.628
c2.348-2.298,5.353-4.112,8.228-5.764c3.605-2.071,7.412-4.454,9.768-7.74c-2.136,0.086-4.265-0.247-6.248-1.117
c0.361-1.558,0.722-3.116,1.083-4.675c-1.451-0.186-2.903-0.372-4.354-0.558c1.057-0.554,1.55-1.982,1.061-3.07
c-0.49-1.088-1.886-1.666-3.001-1.243c1.469-5.773,3.147-11.506,5.405-17.019c2.871-7.01,6.681-13.647,11.421-19.555
c2.105-2.625,4.395-5.109,6.288-7.891c2.414-3.547,4.158-7.542,6.838-10.893c2.563-3.205,6.332-5.821,10.396-5.72V0.503
c0.093-0.008,0.184,0.005,0.277,0c0.093,0.005,0.183-0.008,0.277,0v0.001c4.063-0.101,7.833,2.515,10.396,5.72
c2.68,3.351,4.424,7.346,6.838,10.893c1.893,2.782,4.183,5.266,6.288,7.891c4.74,5.908,8.55,12.545,11.421,19.555
c2.258,5.513,3.936,11.246,5.405,17.019c-1.115-0.424-2.512,0.155-3.001,1.243c-0.49,1.088,0.004,2.517,1.061,3.07
c-1.451,0.186-2.903,0.372-4.354,0.558c0.361,1.558,0.722,3.116,1.083,4.675c-1.984,0.87-4.112,1.203-6.248,1.117
c2.356,3.287,6.163,5.669,9.768,7.74c2.875,1.652,5.88,3.466,8.228,5.764c2.23-4.209,4.461-8.419,6.691-12.628
c-1.016-1.299-1.613-2.905-1.938-4.533c-0.432-2.162-0.475-4.4-0.133-6.578c0.084-0.532,0.781-0.701,1.069-0.245
c1.544,2.447,2.823,5.058,3.835,7.769c0.151-0.035,0.083-0.019,0.234-0.054c-0.441-4.335-0.363-8.723,0.239-13.039
c0.194-1.392,0.587-4.546,1.905-3.54c0.614,5.478,0.87,16.788,1.117,16.979c2.285-5.012,5.07-9.796,8.316-14.246
c0.267-0.366,0.873-0.132,0.813,0.317c-0.597,4.493-2.244,8.833-4.712,12.637c2.271-1.154,4.871-1.759,7.348-1.224
c0.298,0.065,0.632,0.177,0.752,0.458c0.196,0.46-0.318,0.891-0.758,1.129c-3.295,1.788-6.591,3.575-9.886,5.363
c0.01,0.248,0.021,0.496,0.017,0.743c-0.058,3.547-1.241,6.972-2.507,10.286c-0.877,2.296-1.818,4.608-3.32,6.553
c-1.502,1.945-3.653,3.511-6.094,3.793c-0.856,0.099-1.708,0.001-2.522-0.24c-3.302,0.12-6.603,0.239-9.905,0.359
c-3.09,0.112,2.57,9.282,6.593,11.826c1.609,1.017,3.533,2.4,3.242,4.281c-0.134,0.869-0.738,1.579-1.159,2.351
c-1.64,3.01,0.015,7.307,3.25,8.439c-2.06,3.879-1.429,9.016,1.509,12.28l-3.681,2.197c1.141,2.334,2.283,4.667,3.424,7.001
c-3.54,2.26-3.938,8.101-0.737,10.821c-7.153,13.137,1.243,36.546-4.209,50.474c-2.307,5.893-6.773,10.427-11.566,14.751
c5.465,0.387,10.989-0.044,16.323-1.298c2.966-0.697,5.893-1.647,8.929-1.905c3.036-0.258,6.285,0.261,8.636,2.198
c1.501,1.236,2.426,2.95,2.869,4.821c2.514,3.96,3.423,9.099,3.426,13.907c0.005,7.409-1.823,15.171-6.139,21.036
c0.63,1.679,1.865,3.208,3.14,4.52c1.937,1.994,4.139,3.985,4.807,6.684c0.525,2.123-0.009,4.398-1.02,6.338
c-1.011,1.94-1.883,5.459-3.329,7.101c0.31-1.632,0.028-5.133,0.139-6.788c-1.197,3.993-3.464,7.668-6.532,10.492
c-0.618-3.531,1.064-7.001,2.463-10.302c0.438-1.034,0.838-2.126,1.148-3.232c-2.794-1.374-5.542-2.857-7.89-4.888
c-0.071-0.062-0.137-0.131-0.208-0.194c-0.882,2.455-0.703,5.309,0.673,7.537c0.357,0.578,0.78,1.35,0.335,1.865
c-0.352,0.406-1.013,0.312-1.491,0.067c-1.82-0.932-2.418-3.211-2.69-5.238c-0.38-2.828-0.492-5.69-0.355-8.54
c-0.904-1.604-1.499-3.357-1.611-5.196c-0.175-2.88,0.81-5.666,1.943-8.346c-1.034-3.169-1.889-6.412-2.691-9.651
c-3.653,0.71-7.399,0.982-11.094,1.495c-5.862,0.814-11.628,2.288-17.181,4.336c-2.129,7.143-8.427,14.885-8.295,22.398
c0.192,10.926,1.449,21.93-0.211,32.731c-2.384,15.507-10.596,29.457-19.367,42.466c-8.77,13.009-18.361,25.699-24.121,40.293
c-5.759,14.594-7.231,31.792,0.283,45.565c-9.171-7.344-12.843-19.953-12.063-31.675c0.78-11.723,5.397-22.818,10.29-33.5
c4.893-10.681,10.175-21.353,12.438-32.882c3.026-15.419,5.577-37.599-1.81-51.468c-8.048-15.109-8.837-33.087-9.986-33.53
c-5.895-2.273-12.052-3.865-18.309-4.734c-3.695-0.513-7.441-0.785-11.094-1.495c-0.802,3.239-1.658,6.482-2.691,9.651
c1.133,2.681,2.118,5.466,1.943,8.346c-0.112,1.839-0.707,3.592-1.611,5.196c0.137,2.85,0.025,5.712-0.355,8.54
c-0.272,2.027-0.87,4.306-2.69,5.238c-0.478,0.245-1.139,0.34-1.491-0.067c-0.445-0.514-0.022-1.286,0.335-1.865
c1.376-2.228,1.555-5.082,0.673-7.537c-0.071,0.063-0.137,0.132-0.208,0.194c-2.347,2.031-5.095,3.514-7.89,4.888
c0.31,1.107,0.71,2.198,1.148,3.232c1.398,3.301,3.08,6.771,2.463,10.302c-3.068-2.824-5.335-6.5-6.532-10.492
c0.111,1.654-0.519,4.693-0.208,6.325c-1.445-1.642-1.97-4.699-2.982-6.639C0.714,274.59,0.18,272.315,0.705,270.191z`;
export const cactusPath = `M3335 12366 l-390 -424 -130 0 c-140 1 -242 -16 -350 -57 l-62 -23
-494 332 c-422 284 -496 331 -509 319 -13 -11 -11 -16 10 -37 14 -12 197 -181
407 -375 l382 -351 -107 -108 c-59 -59 -127 -137 -151 -174 -24 -38 -48 -68
-55 -68 -6 0 -256 18 -556 40 -541 39 -559 39 -560 9 0 -4 10 -9 23 -12 1062
-243 1009 -230 1004 -251 -3 -12 -14 -57 -25 -101 -34 -129 -42 -201 -42 -362
0 -83 -3 -154 -7 -156 -5 -3 -246 13 -538 34 -291 21 -538 39 -547 39 -11 0
-18 -8 -18 -20 0 -11 3 -20 6 -20 6 0 148 -32 772 -176 178 -41 326 -74 328
-74 2 0 3 -86 2 -192 l-3 -192 -480 -108 c-264 -59 -481 -107 -482 -108 -7 -1
-2 -29 5 -33 4 -2 218 10 477 28 259 17 473 30 478 28 11 -6 9 -763 -3 -763
-5 0 -193 50 -416 111 -400 109 -424 113 -424 79 0 -3 191 -89 423 -192 l422
-187 0 -437 0 -438 -410 -63 c-225 -34 -411 -63 -412 -63 -2 0 -3 -9 -3 -20 0
-20 7 -20 415 -20 l415 0 0 -414 c0 -232 -4 -417 -9 -420 -5 -3 -244 -42 -532
-85 -288 -44 -543 -83 -567 -87 -32 -5 -42 -11 -42 -25 0 -18 22 -19 572 -21
l573 -3 3 -332 c2 -253 -1 -333 -10 -333 -6 0 -120 38 -252 84 -133 46 -366
128 -520 182 -224 78 -280 94 -287 83 -4 -8 -5 -17 -1 -21 4 -3 241 -131 527
-283 286 -153 526 -282 532 -287 10 -8 13 -65 13 -224 l0 -214 -22 0 c-13 0
-239 16 -503 35 -573 42 -545 41 -545 15 0 -11 7 -20 15 -20 8 0 101 -20 207
-44 106 -25 333 -77 503 -116 171 -39 318 -73 328 -76 16 -5 17 -27 17 -284 0
-153 -3 -281 -7 -283 -5 -2 -179 8 -388 24 -463 34 -425 33 -425 11 0 -16 53
-31 402 -111 221 -51 405 -94 410 -97 4 -3 8 -147 8 -320 l0 -314 -570 0 -570
0 0 -1494 c0 -822 4 -1496 8 -1498 4 -2 18 -40 30 -86 83 -314 316 -563 627
-669 159 -54 134 -53 1527 -53 1263 0 1292 0 1391 21 256 51 483 202 621 413
60 91 118 223 137 310 7 32 19 60 26 63 11 4 13 272 13 1499 l0 1494 -550 0
-550 0 2 332 3 333 300 12 c165 6 312 12 328 12 19 1 27 6 27 19 0 16 -33 22
-330 57 l-330 39 0 225 0 224 178 -6 c599 -22 584 -22 580 -1 -3 17 -49 28
-378 91 -206 40 -376 72 -378 73 -1 0 -1 95 0 211 l3 211 482 257 c266 141
483 258 483 261 0 33 -30 25 -391 -101 -473 -165 -571 -199 -576 -199 -1 0 -3
167 -3 370 0 273 3 370 12 370 6 0 228 -47 492 -105 265 -58 490 -107 501
-108 11 -1 21 5 23 15 2 12 -17 24 -80 48 -46 18 -164 63 -263 101 -99 39
-245 95 -325 126 -80 31 -192 75 -250 98 l-105 41 -3 241 -2 241 67 37 67 37
351 -42 c562 -67 545 -65 555 -49 6 8 5 16 -3 20 -7 4 -160 48 -342 98 -181
50 -337 95 -346 99 -13 5 17 29 115 92 72 46 216 141 320 210 104 69 213 137
242 152 123 63 175 152 221 382 l8 39 240 103 c132 57 245 105 250 107 6 2 7
8 2 12 -4 5 -98 -20 -210 -55 -111 -34 -221 -69 -245 -76 l-42 -13 2 166 3
166 344 148 c189 82 346 151 349 154 21 21 -48 3 -345 -89 -186 -58 -342 -106
-346 -106 -4 0 -7 103 -7 229 l0 229 356 152 c195 84 352 156 347 161 -4 4
-163 -41 -353 -100 l-345 -108 -6 236 c-7 239 -11 272 -55 383 l-18 47 101
321 c55 176 97 323 92 326 -11 6 -10 7 -139 -296 -63 -146 -114 -266 -115
-268 -2 -1 -25 11 -52 28 -31 20 -74 35 -116 42 -37 6 -67 14 -67 17 0 3 -18
147 -40 320 -22 173 -40 316 -40 318 0 1 -5 3 -11 3 -7 0 -8 -97 -4 -327 l7
-328 -49 -15 c-49 -15 -52 -15 -144 15 l-94 30 -85 198 c-47 108 -89 197 -94
197 -12 0 -4 -30 53 -212 27 -87 46 -158 42 -158 -3 0 -98 29 -211 64 l-205
64 -5 222 -5 222 285 -8 c157 -4 301 -8 320 -8 25 -1 35 4 38 16 4 19 13 17
-381 90 -281 52 -288 54 -293 78 -21 96 -107 303 -155 372 l-19 26 58 6 c31 3
244 19 472 36 538 39 520 37 520 61 0 14 -7 19 -27 19 -16 0 -224 16 -463 35
-239 19 -502 40 -585 46 -147 11 -151 12 -190 44 -60 49 -184 128 -235 149
-25 11 -46 21 -48 21 -1 1 132 202 296 446 282 419 311 470 273 469 -3 0 -181
-191 -396 -424z m783 -2148 l223 -32 27 -91 c27 -84 28 -93 15 -140 -8 -30
-13 -108 -13 -197 0 -147 0 -148 -22 -148 -13 0 -108 -7 -213 -15 -104 -8
-207 -15 -227 -15 l-38 0 0 335 c0 261 3 335 13 335 6 0 112 -14 235 -32z
m362 -55 c0 -5 -7 -16 -15 -26 -13 -18 -14 -18 -24 2 -15 28 -14 31 14 31 14
0 25 -3 25 -7z m-110 -882 l0 -220 -52 -5 c-29 -3 -123 -10 -208 -16 -85 -6
-174 -12 -197 -15 l-43 -5 0 184 0 183 238 55 c130 31 243 56 250 57 9 1 12
-49 12 -218z m-2 -432 l-3 -122 -220 -143 c-147 -96 -229 -144 -248 -144 l-27
0 2 212 3 211 225 53 c124 28 235 53 248 53 22 1 23 0 20 -120z`;
export const smallCactusPath = `M8443 8565 c-278 -112 -583 -373 -839 -717 -83 -111 -294 -428 -372
-559 -344 -573 -845 -2122 -1041 -3214 -23 -129 -37 -238 -47 -350 -3 -44 -9
-85 -13 -92 -13 -24 -306 502 -492 882 -173 353 -263 582 -323 820 -39 158
-93 535 -141 990 -41 382 -97 727 -152 935 -85 321 -196 537 -356 692 -54 53
-169 138 -187 138 -3 0 4 -53 16 -117 88 -441 146 -867 185 -1348 7 -82 12
-292 12 -465 -1 -325 -4 -371 -57 -775 -42 -320 -86 -801 -86 -942 0 -40 -4
-73 -9 -73 -4 0 -28 28 -52 63 -24 34 -98 130 -163 212 -856 1073 -1991 1776
-2939 1821 l-112 5 35 -28 c19 -15 90 -72 157 -126 278 -220 640 -563 922
-872 752 -826 1350 -1757 1802 -2810 42 -99 76 -181 74 -183 -1 -2 -58 20
-126 49 -768 321 -1358 511 -1860 598 -697 121 -1348 78 -1984 -130 -157 -51
-285 -102 -285 -112 0 -5 12 -6 28 -3 128 26 589 84 805 101 537 42 969 -12
1242 -154 158 -82 352 -249 770 -661 801 -790 1046 -1015 1409 -1294 542 -417
989 -640 1486 -740 401 -81 575 -98 980 -100 364 -1 410 4 685 74 105 26 255
62 335 80 253 56 392 112 730 291 223 117 311 171 430 259 476 354 1184 619
1818 681 146 14 440 6 545 -15 524 -106 1041 -365 1444 -724 l72 -64 -118 254
c-65 140 -139 287 -165 328 -151 233 -519 494 -1026 727 -415 190 -744 291
-1030 315 -287 24 -573 -13 -955 -123 -38 -11 -78 -22 -87 -25 -12 -4 5 41 61
163 108 233 121 267 201 539 81 278 113 367 185 521 271 576 791 1125 1391
1468 l99 57 -120 -6 c-185 -8 -316 -42 -500 -130 -142 -68 -690 -396 -823
-493 -238 -173 -449 -368 -852 -787 -168 -174 -408 -423 -534 -554 -219 -227
-328 -346 -389 -422 l-28 -35 21 55 c97 252 400 877 600 1235 223 400 390 671
680 1105 215 321 282 435 364 616 205 459 325 966 376 1604 13 156 16 696 4
827 l-7 88 -13 -60 c-7 -33 -22 -116 -34 -185 -92 -536 -163 -798 -300 -1111
-83 -187 -240 -445 -381 -625 -69 -87 -319 -408 -568 -729 -211 -271 -417
-517 -617 -737 -321 -353 -554 -670 -764 -1040 -24 -43 -47 -78 -50 -78 -4 0
-15 73 -26 162 -31 267 -25 643 17 1003 49 427 152 952 300 1525 180 699 487
1654 763 2379 36 96 65 175 64 177 -2 1 -40 -13 -85 -31z`;
export const birdPath = `M11797 7438 c-89 -125 -162 -212 -356 -430 -382 -427 -810 -798
-1147 -994 -74 -44 -188 -115 -252 -160 -181 -125 -184 -126 -111 -47 76 81
129 154 129 178 0 12 -7 15 -32 11 -278 -45 -452 -101 -617 -198 -64 -38 -132
-84 -151 -103 -43 -41 -842 -571 -1040 -689 -80 -48 -244 -137 -365 -197 -121
-61 -256 -130 -300 -154 -110 -60 -167 -81 -338 -125 -146 -37 -148 -37 -220
-24 -102 19 -307 86 -307 101 0 7 -10 18 -22 24 -64 33 -146 94 -137 100 19
11 1 28 -44 40 -23 6 -69 22 -102 35 -131 51 -173 59 -315 58 -311 -1 -549
-97 -591 -237 -7 -26 -19 -47 -26 -47 -30 0 -251 74 -373 125 -302 127 -481
231 -1082 626 -533 351 -845 536 -1006 598 -41 16 -76 21 -157 21 -58 0 -105
-4 -105 -8 0 -19 63 -105 126 -173 78 -83 78 -83 -71 22 -60 42 -166 110 -235
149 -214 124 -425 281 -678 504 -211 187 -509 502 -657 696 -50 66 -302 342
-317 348 -9 4 -8 -5 19 -113 60 -252 197 -536 350 -724 116 -144 183 -231 177
-231 -3 0 -75 52 -161 116 -175 129 -532 368 -539 361 -9 -9 157 -329 223
-431 36 -55 91 -132 123 -171 75 -91 275 -285 367 -355 40 -30 71 -56 69 -57
-2 -2 -106 43 -232 101 -323 146 -585 248 -600 233 -14 -13 120 -173 265 -317
288 -285 547 -471 769 -550 34 -13 61 -24 59 -26 -2 -2 -28 1 -58 6 -30 6
-143 12 -252 14 l-198 3 23 -25 c27 -29 221 -175 305 -229 32 -20 92 -52 133
-70 l75 -33 -55 0 c-66 0 -123 -15 -141 -36 -19 -23 14 -79 71 -122 64 -48
218 -144 268 -166 31 -14 42 -25 42 -41 0 -33 39 -62 141 -107 l94 -40 125 4
c69 3 134 8 145 12 11 5 4 -5 -15 -20 -108 -89 -170 -183 -170 -260 0 -45 5
-58 39 -99 21 -25 56 -58 77 -73 21 -14 58 -41 82 -59 24 -18 50 -33 58 -33
10 0 11 -6 4 -26 -16 -40 -12 -77 16 -166 29 -92 63 -145 98 -154 16 -4 26
-15 29 -33 8 -37 48 -84 106 -123 25 -17 61 -45 80 -61 25 -21 41 -28 62 -25
27 4 30 1 40 -36 16 -67 29 -92 58 -120 23 -22 40 -28 107 -34 l79 -7 -3 -43
c-5 -61 16 -140 42 -157 28 -19 154 -45 215 -45 l48 0 -10 -40 c-9 -33 -8 -43
5 -56 17 -18 233 -73 284 -74 28 0 91 16 137 35 13 6 17 2 17 -18 0 -39 28
-62 130 -105 125 -52 167 -65 191 -59 11 3 19 0 19 -8 0 -20 74 -81 116 -96
22 -8 74 -13 117 -12 l77 1 0 -29 c0 -36 27 -64 77 -79 30 -9 51 -8 103 3 36
9 72 18 81 22 13 5 18 -2 22 -33 7 -41 21 -56 105 -117 64 -45 135 -58 176
-31 24 15 25 15 36 -18 13 -39 48 -56 114 -55 64 1 106 21 125 58 15 28 24 34
59 36 67 5 127 43 213 133 54 57 84 82 94 78 9 -3 34 6 56 21 22 14 41 24 44
21 2 -2 11 -35 19 -73 13 -63 13 -70 -2 -81 -9 -7 -20 -10 -24 -8 -14 9 -96
-34 -110 -56 -7 -11 -80 -62 -162 -112 -141 -86 -339 -228 -418 -300 -49 -44
-108 -125 -108 -148 0 -24 83 -79 132 -86 44 -8 45 -11 17 -58 -37 -63 -16
-85 119 -126 48 -15 87 -21 113 -17 21 3 39 4 39 2 0 -2 -7 -31 -16 -65 -14
-56 -14 -63 0 -85 21 -32 47 -45 106 -52 l50 -6 0 -59 c0 -79 10 -94 69 -108
60 -14 102 -7 139 25 l28 24 12 -44 c6 -23 40 -85 74 -136 68 -101 89 -114
134 -85 21 15 24 15 24 1 0 -64 152 -245 206 -245 50 0 155 125 187 222 6 16
8 16 35 1 16 -9 36 -14 45 -10 22 8 136 180 154 233 l15 44 29 -21 c38 -27 93
-34 147 -20 52 15 65 37 60 112 l-3 59 35 1 c52 0 101 21 123 51 20 27 20 29
4 88 -9 33 -17 61 -17 62 0 2 28 4 63 4 60 1 181 38 214 65 19 16 16 49 -7 87
-25 40 -25 42 -2 42 28 0 141 59 151 79 35 64 -189 264 -527 470 -83 51 -157
102 -165 114 -15 23 -68 50 -119 61 -41 9 -37 47 7 72 13 8 20 22 20 43 0 35
3 37 31 16 10 -8 30 -15 44 -15 18 0 44 -21 96 -78 78 -85 152 -132 216 -137
35 -2 44 -8 59 -36 20 -39 62 -57 134 -58 63 -1 97 16 109 54 6 17 11 32 12
34 2 1 13 -4 26 -13 44 -31 99 -21 181 35 73 49 107 92 107 134 0 11 6 15 18
11 84 -26 152 -35 183 -25 50 17 79 47 79 83 l0 31 76 -3 c55 -3 88 0 121 13
49 19 113 70 113 90 0 8 18 14 48 17 48 5 256 88 281 113 8 7 14 27 15 44 1
24 5 30 16 25 97 -42 142 -43 292 -8 152 36 152 35 145 93 l-5 46 50 3 c60 3
182 28 208 42 26 14 44 75 43 148 l-1 62 47 0 c117 1 168 38 193 140 13 52 16
55 45 55 18 0 41 9 55 21 13 12 51 40 85 63 66 44 113 101 113 137 0 16 8 23
29 27 36 8 70 62 100 161 23 74 27 136 11 167 -9 15 -7 19 7 19 10 0 38 16 63
35 25 20 59 44 76 55 17 11 51 44 75 72 41 49 44 55 42 110 -1 72 -36 130
-126 215 l-62 58 142 -3 c135 -4 145 -3 210 23 124 50 163 79 163 121 0 16 9
25 32 33 40 14 203 113 269 164 53 41 91 92 87 117 -5 27 -69 50 -138 50 l-65
1 75 33 c42 18 102 49 133 69 72 47 273 196 310 230 26 25 36 60 19 71 -4 2
-113 -11 -242 -30 -129 -18 -242 -33 -250 -33 -8 0 12 10 45 23 199 77 393
205 635 422 58 51 132 122 166 156 92 96 234 278 234 300 0 22 -405 -145 -825
-339 -5 -2 8 10 30 29 283 236 406 368 534 570 70 112 226 416 218 425 -3 3
-52 -33 -109 -79 -158 -130 -434 -321 -549 -378 l-62 -32 54 69 c29 37 80 100
112 138 142 169 246 370 306 592 27 97 55 262 47 271 -2 1 -33 -39 -69 -90z`;
export const wormPath = `M1340 12585 c-274 -43 -451 -199 -521 -462 -26 -98 -38 -455 -20
-583 28 -189 103 -339 374 -749 301 -455 376 -619 365 -798 -4 -62 -12 -94
-40 -155 -80 -172 -183 -299 -307 -379 -76 -49 -176 -86 -411 -150 -304 -83
-461 -211 -603 -496 -52 -102 -113 -272 -147 -408 -23 -91 -29 -219 -23 -470
2 -49 3 -105 2 -124 0 -19 8 -46 19 -61 11 -14 25 -53 32 -86 23 -116 103
-392 156 -541 150 -421 380 -884 617 -1238 444 -664 923 -1065 1426 -1193 99
-25 121 -27 322 -27 144 0 224 4 240 12 13 6 61 21 107 33 238 61 499 198 773
406 188 142 351 288 664 594 116 113 224 212 241 221 16 9 38 31 47 50 16 33
283 290 440 423 175 148 345 260 490 322 279 120 534 99 829 -68 161 -91 375
-272 411 -348 14 -29 34 -52 57 -64 84 -45 305 -366 450 -654 213 -424 321
-831 321 -1202 0 -170 -15 -273 -55 -394 -63 -187 -311 -617 -375 -651 -34
-17 -45 -34 -55 -83 -6 -37 -107 -172 -275 -372 -211 -250 -672 -690 -724
-690 -32 0 -84 -38 -97 -71 -10 -22 -50 -55 -154 -124 -373 -248 -686 -369
-1024 -395 -228 -18 -384 -52 -540 -118 -409 -172 -692 -538 -692 -896 0 -161
41 -268 139 -366 92 -92 217 -140 484 -185 443 -75 974 -52 1442 60 439 106
745 243 1090 490 714 509 1369 1127 1772 1672 54 72 108 136 121 142 26 12 62
67 62 95 0 11 29 67 64 126 187 311 311 625 367 925 76 410 -9 1138 -215 1853
-174 600 -438 1181 -774 1702 -33 52 -72 109 -85 125 -14 17 -60 75 -103 130
-449 577 -971 933 -1534 1047 -101 20 -143 23 -355 23 -206 0 -257 -4 -360
-23 -606 -113 -1093 -319 -1532 -648 -63 -47 -134 -104 -159 -125 -25 -22 -60
-47 -77 -56 -18 -9 -37 -23 -44 -33 -22 -32 -669 -676 -749 -746 -112 -99
-196 -154 -233 -154 -21 0 -43 -11 -70 -35 -62 -56 -170 -79 -336 -72 -145 7
-203 20 -311 71 -113 54 -274 188 -274 229 0 8 -21 36 -46 63 -84 88 -192 344
-258 610 -32 125 -76 376 -69 387 3 5 5 33 4 64 0 46 5 63 29 98 58 85 111
124 546 407 268 175 406 294 512 443 138 195 176 380 137 671 -59 449 -219
1067 -471 1824 -69 206 -132 413 -140 460 -33 193 -110 373 -208 492 -163 197
-387 269 -686 223z`;
export const discoConsumablePath = `M6367 12718 c-93 -200 -255 -894 -313 -1352 l-18 -138 -49 52 c-27
28 -55 49 -61 47 -15 -6 -62 -102 -93 -190 -38 -110 -55 -204 -62 -344 l-6
-132 -65 44 c-36 25 -68 45 -72 45 -12 0 -37 -97 -54 -210 -19 -128 -30 -537
-16 -597 5 -24 8 -43 6 -43 -2 0 -36 25 -76 55 -40 30 -95 66 -123 80 -46 23
-51 24 -62 9 -21 -28 -26 -100 -20 -278 8 -236 46 -413 119 -559 16 -33 23
-55 16 -51 -7 4 -62 40 -123 80 -122 80 -181 111 -192 101 -13 -14 -22 -134
-17 -232 12 -216 55 -394 125 -508 46 -76 34 -84 -55 -36 -217 116 -211 117
-210 -22 1 -106 36 -254 99 -425 39 -104 114 -260 147 -307 11 -16 18 -31 15
-33 -8 -8 -84 28 -182 85 -48 29 -94 50 -101 47 -23 -9 -34 -52 -34 -130 0
-183 107 -424 264 -593 l58 -63 -31 0 c-17 0 -73 9 -124 21 l-92 20 -18 -22
c-15 -18 -17 -33 -12 -73 14 -109 94 -307 200 -496 31 -56 54 -104 50 -108 -4
-4 -42 12 -86 36 -43 23 -85 42 -92 42 -8 0 -22 -9 -32 -20 -40 -44 11 -273
99 -447 40 -81 145 -240 175 -267 12 -11 21 -22 21 -26 0 -4 -34 -10 -76 -12
-59 -4 -80 -10 -97 -26 -21 -21 -21 -22 -3 -79 10 -31 60 -145 111 -253 83
-173 135 -291 135 -305 0 -3 -14 -5 -30 -5 -24 0 -33 6 -42 28 -7 15 -23 44
-35 65 -31 50 -58 49 -121 -8 l-49 -45 -7 50 c-35 261 -254 633 -324 548 -5
-7 -15 -38 -21 -69 -7 -31 -17 -64 -24 -73 -11 -15 -15 -10 -31 41 -53 171
-151 372 -218 448 -50 58 -68 48 -137 -74 -19 -34 -37 -61 -41 -61 -4 0 -12
39 -19 88 -23 163 -75 299 -159 411 -67 88 -148 145 -170 118 -5 -7 -17 -50
-26 -97 -20 -99 -35 -150 -44 -150 -4 0 -18 35 -31 77 -62 200 -300 573 -365
573 -23 0 -44 -38 -56 -100 -16 -76 -40 -150 -50 -150 -4 0 -11 17 -15 38 -16
90 -116 249 -232 369 -69 70 -159 143 -179 143 -16 0 -28 -44 -49 -184 -8 -61
-18 -112 -20 -115 -3 -2 -10 11 -16 29 -50 141 -221 359 -388 492 -40 32 -81
58 -89 56 -21 -4 -39 -67 -47 -166 l-7 -79 -76 78 c-88 93 -276 242 -399 317
-47 28 -89 52 -94 52 -4 0 -13 -31 -20 -69 l-12 -69 -78 63 c-91 74 -189 133
-279 169 -78 30 -148 49 -158 42 -5 -3 -5 -31 -1 -63 3 -32 5 -59 5 -60 -1 -1
-24 14 -52 33 -350 253 -1089 652 -1131 611 -11 -12 73 -168 176 -325 147
-223 345 -489 513 -689 l77 -92 -62 -3 c-60 -3 -62 -4 -59 -28 6 -46 81 -188
142 -269 34 -44 91 -107 128 -141 60 -54 64 -60 41 -60 -30 0 -119 -29 -119
-38 0 -4 30 -46 66 -94 82 -111 294 -323 375 -377 34 -22 55 -43 48 -45 -8 -2
-50 -11 -94 -21 -83 -18 -135 -39 -135 -54 0 -15 63 -85 130 -146 135 -119
306 -224 435 -266 l70 -23 -60 -17 c-33 -10 -97 -28 -143 -40 -47 -12 -86 -28
-89 -36 -8 -21 104 -131 207 -204 108 -77 226 -134 314 -152 69 -13 69 -14 46
-30 -13 -9 -60 -29 -105 -43 -44 -14 -89 -35 -99 -45 -18 -16 -18 -19 -3 -42
53 -81 455 -271 621 -293 26 -4 49 -10 52 -15 7 -12 -39 -33 -138 -63 -47 -15
-91 -32 -97 -39 -14 -18 16 -65 70 -109 128 -102 299 -158 485 -158 55 0 94
-4 94 -10 0 -5 -34 -35 -76 -66 -41 -31 -78 -62 -81 -70 -21 -54 228 -168 480
-220 49 -10 86 -23 84 -29 -2 -5 -32 -20 -67 -33 -35 -12 -70 -28 -77 -34 -40
-33 15 -92 142 -153 116 -57 243 -93 377 -108 l107 -12 -35 -44 c-19 -25 -37
-56 -41 -69 -11 -46 0 -51 363 -162 93 -28 102 -33 117 -66 21 -42 21 -40 2
-48 -9 -3 -46 9 -83 28 -136 68 -261 102 -277 76 -4 -6 -1 -34 6 -64 6 -29 10
-58 8 -64 -2 -6 -31 10 -64 35 -78 59 -159 98 -240 113 -65 12 -129 8 -140
-10 -3 -5 12 -40 35 -77 39 -64 48 -88 33 -81 -5 2 -43 20 -85 40 -99 49 -234
88 -325 95 -91 7 -100 -5 -55 -77 32 -51 50 -95 36 -88 -127 62 -208 80 -347
76 -60 -2 -102 -7 -104 -14 -2 -6 19 -44 47 -85 27 -40 50 -77 50 -81 0 -4
-20 2 -43 12 -83 37 -177 53 -314 54 -88 1 -136 -3 -144 -11 -8 -8 -2 -25 26
-67 20 -31 41 -59 46 -62 24 -14 1 -19 -83 -16 -148 6 -378 -27 -378 -52 0 -8
9 -25 20 -39 11 -14 20 -27 20 -30 0 -2 -38 -7 -84 -10 -89 -6 -232 -48 -269
-78 l-22 -17 28 -30 28 -29 -78 -12 c-300 -47 -793 -178 -793 -211 0 -33 413
-130 754 -177 l128 -17 -33 -27 -32 -26 24 -17 c44 -30 179 -67 274 -73 l92
-6 -24 -35 c-13 -20 -20 -39 -15 -44 19 -19 138 -32 298 -32 l171 -1 -39 -56
c-21 -31 -38 -64 -38 -72 0 -52 337 -20 461 44 23 11 42 19 44 17 2 -2 -19
-37 -46 -78 -70 -107 -69 -110 40 -110 117 0 220 22 303 64 l67 33 -10 -25
c-6 -14 -22 -47 -36 -72 -33 -59 -27 -80 24 -80 66 0 224 49 336 103 71 35
107 48 107 39 0 -8 -16 -41 -35 -73 -19 -33 -35 -64 -35 -68 0 -27 97 -28 181
-1 82 25 150 65 218 126 l54 49 -6 -40 c-4 -22 -10 -56 -13 -76 -5 -32 -3 -38
15 -44 41 -13 192 46 337 131 24 14 44 23 44 20 0 -4 -12 -30 -26 -58 -25 -49
-25 -52 -8 -65 22 -16 25 -16 102 2 75 18 188 73 259 126 29 21 55 39 58 39 3
0 5 -14 5 -31 0 -53 17 -72 56 -64 26 4 42 1 64 -15 17 -12 30 -24 30 -28 0
-4 -28 -8 -61 -10 -81 -4 -165 -37 -209 -80 -33 -33 -34 -35 -15 -43 11 -5 38
-16 60 -25 l40 -16 -85 -27 c-119 -38 -230 -101 -230 -131 0 -4 22 -16 50 -25
56 -19 73 -35 37 -35 -36 0 -136 -54 -194 -105 -29 -26 -53 -51 -53 -55 0 -5
28 -18 63 -28 l62 -18 -57 -26 c-71 -33 -130 -73 -186 -128 -49 -48 -47 -56
22 -73 l47 -12 -47 -35 c-44 -33 -184 -185 -184 -200 0 -4 14 -10 31 -14 l32
-6 -45 -48 c-45 -48 -90 -119 -103 -159 -6 -21 -3 -23 25 -23 l32 0 -48 -53
c-89 -97 -324 -449 -305 -455 27 -9 287 128 459 241 l82 55 0 -29 c0 -17 5
-29 13 -29 24 0 154 68 190 100 l37 32 0 -31 c0 -20 5 -31 14 -31 19 0 121 71
192 134 l62 55 6 -49 c4 -27 10 -52 15 -55 22 -13 156 123 200 205 31 57 34
56 46 -32 3 -27 11 -48 17 -48 24 0 139 131 168 191 17 36 31 56 34 48 3 -8
10 -33 16 -56 6 -24 15 -43 19 -43 12 0 72 68 100 114 13 21 39 72 57 113 l32
75 11 -38 c6 -22 11 -47 11 -56 0 -35 23 -28 70 20 38 39 54 66 69 117 12 37
21 81 22 99 l0 31 17 -24 c9 -14 25 -34 35 -45 l17 -21 21 25 c25 30 81 139
98 193 16 46 27 47 35 2 8 -39 32 -47 59 -17 30 33 77 134 89 192 13 63 18 69
38 45 20 -24 48 -18 64 14 9 16 26 58 40 94 14 36 30 75 36 87 l12 22 22 -21
c22 -21 23 -21 40 -2 23 25 41 86 56 196 7 50 15 92 17 94 2 3 10 -5 19 -17
37 -53 45 -36 118 248 25 96 52 193 61 215 l15 40 -5 -65 c-3 -36 -15 -155
-26 -265 -30 -308 -34 -540 -14 -725 61 -570 66 -634 72 -913 l6 -287 57 0 57
0 7 46 c10 73 7 359 -5 501 -5 70 -21 217 -35 327 -48 398 -51 715 -9 1146 8
85 18 186 21 223 4 37 10 64 15 60 7 -7 124 -393 149 -490 6 -24 21 -55 34
-70 l24 -28 23 29 23 29 18 -113 c19 -116 48 -200 69 -200 7 0 20 7 30 16 21
19 24 15 69 -102 29 -76 54 -114 73 -114 6 0 21 10 34 22 l23 21 0 -25 c0 -57
61 -197 104 -237 30 -29 50 -19 61 32 l7 32 17 -50 c39 -110 94 -205 120 -205
4 0 18 19 31 43 l24 42 13 -62 c7 -35 24 -87 38 -117 26 -55 89 -121 105 -111
5 3 14 30 20 60 6 31 16 53 21 50 5 -4 9 -13 9 -21 0 -48 147 -280 173 -271
11 3 19 25 32 82 6 29 7 28 37 -34 29 -60 142 -191 166 -191 10 0 15 17 28 99
l6 44 26 -54 c25 -52 176 -219 199 -219 13 0 23 34 23 78 0 17 1 32 3 32 2 0
26 -21 53 -46 27 -25 85 -69 129 -99 l80 -54 8 30 8 30 38 -30 c43 -35 157
-91 183 -91 14 0 16 6 11 31 l-6 32 74 -50 c152 -102 430 -253 466 -253 32 0
-108 219 -269 420 -66 83 -67 85 -42 88 22 3 25 7 19 30 -10 40 -55 112 -101
160 l-42 43 29 6 c16 3 29 9 29 13 0 20 -114 146 -182 200 l-46 37 54 12 c30
7 54 18 54 24 0 25 -118 120 -198 160 l-84 41 58 16 c32 9 59 21 61 26 11 33
-178 164 -236 164 -37 0 -22 18 29 35 29 10 50 23 50 31 0 29 -183 123 -272
139 -47 9 -40 22 18 36 24 6 47 15 49 19 3 5 -6 22 -20 38 -35 42 -116 74
-202 80 -40 2 -73 8 -73 12 0 17 58 45 95 45 39 0 39 1 48 45 5 25 10 47 12
48 2 2 27 -15 55 -37 104 -82 296 -155 346 -132 29 13 30 21 4 71 -11 22 -20
43 -20 49 0 5 39 -13 88 -40 88 -50 190 -92 250 -104 48 -10 61 6 51 58 -4 23
-8 53 -9 65 0 24 1 24 38 -8 67 -56 145 -103 212 -127 76 -26 177 -31 186 -9
3 8 -11 45 -30 83 -20 38 -36 72 -36 76 0 4 33 -10 73 -32 140 -77 400 -146
421 -112 4 6 -9 43 -28 81 -43 83 -45 98 -8 71 62 -43 179 -73 310 -79 143 -6
142 -6 83 85 -69 107 -69 104 -2 77 110 -45 310 -74 405 -60 42 7 46 9 40 29
-4 12 -19 40 -34 62 -14 22 -29 45 -32 50 -4 6 54 10 165 11 148 0 270 13 299
31 5 2 -3 21 -17 41 l-25 37 85 7 c47 4 113 15 147 23 63 17 148 53 148 63 0
3 -11 18 -25 32 l-25 27 154 21 c331 47 716 139 716 172 0 33 -461 158 -763
206 l-108 17 30 24 c17 14 31 29 31 34 0 16 -117 65 -197 83 -40 9 -97 16
-128 16 l-55 0 26 40 c15 22 24 43 22 46 -17 16 -190 37 -324 38 l-151 1 44
63 c25 34 43 69 40 76 -18 46 -336 23 -462 -33 -26 -11 -42 -15 -38 -8 4 7 29
45 55 86 26 40 45 77 42 82 -8 14 -202 10 -277 -6 -38 -8 -94 -26 -124 -40
-31 -14 -57 -25 -59 -25 -7 0 10 35 38 81 15 25 28 56 28 69 0 22 -2 23 -77
17 -89 -6 -244 -52 -346 -103 -43 -22 -67 -30 -67 -22 0 7 16 39 35 71 41 68
42 73 13 88 -69 37 -286 -42 -397 -145 l-34 -31 7 35 c19 99 19 119 0 127 -27
10 -135 -22 -246 -74 -111 -52 -133 -50 -98 10 19 32 31 39 108 62 199 59 319
98 345 111 41 22 35 62 -19 127 -13 16 -24 33 -24 38 0 5 22 9 49 9 216 0 581
148 581 235 0 25 -33 55 -60 55 -20 1 -104 39 -98 45 3 3 59 19 124 35 205 50
345 105 407 160 20 17 37 38 37 45 0 8 -35 40 -77 72 -86 65 -98 82 -54 75 40
-6 212 14 286 33 131 33 294 135 330 205 19 36 15 39 -112 79 -138 44 -144 54
-46 76 212 47 583 230 610 302 9 24 -29 50 -110 74 -110 32 -162 69 -99 69 79
0 244 76 372 171 93 68 190 162 190 182 0 15 -44 33 -140 57 -25 6 -70 19
-100 27 l-54 16 74 26 c96 34 214 97 314 169 95 68 246 213 246 237 0 21 -46
39 -153 62 -48 9 -87 21 -87 25 0 5 5 8 11 8 21 0 133 95 242 204 102 104 247
277 247 297 0 8 -43 22 -107 35 l-31 6 69 66 c39 36 92 95 120 131 53 71 136
230 141 271 3 24 1 25 -60 25 -34 0 -62 3 -62 6 0 3 12 16 26 30 35 32 230
275 344 429 202 273 418 625 397 646 -11 11 -156 -46 -299 -117 -238 -119
-636 -354 -807 -477 -40 -29 -75 -52 -76 -50 -1 2 1 29 4 61 l7 57 -30 0 c-47
-1 -196 -61 -287 -116 -45 -27 -109 -74 -143 -106 l-62 -56 -11 65 c-7 36 -14
67 -17 71 -27 26 -398 -245 -518 -378 l-55 -60 -6 75 c-8 85 -25 163 -39 171
-30 19 -249 -178 -356 -321 -53 -70 -132 -215 -132 -241 0 -8 -4 -14 -8 -14
-5 0 -17 55 -26 122 -21 139 -32 178 -51 178 -20 0 -118 -84 -197 -168 -104
-111 -174 -222 -208 -332 l-18 -55 -16 38 c-9 21 -22 64 -27 95 -15 81 -34
122 -57 122 -10 0 -44 -26 -75 -58 -102 -107 -226 -323 -292 -506 -29 -81 -34
-87 -44 -68 -6 12 -20 65 -31 118 -11 52 -22 100 -26 105 -30 49 -173 -82
-242 -222 -43 -87 -91 -253 -93 -318 0 -20 -4 -45 -8 -55 -7 -18 -9 -17 -27
10 -11 16 -35 55 -54 87 -45 75 -65 75 -121 5 -51 -64 -134 -237 -184 -380
-21 -59 -41 -105 -45 -103 -5 3 -14 29 -20 57 -16 69 -37 108 -56 108 -31 0
-78 -45 -132 -128 -84 -129 -134 -260 -169 -442 l-8 -45 -51 48 c-28 26 -58
47 -66 47 -20 0 -51 -36 -77 -87 -18 -37 -26 -43 -52 -43 -38 0 -38 -1 48 185
198 426 199 428 164 459 -15 14 -42 20 -96 24 -41 2 -75 8 -75 12 0 4 9 15 21
26 30 27 135 186 175 267 88 174 139 403 99 447 -25 28 -37 26 -120 -20 -95
-52 -113 -53 -82 -2 93 150 198 383 228 506 23 99 23 108 1 136 l-17 21 -95
-20 c-52 -12 -107 -21 -123 -21 -29 0 -29 0 29 62 158 171 264 410 264 594 0
78 -11 121 -34 130 -7 3 -47 -15 -88 -40 -88 -53 -187 -100 -195 -93 -3 3 5
20 17 36 39 56 131 260 170 381 51 153 82 306 78 383 -4 84 -18 91 -100 47
-213 -114 -224 -115 -168 -23 37 62 79 180 100 282 28 139 34 412 10 451 -11
18 -40 6 -153 -69 -56 -37 -119 -77 -140 -90 l-39 -24 28 54 c40 79 71 178 96
303 19 93 23 145 23 318 0 251 -2 255 -83 211 -28 -16 -82 -50 -119 -78 -37
-27 -71 -51 -75 -53 -3 -2 -2 16 4 40 14 61 3 469 -16 598 -17 113 -42 210
-54 210 -4 0 -36 -20 -72 -45 l-65 -44 -6 132 c-9 176 -46 333 -110 457 -48
93 -42 91 -102 32 l-54 -54 -8 69 c-21 203 -122 727 -194 1013 -64 252 -137
460 -161 460 -5 0 -20 -24 -33 -52z`;
//imageURL
export const startMenuBackgroundIMGUrl="https://live.staticflickr.com/65535/48701594348_e099758f0c_b.jpg";
export const gameOverMenuBackgroundIMGUrl="https://images.unsplash.com/photo-1573595015625-ac674ed1d155?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80";
