---
id: ADR-0002
titre: Config factory avec Zod au startup
type: architecture
statut: acceptée
date: 2026-09-14
portee: repo
remplace: —
liens: []
---

# ADR-0002 — Config factory avec Zod au startup

## Contexte

Les variables d'environnement doivent être validées et typées au démarrage du serveur pour éviter les erreurs runtime dues à des configs invalides.

## Décision

- Tous les paramètres de config viennent des env variables ou defaults.
- `generate-config()` crée un singleton Config au startup, validé via Zod.
- Si une variable est invalide → erreur fatale au démarrage (fail-fast).

## Comment l'appliquer

1. Ajouter un nouveau param dans `src/config/types.ts` (Zod schema).
2. Le valider dans `generate-config.ts`.
3. Le consommer via l'import singleton : `import Config from '@config'`.

## Quand NE PAS l'appliquer

- Pour des configs locales/éphémères dans un composant (utiliser des constantes ou des props).

## Alternatives rejetées

- Charger l'env à la volée : risque de divergences de config en runtime.

## Conséquences

- Démarrage échoue immédiatement si une variable est manquante/invalide.
- Config est immutable après initialisation.

## Références

- `src/config/`
- Zod v4
