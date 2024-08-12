import { PrismaClient, MediaType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed Users
  await prisma.user.createMany({
    data: [
      { username: 'alice', displayName: 'Alice Wonderland', password: 'password123', role: 'user' },
      { username: 'bob', displayName: 'Bob Builder', password: 'password456', role: 'admin' },
      { username: 'charlie', displayName: 'Charlie Chaplin', password: 'password789', role: 'super-admin' },
    ],
  });

  // Seed Posts with various combinations
  await prisma.post.createMany({
    data: [
      // Image Only, Published
      {
        title: 'Image Post Published',
        caption: 'An image-only post that is published.',
        url: 'https://example.com/image1.jpg', // Assuming you store only one URL per post for simplicity
        media_type: MediaType.image,
        location: 'New York',
        music: 'Some Music',
        published: true,
        date: '2024-08-12',
        tags: 'image, published',
        hastags: '#image, #published',
        authorId: 1, // Assuming user with ID 1 exists
      },
      // Image Only, Unpublished
      {
        title: 'Image Post Unpublished',
        caption: 'An image-only post that is not published.',
        url: 'https://example.com/image2.jpg',
        media_type: MediaType.image,
        location: 'Los Angeles',
        music: 'Another Music',
        published: false,
        date: '2024-08-13',
        tags: 'image, unpublished',
        hastags: '#image, #unpublished',
        authorId: 2, // Assuming user with ID 2 exists
      },
      // Video Only, Published
      {
        title: 'Video Post Published',
        caption: 'A video-only post that is published.',
        url: 'https://example.com/video1.mp4',
        media_type: MediaType.video,
        location: 'San Francisco',
        music: 'Video Music',
        published: true,
        date: '2024-08-14',
        tags: 'video, published',
        hastags: '#video, #published',
        authorId: 1,
      },
      // Video Only, Unpublished
      {
        title: 'Video Post Unpublished',
        caption: 'A video-only post that is not published.',
        url: 'https://example.com/video2.mp4',
        media_type: MediaType.video,
        location: 'Chicago',
        music: 'Another Video Music',
        published: false,
        date: '2024-08-15',
        tags: 'video, unpublished',
        hastags: '#video, #unpublished',
        authorId: 2,
      },
      // Both Image and Video, Published
      {
        title: 'Post with Both Media Published',
        caption: 'A post with both images and videos that is published.',
        url: 'https://example.com/image3.jpg,https://example.com/video3.mp4', // Assuming a comma-separated URL string
        media_type: MediaType.both,
        location: 'Seattle',
        music: 'Mixed Media Music',
        published: true,
        date: '2024-08-16',
        tags: 'both, published',
        hastags: '#both, #published',
        authorId: 1,
      },
      // Both Image and Video, Unpublished
      {
        title: 'Post with Both Media Unpublished',
        caption: 'A post with both images and videos that is not published.',
        url: 'https://example.com/image4.jpg,https://example.com/video4.mp4', // Assuming a comma-separated URL string
        media_type: MediaType.both,
        location: 'Boston',
        music: 'Another Mixed Media Music',
        published: false,
        date: '2024-08-17',
        tags: 'both, unpublished',
        hastags: '#both, #unpublished',
        authorId: 2,
      },
    ],
  });

  console.log('Database seeded successfully.');
}

// Execute the seed function
main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

