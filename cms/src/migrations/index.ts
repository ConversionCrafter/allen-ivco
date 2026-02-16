import * as migration_20260216_091944_initial from './20260216_091944_initial';

export const migrations = [
  {
    up: migration_20260216_091944_initial.up,
    down: migration_20260216_091944_initial.down,
    name: '20260216_091944_initial'
  },
];
