# Architecture — super-customizable-bingo-api

Stack : Fastify, TypeScript, Node.js 24 · Style : clean MVC · Entrée : `index.ts`  
Maj : 2026-09-14

## Vue d'ensemble

API REST pour gérer les grilles et sessions de bingo. Fastify avec routeur custom (validation Zod, sécurité Bearer token). Boilerplate initial avec une route exemple `/api/v1/route-example`. Prêt pour l'extension vers endpoints métier (grilles, sessions, joueurs).

## Carte

```
src/
├── config/        → configuration serveur (port, host, env)                [ARCHITECTURE.md]
├── domain/        → entités métier (actuellement vide)
├── entry-points/
│   ├── class/     → Router custom + security abstractions
│   └── routes/    → enregistrement des routes
├── libraries/     → dépendances partagées (logger)
└── __tests__/     → tests des modules
index.ts           → point d'entrée du processus

docs/              → INDEX.md (adr, business-rules, open-api, bugs)
