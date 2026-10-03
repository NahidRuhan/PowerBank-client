const fs = require('fs');
const path = require('path');

const dirs = [
  'src/lib/api/endpoints',
  'src/lib/api/hooks',
  'src/lib/types',
  'src/lib/validations',
  'src/stores',
  'src/components/ui',
  'src/components/shared',
  'src/app/api/auth/login',
  'src/app/api/auth/refresh',
  'src/app/api/auth/logout',
  'src/app/(auth)',
  'src/app/(dashboard)'
];

dirs.forEach(dir => {
  fs.mkdirSync(path.join(__dirname, dir), { recursive: true });
});

console.log('Directories created successfully.');
