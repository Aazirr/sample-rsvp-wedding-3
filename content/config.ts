// Wedding configuration - edit these values to fill in real details.

export const wedding = {
  groom: "Adrian Cole Hart",
  bride: "Serena Vale Bennett",
  groomFirst: "Adrian",
  brideFirst: "Serena",

  date: "March 14, 2027",
  dateShort: "03.14.2027",

  time: {
    ceremony: "2:00 PM",
    reception: "4:30 PM",
  },

  venue: {
    ceremony: {
      name: "Starlight Chapel",
      address: "Tagaytay City, Cavite",
      mapsUrl: "#",
    },
    reception: {
      name: "Sunspire Grand Hall",
      address: "Tagaytay City, Cavite",
      mapsUrl: "#",
    },
  },

  timeline: [
    { time: "2:00 PM", label: "Ceremony" },
    { time: "4:00 PM", label: "Reception" },
  ] as { time: string; label: string }[],

  dressCode: "1920s Formal - Peaky Blinders attire encouraged",
  dressCodeOptional: "Encouraged but not required",
  dressCodeNote:
    "Think sharp suits, waistcoats, flat caps, and elegant gowns. Dark tones preferred.",
  venueNote:
    "The venue is an open-air space (non-air-conditioned). Please bring a fan or hand fan for your comfort.",

  sponsors: {
    primary: [
      ["Olivia Hart", "Daniel Hart"],
      ["Amelia Bennett", "Nathan Bennett"],
      ["Clara Hayes", "Elliot Hayes"],
      ["Vivian Brooks", "Miles Brooks"],
      ["Lucille Parker", "Julian Parker"],
      ["Josephine Reed", "Henry Reed"],
      ["Beatrice Lane", "Arthur Lane"],
      ["Evelyn Scott", "Simon Scott"],
      ["Margot Ellis", "Thomas Ellis"],
      ["Charlotte Dean", "Wesley Dean"],
      ["Audrey Stone", "Felix Stone"],
      ["Rosalie Quinn", "Graham Quinn"],
    ] as [string, string][],
    secondary: {
      candle: ["Noah Hart", "Eliza Hart"] as [string, string],
      veilAndCord: ["Ethan Bennett", "Lila Bennett"] as [string, string],
    },
  },

  story: `Their story is one of quiet meetings and unspoken understanding -
two souls who found in each other a stillness the world could not provide.
What began in ordinary moments became something extraordinary.
The kind of love that asks nothing and offers everything.`,

  footer: `"Love arrives quietly, then changes everything.
And from that moment on, home becomes a person." - The Hart Family`,

  entourage: {
    brideParents: ["Helena Bennett", "Victor Bennett"],
    groomParents: ["Margaret Hart", "Edward Hart"],
    matronOfHonor: "Camille Rhodes",
    bestMan: "Julian Mercer",
    bridesmaids: [
      "Elena Moore",
      "Sophia Lane",
      "Daphne Cole",
      "Isabelle Frost",
      "Tessa Monroe",
    ],
    groomsmen: [
      "Theo Bennett",
      "Lucas Hart",
      "Owen Carter",
      "Miles Rowan",
      "Grant Ellis",
    ],
    flowerGirls: ["Poppy Lane", "Ivy Brooks"],
    flowerLadies: ["Nora Quinn", "Ruby Stone"],
    bearers: ["Leo Parker", "Finn Reed"],
  },
};

// Note: `as const` intentionally removed - literal types caused TypeScript to
// flag runtime guards like `date !== "TBA"` as unreachable comparisons.

export const copy = {
  introTagline: "By Order of the Hart Family",
  heroTagline: "A union, by order of the family.",
  rsvpAccept: "You're on the list. We'll see you there.",
  rsvpDecline: "Understood. You'll be missed.",
  invalidInvite: "This invitation could not be found.",
} as const;
