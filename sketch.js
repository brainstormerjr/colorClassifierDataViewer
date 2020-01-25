let rawData;
let data;
let rez = 10;
let countP;

//setup and initialize firebase
const firebaseConfig = {
  apiKey: "AIzaSyDfFeyVZhm-djmgz4fCRXS1RgFRVf99mZY",
  authDomain: "color-classification-e92cd.firebaseapp.com",
  databaseURL: "https://color-classification-e92cd.firebaseio.com",
  projectId: "color-classification-e92cd",
  storageBucket: "color-classification-e92cd.appspot.com",
  messagingSenderId: "95381377312",
  appId: "1:95381377312:web:07003c3e2b2cb35dbbc745"
};
firebase.initializeApp(firebaseConfig);
let database = firebase.database();


function setup() {
  createCanvas(400, 400);
  countP = createP('Database size: ');
}

function gotData(data) {
  //print(data.val());
  rawData = data.val();
  print('got data!');
}

function draw() {
  database.ref('colors').once('value', gotData);
  background(51);
  if (rawData) {
    let x = 0;
    let y = 0;

    let count = 0;
    for (let key in rawData) {
      let r = rawData[key].r;
      let g = rawData[key].g;
      let b = rawData[key].b;
      let c = color(r, g, b);
      fill(c);
      noStroke();
      rect(x, y, rez, rez);

      x += rez;

      if (x >= width) {
        x = 0;
        y += rez;
      }
      count++;
    }
    countP.html(`Database size: ${count}`);
  }
}
