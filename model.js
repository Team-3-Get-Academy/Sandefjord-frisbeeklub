/* Sider og View States
- Hoved Side: Hvor du sender melding
  - Level: Hvilken nivå du er på som Bane, Emne, Hull, Melding eller Bekreftet sendt.
  - Bane: Hvilken bane somide: Login eller Registrer bruker
  - Username: ollihiggin er valgt (enten kan være nummer for ID, eller internt navn for bane)
  - Emne: Hvilket emne som er valgt, kan bare vær navn for emne, eller null for hopp over
  - Hull: Hvilket hull som er valgt, imidletidig er denne satt av bruker, og blir fast når bekrefret, blir sat till null hvis bruker trykker Annet
  - Melding: En string av meldingen som er skrivet
  - Vedlegger: En array av filer som vedlegg
- Login og Registrerings S
  - Email: ole@bribery.no
  - Passord: briberycoknowsbest
-
*/

const GENDERS = {  
  MALE: "m",
  FEMALE: "f",
  OTHER: "other"
}

function saveModel() {
  const json = {
    users: model.users,
    userCounter: model.appState.userCounter,
    taskCounter: model.appState.taskCounter,
    messages: model.messages,
    lanes: model.lanes,
    tasks: model.tasks,
    messageCounter: model.appState.messageCounter,
    auth: model.appState.auth ? model.appState.auth.id : null
  }

  localStorage.setItem("data", JSON.stringify(json))
}

function loadModel() {
  const saveData = localStorage.getItem("data")
  if (!saveData) return;

  const json = JSON.parse(saveData)

  model.users = json.users;
  model.appState.userCounter = json.userCounter;
  model.appState.taskCounter = json.taskCounter;
  model.messages = json.messages;
  model.lanes = json.lanes;
  model.tasks = json.tasks;

  model.appState.messageCounter = json.messageCounter
  model.appState.auth = model.users.find(u => u.id == json.auth)
}

const model = {
  appState: {
    currentPage: null, // funksjon som retunere HTML string til render, default er en Not Found Page.
    routeParams: {},
    auth: null, // hvis logget inn, bruker eller null hvis logget ut
    navOpen: false,
    messageCounter: 4, // used to track latest message id, increment to get new
    userCounter: 3,
    taskCounter: 1
  },

  viewState: {
    // # or none
    sendMessage: {
      level: "lane", // Bane navn
      lane: null,
      subject: null,
      hole: null,
      message: "",
      attachments: []
    },

    // # #login
    login: {
      email: "",
      password: ""
    },

    // # register
    register: {
      username: "",
      email: "",
      password: "",
      gender: "",
      dob: ""
    },

    // lane = null #admin/lanes/messages
    // lane = (string) && catagory = null #admin/lanes/{lane}/messages
    // catagory = (string) && message = null #admin/lanes/{lane}/messages/{catagory}
    // catagory = (string) && message = (object) #admin/lanes/{lane}/messages/{catagory}/{messageid}
    // catagory = null && message = (object) #admin/lanes/{lane}/messages/{message}
    viewMessages: {
      commentInput: "",
      isEditingStatus: false,
      statusInput: "",

      isEditingTags: false,
      tags: [],
      tagInput: "",

      updateComment: {
        commentid: null, // null = no comment selected, else index in timeline, -1 = message itself
        comment: "", // replaced by the selected comment's content
        attachments: [] // replaced by a cloned array of selected comment's attachments, so that it won't be overwritten when we make changes before submitting.
      },

      showDeletion: false // (boolean) if true, show confirmation pop up wether admin really wants to delete the selected message. Only admin and bane admin can do this.
    },

    viewTask: {
      isEditingAnsvarlig: false
    },

    createTask: {
      lane: null,
      hole: null,
      title: "",
      description: ""
    },
            // boss man
            // user = null #admin/users
            // user = (object) #admin/users/{user}
    administrateUsers: {
      search: "", // search by username (without @) or email (with @), result in userSearchResult
      user: null, // user object if selected, if none show search screen.
      rating: "", // Input

      confirmAction: null // null if no action, object of type (remove lane role, demote/promote lane role, ban/unban user, set rating) and any data to specify which Lane etc.
    },
              // Baneansvarligs gjengen
              // lane = null #admin/lanes
              // lane = (string) #admin/lanes/{lane}
    administrateLanes: {
      lane: null, // if no lane, show lane selction screen else show Lane Admin and Baneansvarlig
      search: "", // same as administrateUsers.search, search for user to add to Lane. But filter Admin (if setting Baneansvarlig, demotion) or Baneansvarlig (if setting Admin, promotion)
      addType: null, // "admin" if user pressed Set Admin, "ansvarlig" if user pressed Add Baneansvarlig. if null, show normal screen, else show the search screen.
      confirmAction: null // null if no action, object of type (unset/set admin, remove/add baneansvarlig) and any data to specify user id etc
    },

            // Dugnads gjengen
    /*administrateUserGroups: {
      
    }*/

  },

  userSearchResult: [],

  /* Powers
  0 - Bruker
  1 - Admin / Superuser
  2 - Baneansvarlig
  1337 - ????
  */
  users: [
    {
      id: 0,
      username: "Ole Hagen",
      power: 1,
      roles: [
        {
          lane: "all",
          role: "admin"
        }
      ],
      rating: 0,
      email: "ole@bribery.no",
      password: "ole",
      picture: null,
      priority: false,
      dob: "01/01/1800",
      gender: GENDERS.MALE,
    },
    {
      id: 1,
      username: "Geir",
      power: 2,
      roles: [
        {
          lane: "kodal_short",
          role: "ansvarlig"
        }
      ],
      rating: 0,
      email: "geir@geir.geir",
      password: "geir",
      picture: null,
      priority: true,
      dob: "01/01/1800",
      gender: GENDERS.MALE,
    },
    {
      id: 2,
      username: "Hacker-man",       // "fiktiv hacker"
      power: 0,
      roles: [
        {
          lane: "general",
          role: "banned"
        }
      ],
      rating: 10,
      email: "allYourBases.AreBelongToUs@minecarft.kp", // + 10000 social credits
      password: "1337",
      picture: "diskpic.jpg",
      priority: true,
      dob: "01/01/1800",
      gender: GENDERS.MALE
    },
    {
      id: 3,
      username: "Kasteren",   // fiktiv Martin 
      power: 2,
      roles: [
        {
          lane: "kodal_short",
          role: "admin"
        }
      ],
      rating: 200,
      email: "KasterLangt@sol.no", 
      password: "wtfscrub",
      picture: "",
      priority: false,
      dob: "01/01/1800",
      gender: GENDERS.MALE
    },
    {
      id: "redacted",
      username: "???",
      power: 2,
      roles: [],
      rating: 0,
      email: "redacted@anonymous.org",
      password: "redacted",
      picture: "",
      priority: false,
      dob: "00/00/0000",
      gender: "redacted"
    }
  ],

  catagories: [
    "Ris & Ros",
    "Feilmelding"
  ],

  lanes: {
    general: {
      name: "???",     // NATO secret
      desc: "??!????", // NATO secret
      image: "./assets/anonymous.jpg",
      hull: NaN,       // Not a Number
      admin: "redacted", // NATO secret (Jens Stoltenberg)
      ansvarlig: [
        "redacted", // NATO secret
        "redacted", // NATO secret
        "redacted"  // NATO secret
      ]
    },
    kodal_short: {
      name: "Kodal Short",
      desc: "En korthullsbane i Kodal, rett ved hovedbanen.",
      image: "./assets/kodal_short.jpg",
      hull: 10,
      admin: 3, // Kasteren
      ansvarlig: [
        1 // Geir
      ] // Array of User IDs
    },

    kodal: {
      name: "Kodal",
      desc: "En krevende bane med høy standard.",
      image: "./assets/kodal.jpg",
      hull: 19,
      admin: null, // User ID
      ansvarlig: [] // Array of User IDs
    },

    haasken: {
      name: "Håsken",
      desc: "Skogs bane med høy standard.",
      image: "./assets/haasken.jpg",
      hull: 18,
      admin: null, // User ID
      ansvarlig: [] // Array of User IDs
    },

    bugaarden: {
      name: "Bugården",
      desc: "En variert bane i Bugårdsparken.",
      image: "./assets/bugaard.jpg",
      hull: 18,
      admin: null, // User ID
      ansvarlig: [] // Array of User IDs
    }
  },

  tasks: [
    {
      id: 1,
      lane: "kodal_short", // String of Lane ID
      title: "Ta vekk ulvene med en gang", // String of Title
      desc: "500 ULVER!", // String of Description
      hole: 9, // Hole if task is related to one
      status: "Utarbeidet", // String of Status
      priority: "Høy", // String for priority (Lav, Vanlig or Høy) or null if not set
      deadline: "2025-11-15", // deadline in string (YYYY-MM-DD) or null if none
      admin: 0,
      assigned: [1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3], // user id or null
      feed: [
        {
          title: "Trenger myndighetene",
          content: "Vi trenger brannvesenet her nå!",
          user: 0,
          date: 1762768906874
        },
        {
          title: "Ulvene er vekke.",
          content: "På Mandag, kom Brannvesenet og tok ulvene vekk fra banen. Oppgaven er nå lukket.",
          newStatus: "Utarbeidet",
          user: 0,
          date: 1762768906874
        }
      ], // only assigned, bane admin and admin can post to feed
      chat: [
        {
          user: 1,
          message: "Jeg har kontaktet brannvesenet",
          date: 1762768906874
        },
        {
          user: 0,
          message: "Så bra, jeg skal oppdatere status.",
          date: 1762768906874
        }
      ], // anyone with access to lane can post to chat.
      date: 1762768906874
    }
  ],

  messages: [
    {
      userid: 1,  
      messageid: 1,
      lane: "kodal",
      subject: "Ris & Ros",
      hole: null,
      message: "Verste discgolf jeg har vært med på! Legg det ned med en eneste gang!",
      attachments: [
        {
          name: "søppel.jpg",
        }
      ],

      status: "Banlyst!",        // Melding status: profanity
      ansvarlig: 0,
      date: 1760606164285, // Date.now()
      tags: ["Ikke Bra","Ikke Bra","不好","不好","Not Good","Not Good","Not Good","Не хорошо","Не хорошо","No bueno","No bueno","No bueno","nicht gut","nicht gut",],

      references: [
        {
          type: "merged-from",   
          id: 2
        }
      ],

      timeline: [
        {
          userid: 0, // Ole Hagen
          message: "Nå ble jeg veldig trist.;(",  //Ole Hagen egen definert følelse i tekst format
          date: 1760606164285 // Date.now()
        },
        {
          userid: 0, // Ole Hagen
          status: "Banlyst!",
          date: 1760606164285 // Date.now()
        }
      ]
    },
    {
      userid: 0, // Gjest
      messageid: 2,
      lane: "kodal",
      subject: null,
      hole: null,
      message: "I love this place so much",    
      attachments: [
        {
          name: "smileyface.jpg",
        }
      ],
      
      status: "Sammenslått",
      ansvarlig: null,
      date: 1760606164285,
      
      references: [        
        {
          type: "merged-to",
          id: 1
        }
      ],

      timeline: [
        {
          userid: 0,
          status: "Sammenslått",
          date: 1760606164285
        }
      ]
    },
    {
      userid: 2, // Gjest
      messageid: 3,
      lane: "kodal_short",
      subject: null,
      hole: null,
      message: "test",    
      attachments: [],
      
      status: "Ikke Tildelt",
      ansvarlig: null,
      date: 1760606164285,
      
      references: [],

      timeline: []
    },
    {
      userid: 3, // Gjest
      messageid: 4,
      lane: "kodal_short",
      subject: null,
      hole: null,
      message: "test",    
      attachments: [],
      
      status: "Ikke Tildelt",
      ansvarlig: null,
      date: 1760606164285,
      
      references: [],

      timeline: []
    }
  ]
}

loadModel()
