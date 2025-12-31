// Seed script for development data
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create a default project
  const project = await prisma.project.upsert({
    where: { slug: 'demo-project' },
    update: {},
    create: {
      name: 'Demo Project',
      description: 'A demo project to get started with UI Museum',
      slug: 'demo-project',
      settings: {
        theme: 'default',
      },
    },
  });

  console.log('Created project:', project.name);

  // Create a sample recipe
  const recipe = await prisma.recipe.upsert({
    where: {
      projectId_slug: {
        projectId: project.id,
        slug: 'landing-page',
      },
    },
    update: {},
    create: {
      name: 'Landing Page',
      description: 'A sample landing page',
      slug: 'landing-page',
      projectId: project.id,
      content: {
        root: { props: {} },
        content: [
          {
            id: 'hero-1',
            type: 'HeroSection',
            props: {
              title: 'Welcome to UI Museum',
              subtitle: 'Build beautiful websites with our component library',
            },
          },
          {
            id: 'features-1',
            type: 'FeatureGrid',
            props: {
              columns: 3,
            },
          },
        ],
      },
    },
  });

  console.log('Created recipe:', recipe.name);

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
