import * as migration_20260216_105624_schema_overhaul from './20260216_105624_schema_overhaul';

export const migrations = [
  {
    up: migration_20260216_105624_schema_overhaul.up,
    down: migration_20260216_105624_schema_overhaul.down,
    name: '20260216_105624_schema_overhaul'
  },
];
