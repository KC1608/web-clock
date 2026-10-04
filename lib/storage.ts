import { CarArticle, ConnectMessage, INITIAL_ARTICLES } from "./car-data";

// In-memory runtime cache for contributions during the app session
declare global {
  // eslint-disable-next-line no-var
  var __articlesStore: CarArticle[] | undefined;
  // eslint-disable-next-line no-var
  var __connectMessagesStore: ConnectMessage[] | undefined;
}

if (!global.__articlesStore) {
  global.__articlesStore = [...INITIAL_ARTICLES];
}

if (!global.__connectMessagesStore) {
  global.__connectMessagesStore = [
    {
      id: "seed-1",
      name: "TunerDave",
      email: "dave.boost@gmail.com",
      favoriteCar: "R34 Skyline GT-R (RB26DETT)",
      interestArea: "Twin Turbos & Boost Controllers",
      message:
        "Excited to see a dedicated technical breakdown hub! Would love to see an article dissecting twin-scroll vs single large turbo transient response on 6-cylinders.",
      createdAt: "2026-10-01T14:22:00Z",
    },
    {
      id: "seed-2",
      name: "ApexRotary",
      email: "rotary.apex99@outlook.com",
      favoriteCar: "Mazda RX-7 FD3S (13B-REW)",
      interestArea: "Rotary Apex Seals & Sequential Turbos",
      message:
        "Awesome platform. Let's get more content on two-rotor oil metering pump upgrades and premixing ratios!",
      createdAt: "2026-10-03T09:15:00Z",
    },
  ];
}

export function getAllArticles(): CarArticle[] {
  return global.__articlesStore || INITIAL_ARTICLES;
}

export function getArticleBySlug(slug: string): CarArticle | undefined {
  const articles = getAllArticles();
  return articles.find((a) => a.slug === slug);
}

export function addArticle(article: Omit<CarArticle, "id" | "publishedAt">): CarArticle {
  const newArticle: CarArticle = {
    ...article,
    id: Date.now().toString(),
    publishedAt: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  };
  global.__articlesStore = [newArticle, ...(global.__articlesStore || [])];
  return newArticle;
}

export function getAllConnectMessages(): ConnectMessage[] {
  return global.__connectMessagesStore || [];
}

export function addConnectMessage(
  data: Omit<ConnectMessage, "id" | "createdAt">
): ConnectMessage {
  const newMessage: ConnectMessage = {
    ...data,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  global.__connectMessagesStore = [newMessage, ...(global.__connectMessagesStore || [])];
  return newMessage;
}
