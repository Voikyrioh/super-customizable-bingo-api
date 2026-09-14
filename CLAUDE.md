# super-customizable-bingo-api — Guide pour Claude

## Lire en premier

1. **ARCHITECTURE.md** — carte du code (couches, flux principal, commandes).
2. **docs/INDEX.md** — point d'entrée des docs (adr, business-rules, open-api, bugs).

## Rôle du repo

API Fastify pour gérer les grilles et sessions de bingo. Boilerplate avec routes exemple ; prêt pour extension.

## Commandes essentielles

- Dev : `npm run dev`
- Tests : `npm run test`
- Lint : npx biome check --apply
- Build Docker : `docker build -t super-customizable-bingo-api .`

## Skills obligatoires

- `/code-search` — localiser endpoints/BR.
- `/dev-task` — implémentation.
- `/bugfix` — déboguer.
- `/doc-update` — maintenir docs/ à jour avec le code.
