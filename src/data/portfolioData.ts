export interface Project {
  id: string;
  title: string;
  status: string;
  genre: string;
  progress: number;
  description: string;
  developmentStage: string;
  expectedCompletion: string;
  posterUrl: string;
  directorNotes?: string;
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
}

export interface StoryLabItem {
  id: string;
  category:
    | "Characters"
    | "World Building"
    | "Screenplays"
    | "Visual References"
    | "Moodboards"
    | "Dialogue Experiments"
    | "Research Notes";
  title: string;
  excerpt: string;
  details: string;
  tags: string[];
  date: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category:
    | "Concept Art"
    | "Location Photos"
    | "Behind the Scenes"
    | "Storyboard Frames"
    | "Film Stills"
    | "Color Palettes"
    | "Moodboards";
  imageUrl: string;
  aspect: "tall" | "wide" | "square";
  description?: string;
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
}

export interface BlogArticle {
  id: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  content: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  production: string;
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
  storyLab: StoryLabItem[];
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
        year: "2018",
        description:
          "Penned early stage plays and atmospheric character studies exploring isolation and human connection.",
      },
      {
        title: "Working in Projects",
        year: "2025–Present",
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
      title: "Untold stories",
      status: "Working in Projects",
      genre: "Romantic Drama",
      progress: 80,
      description:
        "A heartfelt romantic drama exploring how time, destiny, and love reunite two souls separated by life's choices.",
      developmentStage: "Active Production & Final Polish",
      expectedCompletion: "Q4 2026",
      posterUrl: "/images/untold-stories.jpg",
      directorNotes:
        "Exploring warm anamorphic lenses and natural twilight lighting to capture the bittersweet passage of years.",
    },
    {
      id: "3-days-journey",
      title: "3 Days journey",
      status: "Story Under Development",
      genre: "Road Trip Drama • Thriller",
      progress: 60,
      description:
        "A transformative seventy-two hour journey across shifting terrains that tests relationships, secrets, and survival.",
      developmentStage: "Screenplay Architecture & Location Scouting",
      expectedCompletion: "Q1 2027",
      posterUrl: "/images/3-days-journey.jpg",
      directorNotes:
        "Kinetic hand-held camerawork mixed with sweeping panoramic drone shots capturing vast horizons.",
    },
    {
      id: "the-love",
      title: "The love",
      status: "Story Under Development",
      genre: "Intimate Drama",
      progress: 45,
      description:
        "An exploration of devotion, unspoken vulnerabilities, and what remains when infatuation evolves into endurance.",
      developmentStage: "Character Profiles & Act II Polish",
      expectedCompletion: "Q2 2027",
      posterUrl: "/images/untold-stories.jpg",
      directorNotes:
        "Intimate close-ups and ambient soundscapes emphasizing quiet pauses between lines.",
    },
    {
      id: "cursed-wings-series",
      title: "Cursed wings (series)",
      status: "Story Under Development",
      genre: "Dark Fantasy Series",
      progress: 40,
      description:
        "A dark fantasy series exploring destiny, sacrifice, supernatural forces, and the hidden cost of power.",
      developmentStage: "Series Bible & Pilot Script Architecture",
      expectedCompletion: "Q3 2027",
      posterUrl: "/images/cursed-wings.jpg",
      directorNotes:
        "Heavy emphasis on practical costume design and chiaroscuro shadow play.",
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
  storyLab: [
    {
      id: "char-1",
      category: "Characters",
      title: "Maya — Untold stories",
      excerpt: "A classical pianist who measures time through unfinished compositions.",
      details:
        "Maya’s character arc revolves around accepting imperfection. Her apartment is filled with metronomes and antique sheet music from the 1970s.",
      tags: ["Protagonist", "Music", "Arc: Forgiveness"],
      date: "May 2026",
    },
    {
      id: "world-1",
      category: "World Building",
      title: "The Obsidian Citadel — Cursed wings (series)",
      excerpt: "Architectural rules of the high-altitude fortress where wings are forged.",
      details:
        "Constructed from volcanic basalt and brass conduits. Gravity behaves differently in the upper cloisters due to ancient atmospheric seals.",
      tags: ["Architecture", "Fantasy Canon", "Lighting Notes"],
      date: "June 2026",
    },
    {
      id: "scr-1",
      category: "Screenplays",
      title: "Act II Turning Point — 3 Days journey",
      excerpt: "Dialogue excerpt at the rainlit highway diner.",
      details:
        "EXT. HIGHWAY DINER - DUSK. Rain drums against the corrugated iron overhang. 'We didn't miss our chance. We just survived long enough to recognize it.'",
      tags: ["Scene Study", "3 Days journey", "Dialogue Polish"],
      date: "July 2026",
    },
    {
      id: "vis-1",
      category: "Visual References",
      title: "35mm Grain & Tungsten Streetlights",
      excerpt: "Study of shadow separation and anamorphic flares.",
      details:
        "Aiming for deep blacks with warm amber falloff. Avoid digital sharpness; soften highlights with 1/8 Black Pro-Mist filters.",
      tags: ["Cinematography", "Color Grading", "Optics"],
      date: "April 2026",
    },
  ],
  gallery: [
    {
      id: "gal-1",
      title: "Rainfall on Anamorphic Glass — Untold stories",
      category: "Film Stills",
      imageUrl: "/images/untold-stories.jpg",
      aspect: "wide",
      description: "Atmospheric test frame shot on 40mm anamorphic lens.",
    },
    {
      id: "gal-2",
      title: "3 Days Journey Official Poster",
      category: "Concept Art",
      imageUrl: "/images/3-days-journey.jpg",
      aspect: "tall",
      description: "Official theatrical poster artwork for 3 Days Journey.",
    },
    {
      id: "gal-3",
      title: "The Saviour Poster Artwork",
      category: "Concept Art",
      imageUrl: "/images/the-saviour.jpg",
      aspect: "tall",
      description: "Atmospheric village artwork for The Saviour.",
    },
    {
      id: "gal-4",
      title: "Director Denesh Satya Sai Portrait",
      category: "Behind the Scenes",
      imageUrl: "/images/denesh-portrait.jpg",
      aspect: "tall",
      description: "Director Denesh Satya Sai on location.",
    },
    {
      id: "gal-5",
      title: "Cursed Wings Concept Artwork",
      category: "Concept Art",
      imageUrl: "/images/cursed-wings.jpg",
      aspect: "square",
      description: "Dark fantasy winged creature visual concept.",
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
};
