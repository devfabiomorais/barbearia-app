import {
  PrismaClient,
  PermissionGroups,
  WeekDays,
  Module,
  Functionality,
} from '@prisma/client';
const prisma = new PrismaClient();

async function createModules() {
  const modules: Module[] = [
    {
      id: 1,
      description: 'Gerenciamento de Usuários',
      active: true,
    },
  ];
  const result = await prisma.module.createMany({
    data: modules,
    skipDuplicates: true,
  });

  if (result.count) {
    const message = 'Módulos criados com sucesso.';
    console.log(`\x1b[33m${message}\x1b[0m`);
  }
}

async function createFunctionalities() {
  const functionalities: Functionality[] = [
    {
      id: 1,
      description: 'Cadastro de usuários',
      active: true,
      moduleId: 1,
    },
  ];
  const result = await prisma.functionality.createMany({
    data: functionalities,
    skipDuplicates: true,
  });

  if (result.count) {
    const message = 'Funcionalidades criados com sucesso.';
    console.log(`\x1b[33m${message}\x1b[0m`);
  }
}

async function createWeekDays() {
  const weekDays: WeekDays[] = [
    {
      id: 1,
      description: 'Domingo',
      abbreviation: 'Dom',
    },
    {
      id: 2,
      description: 'Segunda-Feira',
      abbreviation: 'Seg',
    },
    {
      id: 3,
      description: 'Terça-Feira',
      abbreviation: 'Ter',
    },
    {
      id: 4,
      description: 'Quarta-Feira',
      abbreviation: 'Qua',
    },
    {
      id: 5,
      description: 'Quinta-Feira',
      abbreviation: 'Qui',
    },
    {
      id: 6,
      description: 'Sexta-Feira',
      abbreviation: 'Sex',
    },
    {
      id: 7,
      description: 'Sábado',
      abbreviation: 'Sab',
    },
  ];
  const result = await prisma.weekDays.createMany({
    data: weekDays,
    skipDuplicates: true,
  });

  if (result.count) {
    const message = 'Dias da semana criados com sucesso.';
    console.log(`\x1b[33m${message}\x1b[0m`);
  }
}

async function createPermissionGroups() {
  const usersPermission: PermissionGroups[] = [
    {
      id: 1,
      description: 'Administrador',
      active: true,
    },
    {
      id: 2,
      description: 'Gerente',
      active: true,
    },
    {
      id: 3,
      description: 'Recepcionista',
      active: true,
    },
    {
      id: 4,
      description: 'Barbeiro',
      active: true,
    },
  ];
  const result = await prisma.permissionGroups.createMany({
    data: usersPermission,
    skipDuplicates: true,
  });

  if (result.count) {
    const message = 'Grupos de permissões criados com sucesso.';
    console.log(`\x1b[33m${message}\x1b[0m`);
  }
}

async function main() {
  await createModules();
  await createFunctionalities();
  await createWeekDays();
  await createPermissionGroups();

  const message = 'Seed de produção executado com sucesso!';
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
