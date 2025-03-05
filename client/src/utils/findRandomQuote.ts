const quotes = [
  {
    text: {
      lines: [
        `The Right Man In The Wrong Place Can Make All`,
        `The Difference In The World.`,
      ],
    },
    source: "Half Life 2",
  },

  {
    text: {
      lines: [
        `I Once Met A Soldier Who Told Me He Thought Of His Weapon As A Time`,
        `Machine. He Wasn't Killing The Enemy, Just Moving Them Forward`,
        `To A Time Where They Were No Longer Alive.`,
      ],
    },
    source: "Jun",
  },

  {
    text: {
      lines: [
        `There Are Only Personal Apocalypses. Nothing Is A`,
        `Cliche When It's Happening To You.`,
      ],
    },
    source: "Max Payne",
  },

  {
    text: {
      lines: [
        `I Survived Because The Fire Inside Me Burned`,
        `Brighter Than The Fire Around Me.`,
      ],
    },
    source: "Joshua Graham",
  },

  {
    text: {
      lines: [
        `War Is When The Young And Stupid Are Tricked By The`,
        `Old And Bitter Into Killing Each Other.`,
      ],
    },
    source: "Niko Bellic",
  },

  {
    text: {
      lines: [
        `Against All The Evil That Hell Can Conjure, All The Wickedness That Mankind Can`,
        `Produce. We'll Send Unto Them, Only You. Rip And Tear Until It Is Done.`,
      ],
    },
    source: "Doom Eternal",
  },

  {
    text: {
      lines: [`Everyone's The Hero Of Their Own Story.`],
    },
    source: "Handsome Jack",
  },

  {
    text: {
      lines: [
        `Well Done. Here Come The Test Results: "You Are A Horrible Person." That's What`,
        `It Says: A Horrible Person. We Weren't Even Testing For That.`,
      ],
    },
    source: "Portal 2",
  },

  {
    text: {
      lines: [
        `Stand Amongst The Ashes Of A Trillion Dead Souls And Ask The Ghosts`,
        `If Honor Matters. The Silence Is Your Answer.`,
      ],
    },
    source: "Javik",
  },

  {
    text: {
      lines: [`War… War Never Changes.`],
    },
    source: "Fallout 4",
  },

  {
    text: {
      lines: [`Why Are We Here? Just To Suffer?`],
    },
    source: "Metal Gear Solid V",
  },
];

function findRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

export default findRandomQuote;
