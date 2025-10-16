export const NotFoundPage = () => "<div>No Page</div>"

/* Sider og View States
- Hoved Side: Hvor du sender melding
  - Level: Hvilken nivå du er på som Bane, Emne, Hull, Melding eller Bekreftet sendt.
  - Bane: Hvilken bane som er valgt (enten kan være nummer for ID, eller internt navn for bane)
  - Emne: Hvilket emne som er valgt, kan bare vær navn for emne, eller null for hopp over
  - Hull: Hvilket hull som er valgt, imidletidig er denne satt av bruker, og blir fast når bekrefret, blir sat till null hvis bruker trykker Annet
  - Melding: En string av meldingen som er skrivet
  - Vedlegger: En array av filer som vedlegg
- Login og Registrerings Side: Login eller Registrer bruker
  - Username: ollihiggin
  - Email: ole@bribery.no
  - Passord: briberycoknowsbest
-

Eksempel for Jon
function renderView() {
  const app = document.getElementById("app")

  app.innerHTML = `
    <div class="navbar"></div>
    <div class="pageContainer">${model.appState.currentPage()}</div>
    `
  }
*/

export const model = {
  appState: {
    currentPage: NotFoundPage, // funksjon som retunere HTML string til render, default er en Not Found Page.
    auth: null // hvis logget inn, bruker eller null hvis logget ut
  },

  viewState: {
    sendMessage: {
      level: "lane", // Bane navn // 
      lane: null,
      subject: null,
      hole: null,
      message: "",
      attachments: []
    },

    login: {
      email: "",
      password: ""
    },

    register: {
      username: "",
      email: "",
      password: ""
    },

    viewMessages: {
      lane: null,
      catagory: null,
      message: null
    },


  },

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
      picture: null
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
      picture: null
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
      picture: "diskpic.jpg"
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
      picture: ""
    }
  ],

  catagories: [
    "Ris & Ros",
    "Feilmelding"
  ],

  /* eksempel for Jon
  function renderCatagories() {
    const catagories = ['Alle Meldinger', ...model.catagories, 'Andre Meldinger']
    [
      "Alle Meldinger",
      "Ris & Ros",
      "Feilmelding",
      "Andre Meldinger"
    ]
  }
  */

  lanes: {
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

      status: "Banned!",        // Melding status profanity
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
      message: "Very bad discord golf, i no like it. You dare tell us to play this?",
      attachments: [
        "discord.jpg",
        "diskpic.jpg"  // *wink wink
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
