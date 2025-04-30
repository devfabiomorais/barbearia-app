import {
  PermissionGroupFunctionality,
  Enterprise,
  EnterpriseUsersPermissionGroups,
  EnterpriseUsers,
  PrismaClient,
} from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

const logoBuffer = fs.readFileSync('prisma/seed/test/barber-dev-logo.png');
const bannerBuffer = fs.readFileSync('prisma/seed/test/barber-dev-banner.jpg');

async function createEnterprise() {
  const enterprises: Enterprise[] = [
    {
      id: 1,
      name: 'Barber Dev',
      bio: '💈 Barber Dev | Desde 2025 \nUnindo estilo, precisão e tecnologia. \nCortes na régua, atendimento personalizado e ambiente 100% conectado. \n⚙️ Onde o código é estilo e a barba é arte. \n📍Campinas/Centro | Agende seu horário.',
      document: '123.456.789-00',
      email: 'contato@barberdev.com.br',
      phone: '00912345678',
      url: 'barber-dev',
      logo: logoBuffer,
      banner: bannerBuffer,
      addressId: null,
    },
  ];
  const result = await prisma.enterprise.createMany({
    data: enterprises,
    skipDuplicates: true,
  });
  if (result.count) {
    const message = 'Empresas teste criadas com sucesso.';
    console.log(`\x1b[33m${message}\x1b[0m`);
  }
}

async function createEnterpriseUser() {
  const users: EnterpriseUsers[] = [
    {
      id: 1,
      name: 'User',
      active: true,
      document: '12345678900',
      email: 'user@barberdev.com.br',
      enterpriseId: 1,
      password: '$2a$10$kp4EONIpgNH3ow2.h6yRTuCjLGCFwi5cTEkP18BDN1BnKsqDD2KWq', //BarberAppTest25
      phone: '00912345678',
      profileLogo: logoBuffer,
      addressId: null,
      lastLogin: null,
    },
  ];
  const result = await prisma.enterpriseUsers.createMany({
    data: users,
    skipDuplicates: true,
  });

  if (result.count) {
    const message = 'Funcionários teste criados com sucesso.';
    console.log(`\x1b[33m${message}\x1b[0m`);
  }
}

async function createEnterpriseUserPermissions() {
  const enterpriseUsersPermissionGroups: EnterpriseUsersPermissionGroups[] = [
    {
      id: 1,
      permissionGroupID: 1, // Administrador
      enterpriseUserId: 1,
    },
  ];
  const result = await prisma.enterpriseUsersPermissionGroups.createMany({
    data: enterpriseUsersPermissionGroups,
    skipDuplicates: true,
  });

  if (result.count) {
    const message = 'Permissões de funcionários testes criados com sucesso.';
    console.log(`\x1b[33m${message}\x1b[0m`);
  }
}

async function createPermissionGroupsFunctionalities() {
  const permissionGroupFunctionality: PermissionGroupFunctionality[] = [
    {
      id: 1,
      enterpriseId: 1,
      permissionGroupId: 1,
      functionalityId: 1,
    },
  ];
  const result = await prisma.permissionGroupFunctionality.createMany({
    data: permissionGroupFunctionality,
    skipDuplicates: true,
  });
  if (result.count) {
    const message =
      'Associações de Grupos de Permissões e Funcionalidades testes criadas com sucesso.';
    console.log(`\x1b[33m${message}\x1b[0m`);
  }
}

async function main() {
  await createEnterprise();
  await createEnterpriseUser();
  await createEnterpriseUserPermissions();
  await createPermissionGroupsFunctionalities();
  const message = 'Seed de teste executado com sucesso!';
  console.log(`\x1b[33m${message}\x1b[0m`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
