export type ProjectType = "Short Film" | "Web Series" | "Feature Film" | "Script Only" | "Concept";
export type ProjectStatus = "Idea" | "Writing" | "Development" | "Pre Production" | "Production" | "Post Production" | "Released" | "Archived";

export interface Project {
  id: string;
  slug?: string;
  projectType?: ProjectType;
  title: string;
  status: string;
  genre: string;
  progress: number;
  description: string;
  logline?: string;
  synopsis?: string;
  overview?: string;
  developmentStage: string;
  expectedCompletion: string;
  posterUrl: string;
  heroBannerUrl?: string;
  directorNotes?: string;
  visibility?: "public" | "draft" | "private";
  createdDate?: string;
  updatedDate?: string;
  seasons?: { seasonNumber: number; title: string; synopsis?: string }[];
  episodes?: { id: string; seasonNumber: number; episodeNumber: number; title: string; synopsis: string; videoUrl: string; duration?: string }[];
  cast?: { id: string; name: string; roleName: string; bio?: string; imageUrl?: string }[];
  crew?: { id: string; name: string; department: string; role: string }[];
  scriptVersions?: { id: string; version: string; date: string; notes: string; status: string }[];
  festivalSection?: { id: string; festivalName: string; awardOrSelection: string; year: string }[];
  worldBuilding?: { title: string; description: string }[];
  characters?: { name: string; arc: string; notes?: string }[];
  locations?: { name: string; description: string; imageUrl?: string }[];
  researchNotes?: { topic: string; content: string }[];
  moodboard?: { title: string; imageUrl: string; caption?: string }[];
  videos?: { id: string; title: string; url: string; type: "Trailer" | "BTS" | "Scene" | "Short" }[];
  timeline?: { stage: string; date: string; description: string; completed: boolean }[];
}

export interface DevelopingConcept {
  id: string;
  title: string;
  genre: string;
  mood: string;
  premise: string;
  status: string;
  isBlurred?: boolean;
  posterUrl?: string;
  visibility?: "public" | "draft" | "private";
}

export interface GalleryItem {
  id: string;
  title: string;
  category:
  | "Behind the Scenes"
  | "Projects"
  | "Concept Art"
  | "Posters"
  | "Location Scouting"
  | "Production"
  | "Film Stills"
  | "Storyboard Frames"
  | "Color Palettes"
  | "Moodboards";
  imageUrl: string;
  aspect: "tall" | "wide" | "square";
  description?: string;
  visibility?: "public" | "draft" | "private";
  project?: string;
  date?: string;
  altText?: string;
  photographer?: string;
}

export interface FilmographyItem {
  id: string;
  title: string;
  year: string;
  role: string;
  category: "Released" | "In Development" | "Upcoming";
  logline: string;
  festivals?: string[];
  runtime?: string;
  visibility?: "public" | "draft" | "private";
}

export interface BlogArticle {
  id: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  content: string;
  visibility?: "public" | "draft" | "private";
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  production: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location?: string;
  quote?: string;
}

export interface SocialLinks {
  instagram: string;
  imdb: string;
  linkedin: string;
  email: string;
}

export interface SeoSettings {
  title: string;
  description: string;
  keywords: string[];
}

export interface MessageItem {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
  replied?: boolean;
}

export interface PortfolioData {
  hero: {
    headline: string;
    subheading: string;
    videoBg: string;
  };
  about: {
    name: string;
    portraitUrl: string;
    bio: string;
    interests: string[];
    timeline: { title: string; year: string; description: string }[];
  };
  projects: Project[];
  concepts: DevelopingConcept[];
  gallery: GalleryItem[];
  filmography: FilmographyItem[];
  blog: BlogArticle[];
  testimonials: Testimonial[];
  showreel: {
    videoUrl: string;
    directorsVision: string;
    creativePhilosophy: string;
    favoriteGenres: string[];
    inspirations: string[];
  };
  contactInfo: ContactInfo;
  socialLinks: SocialLinks;
  seo: SeoSettings;
  messages: MessageItem[];
}

export const initialPortfolioData: PortfolioData = {
  hero: {
    headline: "Stories That Stay With You.",
    subheading: "Writer • Director • Storyteller",
    videoBg: "/images/untold-stories.jpg",
  },
  about: {
    name: "DENESH SATYA SAI",
    portraitUrl: "/images/denesh-portrait.jpg",
    bio: "An independent filmmaker, screenwriter, and director dedicated to crafting emotionally resonant cinema across contrasting worlds. Combining intimate character psychology with striking minimalist production design, every frame is constructed to evoke wonder, tension, and lingering human truth.",
    interests: [
      "Drama",
      "Psychological Thriller",
      "Romance",
      "Fantasy",
      "Crime",
      "Mystery",
    ],
    timeline: [
      {
        title: "Started Writing",
        year: "2021",
        description:
          "Penned early stage plays and atmospheric character studies exploring isolation and human connection.",
      },
      {
        title: "Working in Projects",
        year: "2026–Present",
        description:
          "Active production and directing on romantic drama feature 'Untold stories'.",
      },
      {
        title: "Stories Under Development",
        year: "2026–2027",
        description:
          "Developing slate including '3 Days journey', 'The love', and dark fantasy series 'Cursed wings (series)'.",
      },
      {
        title: "Ideas to Develop",
        year: "Incubator Slate",
        description:
          "Original concepts in conceptual research including 'The saviour', 'brocode dairies', and 'mayakona'.",
      },
      {
        title: "DSS Production Vision",
        year: "Future Slate",
        description:
          "Building an independent production house championing bold auteur cinema with global emotional reach.",
      },
    ],
  },
  projects: [
    {
      id: "untold-stories",
      slug: "untold-stories",
      projectType: "Feature Film",
      title: "Untold stories",
      status: "Production",
      genre: "Romantic Drama",
      progress: 80,
      description:
        "A heartfelt romantic drama exploring how time, destiny, and love reunite two souls separated by life's choices.",
      logline: "When years of separation end at a crossroads, two former lovers must decide if destiny can rewrite the choices that pulled them apart.",
      synopsis: "Untold Stories is an intimate feature film exploring the fragile intersection of memory, regret, and enduring love across two distinct timelines.",
      developmentStage: "Active Production & Final Polish",
      expectedCompletion: "Q4 2026",
      posterUrl: "/images/untold-stories.jpg",
      directorNotes:
        "Exploring warm anamorphic lenses and natural twilight lighting to capture the bittersweet passage of years.",
      visibility: "public",
      createdDate: "2026-01-15",
      updatedDate: "2026-07-15",
      cast: [
        { id: "cast-1", name: "Elena Rostova", roleName: "Maya", bio: "Lead protagonist navigating past echoes." },
        { id: "cast-2", name: "David Vance", roleName: "Julian", bio: "The architect haunted by what could have been." }
      ],
      crew: [
        { id: "crew-1", name: "Denesh Satya Sai", department: "Directing", role: "Director & Writer" }
      ]
    },
    {
      id: "3-days-journey",
      slug: "3-days-journey",
      projectType: "Feature Film",
      title: "3 Days journey",
      status: "Development",
      genre: "Road Trip Drama • Thriller",
      progress: 60,
      description:
        "A transformative seventy-two hour journey across shifting terrains that tests relationships, secrets, and survival.",
      logline: "Stranded across 800 miles of unforgiving terrain, three companions uncover secrets that turn a cross-country drive into a psychological reckoning.",
      developmentStage: "Screenplay Architecture & Location Scouting",
      expectedCompletion: "Q1 2027",
      posterUrl: "/images/3-days-journey.jpg",
      directorNotes:
        "Kinetic hand-held camerawork mixed with sweeping panoramic drone shots capturing vast horizons.",
      visibility: "public",
      createdDate: "2026-02-10",
      updatedDate: "2026-07-15",
    },
    {
      id: "the-love",
      slug: "the-love",
      projectType: "Short Film",
      title: "The love",
      status: "Writing",
      genre: "Intimate Drama",
      progress: 45,
      description:
        "An exploration of devotion, unspoken vulnerabilities, and what remains when infatuation evolves into endurance.",
      logline: "In the silence of a single evening, a couple faces the quiet chasm between passion and devotion.",
      developmentStage: "Character Profiles & Act II Polish",
      expectedCompletion: "Q2 2027",
      posterUrl: "/images/untold-stories.jpg",
      directorNotes:
        "Intimate close-ups and ambient soundscapes emphasizing quiet pauses between lines.",
      visibility: "public",
      createdDate: "2026-03-01",
      updatedDate: "2026-07-15",
    },
    {
      id: "cursed-wings-series",
      slug: "cursed-wings",
      projectType: "Web Series",
      title: "Cursed wings (series)",
      status: "Pre Production",
      genre: "Dark Fantasy Series",
      progress: 40,
      description:
        "A dark fantasy series exploring destiny, sacrifice, supernatural forces, and the hidden cost of power.",
      logline: "Born with forbidden wings of obsidian, a rogue warrior must unite fractured kingdoms before an ancient blight consumes the realm.",
      developmentStage: "Series Bible & Pilot Script Architecture",
      expectedCompletion: "Q3 2027",
      posterUrl: "/images/cursed-wings.jpg",
      directorNotes:
        "Heavy emphasis on practical costume design and chiaroscuro shadow play.",
      visibility: "public",
      createdDate: "2026-03-20",
      updatedDate: "2026-07-15",
      seasons: [
        { seasonNumber: 1, title: "Season 1: Obsidian Rise", synopsis: "The awakening of the cursed bloodline and the flight from the High Citadel." }
      ],
      episodes: [
        { id: "ep-1", seasonNumber: 1, episodeNumber: 1, title: "Pilot: Blood & Feather", synopsis: "Vaelin discovers the dark mark upon his back as the inquisitors close in.", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: "45m" }
      ],
      characters: [
        { name: "Vaelin", arc: "From hunted outcast to reluctant leader of the winged rebellion." }
      ]
    },
  ],
  concepts: [
    {
      id: "the-saviour",
      title: "The saviour",
      genre: "Psychological Thriller / Drama",
      mood: "Redemption • High Stakes • Moral Ambiguity",
      premise:
        "An unexpected guardian finds himself forced to confront his own shadowed history to protect an innocent stranger.",
      status: "Idea to Develop",
      isBlurred: false,
      posterUrl: "/images/the-saviour.jpg",
    },
    {
      id: "brocode-dairies",
      title: "brocode dairies",
      genre: "Coming-of-Age Drama",
      mood: "Brotherhood • Nostalgia • Campus Life",
      premise:
        "A spirited coming-of-age chronicle celebrating friendship, loyalties, and unforgettable university memories.",
      status: "Idea to Develop",
      isBlurred: true,
      posterUrl: "/images/3-days-journey.jpg",
    },
    {
      id: "mayakona",
      title: "mayakona",
      genre: "Mystic Drama / Thriller",
      mood: "Enigma • Atmospheric Mist • Ancient Folklore",
      premise:
        "Set within a secluded mist-shrouded valley where folklore intertwines with psychological mystery.",
      status: "Idea to Develop",
      isBlurred: false,
      posterUrl: "/images/cursed-wings.jpg",
    },
  ],
  gallery: [
    {
      id: "gal-1",
      title: "Rainfall on Anamorphic Glass — Untold stories",
      category: "Film Stills",
      imageUrl: "/images/untold-stories.jpg",
      aspect: "wide",
      description: "Atmospheric test frame shot on 40mm anamorphic prime lens with warm amber falloff.",
      visibility: "public",
      project: "Untold Stories",
      date: "May 2026",
      altText: "Maya playing classical piano in twilight apartment",
      photographer: "Denesh Satya Sai Studio",
    },
    {
      id: "gal-2",
      title: "3 Days Journey Official Poster",
      category: "Posters",
      imageUrl: "/images/3-days-journey.jpg",
      aspect: "tall",
      description: "Official theatrical poster artwork for 3 Days Journey highway road chronicle.",
      visibility: "public",
      project: "3 Days Journey",
      date: "June 2026",
      altText: "Rainlit highway diner at dusk poster",
      photographer: "DSS Art Dept",
    },
    {
      id: "gal-3",
      title: "The Saviour Poster Artwork",
      category: "Posters",
      imageUrl: "/images/the-saviour.jpg",
      aspect: "tall",
      description: "Atmospheric village artwork and character silhouette for The Saviour.",
      visibility: "public",
      project: "The Saviour",
      date: "July 2026",
      altText: "Secluded misty village silhouette poster",
      photographer: "DSS Art Dept",
    },
    {
      id: "gal-4",
      title: "Director Denesh Satya Sai on Location",
      category: "Behind the Scenes",
      imageUrl: "/images/denesh-portrait.jpg",
      aspect: "tall",
      description: "Director Denesh Satya Sai framing an anamorphic sequence on location.",
      visibility: "public",
      project: "Untold Stories",
      date: "April 2026",
      altText: "Director Denesh Satya Sai portrait on set",
      photographer: "Elena Rostova",
    },
    {
      id: "gal-5",
      title: "Cursed Wings Concept Artwork",
      category: "Concept Art",
      imageUrl: "/images/cursed-wings.jpg",
      aspect: "square",
      description: "Dark fantasy winged creature and basalt citadel visual concept.",
      visibility: "public",
      project: "Cursed Wings",
      date: "June 2026",
      altText: "Dark fantasy basalt cloisters concept art",
      photographer: "DSS Concept Lab",
    },
  ],
  filmography: [
    {
      id: "film-1",
      title: "Untold stories",
      year: "2026",
      role: "Writer • Director",
      category: "In Development",
      logline:
        "A romantic drama tracing two lovers whose lives intersect across changing seasons.",
      runtime: "118 mins (Est.)",
    },
    {
      id: "film-2",
      title: "3 Days journey",
      year: "2026",
      role: "Writer • Director",
      category: "In Development",
      logline:
        "A seventy-two hour road voyage that unravels unspoken secrets and transforms three lives.",
    },
    {
      id: "film-3",
      title: "The love",
      year: "2027",
      role: "Writer • Director",
      category: "In Development",
      logline:
        "An intimate character study on vulnerability, devotion, and enduring connection.",
    },
    {
      id: "film-4",
      title: "Cursed wings (series)",
      year: "2027",
      role: "Creator • Executive Producer • Director",
      category: "Upcoming",
      logline:
        "An episodic dark fantasy chronicle exploring destiny, sacrifice, and supernatural forces.",
    },
  ],
  blog: [
    {
      id: "building-worlds",
      title: "Building Worlds Without Losing Humanity",
      date: "July 08, 2026",
      readTime: "6 min read",
      category: "World Building",
      excerpt:
        "In genre cinema, the grandest architectures mean nothing if the audience doesn't care whose heart is breaking in the room.",
      content: `World building is often mistaken for encyclopedia writing. When developing *Cursed wings (series)*, the temptation was to spend months detailing hierarchies or metallurgy.

However, cinema is fundamentally an intimate art form. When designing a cinematic universe, I always start with a single tactile object: a wristwatch, an unread letter, a scarred palm.`,
    },
    {
      id: "lessons-screenwriting",
      title: "Lessons from Screenwriting: The Power of Unsaid Words",
      date: "June 21, 2026",
      readTime: "5 min read",
      category: "Screenplay Craft",
      excerpt:
        "Dialogue is not what characters think; dialogue is what characters use to conceal what they truly feel.",
      content: `In early drafts, writers often force characters to articulate their internal wounds directly. But human beings rarely explain their grief in clear sentences.`,
    },
  ],
  testimonials: [
    {
      id: "test-1",
      quote:
        "Denesh Satya Sai directs with the emotional precision of a novelist and the visual command of a seasoned auteur. Every frame on set is deliberate and electric.",
      author: "Elena Rostova",
      role: "Lead Performer",
      production: "Untold stories",
    },
    {
      id: "test-2",
      quote:
        "Watching his script for '3 Days journey' evolve was remarkable. Every scene carries a profound undercurrent that stays with you long after reading.",
      author: "Marcus Rao & Co.",
      role: "Executive Producer",
      production: "Independent Cinema Slate",
    },
  ],
  showreel: {
    videoUrl: "/images/untold-stories.jpg",
    directorsVision:
      "Cinema is the only medium where time itself becomes clay in the artist's hands. My goal is to craft films that feel like vivid, intimate memories you didn't know you had.",
    creativePhilosophy:
      "Minimalist execution with maximum emotional resonance. Every camera movement must serve a psychological truth.",
    favoriteGenres: [
      "Psychological Thriller",
      "Character Drama",
      "Dark Fantasy",
      "Neo-Noir",
    ],
    inspirations: [
      "Christopher Nolan (Structural Precision)",
      "Denis Villeneuve (Scale & Atmosphere)",
      "A24 Independent Slate (Auteur Risk-Taking)",
      "Global Poetic Realism",
    ],
  },
  contactInfo: {
    email: "rachabattunisatya7@gmail.com",
    phone: "3332221110",
    location: "Hyderabad / Mumbai // Available for Global Production Slate",
    quote: "Every story deserves to be remembered.",
  },
  socialLinks: {
    email: "mailto:rachabattunisatya7@gmail.com",
    instagram: "https://www.instagram.com/_d_e_n_e___?igsh=MWRjMXVva3JwdHZxbg==",
    imdb: "https://www.imdb.com/name/nm17442387/?ref_=tt_ov_1_1",
    linkedin: "https://www.linkedin.com/in/denesh-satya-sai-394175278/",
  },
  seo: {
    title: "Denesh Satya Sai • Filmmaker, Screenwriter & Director Studio",
    description: "Official cinematic portfolio of independent filmmaker and director Denesh Satya Sai. Featuring theatrical productions, character drama dossiers, and directing methodology.",
    keywords: ["Denesh Satya Sai", "Filmmaker", "Screenwriter", "Director", "Indian Cinema", "Untold Stories", "Cursed Wings", "Chamber Drama"],
  },
  messages: [
    {
      id: "msg-init-1",
      name: "Julian Mercer // Mercer Films",
      email: "julian@mercerfilms.com",
      subject: "Co-Production Inquiry // Cursed Wings Season 1",
      message: "Denesh, we reviewed the development dossier and concept frames for 'Cursed wings (series)'. Our executive production house is interested in discussing international distribution and co-financing options for Q1 2027.",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      read: false,
      replied: false,
    },
    {
      id: "msg-init-2",
      name: "Aria Thorne // Festival Curator",
      email: "aria@indiecinemafest.org",
      subject: "Screening Selection Dialogue // Untold Stories",
      message: "We would like to invite 'Untold stories' for a special director's spotlight showcase at our upcoming European independent cinema symposium.",
      date: new Date(Date.now() - 86400000 * 2).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      read: true,
      replied: true,
    },
  ],
};
