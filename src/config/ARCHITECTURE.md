# src/config/ — Configuration serveur

Maj : 2026-09-14

## Contenu

- `index.ts` — export du singleton Config (valeurs env + defaults)
- `generate-config.ts` — factory de Config avec typage fort (Zod)
- `types.ts` — types TypeScript des valeurs de config
- `params/server.config.ts` — valeurs de config du serveur (port, host)

## Règles du dossier

- Config est immuable après initialisation.
- Tous les paramètres d'env doivent avoir un default + type Zod.

## Points d'entrée

- `generate-config()::Config` — crée et valide la config au startup
