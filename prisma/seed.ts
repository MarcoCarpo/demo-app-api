import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const user1 = await prisma.user.upsert({
        where: { email: 'johndoe@test.com' },
        update: {},
        create: {
            email: 'johndoe@test.com',
            name: 'John Doe',
            password: await bcrypt.hash('Pass123!', 10),
            city: 'New York',
            country: 'USA',
            street: '5th Avenue',
            zipCode: '10001',
        },
    });

    const user2 = await prisma.user.upsert({
        where: { email: 'test@test.com' },
        update: {},
        create: {
            email: 'test@test.com',
            name: 'Test User',
            city: 'Chicago',
            country: 'USA',
            street: 'Michigan Avenue',
            zipCode: '60601',
            password: await bcrypt.hash('Pass123!', 10),
        },
    });

    // Create one dummy category
    const category1 = await prisma.productCategory.create({
        data: {
            name: 'Dummy Category',
        },
    });

    // Create two dummy products
    const product1 = await prisma.product.upsert({
        update: {
            id: 1,
        },
        where: {
            id: 1,
        },
        create: {
            name: 'Dummy Product 1',
            price: 100,
            description: 'This is a dummy product.',
            categoryId: category1.id,
        },
    });

    const product2 = await prisma.product.upsert({
        update: {
            id: 2,
        },
        where: {
            id: 2,
        },
        create: {
            name: 'Dummy Product 2',
            price: 200,
            description: 'This is another dummy product.',
            categoryId: category1.id,
        },
    });

    console.log({ category1, product1, product2, user1, user2 });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
