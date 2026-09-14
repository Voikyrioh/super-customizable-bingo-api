---
id: ADR-0001
titre: Fastify comme framework HTTP
type: librairie
statut: acceptée
date: 2026-09-14
portee: repo
remplace: —
liens: []
---

# ADR-0001 — Fastify comme framework HTTP

## Contexte

Ce repo est un boilerplate d'API REST Node.js. Fastify offre une excellente performance et une DX native TypeScript.

## Décision

Adopter Fastify v5 comme framework HTTP principal pour toutes les routes.

## Comment l'appliquer

- Toute nouvelle route s'enregistre via la classe `Router` custom (voir `src/entry-points/class/router.ts`) pour centraliser la sécurité.
- Les routes Fastify se déclarent via `app[method](path, options, handler)`.

## Quand NE PAS l'appliquer

- Pour des fichiers au-delà du HTTP (domaine, logique métier) : pas de dépendance Fastify.

## Alternatives rejetées

- Express : écosystème plus fragmenté, moins de perf native.

## Conséquences

- Dépendance `fastify@^5.4.0` en package.json.
- Pino comme logger (intégré natif Fastify).

## Références

- https://www.fastify.io/
- Version : ^5.4.0
