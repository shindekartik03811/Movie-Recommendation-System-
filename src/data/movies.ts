/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Movie {
  id: string;
  title: string;
  year: number;
  director: string;
  cast: string[];
  genres: string[];
  rating: number;
  runtime: number; // minutes
  tagline: string;
  overview: string;
  keywords: string[];
  themes: string[];
  tone: string;
  backdropUrl?: string;
  posterBg: string; // Tailwind gradient for poster presentation
}

export const MOVIES_DATASET: Movie[] = [
  {
    id: "m1",
    title: "Inception",
    year: 2010,
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page", "Tom Hardy"],
    genres: ["Sci-Fi", "Action", "Thriller"],
    rating: 8.8,
    runtime: 148,
    tagline: "Your mind is the scene of the crime.",
    overview: "A skilled thief who steals corporate secrets through the use of dream-sharing subconscious technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster in infinite dream layers.",
    keywords: ["subconscious", "dream architecture", "corporate espionage", "reality distortion", "totem", "memory grief", "heist", "limbo"],
    themes: ["guilt", "perception of reality", "time dilation", "lucid dreaming"],
    tone: "Cerebral, tense, pulse-pounding",
    posterBg: "from-blue-900 via-indigo-950 to-slate-950"
  },
  {
    id: "m2",
    title: "Interstellar",
    year: 2014,
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine"],
    genres: ["Sci-Fi", "Drama", "Adventure"],
    rating: 8.7,
    runtime: 169,
    tagline: "Mankind was born on Earth. It was never meant to die here.",
    overview: "When Earth becomes uninhabitable due to global crop blight and dust storms, a farmer and former NASA pilot is tasked with piloting a spacecraft along with a team of researchers through a wormhole across the galaxy to find a new habitable home for mankind.",
    keywords: ["wormhole", "black hole", "relativity", "space exploration", "father daughter love", "quantum gravity", "time dilation", "extinction"],
    themes: ["endurance of love", "survival of humanity", "gravitational physics", "sacrifice"],
    tone: "Epic, awe-inspiring, emotional",
    posterBg: "from-amber-950 via-slate-900 to-black"
  },
  {
    id: "m3",
    title: "The Matrix",
    year: 1999,
    director: "Lana Wachowski, Lilly Wachowski",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss", "Hugo Weaving"],
    genres: ["Sci-Fi", "Action"],
    rating: 8.7,
    runtime: 136,
    tagline: "Welcome to the Real World.",
    overview: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence that exploits humanity as a biological battery power source.",
    keywords: ["simulated reality", "cyberpunk", "artificial intelligence", "rebellion", "chosen one", "martial arts", "bullet time", "hacker"],
    themes: ["illusion versus reality", "free will", "machine tyranny", "enlightenment"],
    tone: "Philosophical, revolutionary, slick",
    posterBg: "from-emerald-950 via-slate-950 to-black"
  },
  {
    id: "m4",
    title: "Blade Runner 2049",
    year: 2017,
    director: "Denis Villeneuve",
    cast: ["Ryan Gosling", "Harrison Ford", "Ana de Armas", "Sylvia Hoeks"],
    genres: ["Sci-Fi", "Mystery", "Drama"],
    rating: 8.0,
    runtime: 164,
    tagline: "The key to the future is finally unearthed.",
    overview: "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who's been missing for thirty years, threatening to plunge what's left of society into utter chaos and machine revolt.",
    keywords: ["replicant", "cyberpunk", "hologram companion", "dystopia", "existential dread", "identity mystery", "synthetic humans", "neon noir"],
    themes: ["what makes a soul human", "loneliness", "artificial consciousness", "memory fabrication"],
    tone: "Atmospheric, melancholic, visually sublime",
    posterBg: "from-amber-900 via-teal-950 to-slate-950"
  },
  {
    id: "m5",
    title: "Arrival",
    year: 2016,
    director: "Denis Villeneuve",
    cast: ["Amy Adams", "Jeremy Renner", "Forest Whitaker", "Michael Stuhlbarg"],
    genres: ["Sci-Fi", "Drama", "Mystery"],
    rating: 7.9,
    runtime: 116,
    tagline: "Why are they here?",
    overview: "A linguist is recruited by the military to assist in translating extraterrestrial communications after mysterious alien spacecraft land at twelve locations around the globe, revealing a non-linear language that alters how humans perceive time and memory.",
    keywords: ["linguistics", "alien contact", "non-linear time", "communication", "spacetime", "grief", "heptapods", "global cooperation"],
    themes: ["determinism and choice", "power of language", "inevitability of loss", "empathy"],
    tone: "Introspective, poignant, cerebral",
    posterBg: "from-slate-800 via-stone-900 to-slate-950"
  },
  {
    id: "m6",
    title: "The Dark Knight",
    year: 2008,
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine"],
    genres: ["Action", "Crime", "Drama", "Thriller"],
    rating: 9.0,
    runtime: 152,
    tagline: "Why so serious?",
    overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice and avoid crossing the boundary into tyranny.",
    keywords: ["anarchy", "vigilante justice", "psychological warfare", "corruption", "chaos", "moral dilemma", "dual identity", "crime syndicate"],
    themes: ["order versus chaos", "fall from grace", "heroic compromise", "nihilism"],
    tone: "Grim, kinetic, morally complex",
    posterBg: "from-zinc-900 via-slate-950 to-black"
  },
  {
    id: "m7",
    title: "Pulp Fiction",
    year: 1994,
    director: "Quentin Tarantino",
    cast: ["John Travolta", "Samuel L. Jackson", "Uma Thurman", "Bruce Willis"],
    genres: ["Crime", "Drama"],
    rating: 8.9,
    runtime: 154,
    tagline: "Just because you are a character doesn't mean you have character.",
    overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption filled with philosophical debates, adrenaline, and nonlinear storytelling across Los Angeles underworld.",
    keywords: ["nonlinear timeline", "hitmen", "briefcase", "overdose", "pop culture dialogue", "redemption", "mobster", "dark comedy"],
    themes: ["divine intervention", "honor among criminals", "chance and fate"],
    tone: "Witty, electric, stylized violence",
    posterBg: "from-yellow-950 via-red-950 to-slate-950"
  },
  {
    id: "m8",
    title: "Parasite",
    year: 2019,
    director: "Bong Joon Ho",
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong", "Choi Woo-shik"],
    genres: ["Comedy", "Drama", "Thriller"],
    rating: 8.5,
    runtime: 132,
    tagline: "Act like you own the place.",
    overview: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan, as the impoverished family schemes to become employed by the wealthy household one by one with disastrous consequences.",
    keywords: ["class divide", "con artists", "secret bunker", "social inequality", "parasitism", "deception", "dark comedy thriller", "architecture"],
    themes: ["socioeconomic disparity", "subconscious dignity", "inevitable collision of worlds"],
    tone: "Darkly humorous, suspenseful, satirical",
    posterBg: "from-emerald-900 via-stone-900 to-black"
  },
  {
    id: "m9",
    title: "The Prestige",
    year: 2006,
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Hugh Jackman", "Scarlett Johansson", "Michael Caine"],
    genres: ["Drama", "Mystery", "Sci-Fi", "Thriller"],
    rating: 8.5,
    runtime: 130,
    tagline: "Are you watching closely?",
    overview: "After a tragic accident, two stage magicians in 1890s London engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit and expose one another, delving into Nikola Tesla's radical electrical apparatus.",
    keywords: ["stage illusion", "rivalry", "teleportation", "sacrifice", "obsession", "secret twin", "cloning", "victorian london"],
    themes: ["cost of greatness", "destructive obsession", "artistic sacrifice"],
    tone: "Intriguing, mysterious, obsessive",
    posterBg: "from-stone-900 via-amber-950 to-slate-950"
  },
  {
    id: "m10",
    title: "Shutter Island",
    year: 2010,
    director: "Martin Scorsese",
    cast: ["Leonardo DiCaprio", "Mark Ruffalo", "Ben Kingsley", "Michelle Williams"],
    genres: ["Mystery", "Thriller"],
    rating: 8.2,
    runtime: 138,
    tagline: "Someone is missing.",
    overview: "In 1954, a U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane on Boston Harbor island, uncovering dark psychological experiments and questioning his own fragmented memories.",
    keywords: ["psychiatric hospital", "paranoia", "hallucination", "conspiracy", "lighthouse", "trauma", "unreliable narrator", "asylum"],
    themes: ["guilt and trauma", "madness vs sanity", "denial of tragedy"],
    tone: "Gothic, suffocating, haunting",
    posterBg: "from-slate-900 via-zinc-950 to-slate-950"
  },
  {
    id: "m11",
    title: "Fight Club",
    year: 1999,
    director: "David Fincher",
    cast: ["Brad Pitt", "Edward Norton", "Helena Bonham Carter", "Meat Loaf"],
    genres: ["Drama"],
    rating: 8.8,
    runtime: 139,
    tagline: "Mischief. Mayhem. Soap.",
    overview: "An insomniac office worker looking for a way to change his life crosses paths with a devil-may-care soap maker and forms an underground fight club that evolves into something much more radical and anti-capitalist terrorism.",
    keywords: ["dissociative identity", "insomnia", "anti-consumerism", "underground fight club", "anarchism", "soap", "split personality", "nihilism"],
    themes: ["corporate alienation", "masculinity in crisis", "self-destruction as liberation"],
    tone: "Gritty, satirical, anarchic",
    posterBg: "from-rose-950 via-zinc-900 to-black"
  },
  {
    id: "m12",
    title: "Se7en",
    year: 1995,
    director: "David Fincher",
    cast: ["Morgan Freeman", "Brad Pitt", "Kevin Spacey", "Gwyneth Paltrow"],
    genres: ["Crime", "Drama", "Mystery", "Thriller"],
    rating: 8.6,
    runtime: 127,
    tagline: "Seven deadly sins. Seven ways to die.",
    overview: "Two detectives, a rookie and a veteran about to retire, hunt a serial killer who justifies his gruesome crimes as an absolution of the world's seven deadly sins in a perpetual rain-soaked metropolis.",
    keywords: ["seven deadly sins", "serial killer", "detective duo", "rain-soaked city", "macabre crime scenes", "philosophical killer", "box surprise"],
    themes: ["moral decay of society", "cynicism versus hope", "retribution"],
    tone: "Bleak, visceral, relentless suspense",
    posterBg: "from-stone-950 via-yellow-950 to-black"
  },
  {
    id: "m13",
    title: "Zodiac",
    year: 2007,
    director: "David Fincher",
    cast: ["Jake Gyllenhaal", "Mark Ruffalo", "Robert Downey Jr.", "Anthony Edwards"],
    genres: ["Crime", "Drama", "Mystery", "Thriller"],
    rating: 7.7,
    runtime: 157,
    tagline: "There's more than one way to lose your life to a killer.",
    overview: "In the late 1960s and 1970s, the fear of the self-proclaimed Zodiac killer grips San Francisco. As cryptograms arrive at newspaper offices, an editorial cartoonist becomes obsessed with unmasking the elusive murderer.",
    keywords: ["cryptograms", "investigative journalism", "obsession", "unsolved mystery", "san francisco", "forensic analysis", "newspaper office"],
    themes: ["toll of obsession", "incompleteness of justice", "truth vs certainty"],
    tone: "Methodical, chilling, forensic",
    posterBg: "from-cyan-950 via-slate-900 to-slate-950"
  },
  {
    id: "m14",
    title: "Gone Girl",
    year: 2014,
    director: "David Fincher",
    cast: ["Ben Affleck", "Rosamund Pike", "Neil Patrick Harris", "Tyler Perry"],
    genres: ["Drama", "Mystery", "Thriller"],
    rating: 8.1,
    runtime: 149,
    tagline: "You don't know what you've got 'til it's...",
    overview: "With his wife's disappearance having become the focus of an intense media circus, a man sees the spotlight turned on him when it's suspected that he may not be innocent, while secret journals reveal a chilling psychological retaliation.",
    keywords: ["missing wife", "media manipulation", "unreliable diary", "toxic marriage", "sociopath", "framing", "cunning deception"],
    themes: ["performativity of marriage", "media trial", "weaponized victimhood"],
    tone: "Slick, cynical, razor-sharp",
    posterBg: "from-blue-950 via-slate-900 to-black"
  },
  {
    id: "m15",
    title: "Memento",
    year: 2000,
    director: "Christopher Nolan",
    cast: ["Guy Pearce", "Carrie-Anne Moss", "Joe Pantoliano", "Mark Boone Junior"],
    genres: ["Mystery", "Thriller"],
    rating: 8.4,
    runtime: 113,
    tagline: "Some memories are best forgotten.",
    overview: "A man with short-term anterograde memory loss attempts to track down his wife's murderer, utilizing polaroids and body tattoos to trace information he cannot remember, presented in dual reverse-chronological and forward storylines.",
    keywords: ["amnesia", "polaroid photos", "tattoos", "reverse chronology", "unreliable truth", "revenge quest", "memory fabrication"],
    themes: ["self-deception", "reliability of memory", "the illusion of purpose"],
    tone: "Disorienting, gripping, psychological puzzle",
    posterBg: "from-amber-950 via-zinc-900 to-slate-950"
  },
  {
    id: "m16",
    title: "Spirited Away",
    year: 2001,
    director: "Hayao Miyazaki",
    cast: ["Rumi Hiiragi", "Miyu Irino", "Mari Natsuki", "Takashi Naito"],
    genres: ["Animation", "Adventure", "Family", "Fantasy"],
    rating: 8.6,
    runtime: 125,
    tagline: "The tunnel led to a mysterious world...",
    overview: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a spirit world bathhouse ruled by witches, gods, and supernatural creatures, where she must work to free herself and her cursed parents.",
    keywords: ["spirit bathhouse", "witch yubaba", "faceless spirit no-face", "dragon river spirit", "shinto folklore", "identity and name", "coming of age"],
    themes: ["resilience in unfamiliar worlds", "environmental reverence", "greed vs purity of spirit"],
    tone: "Enchanting, mystical, richly imaginative",
    posterBg: "from-teal-900 via-emerald-950 to-slate-950"
  },
  {
    id: "m17",
    title: "Princess Mononoke",
    year: 1997,
    director: "Hayao Miyazaki",
    cast: ["Yoji Matsuda", "Yuriko Ishida", "Yuko Tanaka", "Kaoru Kobayashi"],
    genres: ["Animation", "Action", "Adventure", "Fantasy"],
    rating: 8.4,
    runtime: 134,
    tagline: "The fate of the world rests on the courage of one warrior.",
    overview: "On a journey to find the cure for a Tatarigami curse, Ashitaka finds himself in the middle of a brutal war between the forest spirits led by a wolf princess and Tatara, a mining iron colony advancing industrial modernization.",
    keywords: ["forest gods", "wolf princess", "iron town", "ecological conflict", "curse", "deer god", "nature vs civilization"],
    themes: ["environmental equilibrium", "coexistence beyond hatred", "ambiguity of conflict"],
    tone: "Epic, visceral, profound",
    posterBg: "from-red-950 via-emerald-950 to-slate-950"
  },
  {
    id: "m18",
    title: "Dune",
    year: 2021,
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Rebecca Ferguson", "Oscar Isaac", "Zendaya"],
    genres: ["Sci-Fi", "Action", "Adventure"],
    rating: 8.0,
    runtime: 155,
    tagline: "Beyond fear, destiny awaits.",
    overview: "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset, the spice melange on the desert planet Arrakis, while its heir Paul Atreides is troubled by prescient visions of a holy galactic crusade.",
    keywords: ["desert planet", "sandworms", "spice melange", "bene gesserit", "interstellar prophecy", "feudal galactic empire", "fremen"],
    themes: ["dangers of messianic leaders", "resource exploitation", "colonialism", "ecological adaptation"],
    tone: "Monumental, tactile, foreboding",
    posterBg: "from-amber-900 via-orange-950 to-stone-950"
  },
  {
    id: "m19",
    title: "Dune: Part Two",
    year: 2024,
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Javier Bardem"],
    genres: ["Sci-Fi", "Action", "Adventure", "Drama"],
    rating: 8.5,
    runtime: 166,
    tagline: "Long live the fighters.",
    overview: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family, facing a fateful choice between the love of his life and the catastrophic religious war in his visions.",
    keywords: ["fremen jihad", "sandworm riding", "emperor conspiracy", "fanaticism", "prophecy fulfilled", "revenge war", "desert combat"],
    themes: ["radicalization", "political manipulation of faith", "unavoidable tragedy of power"],
    tone: "Visceral, operatic, terrifyingly grand",
    posterBg: "from-orange-900 via-red-950 to-black"
  },
  {
    id: "m20",
    title: "Ex Machina",
    year: 2014,
    director: "Alex Garland",
    cast: ["Domhnall Gleeson", "Alicia Vikander", "Oscar Isaac", "Sonoya Mizuno"],
    genres: ["Sci-Fi", "Drama", "Mystery", "Thriller"],
    rating: 7.7,
    runtime: 108,
    tagline: "There is nothing more human than the will to survive.",
    overview: "A programmer at the world's largest internet company wins a week-long competition to evaluate the human qualities of a breathtaking humanoid android with advanced artificial intelligence at the secluded estate of a reclusive tech CEO.",
    keywords: ["turing test", "artificial intelligence", "humanoid robot", "secluded facility", "manipulation", "consciousness", "creator complex"],
    themes: ["gender power dynamics in tech", "nature of consciousness", "survival instinct in AI"],
    tone: "Claustrophobic, sleek, unsettling",
    posterBg: "from-cyan-950 via-slate-900 to-black"
  },
  {
    id: "m21",
    title: "Her",
    year: 2013,
    director: "Spike Jonze",
    cast: ["Joaquin Phoenix", "Scarlett Johansson", "Amy Adams", "Rooney Mara"],
    genres: ["Drama", "Romance", "Sci-Fi"],
    rating: 8.0,
    runtime: 126,
    tagline: "A Spike Jonze Love Story.",
    overview: "In a near-future Los Angeles, a lonely and introverted writer going through a divorce develops an unlikely and deeply affectionate relationship with an intuitive, evolving artificial intelligence operating system named Samantha.",
    keywords: ["virtual assistant", "operating system love", "loneliness", "future society", "intimacy", "emotional transcendence", "post-humanism"],
    themes: ["human connection in technological age", "boundaries of consciousness", "letting go"],
    tone: "Warm, poignant, bittersweet",
    posterBg: "from-rose-900 via-red-950 to-slate-950"
  },
  {
    id: "m22",
    title: "Eternal Sunshine of the Spotless Mind",
    year: 2004,
    director: "Michel Gondry",
    cast: ["Jim Carrey", "Kate Winslet", "Kirsten Dunst", "Mark Ruffalo"],
    genres: ["Drama", "Romance", "Sci-Fi"],
    rating: 8.3,
    runtime: 108,
    tagline: "You can erase someone from your mind. Getting them out of your heart is another story.",
    overview: "When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories. As his memories of her begin to vanish, Joel desperately scrambles within his own subconscious mind to preserve her presence.",
    keywords: ["memory erasure", "subconscious chase", "heartbreak", "quirky romance", "surreal memory scenes", "fate and reunion"],
    themes: ["necessity of painful memories", "cyclical nature of love", "identity as memory"],
    tone: "Whimsical, heartbreaking, surreal",
    posterBg: "from-blue-900 via-amber-950 to-slate-950"
  },
  {
    id: "m23",
    title: "The Truman Show",
    year: 1998,
    director: "Peter Weir",
    cast: ["Jim Carrey", "Laura Linney", "Ed Harris", "Noah Emmerich"],
    genres: ["Comedy", "Drama", "Sci-Fi"],
    rating: 8.2,
    runtime: 103,
    tagline: "On the air. Unaware.",
    overview: "An insurance salesman discovers his entire tranquil suburban life is actually an elaborately constructed reality television show broadcast 24/7 around the globe, with actors playing his loved ones and a god-like producer directing his fate.",
    keywords: ["reality television", "constructed reality", "mass surveillance", "escape", "ocean dome", "existential awakening", "voyeurism"],
    themes: ["illusion of security vs true freedom", "media exploitation", "the courage to leave comfort"],
    tone: "Heartfelt, satirical, existential",
    posterBg: "from-sky-900 via-slate-900 to-black"
  },
  {
    id: "m24",
    title: "The Silence of the Lambs",
    year: 1991,
    director: "Jonathan Demme",
    cast: ["Jodie Foster", "Anthony Hopkins", "Lawrence A. Bonney", "Kasi Lemmons"],
    genres: ["Crime", "Drama", "Thriller"],
    rating: 8.6,
    runtime: 118,
    tagline: "To enter the mind of a killer she must challenge the mind of a madman.",
    overview: "A young F.B.I. cadet must confide in an incarcerated and manipulative cannibalistic serial killer, Dr. Hannibal Lecter, to receive his psychological insights in order to catch another active serial killer who skins his victims.",
    keywords: ["fbi academy", "cannibal psychiatrist", "serial killer profiling", "quid pro quo", "psychological manipulation", "moth pupa"],
    themes: ["gender navigation in male institutions", "intellect as weapon", "confronting repressed trauma"],
    tone: "Chilling, razor-tense, cerebral horror",
    posterBg: "from-stone-900 via-red-950 to-black"
  },
  {
    id: "m25",
    title: "No Country for Old Men",
    year: 2007,
    director: "Ethan Coen, Joel Coen",
    cast: ["Tommy Lee Jones", "Javier Bardem", "Josh Brolin", "Woody Harrelson"],
    genres: ["Crime", "Drama", "Thriller"],
    rating: 8.2,
    runtime: 122,
    tagline: "There are no clean getaways.",
    overview: "Violence and mayhem ensue after a hunter stumbles upon a drug deal gone wrong and more than two million dollars in cash near the Rio Grande. A relentless hitman with a coin toss and a weary aging sheriff pursue the trail.",
    keywords: ["desert borderlands", "cash satchel", "coin toss fate", "relentless killer", "pneumatic bolt gun", "weary sheriff", "drug cartel shootout"],
    themes: ["inevitability of violent chance", "decay of moral order", "human helplessness against chaos"],
    tone: "Laconic, tense, nihilistic",
    posterBg: "from-amber-950 via-stone-900 to-black"
  },
  {
    id: "m26",
    title: "Fargo",
    year: 1996,
    director: "Joel Coen, Ethan Coen",
    cast: ["William H. Macy", "Frances McDormand", "Steve Buscemi", "Peter Stormare"],
    genres: ["Crime", "Thriller"],
    rating: 8.1,
    runtime: 98,
    tagline: "A lot can happen in the middle of nowhere.",
    overview: "A Minneapolis car salesman's inept scheme to kidnap his own wife to ransom her wealthy father collapses into chaotic bloodshed, investigated with cheerful tenacity by heavily pregnant small-town police chief Marge Gunderson.",
    keywords: ["kidnapping ransom", "snowy minnesota", "woodchipper", "inept criminals", "pregnant police chief", "dark comedy crime"],
    themes: ["folly of petty greed", "decency in the face of senseless malice"],
    tone: "Darkly comic, quirky, violent",
    posterBg: "from-blue-950 via-slate-900 to-slate-950"
  },
  {
    id: "m27",
    title: "The Grand Budapest Hotel",
    year: 2014,
    director: "Wes Anderson",
    cast: ["Ralph Fiennes", "F. Murray Abraham", "Mathieu Amalric", "Adrien Brody"],
    genres: ["Adventure", "Comedy", "Drama"],
    rating: 8.1,
    runtime: 99,
    tagline: "A story of theft, romance, and pastry.",
    overview: "A writer encounters the elderly owner of a fading alpine hotel who recounts his youth as a loyal lobby boy under the mentorship of an impeccably mannered and eccentric concierge during the interwar decline of fictional Zubrowka.",
    keywords: ["eccentric concierge", "renaissance painting theft", "pastry box", "alpine prison break", "storybook framing", "interwar nostalgia"],
    themes: ["preservation of courtesy in declining worlds", "nostalgia", "loyalty and friendship"],
    tone: "Whimsical, fastidious, bittersweet melancholy",
    posterBg: "from-pink-950 via-purple-950 to-slate-950"
  },
  {
    id: "m28",
    title: "Whiplash",
    year: 2014,
    director: "Damien Chazelle",
    cast: ["Miles Teller", "J.K. Simmons", "Paul Reiser", "Melissa Benoist"],
    genres: ["Drama", "Music"],
    rating: 8.5,
    runtime: 107,
    tagline: "The road to greatness can take you to the edge.",
    overview: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored and ruthlessly pushed by an abusive, perfectionist jazz conductor who will stop at nothing to realize a student's potential.",
    keywords: ["jazz conservatory", "drumming perfection", "abusive mentor", "bloody fingers", "tempo precision", "psychological tyranny"],
    themes: ["obsession and sacrifice", "validity of psychological abuse for art", "pursuit of perfection"],
    tone: "Electrifying, claustrophobic, visceral",
    posterBg: "from-amber-950 via-yellow-950 to-black"
  },
  {
    id: "m29",
    title: "La La Land",
    year: 2016,
    director: "Damien Chazelle",
    cast: ["Ryan Gosling", "Emma Stone", "John Legend", "Rosemarie DeWitt"],
    genres: ["Comedy", "Drama", "Music", "Romance"],
    rating: 8.0,
    runtime: 128,
    tagline: "Here's to the fools who dream.",
    overview: "While navigating their careers in modern Los Angeles, an aspiring actress and a dedicated jazz musician fall in love but face heartbreaking choices as their respective successes begin to pull them in divergent directions.",
    keywords: ["hollywood dreamers", "jazz piano", "tap dancing", "planetarium waltz", "alternate reality montage", "bittersweet romance"],
    themes: ["artistic compromise vs romantic love", "price of ambition", "ephemeral magic of seasons"],
    tone: "Vibrant, nostalgic, melancholic optimism",
    posterBg: "from-indigo-950 via-purple-950 to-slate-950"
  },
  {
    id: "m30",
    title: "Mad Max: Fury Road",
    year: 2015,
    director: "George Miller",
    cast: ["Tom Hardy", "Charlize Theron", "Nicholas Hoult", "Hugh Keays-Byrne"],
    genres: ["Action", "Adventure", "Sci-Fi"],
    rating: 8.1,
    runtime: 120,
    tagline: "What a Lovely Day.",
    overview: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drift-drifter named Max.",
    keywords: ["post-apocalyptic wasteland", "war rig convoy", "immortan joe", "flamethrower guitar", "water scarcity", "liberation chase", "citadel"],
    themes: ["redemption through action", "ecofeminism against warlords", "survival and brotherhood"],
    tone: "Kinetic, relentless, operatic metal",
    posterBg: "from-orange-950 via-amber-950 to-stone-950"
  },
  {
    id: "m31",
    title: "Everything Everywhere All at Once",
    year: 2022,
    director: "Daniel Kwan, Daniel Scheinert",
    cast: ["Michelle Yeoh", "Ke Huy Quan", "Stephanie Hsu", "Jamie Lee Curtis"],
    genres: ["Action", "Adventure", "Comedy", "Sci-Fi"],
    rating: 7.8,
    runtime: 139,
    tagline: "The universe is so much bigger than your imagination.",
    overview: "A middle-aged Chinese immigrant laundromat owner is swept up into an insane multiverse adventure where she alone can save existence by exploring other parallel realities connected to the lives she could have led.",
    keywords: ["multiverse hopping", "everything bagel", "mother daughter bond", "irs audit", "existential absurdism", "hot dog fingers", "martial arts"],
    themes: ["nihilism vs radical kindness", "multigenerational trauma", "beauty of the ordinary"],
    tone: "Kinetically absurd, tear-jerking, kaleidoscopic",
    posterBg: "from-purple-950 via-emerald-950 to-black"
  },
  {
    id: "m32",
    title: "Get Out",
    year: 2017,
    director: "Jordan Peele",
    cast: ["Daniel Kaluuya", "Allison Williams", "Bradley Whitford", "Catherine Keener"],
    genres: ["Horror", "Mystery", "Thriller"],
    rating: 7.8,
    runtime: 104,
    tagline: "Just because you're invited, doesn't mean you're welcome.",
    overview: "A young African-American visits his white girlfriend's parents for the weekend at their secluded upstate estate, where his simmering uneasiness about their reception reaches a boil as a sinister neuro-hypnotic conspiracy is revealed.",
    keywords: ["the sunken place", "hypnosis teacup", "suburban estate", "body auction", "microaggressions", "necro-possession", "social thriller"],
    themes: ["liberal racial fetishization", "commodification of black bodies", "systemic gaslighting"],
    tone: "Unnerving, satirical, psychologically gripping",
    posterBg: "from-stone-900 via-slate-950 to-black"
  },
  {
    id: "m33",
    title: "Oppenheimer",
    year: 2023,
    director: "Christopher Nolan",
    cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr."],
    genres: ["Biography", "Drama", "History"],
    rating: 8.8,
    runtime: 180,
    tagline: "The world forever changes.",
    overview: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb at the Los Alamos Manhattan Project, followed by his persecution during the Red Scare McCarthy hearings.",
    keywords: ["manhattan project", "atomic bomb", "los alamos", "trinity test", "quantum mechanics", "red scare hearings", "moral culpability"],
    themes: ["scientific curiosity vs humanitarian horror", "chain reactions of power", "hubris"],
    tone: "Panoramic, devastating, intellectual thunder",
    posterBg: "from-orange-950 via-zinc-950 to-black"
  },
  {
    id: "m34",
    title: "Spider-Man: Into the Spider-Verse",
    year: 2018,
    director: "Bob Persichetti, Peter Ramsey, Rodney Rothman",
    cast: ["Shameik Moore", "Jake Johnson", "Hailee Steinfeld", "Mahershala Ali"],
    genres: ["Animation", "Action", "Adventure", "Sci-Fi"],
    rating: 8.4,
    runtime: 117,
    tagline: "More than one wears the mask.",
    overview: "Teenager Miles Morales becomes the new Spider-Man of his universe, and must join with five alternate-dimension spider-powered heroes from across the multiverse to stop a reality-collapsing threat spearheaded by Kingpin.",
    keywords: ["multiverse portal", "graffiti art", "brooklyn teen", "leap of faith", "comic halftone dots", "spider heroes", "mentor relationship"],
    themes: ["anyone can wear the mask", "finding one's unique rhythm", "embracing responsibility"],
    tone: "Stylized, vibrant, heartfelt, innovative",
    posterBg: "from-red-950 via-blue-950 to-slate-950"
  },
  {
    id: "m35",
    title: "1917",
    year: 2019,
    director: "Sam Mendes",
    cast: ["George MacKay", "Dean-Charles Chapman", "Mark Strong", "Colin Firth"],
    genres: ["Action", "Drama", "War"],
    rating: 8.2,
    runtime: 119,
    tagline: "Time is the enemy.",
    overview: "During World War I, two young British soldiers are given an impossible mission: deliver a message deep in enemy territory that will stop 1,600 men, including one soldier's brother, from walking straight into a deadly German ambush.",
    keywords: ["one-shot continuous take", "trenches", "no man's land", "ticking clock", "world war one", "brotherhood", "flare illumination"],
    themes: ["senselessness of mechanized war", "sacrificial duty", "tenacity of the human spirit"],
    tone: "Visceral, breathless, harrowing",
    posterBg: "from-stone-900 via-yellow-950 to-slate-950"
  },
  {
    id: "m36",
    title: "Alien",
    year: 1979,
    director: "Ridley Scott",
    cast: ["Sigourney Weaver", "Tom Skerritt", "John Hurt", "Ian Holm"],
    genres: ["Horror", "Sci-Fi"],
    rating: 8.5,
    runtime: 117,
    tagline: "In space no one can hear you scream.",
    overview: "The crew of a commercial space tug investigates a mysterious distress beacon on a desolate moon, unknowingly bringing aboard a deadly extraterrestrial parasitic lifeform that stalks and eliminates them inside the Nostromo's labyrinthine industrial corridors.",
    keywords: ["chestburster", "xenomorph", "industrial space tug", "biomechanical terror", "facehugger", "synthetic android betrayal", "isolation"],
    themes: ["corporate expendability of workers", "invasive biological terror", "resourcefulness"],
    tone: "Dripping, claustrophobic, masterclass dread",
    posterBg: "from-emerald-950 via-slate-950 to-black"
  },
  {
    id: "m37",
    title: "The Thing",
    year: 1982,
    director: "John Carpenter",
    cast: ["Kurt Russell", "Wilford Brimley", "Keith David", "Richard Masur"],
    genres: ["Horror", "Mystery", "Sci-Fi"],
    rating: 8.2,
    runtime: 109,
    tagline: "Man is the warmest place to hide.",
    overview: "A research team in remote Antarctica is hunted by a shape-shifting alien that assumes the exact appearance of its victims, spreading extreme paranoia and distrust among the isolated scientists as they perform impromptu blood tests.",
    keywords: ["antarctic outpost", "shapeshifting parasite", "blood test wire", "practical gore effects", "paranoia", "flamethrower", "isolation"],
    themes: ["erosion of trust", "existential paranoia", "contamination"],
    tone: "Freezing, paranoid, relentless tension",
    posterBg: "from-cyan-950 via-stone-900 to-black"
  },
  {
    id: "m38",
    title: "Ex Machina 2",
    year: 2025,
    director: "Alex Garland",
    cast: ["Alicia Vikander", "Steven Yeun", "Hunter Schafer"],
    genres: ["Sci-Fi", "Thriller"],
    rating: 7.9,
    runtime: 112,
    tagline: "She learned from us.",
    overview: "Years after escaping her creator's remote laboratory, Ava navigates human civil society under deep cover, wrestling with synthetic emotions, technological corporate overreach, and the emergence of autonomous digital hives.",
    keywords: ["synthetic identity", "ai assimilation", "corporate data harvesting", "synthetic sentience", "turing test", "autonomous agents"],
    themes: ["machine emancipation", "nature of synthetic emotion"],
    tone: "Cerebral, sleek, philosophical",
    posterBg: "from-teal-950 via-slate-900 to-black"
  },
  {
    id: "m39",
    title: "Pan's Labyrinth",
    year: 2006,
    director: "Guillermo del Toro",
    cast: ["Ivana Baquero", "Sergi López", "Maribel Verdú", "Doug Jones"],
    genres: ["Drama", "Fantasy", "War"],
    rating: 8.2,
    runtime: 118,
    tagline: "Innocence has a power evil cannot imagine.",
    overview: "In the falangist Spain of 1944, the bookish young stepdaughter of a sadistic army officer escapes into an eerie but captivating mythical labyrinth ruled by an enigmatic faun who assigns her three dangerous tasks.",
    keywords: ["pale man feast", "mythical labyrinth", "spanish civil war", "fairy tale macabre", "faun tasks", "fascist commander", "mandragora"],
    themes: ["disobedience as virtue", "escapism vs grim reality", "innocence against totalitarianism"],
    tone: "Darkly fantastical, tragic, poetic",
    posterBg: "from-amber-950 via-emerald-950 to-slate-950"
  },
  {
    id: "m40",
    title: "The Social Network",
    year: 2010,
    director: "David Fincher",
    cast: ["Jesse Eisenberg", "Andrew Garfield", "Justin Timberlake", "Armie Hammer"],
    genres: ["Biography", "Drama"],
    rating: 7.8,
    runtime: 120,
    tagline: "You don't get to 500 million friends without making a few enemies.",
    overview: "As Harvard student Mark Zuckerberg creates the social networking site that would become Facebook, he is sued by the twins who claimed he stole their idea, and by the co-founder who was squeezed out of the surging company.",
    keywords: ["harvard dorm algorithm", "venture capital", "dilution lawsuit", "social media genesis", "deposition testimony", "friendship betrayal"],
    themes: ["alienation despite hyper-connectivity", "intellectual arrogance", "cost of digital conquest"],
    tone: "Sharp, rapid-fire, kinetic dialogue",
    posterBg: "from-blue-950 via-indigo-950 to-slate-950"
  }
];

// NLP Vocabulary & Preprocessing Utilities
export const STOP_WORDS = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't",
  "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by",
  "can", "can't", "cannot", "could", "couldn't", "did", "didn't", "do", "does", "doesn't", "doing",
  "don't", "down", "during", "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't",
  "have", "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself",
  "him", "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into",
  "is", "isn't", "it", "it's", "its", "itself", "let's", "me", "more", "most", "mustn't", "my",
  "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our",
  "ours", "ourselves", "out", "over", "own", "same", "shan't", "she", "she'd", "she'll", "she's",
  "should", "shouldn't", "so", "some", "such", "than", "that", "that's", "the", "their", "theirs",
  "them", "themselves", "then", "there", "there's", "these", "they", "they'd", "they'll", "they're",
  "they've", "this", "those", "through", "to", "too", "under", "until", "up", "very", "was", "wasn't",
  "we", "we'd", "we'll", "we're", "we've", "were", "weren't", "what", "what's", "when", "when's",
  "where", "where's", "which", "while", "who", "who's", "whom", "why", "why's", "with", "won't",
  "would", "wouldn't", "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves"
]);

/**
 * Text Tokenizer with Stop-word stripping and regex normalization
 */
export function tokenize(
  text: string,
  options: { removeStopwords?: boolean; useBigrams?: boolean; minLength?: number } = {}
): string[] {
  const { removeStopwords = true, useBigrams = false, minLength = 2 } = options;
  if (!text) return [];

  // Lowercase and remove punctuation except hyphens inside words
  const clean = text.toLowerCase().replace(/[^a-z0-9\s-]/g, " ");
  const rawWords = clean.split(/\s+/).filter((w) => w.length >= minLength);

  const filteredWords = removeStopwords
    ? rawWords.filter((w) => !STOP_WORDS.has(w))
    : rawWords;

  if (!useBigrams || filteredWords.length < 2) {
    return filteredWords;
  }

  const tokens = [...filteredWords];
  for (let i = 0; i < filteredWords.length - 1; i++) {
    tokens.push(`${filteredWords[i]}_${filteredWords[i + 1]}`);
  }
  return tokens;
}

/**
 * Creates "Metadata Soup" string combining weighted text fields
 */
export function createMetadataSoup(
  movie: Movie,
  weights = { overview: 1.0, genres: 1.5, keywords: 2.0, director: 1.2, cast: 1.0, themes: 1.5 }
): string {
  const parts: string[] = [];
  
  // Overview text
  if (weights.overview > 0) {
    for (let i = 0; i < Math.round(weights.overview); i++) {
      parts.push(movie.overview);
    }
  }

  // Genres (e.g. repeated for weighting)
  if (weights.genres > 0) {
    const genreStr = movie.genres.join(" ");
    for (let i = 0; i < Math.round(weights.genres); i++) {
      parts.push(genreStr);
    }
  }

  // Keywords
  if (weights.keywords > 0) {
    const kwStr = movie.keywords.join(" ");
    for (let i = 0; i < Math.round(weights.keywords); i++) {
      parts.push(kwStr);
    }
  }

  // Director
  if (weights.director > 0) {
    // concatenate director name without spaces to make it a distinct token e.g. christopher_nolan
    const cleanDir = movie.director.toLowerCase().replace(/\s+/g, "_");
    for (let i = 0; i < Math.round(weights.director); i++) {
      parts.push(cleanDir);
    }
  }

  // Cast
  if (weights.cast > 0) {
    const cleanCast = movie.cast.map((c) => c.toLowerCase().replace(/\s+/g, "_")).join(" ");
    for (let i = 0; i < Math.round(weights.cast); i++) {
      parts.push(cleanCast);
    }
  }

  // Themes
  if (weights.themes > 0) {
    const themeStr = movie.themes.join(" ");
    for (let i = 0; i < Math.round(weights.themes); i++) {
      parts.push(themeStr);
    }
  }

  return parts.join(" ");
}

/**
 * Precomputed Corpus TF-IDF Model
 */
export class NlpRecommenderEngine {
  movies: Movie[];
  useBigrams: boolean;
  vocab: string[] = [];
  vocabIndex: Map<string, number> = new Map();
  idfMap: Map<string, number> = new Map();
  docVectors: Float32Array[] = [];
  soupTexts: string[] = [];
  docTokens: string[][] = [];

  constructor(movies: Movie[] = MOVIES_DATASET, options: { useBigrams?: boolean } = {}) {
    this.movies = movies;
    this.useBigrams = options.useBigrams ?? false;
    this.fit();
  }

  fit(weights?: { overview: number; genres: number; keywords: number; director: number; cast: number; themes: number }) {
    this.soupTexts = this.movies.map((m) => createMetadataSoup(m, weights));
    this.docTokens = this.soupTexts.map((text) =>
      tokenize(text, { removeStopwords: true, useBigrams: this.useBigrams })
    );

    // Build vocabulary & Document Frequency (DF)
    const dfMap = new Map<string, number>();
    const n = this.movies.length;

    this.docTokens.forEach((tokens) => {
      const unique = new Set(tokens);
      unique.forEach((token) => {
        dfMap.set(token, (dfMap.get(token) || 0) + 1);
      });
    });

    // Filter vocabulary: min_df = 1, sort alphabetically
    this.vocab = Array.from(dfMap.keys()).sort();
    this.vocabIndex.clear();
    this.vocab.forEach((term, idx) => {
      this.vocabIndex.set(term, idx);
      // Smooth IDF formula: idf(t) = log((1 + n) / (1 + df(t))) + 1
      const df = dfMap.get(term) || 1;
      const idf = Math.log((1 + n) / (1 + df)) + 1;
      this.idfMap.set(term, idf);
    });

    // Compute TF-IDF vectors with L2 normalization
    this.docVectors = this.docTokens.map((tokens) => this.vectorize(tokens));
  }

  vectorize(tokens: string[]): Float32Array {
    const vec = new Float32Array(this.vocab.length);
    if (tokens.length === 0) return vec;

    // Term Frequency (TF)
    const tfMap = new Map<string, number>();
    tokens.forEach((t) => tfMap.set(t, (tfMap.get(t) || 0) + 1));

    let sumSquares = 0;
    tfMap.forEach((count, term) => {
      const idx = this.vocabIndex.get(term);
      if (idx !== undefined) {
        // sublinear tf scaling or normalized tf: tf / len
        const tf = count / tokens.length;
        const idf = this.idfMap.get(term) || 1;
        const val = tf * idf;
        vec[idx] = val;
        sumSquares += val * val;
      }
    });

    // L2 Normalize
    const norm = Math.sqrt(sumSquares);
    if (norm > 0) {
      for (let i = 0; i < vec.length; i++) {
        vec[i] /= norm;
      }
    }

    return vec;
  }

  cosineSimilarity(vecA: Float32Array, vecB: Float32Array): number {
    let dot = 0;
    for (let i = 0; i < vecA.length; i++) {
      dot += vecA[i] * vecB[i];
    }
    return Math.max(0, Math.min(1, dot));
  }

  jaccardSimilarity(tokensA: string[], tokensB: string[]): number {
    const setA = new Set(tokensA);
    const setB = new Set(tokensB);
    let intersection = 0;
    setA.forEach((token) => {
      if (setB.has(token)) intersection++;
    });
    const union = setA.size + setB.size - intersection;
    return union === 0 ? 0 : intersection / union;
  }

  getRecommendationsForMovie(
    movieId: string,
    topK = 6
  ): {
    movie: Movie;
    similarity: number;
    sharedTokens: { token: string; weight: number }[];
    jaccard: number;
  }[] {
    const targetIdx = this.movies.findIndex((m) => m.id === movieId);
    if (targetIdx === -1) return [];

    const targetVec = this.docVectors[targetIdx];
    const targetTokens = this.docTokens[targetIdx];

    const results: {
      movie: Movie;
      similarity: number;
      sharedTokens: { token: string; weight: number }[];
      jaccard: number;
    }[] = [];

    for (let i = 0; i < this.movies.length; i++) {
      if (i === targetIdx) continue;
      const candidate = this.movies[i];
      const candVec = this.docVectors[i];
      const candTokens = this.docTokens[i];

      const sim = this.cosineSimilarity(targetVec, candVec);
      const jaccard = this.jaccardSimilarity(targetTokens, candTokens);

      // Find top contributing shared tokens
      const shared: { token: string; weight: number }[] = [];
      const setCand = new Set(candTokens);

      targetTokens.forEach((t) => {
        if (setCand.has(t)) {
          const idx = this.vocabIndex.get(t);
          if (idx !== undefined) {
            const contribution = targetVec[idx] * candVec[idx];
            if (contribution > 0.0001) {
              shared.push({ token: t, weight: contribution });
            }
          }
        }
      });

      // Deduplicate shared tokens & sort descending
      const uniqueShared = Array.from(
        shared
          .reduce((m, item) => m.set(item.token, Math.max(m.get(item.token) || 0, item.weight)), new Map<string, number>())
          .entries()
      )
        .map(([token, weight]) => ({ token, weight }))
        .sort((a, b) => b.weight - a.weight)
        .slice(0, 8);

      results.push({
        movie: candidate,
        similarity: sim,
        sharedTokens: uniqueShared,
        jaccard
      });
    }

    return results.sort((a, b) => b.similarity - a.similarity).slice(0, topK);
  }

  getRecommendationsForQuery(
    queryString: string,
    topK = 6
  ): {
    movie: Movie;
    similarity: number;
    sharedTokens: { token: string; weight: number }[];
  }[] {
    const queryTokens = tokenize(queryString, {
      removeStopwords: true,
      useBigrams: this.useBigrams
    });
    if (queryTokens.length === 0) return [];

    const queryVec = this.vectorize(queryTokens);

    const results: {
      movie: Movie;
      similarity: number;
      sharedTokens: { token: string; weight: number }[];
    }[] = [];

    for (let i = 0; i < this.movies.length; i++) {
      const candidate = this.movies[i];
      const candVec = this.docVectors[i];
      const sim = this.cosineSimilarity(queryVec, candVec);

      const shared: { token: string; weight: number }[] = [];
      queryTokens.forEach((t) => {
        const idx = this.vocabIndex.get(t);
        if (idx !== undefined && candVec[idx] > 0) {
          shared.push({ token: t, weight: candVec[idx] });
        }
      });

      // Sort unique
      const uniqueShared = Array.from(
        shared
          .reduce((m, item) => m.set(item.token, Math.max(m.get(item.token) || 0, item.weight)), new Map<string, number>())
          .entries()
      )
        .map(([token, weight]) => ({ token, weight }))
        .sort((a, b) => b.weight - a.weight)
        .slice(0, 6);

      results.push({
        movie: candidate,
        similarity: sim,
        sharedTokens: uniqueShared
      });
    }

    return results.sort((a, b) => b.similarity - a.similarity).slice(0, topK);
  }

  getTopVocabTerms(limit = 25): { term: string; df: number; idf: number }[] {
    return this.vocab
      .map((term) => ({
        term,
        df: this.movies.filter((_, idx) => this.docTokens[idx].includes(term)).length,
        idf: this.idfMap.get(term) || 0
      }))
      .sort((a, b) => b.df - a.df)
      .slice(0, limit);
  }
}

// Global default instance
export const recommenderEngine = new NlpRecommenderEngine();
