import { CalendarContent } from 'ngx-schedule-planner';

const ACTIVITIES: CalendarContent['activities'] = {
  1: {
    activityId: 1,
    groupId: 1,
    name: 'Machine Learning Basics',
    startDate: '2024-04-08T09:00:00',
    endDate: '2024-04-08T13:00:00',
    repeat: ['2024-04-09', '2024-04-15'],
    tags: [1, 2],
    colorTags: [1, 4],
  },
  2: {
    activityId: 2,
    groupId: 2,
    name: 'Data Structures and Algorithms',
    startDate: '2024-04-08T10:00:00',
    endDate: '2024-04-08T13:00:00',
    repeat: ['2024-04-09', '2024-04-11'],
    tags: [3, 4],
    colorTags: [2],
  },
  3: {
    activityId: 3,
    groupId: 1,
    name: 'Deep Learning Fundamentals',
    startDate: '2024-04-08T13:00:00',
    endDate: '2024-04-08T14:00:00',
    repeat: ['2024-05-25', '2024-06-05'],
    tags: [5, 6],
    colorTags: [3],
  },
  4: {
    activityId: 4,
    groupId: 2,
    name: 'Blockchain Basics',
    startDate: '2024-04-08T14:00:00',
    endDate: '2024-04-08T23:59:00',
    repeat: ['2024-07-01', '2024-07-15'],
    tags: [7, 8],
    colorTags: [4],
  },
  5: {
    activityId: 5,
    groupId: 1,
    name: 'Cybersecurity Essentials',
    startDate: '2024-04-08T10:00:00',
    endDate: '2024-04-08T13:00:00',
    repeat: ['2024-07-20', '2024-08-05'],
    tags: [9, 10],
    colorTags: [1],
  },
  6: {
    activityId: 6,
    groupId: 2,
    name: 'Global Refugee Crisis Seminar',
    startDate: '2024-04-08T16:30:00',
    endDate: '2024-04-08T17:00:00',
    repeat: ['2024-05-01', '2024-05-15'],
    tags: [11, 12],
    colorTags: [2],
  },
  7: {
    activityId: 7,
    groupId: 2,
    name: 'Legal Rights of Indigenous Peoples',
    startDate: '2024-04-08T13:00:00',
    endDate: '2024-04-08T16:00:00',
    repeat: ['2024-05-20', '2024-06-05'],
    tags: [13, 14],
    colorTags: [3],
  },
  8: {
    activityId: 8,
    groupId: 1,
    name: 'Advanced Machine Learning Techniques',
    startDate: '2024-04-10T09:00:00',
    endDate: '2024-04-10T13:00:00',
    repeat: ['2024-04-15', '2024-04-20'],
    tags: [1, 6],
    colorTags: [4],
  },
  9: {
    activityId: 9,
    groupId: 2,
    name: 'Introduction to Quantum Computing',
    startDate: '2024-04-10T10:00:00',
    endDate: '2024-04-10T12:00:00',
    repeat: ['2024-04-12', '2024-04-14'],
    tags: [3, 19],
    colorTags: [1],
  },
  10: {
    activityId: 10,
    groupId: 1,
    name: 'Natural Language Processing Workshop',
    startDate: '2024-04-12T13:00:00',
    endDate: '2024-04-12T16:00:00',
    repeat: ['2024-04-20', '2024-04-25'],
    tags: [1, 20],
    colorTags: [2],
  },
  11: {
    activityId: 11,
    groupId: 2,
    name: 'Introduction to Cybersecurity',
    startDate: '2024-04-12T14:00:00',
    endDate: '2024-04-12T17:00:00',
    repeat: ['2024-04-18', '2024-04-22'],
    tags: [9, 10],
    colorTags: [3],
  },
  12: {
    activityId: 12,
    groupId: 1,
    name: 'Web Development Bootcamp',
    startDate: '2024-04-15T09:00:00',
    endDate: '2024-04-17T17:00:00',
    repeat: ['2024-04-22', '2024-04-30'],
    tags: [21, 22],
    colorTags: [4],
  },
  13: {
    activityId: 13,
    groupId: 2,
    name: 'Artificial Intelligence Ethics Seminar',
    startDate: '2024-04-15T10:00:00',
    endDate: '2024-04-15T13:00:00',
    repeat: ['2024-04-25', '2024-04-28'],
    tags: [15, 23],
    colorTags: [1],
  },
  14: {
    activityId: 14,
    groupId: 1,
    name: 'Big Data Analytics Workshop',
    startDate: '2024-04-16T09:00:00',
    endDate: '2024-04-16T12:00:00',
    repeat: ['2024-04-26', '2024-04-29'],
    tags: [24, 25],
    colorTags: [2],
  },
  15: {
    activityId: 15,
    groupId: 2,
    name: 'Introduction to Robotics',
    startDate: '2024-04-17T10:00:00',
    endDate: '2024-04-17T15:00:00',
    repeat: ['2024-04-28', '2024-05-01'],
    tags: [26, 27],
    colorTags: [3],
  },
  16: {
    activityId: 16,
    groupId: 1,
    name: 'Cloud Computing Essentials',
    startDate: '2024-04-18T13:00:00',
    endDate: '2024-04-18T16:00:00',
    repeat: ['2024-04-30', '2024-05-03'],
    tags: [28, 29],
    colorTags: [4],
  },
  17: {
    activityId: 17,
    groupId: 2,
    name: 'Virtual Reality Development Workshop',
    startDate: '2024-04-19T14:00:00',
    endDate: '2024-04-19T17:00:00',
    repeat: ['2024-05-02', '2024-05-05'],
    tags: [30, 31],
    colorTags: [1],
  },
  18: {
    activityId: 18,
    groupId: 1,
    name: 'Internet of Things (IoT) Fundamentals',
    startDate: '2024-04-20T09:00:00',
    endDate: '2024-04-20T12:00:00',
    repeat: ['2024-05-05', '2024-05-08'],
    tags: [32, 33],
    colorTags: [2],
  },
  19: {
    activityId: 19,
    groupId: 2,
    name: 'Data Privacy Workshop',
    startDate: '2024-04-21T10:00:00',
    endDate: '2024-04-21T13:00:00',
    repeat: ['2024-05-06', '2024-05-09'],
    tags: [34, 35],
    colorTags: [2],
  },
  20: {
    activityId: 20,
    groupId: 1,
    name: 'Software Engineering Best Practices',
    startDate: '2024-04-22T13:00:00',
    endDate: '2024-04-22T16:00:00',
    repeat: ['2024-05-08', '2024-05-11'],
    tags: [36, 37],
    colorTags: [3],
  },
};
const PROFILES: CalendarContent['profiles'] = [
  {
    profileId: 1,
    name: 'Santiago Fernández',
    description: 'Software engineer passionate about artificial intelligence.',
    tags: [3, 15],
    imageUrl:
      'https://img.freepik.com/foto-gratis/primer-plano-hombre-negocios-serio-camisa-blanca-mirando-camara-pie-confiado_1258-26762.jpg',
    activities: [{ activityId: 1 }, { activityId: 2 }, { activityId: 7 }],
  },
  {
    profileId: 2,
    name: 'Aisha Patel',
    description: 'Human rights lawyer specializing in advocacy.',
    tags: [16, 17, 18],
    imageUrl:
      'https://img.freepik.com/foto-gratis/elegante-empresaria-segura-sonriendo_176420-19466.jpg',
    activities: [
      { activityId: 1 },
      { activityId: 3 },
      { activityId: 4 },
      { activityId: 6 },
      { activityId: 7 },
    ],
  },
  {
    profileId: 3,
    name: 'Luisa Rodriguez',
    description: 'Biomedical engineer interested in bioinformatics.',
    tags: [38, 39],
    imageUrl:
      'https://img.freepik.com/foto-gratis/belleza-moda-mujer-caucasica-atractiva-rien-sonrien-camara-posando-romantico-vestido-brillante_1258-83868.jpg',
    activities: [
      { activityId: 8 },
      { activityId: 10 },
      { activityId: 12 },
      { activityId: 14 },
      { activityId: 16 },
    ],
  },
  {
    profileId: 4,
    name: 'Yusuf Khan',
    description: 'Ethical hacker with a passion for cybersecurity.',
    tags: [9, 40],
    imageUrl: 'https://img.freepik.com/foto-gratis/feliz-joven_1098-20869.jpg',
    activities: [
      { activityId: 9 },
      { activityId: 11 },
      { activityId: 13 },
      { activityId: 15 },
      { activityId: 17 },
    ],
  },
  {
    profileId: 5,
    name: 'Sophie Chen',
    description: 'Data scientist fascinated by artificial intelligence.',
    tags: [1, 15],
    imageUrl:
      'https://img.freepik.com/foto-gratis/paraguas-wagasa-japones-ayudado-mujer-joven_23-2149576116.jpg',
    activities: [
      { activityId: 10 },
      { activityId: 12 },
      { activityId: 14 },
      { activityId: 16 },
      { activityId: 18 },
    ],
  },
  {
    profileId: 6,
    name: 'Rafael Costa',
    description: 'Software developer exploring blockchain technology.',
    tags: [7, 41],
    imageUrl:
      'https://img.freepik.com/foto-gratis/hombre-sorprendido-feliz-ganando-algo-linea-sosteniendo-telefono-inteligente-regocijandose-pie-contra-fondo-azul_1258-65563.jpg',
    activities: [
      { activityId: 11 },
      { activityId: 13 },
      { activityId: 15 },
      { activityId: 17 },
      { activityId: 19 },
    ],
  },
  {
    profileId: 7,
    name: 'Emily Davis',
    description: 'Student passionate about machine learning.',
    tags: [1],
    imageUrl:
      'https://img.freepik.com/foto-gratis/closeup-retrato-mujer-sonriendo-sonrisa-perfecta-dientes-blancos_273609-13702.jpg',
    activities: [
      { activityId: 12 },
      { activityId: 14 },
      { activityId: 16 },
      { activityId: 18 },
      { activityId: 20 },
    ],
  },
];
const GROUPS: CalendarContent['groups'] = {
  1: {
    name: 'Programming Courses',
    groupId: 1,
    icon: '👨‍💻',
  },
  2: {
    name: 'Tech Workshops',
    groupId: 2,
    icon: '💻',
  },
  3: {
    name: 'Data Science Bootcamps',
    groupId: 3,
    icon: '📊',
  },
  4: {
    name: 'Digital Security Workshops',
    groupId: 4,
    icon: '🔒',
  },
  5: {
    name: 'Technology Conferences',
    groupId: 5,
    icon: '🎤',
  },
};

const TAGS: CalendarContent['tags'] = {
  1: { tagId: 1, icon: '🤖', name: 'Machine Learning' },
  2: { tagId: 2, icon: '📚', name: 'Education' },
  3: { tagId: 3, icon: '💻', name: 'Programming' },
  4: { tagId: 4, icon: '📝', name: 'Algorithm' },
  5: { tagId: 5, icon: '🧠', name: 'Deep Learning' },
  6: { tagId: 6, icon: '📘', name: 'Fundamentals' },
  7: { tagId: 7, icon: '🔗', name: 'Blockchain' },
  8: { tagId: 8, icon: '📊', name: 'Basics' },
  9: { tagId: 9, icon: '🛡️', name: 'Cybersecurity' },
  10: { tagId: 10, icon: '💻', name: 'Essentials' },
  11: { tagId: 11, icon: '🚸', name: 'Refugee Crisis' },
  12: { tagId: 12, icon: '🌐', name: 'Global Seminar' },
  13: { tagId: 13, icon: '🏞️', name: 'Indigenous Rights' },
  14: { tagId: 14, icon: '⚖️', name: 'Legal Rights' },
  15: { tagId: 15, icon: '🧠', name: 'Artificial Intelligence' },
  16: { tagId: 16, name: 'Human Rights Law' },
  17: { tagId: 17, name: 'Advocacy' },
  18: { tagId: 18, name: 'Legal Research' },
  19: { tagId: 19, icon: '💡', name: 'Innovation' },
  20: { tagId: 20, icon: '🔍', name: 'Search Algorithms' },
  21: { tagId: 21, icon: '🌐', name: 'Web Development' },
  22: { tagId: 22, icon: '🛠️', name: 'Development Tools' },
  23: { tagId: 23, icon: '📜', name: 'Ethical Considerations' },
  24: { tagId: 24, icon: '📊', name: 'Data Analytics' },
  25: { tagId: 25, icon: '📈', name: 'Data Visualization' },
  26: { tagId: 26, icon: '🤖', name: 'Robotics' },
  27: { tagId: 27, icon: '🤖', name: 'Automation' },
  28: { tagId: 28, icon: '☁️', name: 'Cloud Computing' },
  29: { tagId: 29, icon: '🏢', name: 'Infrastructure' },
  30: { tagId: 30, icon: '🕶️', name: 'Virtual Reality' },
  31: { tagId: 31, icon: '🖥️', name: 'VR Development' },
  32: { tagId: 32, icon: '📡', name: 'Internet of Things (IoT)' },
  33: { tagId: 33, icon: '💡', name: 'Smart Devices' },
  34: { tagId: 34, icon: '🔒', name: 'Data Privacy' },
  35: { tagId: 35, icon: '🔍', name: 'Privacy Tools' },
  36: { tagId: 36, icon: '💻', name: 'Software Engineering' },
  37: { tagId: 37, icon: '📝', name: 'Best Practices' },
  38: { tagId: 38, icon: '🧬', name: 'Bioinformatics' },
  39: { tagId: 39, icon: '🧪', name: 'Biotechnology' },
  40: { tagId: 40, icon: '🎭', name: 'Ethical Hacking' },
  41: { tagId: 41, icon: '💰', name: 'Cryptocurrency' },
};

const ROLES: CalendarContent['roles'] = {
  1: { roleId: 1, label: 'Teacher' },
  2: { roleId: 2, label: 'Assistant' },
};

const COLOR_TAGS = {
  1: { colorTagId: 1, color: '#FCFEB5', name: 'Bioinformatics' },
  2: { colorTagId: 2, color: '#9FC3FE', name: 'Biotechnology' },
  3: { colorTagId: 3, color: '#9AF5FE', name: 'Ethical Hacking' },
  4: { colorTagId: 4, color: '#FEC5FE', name: 'Cryptocurrency' },
};

export const MOCK: CalendarContent = {
  colorTags: COLOR_TAGS,
  activities: ACTIVITIES,
  profiles: PROFILES,
  groups: GROUPS,
  roles: ROLES,
  tags: TAGS,
};
