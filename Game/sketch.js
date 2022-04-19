let whiteLetters = ["SpaceWhite.png", "AWhite.png", "BWhite.png", "CWhite.png", "DWhite.png", "EWhite.png",
"FWhite.png", "GWhite.png", "HWhite.png", "IWhite.png", "JWhite.png", "KWhite.png", "LWhite.png",
"MWhite.png", "NWhite.png", "OWhite.png", "PWhite.png", "QWhite.png", "RWhite.png", "SWhite.png",
 "TWhite.png", "UWhite.png", "VWhite.png", "WWhite.png", "XWhite.png", "YWhite.png", "ZWhite.png"];
let whiteLettersLoaded = [];
let blackLetters = ["SpaceBlack.png", "ABlack.png", "BBlack.png", "CBlack.png", "DBlack.png", "EBlack.png",
"FBlack.png", "GBlack.png", "HBlack.png", "IBlack.png", "JBlack.png", "KBlack.png", "LBlack.png",
"MBlack.png", "NBlack.png", "OBlack.png", "PBlack.png", "QBlack.png", "RBlack.png", "SBlack.png", 
"TBlack.png", "UBlack.png", "VBlack.png", "WBlack.png", "XBlack.png", "YBlack.png", "ZBlack.png"];
let blackLettersLoaded = [];
let pinkLetters = ["SpacePink.png", "APink.png", "BPink.png", "CPink.png", "DPink.png", "EPink.png",
"FPink.png", "GPink.png", "HPink.png", "IPink.png", "JPink.png", "KPink.png", "LPink.png",
"MPink.png", "NPink.png", "OPink.png", "PPink.png", "QPink.png", "RPink.png", "SPink.png", 
"TPink.png", "UPink.png", "VPink.png", "WPink.png", "XPink.png", "YPink.png", "ZPink.png"];
let pinkLettersLoaded = [];

let letters = [" ", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

let imageBackLoaded;
let imageEnterLoaded;
let imageHintLoaded;

let songObjects = [];
let storeUserLetter = [];
let storeUserLetterIndexes = [];
let randomSong;
let randomImage;
let tries = 0;

// used in order to store different attributes of a song
// stores song name, images and link
class Song {
  constructor() {
    // use charAt to traverse string
    this.songName = "";
    this.songImages = [];
    this.songLink = "";
  }

  // sets the song name in the class
  setSongName(theSong) {
    this.songName = theSong;
  }

  // sets the link
  setSongLink(theLink) {
    this.songLink = createA(theLink, 'Click to watch the song!');
  }

  // sets the image hints
  setSongImages(image1, image2, image3) {
    this.songImages[0] = image1;
    this.songImages[1] = image2;
    this.songImages[2] = image3;
  }


  // used to set the initial board based on the song name
  setGameBoard() {
    // going through each row (try)
    for (let i = 0; i < 5; i++) {
      // goes through each letter in word and displays blank tile
      for (let j = 0; j < this.songName.length; j++) {
      image(whiteLettersLoaded[0], windowWidth/2 + (j - this.songName.length/2) * 50, 50 + i * 50, 50, 50);
      }
    }
  }

  // used to get the song name
  getSongName() {
    return this.songName;
  }

  // gets the song link
  getSongLink() {
    return this.songLink;
  }

  // used to get the song image for hint
  getSongImage(position) {
    return this.songImages[position];
  }
}

// used to load the images in advance
function preload() {
  for (let i = 0; i < 27; i++) {
    whiteLettersLoaded[i] = loadImage(whiteLetters[i]);
    blackLettersLoaded[i] = loadImage(blackLetters[i]);
    pinkLettersLoaded[i] = loadImage(pinkLetters[i]);
  }
  imageBackLoaded = loadImage("Back.png");
  imageEnterLoaded = loadImage("Enter.png");
  imageHintLoaded = loadImage("Hint.png");
}


// sets up the game
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  // loads letters and centers it
  for (let i = 13; i >= 0; i--) {
    image(whiteLettersLoaded[i], windowWidth/2 - (13 - i) * 50, windowHeight - 150, 50, 50);
  }
  for (let i = 14; i < 27; i++) {
    image(whiteLettersLoaded[i], windowWidth/2 + (i - 13) * 50, windowHeight - 150, 50, 50);
  }
  image(imageBackLoaded, windowWidth/2  - 50, windowHeight - 200, 50, 50);
  image(imageEnterLoaded, windowWidth/2  + 50, windowHeight - 200,  100, 50);
  image(imageHintLoaded, 10, windowHeight - 200,  100, 50);

  // choosing the song to know what baord to set up
  randomSong = random([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27]);
  randomImage = random([0, 1, 2]);

  // all song objects to set up an array of song objects
  // also loads the songs related to each song
  songObjects[0] = new Song();
  songObjects[0].setSongName("BOOMBAYAH");
  songObjects[0].setSongLink("https://www.youtube.com/watch?v=bwmSjveL3Lc");
  songObjects[0].setSongImages(loadImage("Boombayah1.png"), loadImage("Boombayah2.png"), loadImage("Boombayah3.png"));

  songObjects[1] = new Song();
  songObjects[1].setSongName("WHISTLE");
  songObjects[1].setSongLink("https://www.youtube.com/watch?v=dISNgvVpWlo");
  songObjects[1].setSongImages(loadImage("Whistle1.png"), loadImage("Whistle2.png"), loadImage("Whistle3.png"));

  songObjects[2] = new Song();
  songObjects[2].setSongName("STAY");
  songObjects[2].setSongLink("https://www.youtube.com/watch?v=FzVR_fymZw4c");
  songObjects[2].setSongImages(loadImage("Stay1.png"), loadImage("Stay2.png"), loadImage("Stay3.png"));

  songObjects[3] = new Song();
  songObjects[3].setSongName("PLAYING WITH FIRE");
  songObjects[3].setSongLink("https://www.youtube.com/watch?v=9pdj4iJD08s");
  songObjects[3].setSongImages(loadImage("PlayingWithFire1.png"), loadImage("PlayingWithFire2.png"), loadImage("PlayingWithFire3.png"));

  songObjects[4] = new Song();
  songObjects[4].setSongName("AS IF ITS YOUR LAST");
  songObjects[4].setSongLink("https://www.youtube.com/watch?v=Amq-qlqbjYA");
  songObjects[4].setSongImages(loadImage("AsIfItsYourLast1.png"), loadImage("AsIfItsYourLast2.png"), loadImage("AsIfItsYourLast3.png"));

  songObjects[5] = new Song();
  songObjects[5].setSongName("DDU DU DDU DU");
  songObjects[5].setSongLink("https://www.youtube.com/watch?v=IHNzOHi8sJs");
  songObjects[5].setSongImages(loadImage("DDU1.png"), loadImage("DDU2.png"), loadImage("DDU3.png"));

  songObjects[6] = new Song();
  songObjects[6].setSongName("KILL THIS LOVE");
  songObjects[6].setSongLink("https://www.youtube.com/watch?v=2S24-y0Ij3Y");
  songObjects[6].setSongImages(loadImage("KillThisLove1.png"), loadImage("KillThisLove2.png"), loadImage("KillThisLove3.png"));

  songObjects[7] = new Song();
  songObjects[7].setSongName("HOW YOU LIKE THAT");
  songObjects[7].setSongLink("https://www.youtube.com/watch?v=ioNng23DkIM");
  songObjects[7].setSongImages(loadImage("HowYouLikeThat1.png"), loadImage("HowYouLikeThat2.png"), loadImage("HowYouLikeThat3.png"));

  songObjects[8] = new Song();
  songObjects[8].setSongName("ICE CREAM");
  songObjects[8].setSongLink("https://www.youtube.com/watch?v=vRXZj0DzXIA");
  songObjects[8].setSongImages(loadImage("IceCream1.png"), loadImage("IceCream2.png"), loadImage("IceCream3.png"));

  songObjects[9] = new Song();
  songObjects[9].setSongName("LOVESICK GIRLS");
  songObjects[9].setSongLink("https://www.youtube.com/watch?v=dyRsYk0LyA8");
  songObjects[9].setSongImages(loadImage("LovesickGirls1.png"), loadImage("LovesickGirls2.png"), loadImage("LovesickGirls3.png"));

  songObjects[10] = new Song();
  songObjects[10].setSongName("FOREVER YOUNG");
  songObjects[10].setSongLink("https://www.youtube.com/watch?v=89kTb73csYg");
  songObjects[10].setSongImages(loadImage("ForeverYoung1.png"), loadImage("ForeverYoung2.png"), loadImage("ForeverYoung3.png"));

  songObjects[11] = new Song();
  songObjects[11].setSongName("SEE U LATER");
  songObjects[11].setSongLink("https://www.youtube.com/watch?v=OxAOeAGcCzc");
  songObjects[11].setSongImages(loadImage("SeeULater1.png"), loadImage("SeeULater2.png"), loadImage("SeeULater3.png"));

  songObjects[12] = new Song();
  songObjects[12].setSongName("REALLY");
  songObjects[12].setSongLink("https://www.youtube.com/watch?v=-eRyD4kvA-s");
  songObjects[12].setSongImages(loadImage("Really1.png"), loadImage("Really2.png"), loadImage("Really3.png"));

  songObjects[13] = new Song();
  songObjects[13].setSongName("DONT KNOW WHAT TO DO");
  songObjects[13].setSongLink("https://www.youtube.com/watch?v=bqzDuRz_P7g");
  songObjects[13].setSongImages(loadImage("DontKnow1.png"), loadImage("DontKnow2.png"), loadImage("DontKnow3.png"));

  songObjects[14] = new Song();
  songObjects[14].setSongName("KICK IT");
  songObjects[14].setSongLink("https://www.youtube.com/watch?v=Cc36IzG6FW0");
  songObjects[14].setSongImages(loadImage("KickIt1.png"), loadImage("KickIt2.png"), loadImage("KickIt3.png"));

  songObjects[15] = new Song();
  songObjects[15].setSongName("HOPE NOT");
  songObjects[15].setSongLink("https://www.youtube.com/watch?v=g1KLaUK0Gds");
  songObjects[15].setSongImages(loadImage("HopeNot1.png"), loadImage("HopeNot2.png"), loadImage("HopeNot3.png"));

  songObjects[16] = new Song();
  songObjects[16].setSongName("PRETTY SAVAGE");
  songObjects[16].setSongLink("https://www.youtube.com/watch?v=gU2HqP4NxUs");
  songObjects[16].setSongImages(loadImage("PrettySavage1.png"), loadImage("PrettySavage2.png"), loadImage("PrettySavage3.png"));

  songObjects[17] = new Song();
  songObjects[17].setSongName("BET YOU WANNA");
  songObjects[17].setSongLink("https://www.youtube.com/watch?v=gXBdvSj9F2I");
  songObjects[17].setSongImages(loadImage("BetYouWanna1.png"), loadImage("BetYouWanna2.png"), loadImage("BetYouWanna3.png"));

  songObjects[18] = new Song();
  songObjects[18].setSongName("YOU NEVER KNOW");
  songObjects[18].setSongLink("https://www.youtube.com/watch?v=Rrs8y05kx80");
  songObjects[18].setSongImages(loadImage("YouNeverKnow1.png"), loadImage("YouNeverKnow2.png"), loadImage("YouNeverKnow3.png"));

  songObjects[19] = new Song();
  songObjects[19].setSongName("CRAZY OVER YOU");
  songObjects[19].setSongLink("https://www.youtube.com/watch?v=QMhVtPmPAW8");
  songObjects[19].setSongImages(loadImage("CrazyOverYou1.png"), loadImage("CrazyOverYou2.png"), loadImage("CrazyOverYou3.png"));

  songObjects[20] = new Song();
  songObjects[20].setSongName("LOVE TO HATE ME");
  songObjects[20].setSongLink("https://www.youtube.com/watch?v=nKvvpz1LuvU");
  songObjects[20].setSongImages(loadImage("LoveToHateMe1.png"), loadImage("LoveToHateMe2.png"), loadImage("LoveToHateMe3.png"));

  songObjects[21] = new Song();
  songObjects[21].setSongName("KISS AND MAKE UP");
  songObjects[21].setSongLink("https://www.youtube.com/watch?v=jubpICnlc-Q");
  songObjects[21].setSongImages(loadImage("KissAndMakeUp1.png"), loadImage("KissAndMakeUp2.png"), loadImage("KissAndMakeUp3.png"));

  songObjects[22] = new Song();
  songObjects[22].setSongName("SOUR CANDY");
  songObjects[22].setSongLink("https://www.youtube.com/watch?v=XMTpYMWTMhg");
  songObjects[22].setSongImages(loadImage("SourCandy1.png"), loadImage("SourCandy2.png"), loadImage("SourCandy3.png"));

  songObjects[23] = new Song();
  songObjects[23].setSongName("SOLO");
  songObjects[23].setSongLink("https://www.youtube.com/watch?v=b73BI9eUkjM");
  songObjects[23].setSongImages(loadImage("Solo1.png"), loadImage("Solo2.png"), loadImage("Solo3.png"));

  songObjects[24] = new Song();
  songObjects[24].setSongName("ON THE GROUND");
  songObjects[24].setSongLink("https://www.youtube.com/watch?v=CKZvWhCqx1s");
  songObjects[24].setSongImages(loadImage("OnTheGround1.png"), loadImage("OnTheGround2.png"), loadImage("OnTheGround3.png"));

  songObjects[25] = new Song();
  songObjects[25].setSongName("GONE");
  songObjects[25].setSongLink("https://www.youtube.com/watch?v=K9_VFxzCuQ0");
  songObjects[25].setSongImages(loadImage("Gone1.png"), loadImage("Gone2.png"), loadImage("Gone3.png"));

  songObjects[26] = new Song();
  songObjects[26].setSongName("LALISA");
  songObjects[26].setSongLink("https://www.youtube.com/watch?v=awkkyBH2zEo");
  songObjects[26].setSongImages(loadImage("Lalisa1.png"), loadImage("Lalisa2.png"), loadImage("Lalisa3.png"));

  songObjects[27] = new Song();
  songObjects[27].setSongName("MONEY");
  songObjects[27].setSongLink("https://www.youtube.com/watch?v=dNCWe_6HAM8");
  songObjects[27].setSongImages(loadImage("Money1.png"), loadImage("Money2.png"), loadImage("Money3.png"));

  // used to display initial board based on randomly chosen song
  songObjects[randomSong].setGameBoard();
}

// checking for mouse clicks
function mouseClicked() {
  // thinks most likley letter was chosen based on mouseY position
  if (mouseY >  windowHeight - 150 && mouseY <  windowHeight - 100 && tries < 5) {
    determineLetter();
  }
  // thinks backspace, hint or enter was clicked
  if (mouseY >  windowHeight - 200 && mouseY <  windowHeight - 150 && tries < 5) {
    // backspace clicked
    if (mouseX > windowWidth/2  - 50 && mouseX < windowWidth/2 && tries < 5) {
      // removes letter from what the user had put
      storeUserLetter.pop();
      storeUserLetterIndexes.pop();
      // setting letter back to blank on the board
      image(whiteLettersLoaded[0], windowWidth/2 + (storeUserLetter.length - songObjects[randomSong].getSongName().length/2) * 50, 50 + tries * 50, 50, 50);
    }

    // means enter button was clicked
    if (mouseX > windowWidth/2  + 50 && mouseX < windowWidth/2 + 150 && tries < 5) {
      // user can only submit a valid guess when the word length and user guessed word are equal
      if (songObjects[randomSong].getSongName().length == storeUserLetter.length) {
        displayLetterColors();
      }
    }

    // hint clicked
    if (mouseX > 10 && mouseX < 110) {
      image(songObjects[randomSong].getSongImage(randomImage), 10, windowHeight - 400, 400, 200);
    }
  }
}

// dtermines if user clicked on letter and which letter
function determineLetter() {
  for (let i = 13; i >= 0; i--) {
    // checks for mouseX position and makes sure user can still guess a letter or not
    if (mouseX > (windowWidth/2 - (13 - i) * 50) && mouseX < (50 + windowWidth/2 - (13 - i) * 50) && storeUserLetter.length < songObjects[randomSong].getSongName().length) {
      // displays letter
      image(whiteLettersLoaded[i], windowWidth/2 + (storeUserLetter.length - songObjects[randomSong].getSongName().length/2) * 50, 50 + tries * 50, 50, 50);
      // adds letter to what user has guessed
      storeUserLetter.push(letters[i]);
      storeUserLetterIndexes.push(i);
    }
  }
  for (let i = 14; i < 27; i++) {
    // checks for mouseX position and makes sure user can still guess a letter or not
    if (mouseX > (windowWidth/2 + (i - 13) * 50) && mouseX < (50 + windowWidth/2 + (i - 13) * 50) && storeUserLetter.length < songObjects[randomSong].getSongName().length) {
      image(whiteLettersLoaded[i], windowWidth/2 + (storeUserLetter.length - songObjects[randomSong].getSongName().length/2) * 50, 50 + tries * 50, 50, 50);
      storeUserLetter.push(letters[i]);
      storeUserLetterIndexes.push(i);
    }
  }
}

// used to check board after user submitted
function displayLetterColors() {
  let countSameLetters = 0;
  // going through each letter user put on board
  for (let i = 0; i < storeUserLetter.length; i++) {
    changeBoardLetterColors(storeUserLetter[i], i, songObjects[randomSong].getSongName());
  }

  // going through each letter the user put
  for (let i = 0; i < storeUserLetter.length; i++) {
    // checking if the letters user put and song match
    if (storeUserLetter[i] == songObjects[randomSong].getSongName().charAt(i)) {
      image(pinkLettersLoaded[storeUserLetterIndexes[i]], windowWidth/2 + (i - songObjects[randomSong].getSongName().length/2) * 50, 50 + tries * 50, 50, 50);

      // checking what letters to change color in row of letters
      if (storeUserLetterIndexes[i] <= 13) {
        image(pinkLettersLoaded[storeUserLetterIndexes[i]], windowWidth/2 - (13 - storeUserLetterIndexes[i]) * 50, windowHeight - 150, 50, 50);
      } else {
        image(pinkLettersLoaded[storeUserLetterIndexes[i]], windowWidth/2 + (storeUserLetterIndexes[i] - 13) * 50, windowHeight - 150, 50, 50);
      }
      // keeping track if user guessed all letters with the right position correctly
      countSameLetters++;
    }
  }
  checkWin(countSameLetters);
}

// checking if the user won or lost the game
// moves onto new try
function checkWin(countSameLetters) {
  // checking that user guessed all letters correctly and was in same position
  if (countSameLetters == songObjects[randomSong].getSongName().length) {
    fill(color('pink'));
    textSize(50);
    text("YOU WON!!!", windowWidth/2  - 100, windowHeight - 225);
    (songObjects[randomSong].getSongLink()).position(windowWidth/2  - 50, windowHeight - 250);
  }

  // keeps track of how many tries user used
  tries++;
  // used up all tries so game over
  if (tries == 5 && countSameLetters != songObjects[randomSong].getSongName().length) {
    fill(color('pink'));
    textSize(50);
    text("You Lost :(", windowWidth/2  - 100, windowHeight - 225);

    // displaying what the song was
    fill(color('pink'));
    textSize(30);
    text("Song Was: " + songObjects[randomSong].getSongName(), 50, 50);
    (songObjects[randomSong].getSongLink()).position(windowWidth/2  - 50, windowHeight - 250)
  }

  // clears storeUserLetter array
  for (let i = 0; i < songObjects[randomSong].getSongName().length; i++) {
    storeUserLetter.pop();
    storeUserLetterIndexes.pop();
  }
}


// changes tiles on board and in line of letters
function changeBoardLetterColors(userLetter, position, songName) {
  // checking to see if letter conatined at word at all and changes tile
  for (let j = 0; j < songName.length; j++) {
    // same letter
    if (userLetter == songName.charAt(j)) {
      image(blackLettersLoaded[storeUserLetterIndexes[position]], windowWidth/2 + (position - songName.length/2) * 50, 50 + tries * 50, 50, 50);
      if (storeUserLetterIndexes[position] <= 13) {
        image(blackLettersLoaded[storeUserLetterIndexes[position]], windowWidth/2 - (13 - storeUserLetterIndexes[position]) * 50, windowHeight - 150, 50, 50);
      } else {
        image(blackLettersLoaded[storeUserLetterIndexes[position]], windowWidth/2 + (storeUserLetterIndexes[position] - 13) * 50, windowHeight - 150, 50, 50);
      }
    } 
  }
}



