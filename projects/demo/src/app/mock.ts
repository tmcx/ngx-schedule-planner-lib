export const MOCK = [
  {
    profile: {
      id: 1,
      name: "Santiago Fernández",
      description:
        "Software engineer passionate about artificial intelligence.",
      tags: [
        { id: 1, name: "Programming" },
        { id: 2, name: "Artificial Intelligence" },
        { id: 3, name: "Software Development" },
      ],
      imageUrl: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
    },
    groups: [
      {
        name: "Programming Courses",
        id: 1,
        icon: "👨‍💻",
        activities: [
          {
            id: 1,
            name: "Machine Learning Basics",
            startDate: "2024-03-20T09:00:00",
            endDate: "2024-03-20T13:00:00",
            repeat: ["2024-04-01", "2024-04-15"],
            tags: [
              { id: 1, icon: "🤖", name: "Machine Learning" },
              { id: 2, icon: "📚", name: "Education" },
            ],
          },
          {
            id: 2,
            name: "Data Structures and Algorithms",
            startDate: "2024-04-05T10:00:00",
            endDate: "2024-04-05T13:00:00",
            repeat: ["2024-04-20", "2024-05-05"],
            tags: [
              { id: 3, icon: "💻", name: "Programming" },
              { id: 4, icon: "📝", name: "Algorithm" },
            ],
          },
          {
            id: 3,
            name: "Deep Learning Fundamentals",
            startDate: "2024-05-10T13:00:00",
            endDate: "2024-05-10T14:00:00",
            repeat: ["2024-05-25", "2024-06-05"],
            tags: [
              { id: 5, icon: "🧠", name: "Deep Learning" },
              { id: 6, icon: "📘", name: "Fundamentals" },
            ],
          },
        ],
      },
      {
        name: "Tech Workshops",
        id: 2,
        icon: "💻",
        activities: [
          {
            id: 4,
            name: "Blockchain Basics",
            startDate: "2024-06-20T14:00:00",
            endDate: "2024-06-20T23:59:00",
            repeat: ["2024-07-01", "2024-07-15"],
            tags: [
              { id: 7, icon: "🔗", name: "Blockchain" },
              { id: 8, icon: "📊", name: "Basics" },
            ],
          },
          {
            id: 5,
            name: "Cybersecurity Essentials",
            startDate: "2024-07-05T10:00:00",
            endDate: "2024-07-05T13:00:00",
            repeat: ["2024-07-20", "2024-08-05"],
            tags: [
              { id: 9, icon: "🛡️", name: "Cybersecurity" },
              { id: 10, icon: "💻", name: "Essentials" },
            ],
          },
        ],
      },
    ],
  },
  {
    profile: {
      id: 2,
      name: "Aisha Patel",
      description: "Human rights lawyer specializing in advocacy.",
      tags: [
        { id: 4, name: "Human Rights Law" },
        { id: 5, name: "Advocacy" },
        { id: 6, name: "Legal Research" },
      ],
      imageUrl: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
    },
    groups: [
      {
        name: "Human Rights Advocacy",
        id: 3,
        icon: "🌐",
        activities: [
          {
            id: 6,
            name: "Global Refugee Crisis Seminar",
            startDate: "2024-04-15T16:30:00",
            endDate: "2024-04-15T17:00:00",
            repeat: ["2024-05-01", "2024-05-15"],
            tags: [
              { id: 11, icon: "🚸", name: "Refugee Crisis" },
              { id: 12, icon: "🌐", name: "Global Seminar" },
            ],
          },
          {
            id: 7,
            name: "Legal Rights of Indigenous Peoples",
            startDate: "2024-05-05T13:00:00",
            endDate: "2024-05-05T16:00:00",
            repeat: ["2024-05-20", "2024-06-05"],
            tags: [
              { id: 13, icon: "🏞️", name: "Indigenous Rights" },
              { id: 14, icon: "⚖️", name: "Legal Rights" },
            ],
          },
        ],
      },
    ],
  },
];
