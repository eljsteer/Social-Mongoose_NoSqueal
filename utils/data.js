const names = [
  'Aaran',
  'Aaren',
  'Aarez',
  'Aarman',
  'Aaron',
  'Aaron-James',
  'Aarron',
  'Aaryan',
  'Aaryn',
  'Aayan',
  'Aazaan',
  'Abaan',
  'Abbas',
  'Abdallah',
  'Abdalroof',
  'Abdihakim',
  'Abdirahman',
  'Abdisalam',
  'Abdul',
  'Abdul-Aziz',
  'Abdulbasir',
  'Abdulkadir',
  'Abdulkarem',
  'Smith',
  'Jones',
  'Matthew',
  'Andrew',
  'Ze',
  'Zechariah',
  'Zeek',
  'Zeeshan',
  'Zeid',
  'Zein',
  'Zen',
  'Zendel',
  'Zenith',
  'Zennon',
  'Zeph',
  'Zerah',
  'Zhen',
  'Zhi',
  'Zhong',
  'Zhuo',
  'Zi',
  'Zidane',
  'Zijie',
  'Zinedine',
  'Zion',
  'Zishan',
  'Ziya',
  'Ziyaan',
  'Zohaib',
  'Zohair',
  'Zoubaeir',
  'Zubair',
  'Zubayr',
  'Zuriel',
  'Xander',
  'Jared',
  'Courtney',
  'Gillian',
  'Clark',
  'Jared',
  'Grace',
  'Kelsey',
  'Alexi',
  'Alex',
  'Mark',
  'Tamar',
  'Farish',
  'Robert',
  'Nathaniel',
  'Parker',
];

// const thoughts = [
//   'This is the Best Decision Tracker',
//   'Trialling new Development Tools',
//   'I am trying to Learn Piano',
//   'No Netflix and Chill for me, I am Starbase Defender and Chill',
//   'Tower Defense or No defense, just let everyone in for a party',
//   'Monopoly Money Manager, is the new Bank on the blockchain',
//   'Movie trailers are the best sort of trailer, they carry a story',
//   'Hello world, Don\'t want it to be soon before I say Goodbye World',
//   'Stupid Social Media App, Funny you say that',
//   'Notes, notes and more notes',
//   'Messages, to me, myself and I',
//   'Email, Flail and then Sail out to Sea with nothing but a Pail',
//   'Compass, the new sexy Tattoo... Bite Me',
//   'Firefox, A bit cruel to light Foxes on fire except if it is a Flareon or Fennekin',
//   'Running app, Should make one for babies, crawling app',
//   'Cooking app, is boring, just bring me the food',
//   'Poker, a good game, but try not to Poke her',
// ];

// Get a random item given an array


class RandomUser {
  constructor () {
  this.name1 = this.getRandomArrItem(names);
  this.name2 = this.getRandomArrItem(names);
  }

  getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];


  // Gets a random full name
  getRandomUsername = () => {
    console.log(this.name1, this.name2)
    const userName = `${name1} ${name2}`;
    return userName;
  }

  // creates a random email
  getRandomEmail = (name1, name2) => {

    console.log(this.name1, this.name2)

    const userEmail = `${this.name1}${this.name2}@gmail.com`;
    return userEmail;
  };
}

// Export the functions for use in seed.js
module.exports = { RandomUser };
