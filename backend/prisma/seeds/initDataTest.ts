import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Reset the auto increment and clear all data
  await prisma.$executeRaw`TRUNCATE TABLE "Comment", "Post", "Community", "User" RESTART IDENTITY CASCADE`;

  console.log('Database reset complete.');

  // Create Users
  const user1 = await prisma.user.create({
    data: {
      username: 'user1',
      pictureUrl: 'https://i.pravatar.cc/150?u=user1',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'user2',
      pictureUrl: 'https://i.pravatar.cc/150?u=user2',
    },
  });

  await prisma.user.create({
    data: {
      username: 'usertest',
      pictureUrl: 'https://i.pravatar.cc/150?u=usertest',
    },
  });

  // Create Communities
  const communities = [
    { name: 'History' },
    { name: 'Food' },
    { name: 'Pets' },
    { name: 'Health' },
    { name: 'Fashion' },
    { name: 'Exercise' },
    { name: 'Others' },
  ];

  for (const community of communities) {
    await prisma.community.create({
      data: community,
    });
  }

  // Fetch created communities
  const community1 = await prisma.community.findUnique({
    where: { name: 'Food' },
  });
  const community2 = await prisma.community.findUnique({
    where: { name: 'Health' },
  });
  const community3 = await prisma.community.findUnique({
    where: { name: 'Exercise' },
  });

  // Create Posts
  const post1 = await prisma.post.create({
    data: {
      title: 'Best restaurants in town',
      detail: `Finding the best restaurants in town can be a daunting task. There are so many factors to consider, 
        from the ambiance of the place to the quality of the food and the level of service. 
        One should also take into account the cost, dietary restrictions, and availability of reservations. 
        In this article, I will explore some of the top-rated restaurants in our town, giving you a brief review 
        of their specialties and what makes them stand out. Whether you're looking for a fine dining experience 
        or a quick bite, there's something for everyone on this list. Let's dive in!
      `,
      userId: user1.id,
      communityId: community1!.id,
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: 'How to stay healthy',
      detail: `Staying healthy is not just about eating right and exercising regularly, but it's also about maintaining 
        a balanced lifestyle that incorporates mental well-being. In today's fast-paced world, it can be challenging 
        to keep up with the demands of work, family, and personal care. However, there are simple strategies you can 
        implement to ensure that you maintain your health. This post covers everything from meal planning and 
        exercise routines to meditation and sleep hygiene. Whether you're just starting your health journey or 
        looking for ways to optimize your existing habits, these tips will surely help you along the way.
      `,
      userId: user2.id,
      communityId: community2!.id,
    },
  });

  const post3 = await prisma.post.create({
    data: {
      title: 'Best exercises for 2024',
      detail: `As we move into 2024, many people are setting fitness goals and looking for the best exercises to help them 
        achieve those goals. Whether you're aiming to lose weight, build muscle, or improve your cardiovascular health, 
        it's important to choose exercises that are both effective and sustainable. In this guide, I will break down 
        some of the most popular exercises for the upcoming year, including strength training routines, cardio workouts, 
        and flexibility exercises. We'll also discuss how to stay motivated and how to avoid common pitfalls that can 
        derail your fitness journey. Let's make 2024 your fittest year yet!
      `,
      userId: user1.id,
      communityId: community3!.id,
    },
  });

  // Create Comments for Post 1
  await prisma.comment.createMany({
    data: [
      {
        comment: 'I love these restaurants!',
        postId: post1.id,
        userId: user2.id,
      },
      {
        comment: 'Can you recommend more?',
        postId: post1.id,
        userId: user1.id,
      },
      {
        comment: 'I have tried them, they are great!',
        postId: post1.id,
        userId: user2.id,
      },
    ],
  });

  // Create Comments for Post 2
  await prisma.comment.createMany({
    data: [
      { comment: 'Thanks for the tips!', postId: post2.id, userId: user1.id },
      { comment: 'I will try these.', postId: post2.id, userId: user2.id },
      { comment: 'Any more advice?', postId: post2.id, userId: user1.id },
    ],
  });

  // Create Comments for Post 3
  await prisma.comment.createMany({
    data: [
      {
        comment: 'These exercises really work!',
        postId: post3.id,
        userId: user2.id,
      },
      { comment: 'Thanks for sharing!', postId: post3.id, userId: user1.id },
      {
        comment: 'I will start using these exercises.',
        postId: post3.id,
        userId: user2.id,
      },
    ],
  });

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
