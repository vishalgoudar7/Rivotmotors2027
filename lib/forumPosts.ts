export const forumCategories = [
  {
    name: "General Discussion",
    description: "Talk about RIVOT, daily riding, ownership questions, and community updates.",
    topics: 42,
    posts: 188,
  },
  {
    name: "NX100 Support",
    description: "Ask about charging, range, dashboard behavior, service, and scooter setup.",
    topics: 28,
    posts: 126,
  },
  {
    name: "Rides & Meetups",
    description: "Share routes, group rides, test ride experiences, and city-specific tips.",
    topics: 19,
    posts: 74,
  },
];

export const forumPosts = [
  {
    id: "1",
    slug: "best-charging-routine-for-daily-use",
    title: "Best charging routine for daily use?",
    author: "Aarav Mehta",
    category: "NX100 Support",
    date: "Aug 22, 2026",
    timeAgo: "4 days ago",
    replies: 12,
    views: 342,
    filter: "popular",
    excerpt:
      "I ride about 38 km every day. What charging pattern works best for keeping the scooter ready without overthinking it?",
    content: [
      "I am planning to use the NX100 for office rides and small evening errands. My average day is around 38 km, sometimes closer to 55 km if I add a detour.",
      "Should I top up every night, charge every alternate day, or wait for the battery to reach a lower level first? I would like to keep the routine simple and battery-friendly.",
    ],
    repliesList: [
      {
        author: "RIVOT Service Team",
        time: "3 days ago",
        body:
          "For a regular route like that, a light daily top-up is perfectly practical. Keep an eye on range before longer detours and avoid making low battery your normal routine.",
      },
      {
        author: "Nikhil S",
        time: "2 days ago",
        body:
          "I follow the same pattern for city rides. Plugging in after dinner has been the easiest habit because the scooter is always ready in the morning.",
      },
    ],
  },
  {
    id: "2",
    slug: "range-feedback-from-first-test-ride",
    title: "Range feedback from first test ride",
    author: "Meera Rao",
    category: "Rides & Meetups",
    date: "Aug 19, 2026",
    timeAgo: "1 week ago",
    replies: 8,
    views: 214,
    filter: "recent",
    excerpt:
      "Took a short test ride and wanted to compare notes on acceleration, comfort, and expected real-world range.",
    content: [
      "The scooter felt stable at city speeds and the throttle response was smoother than I expected. I am curious how range behaves with two riders and mixed traffic.",
      "Anyone here using a similar route with flyovers, slow signals, and short open stretches?",
    ],
    repliesList: [
      {
        author: "Kiran P",
        time: "6 days ago",
        body:
          "Two-rider range depends a lot on speed and starts/stops, but the ride feel stays planted. Try the route in the same time slot as your commute.",
      },
    ],
  },
  {
    id: "3",
    slug: "helmet-storage-and-floorboard-space",
    title: "Helmet storage and floorboard space",
    author: "Rohit K",
    category: "General Discussion",
    date: "Aug 16, 2026",
    timeAgo: "1 week ago",
    replies: 0,
    views: 98,
    filter: "unanswered",
    excerpt:
      "Does the boot fit a full-face helmet, and how comfortable is the floorboard for taller riders?",
    content: [
      "I am checking daily practicality before booking. Storage and foot room matter to me because I usually carry a backpack and sometimes ride with office shoes.",
      "Would love feedback from anyone who has inspected the scooter closely.",
    ],
    repliesList: [],
  },
  {
    id: "4",
    slug: "software-features-riders-want-next",
    title: "Software features riders want next",
    author: "Community Desk",
    category: "General Discussion",
    date: "Aug 10, 2026",
    timeAgo: "2 weeks ago",
    replies: 16,
    views: 411,
    filter: "popular",
    excerpt:
      "Route summaries, charging reminders, ride insights, service alerts. What would you like to see first?",
    content: [
      "Connected features are most useful when they save time or remove confusion. This thread collects the feature requests riders mention most often.",
      "Share the one feature that would make your ownership experience smoother.",
    ],
    repliesList: [
      {
        author: "Sana D",
        time: "2 weeks ago",
        body: "Charging reminders based on my usual commute would be useful. I do not want too many notifications, just the right one.",
      },
      {
        author: "Vivek M",
        time: "12 days ago",
        body: "Service alerts and ride summaries would be my top two. Especially if they are easy to understand at a glance.",
      },
    ],
  },
];

export function getForumPost(slugOrId: string) {
  return forumPosts.find((post) => post.slug === slugOrId || post.id === slugOrId);
}
