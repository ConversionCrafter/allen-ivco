import * as migration_20260216_105624_schema_overhaul from './20260216_105624_schema_overhaul';
import * as migration_20260217_001500_fk_delete_rule_hotfix from './20260217_001500_fk_delete_rule_hotfix';

export const migrations = [
  {
    up: migration_20260216_105624_schema_overhaul.up,
    down: migration_20260216_105624_schema_overhaul.down,
    name: '20260216_105624_schema_overhaul'
  },
  {
    up: migration_20260217_001500_fk_delete_rule_hotfix.up,
    down: migration_20260217_001500_fk_delete_rule_hotfix.down,
    name: '20260217_001500_fk_delete_rule_hotfix'
  },
];
