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
  FEMALE: "f"
}

const model = {
  appState: {
    currentPage: null, // funksjon som retunere HTML string til render, default er en Not Found Page.
    routeParams: {},
    auth: null, // hvis logget inn, bruker eller null hvis logget ut
    navOpen: false
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
      age: ""
    },

    // lane = null #admin/lanes/messages
    // lane = (string) && catagory = null #admin/lanes/{lane}/messages
    // catagory = (string) && message = null #admin/lanes/{lane}/messages/{catagory}
    // catagory = (string) && message = (object) #admin/lanes/{lane}/messages/{catagory}/{messageid}
    // catagory = null && message = (object) #admin/lanes/{lane}/messages/{message}
    viewMessages: {
      lane: null, // (string) if no lane, show lane selection screen
      catagory: null, // (string) else if no catagory, show list of catagories
      message: null, // (object) else if no message selected, show list of messages in catagory. else show message content
      writeComment: {
        setStatus: null,
        comment: "",
        attachments: []
      },

      updateComment: {
        commentid: null, // null = no comment selected, else index in timeline, -1 = message itself
        comment: "", // replaced by the selected comment's content
        attachments: [] // replaced by a cloned array of selected comment's attachments, so that it won't be overwritten when we make changes before submitting.
      },

      showDeletion: false // (boolean) if true, show confirmation pop up wether admin really wants to delete the selected message. Only admin and bane admin can do this.
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
      password: "ᒣ⍑ᒷ ▭ ᑑ⚍╎ᔮ·ǀ· ▭ ᕊ??ᒍ∴リ ▭ ⎓ᒍ̇/▭ ⋮⚍ᒲi!ϟNorges Prisen ▭ ᒍ⍊ᒷ∷ ▭ ᒣ⍑ᒷ ▭ |:ᖋ∩॥ ▭ ∷ᒷ↸ ▭ ↸ᒍ┤ ",
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

  messages: [
    {
      userid: 10,  
      messageid: 1,
      lane: "kodal",
      subject: "Ris & Ros",
      hull: null,
      message: "Verste discgolf jeg har vært med på! Legg det ned med en eneste gang!",
      attachments: [
        "søppel.jpg" // på ekte hadde dette vært en File object returnert av <input type="file">
      ],

      status: "Banned!",        // Melding status: profanity
      ansvarlig: null,
      date: 1760606164285, // Date.now()

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
          status: "Banned!",
          date: 1760606164285 // Date.now()
        }
      ]
    },
    {
      userid: null, // Gjest
      messageid: 2,
      lane: "kodal",
      subject: null,
      hull: null,
      message: "I love this place so much",    
      attachments: [
        "smileyface.jpg"      
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
    }
  ]
}
