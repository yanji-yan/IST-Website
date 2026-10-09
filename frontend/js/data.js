// Sample data. Replace with backend/API data later (see API_BASE in main.js).
// book("events/orientation-day", 4) -> images/events/orientation-day/1.jpg ... 4.jpg
// Optional captions, one [title, description] per photo, in order:
//   book("events/it-week", 4, [["Our CODM Award", "The story behind this photo."], ["Another title", "Another description."]])
// A photo with no caption just shows the event title.
const book = (folder, n, caps = []) => Array.from({length: n}, (_, i) => ({
  src: `images/${folder}/${i + 1}.jpg`, title: (caps[i] || [])[0], desc: (caps[i] || [])[1]
}));

// ---- Classmates: one line each ----------------------------------------------
// P(id, name, birthday, nickname, hobbies, motto, age)
//  - birthday: "YYYY-MM-DD" (age is then calculated automatically) or "MM-DD" if the year is unknown
//  - photo: put a square photo at images/students/<id>.jpg and it shows up by itself
//  - optional extra field you can add later: location
const P = (id, name, birthday, nickname, hobbies, motto, age) =>
  ({id, name, birthday, nickname, hobbies, motto, age, photo: `images/students/${id}.jpg`});

const STUDENTS = [
  P("agustin","Robelyn B. Agustin","2006-12-15","Rob",["Playing badminton and billiards","Watching K-dramas"],"Someday, I'll see the world."),
  P("alonsagay","Tomas James R. Alonsagay","2004-11-25","Tomato",["Playing online games","Volleyball"],"It is what it is"),
  P("arellano","Fredelyn S. Arellano","2007-06-23","Ely",["Doomscrolling","Ragebaiting"],"Que Sera, Sera"),
  P("cervatos","Lloela Marie Cervatos","2007-07-26","Lowis",["Reading","Drawing"],"Ars longa, vita brevis."),
  P("dela-cruz","Ellesha Kelly N. Dela Cruz","2007-09-13","Lesh",["Going on nature trips"],"Every parcel is a blessing."),
  P("dollentas","Geoffrey Jheanne P. Dollentas","2007-05-21","Geo, Yanji",["Badminton","Gaming","Coding"],"Hindi mahalaga ang magwagi, ang mahalaga ay ikaw ay nakibahagi."),
  P("delos-reyes","Xandie M. Delos Reyes","2006-04-24","Eggsandy",["Playing online games"],"Everything is possible if you are brave enough."),
  P("duque","Ashley M. Duque","2007-08-27","Ash",["Watching Thai series","Playing esports"],"Kung gusto, may paraan; kung ayaw, edi don't."),
  P("estrella","Rian D. Estrella","2007-05-21","Riana, Neng",["Watching anime","Reading comics"],"Happiness is not something you find, but something you create."),
  P("gardose","Mariel E. Gardose","2006-01-05","Ye",["Playing ukulele","Singing","Listening to music"],"Without God, everything is useless."),
  P("ginoy","Clovie D. Ginoy","2007-09-09","Clo, Wie",["Playing chess"],"Love is an inspiration, but don't make it a reason to fail your education."),
  P("herrera","John Louise P. Herrera","2007-09-16","JL",["Cooking"],"Risk leads to greatness."),
  P("macavinta","Sheila Sophie Mae M. Macavinta","2007-09-13","Soph, Peng, Shei",["Playing badminton and online games","Reading books","Watching K-dramas"],"Don't call me baby unless you mean it."),
  P("malicse","Armiashane I. Malicse","2006-06-25","Ming",["Painting, drawing, sketching","Collecting whimsical things"],"Seize the Day"),
  P("margarejo","Matt Justin R. Margarejo","2007-05-16","",["Cycling"],"As it begins, so it ends."),
  P("mojado","Pelliejoy A. Mojado","2005-03-23","Joy",["Singing","Dancing"],"Kung wala kang tiwala sa sarili mo, magtiwala ka sa katabi mo."),
  P("navarra","John Michael P. Navarra","2005-11-24","Micky, Khel, Maykel",["Magpa-baby","Playing ML, Hollow Knight and other platform games"],"Hindi ako mahina, kulang lang sa lambing."),
  P("regalado","Janellavin D. Regalado","2007-09-10","Ja",["Eating"],"Enjoy the little things."),
  P("rivera","April P. Rivera","2007-05-29","Pril, Ahira",["Playing online games","Watching movies/anime"],"Laban lang kahit mukhang kalaban."),
  P("rodrigora","Justin P. Rodrigora","2006-08-14","R",["Skateboarding","Daydreaming"],"I'm just a kid with a big dream."),
  P("salibio","Fritchie Kyla V. Salibio","2006-12-14","Chie, Kyla",["Singing","Playing badminton"],"Sometimes you win, but sometimes you learn."),
  P("soguilon","Kenzo I. Soguilon","2006-10-27","Kenz",["Watching anime","Playing sports and games","Coding"],"Let my name be forgotten, but let my warmth remain."),
  P("suante","John Emmanuel T. Suante","09-01","J-Em",["Playing billiards","Coding"],"Fix 1 bug, create 3 more.")   // birth year unknown
];

// ---- Extra roles (shown on the namecard) -------------------------------------
const ROLES = {
  dollentas: "Front End Developer",
  suante: "Back End Developer"
};

// ---- Officers, in order. Each one is a classmate above, so just list the id and the position. ----
// An officer is the SAME person object as the classmate (same namecard everywhere):
// the position is written onto the classmate, and OFFICERS just points to those same people.
const OFFICER_LIST = [
  ["regalado","Mayor"], ["cervatos","Vice Mayor"], ["arellano","Secretary"], ["mojado","Treasurer"], ["malicse","Auditor"],
  ["agustin","Councilor"], ["dollentas","Councilor"], ["estrella","Councilor"], ["macavinta","Councilor"], ["soguilon","Councilor"]
];
STUDENTS.forEach((s, n) => { s.num = n; if (ROLES[s.id]) s.role = ROLES[s.id]; });   // num = stable colour for the card
OFFICER_LIST.forEach(([id, position]) => { STUDENTS.find(s => s.id === id).position = position; });
const OFFICERS = OFFICER_LIST.map(([id]) => STUDENTS.find(s => s.id === id));

const DATA = {
  // Hero photos: drop files named class-1.jpg ... class-12.jpg into images/class/
  photos: Array.from({length: 12}, (_, i) => `images/class/class-${i + 1}.jpg`),

  students: STUDENTS,
  officers: OFFICERS,

  // photos: the pages of the photo book. First photo is also the card cover.
  events: [
    {title:"Orientation Day",date:"2025",type:"Event",desc:"Where the batch first met.",emoji:"🎉",photos:book("events/orientation-day",4)},
    {title:"Intramurals",date:"2026",type:"Event",desc:"Sports, cheers, and teamwork.",emoji:"🏀",photos:book("events/intramurals",4)},
    {title:"IT Week",date:"2026",type:"Event",desc:"Contests, talks, and demos.",emoji:"💻",photos:book("events/it-week",4,[["Our CODM Award","Write the story behind this photo here."],["Photo title","Photo description goes here."]])},
    {title:"Christmas Party",date:"2025",type:"Event",desc:"Batch celebration.",emoji:"🎄",photos:book("events/christmas-party",4)}
  ],
  awards: [
    {title:"Dean's Lister",date:"2026",type:"Award",desc:"Academic excellence recognition.",emoji:"🏅",photos:book("awards/deans-lister",3)},
    {title:"Hackathon Finalist",date:"2026",type:"Achievement",desc:"Top teams of the program.",emoji:"🏆",photos:book("awards/hackathon-finalist",3)},
    {title:"Best Project",date:"2026",type:"Award",desc:"Voted best class project.",emoji:"🌟",photos:book("awards/best-project",3)}
  ],
  memories: [
    {title:"First day of class",date:"2025",type:"Memory",desc:"Everyone still nervous.",emoji:"📸",photos:book("memories/first-day",5)},
    {title:"Lab marathon",date:"2026",type:"Memory",desc:"Late nights, shared snacks.",emoji:"🌙",photos:book("memories/lab-marathon",5)},
    {title:"Field trip",date:"2026",type:"Memory",desc:"A day out with the batch.",emoji:"🚌",photos:book("memories/field-trip",5)},
    {title:"Group photo",date:"2026",type:"Memory",desc:"All of us in one frame.",emoji:"🖼️",photos:book("memories/group-photo",5)}
  ]
};
