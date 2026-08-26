export const blogPosts = [
  {
    id: "1",
    slug: "electric-commuting-with-rivot",
    title: "Electric commuting with RIVOT",
    excerpt:
      "How smart range, fast charging, and compact storage make the NX100 easier to live with every day.",
    author: "RIVOT Team",
    date: "Aug 18, 2026",
    image: "/Story_page/10.webp",
    readTime: "4 min read",
    sections: [
      {
        heading: "A practical electric routine",
        body:
          "Daily commuting works best when the vehicle quietly fits into your life. The NX100 is designed around predictable range, simple charging, and a riding posture that stays comfortable in city traffic.",
      },
      {
        heading: "Range confidence",
        body:
          "The goal is not only a large number on paper. It is a scooter that helps riders understand remaining range, plan stops, and finish regular trips without second guessing every kilometer.",
      },
      {
        heading: "Built for repeat use",
        body:
          "From boot space to floorboard comfort, small ownership details matter. The product experience is shaped around everyday use, quick errands, office rides, and weekend plans.",
      },
    ],
  },
  {
    id: "2",
    slug: "ride-the-future",
    title: "Ride the future",
    excerpt:
      "A look at the connected features and rider-first engineering behind RIVOT electric mobility.",
    author: "Product Studio",
    date: "Aug 12, 2026",
    image: "/Story_page/15.webp",
    readTime: "5 min read",
    sections: [
      {
        heading: "Connected, but not complicated",
        body:
          "Smart mobility should reduce friction. RIVOT focuses on useful information, clean controls, and features that support the rider without making the interface feel busy.",
      },
      {
        heading: "Designed around control",
        body:
          "Acceleration, braking, dashboard visibility, and ride modes are tuned to feel natural. The best technology becomes invisible once the ride begins.",
      },
      {
        heading: "Future-ready ownership",
        body:
          "The ecosystem is planned for updates, service support, accessories, and rider feedback, so the ownership experience can keep improving after delivery.",
      },
    ],
  },
  {
    id: "3",
    slug: "eco-friendly-adventures",
    title: "Eco-friendly adventures",
    excerpt:
      "City rides, short escapes, and the small habits that make electric riding feel cleaner and more rewarding.",
    author: "Community Desk",
    date: "Aug 5, 2026",
    image: "/Story_page/23.webp",
    readTime: "3 min read",
    sections: [
      {
        heading: "Cleaner miles",
        body:
          "Electric riding changes the feel of short-distance travel. Quiet acceleration and lower running effort make regular trips feel lighter and more intentional.",
      },
      {
        heading: "Weekend-ready",
        body:
          "A practical scooter still needs personality. The NX100 brings a confident stance and responsive performance for riders who want daily usefulness with some spark.",
      },
      {
        heading: "A growing rider community",
        body:
          "As more riders switch to electric, shared routes, charging habits, and ownership tips become part of the larger RIVOT community story.",
      },
    ],
  },
  {
    id: "4",
    slug: "battery-care-for-daily-riders",
    title: "Battery care for daily riders",
    excerpt:
      "Simple habits to keep your electric scooter ready for office rides, errands, and longer weekend plans.",
    author: "Service Team",
    date: "Jul 28, 2026",
    image: "/Story_page/16.webp",
    readTime: "4 min read",
    sections: [
      {
        heading: "Charge with a rhythm",
        body:
          "A regular charging pattern helps riders avoid last-minute stress. Top up based on your weekly route instead of waiting for the battery to reach the lowest point.",
      },
      {
        heading: "Watch the conditions",
        body:
          "Parking shade, clean connectors, and timely service checks all support dependable battery behavior across different seasons and city conditions.",
      },
      {
        heading: "Use the dashboard",
        body:
          "Rider information is most useful when checked early. Range estimates, alerts, and mode feedback help you make better decisions before the ride starts.",
      },
    ],
  },
];

export function getBlogPost(slugOrId: string) {
  return blogPosts.find((post) => post.slug === slugOrId || post.id === slugOrId);
}
