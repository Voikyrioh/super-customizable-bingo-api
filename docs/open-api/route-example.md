# RouteExample — /api/v1/route-example

Endpoint exemple du boilerplate.

## GET /api/v1/route-example

Vérification d'état de l'API (health check).

| Aspect | Valeur |
|---|---|
| Authentification | Bearer Token (obligatoire) |
| Validation | Aucun body attendu |
| Handler | `src/entry-points/routes/example-route.ts` (ligne 12-16) |

### Réponses

**200 OK**
```json
{
  "status": "ok"
}
```

### Erreurs métier

Aucune erreur métier spécifique.

### Exemple curl

```bash
curl -X GET http://localhost:3000/api/v1/route-example \
  -H "Authorization: Bearer your-token"
```

---

## POST /api/v1/route-example

Répond avec un message personnalisé basé sur le prénom fourni.

| Aspect | Valeur |
|---|---|
| Authentification | Bearer Token (obligatoire) |
| Validation | Zod : `{myName: string}` |
| Handler | `src/entry-points/routes/example-route.ts` (ligne 18-23) |

### Paramètres

**Body (application/json)**

| Nom | Type | Requis | Description |
|---|---|---|---|
| `myName` | string | oui | Le prénom de la personne |

### Réponses

**200 OK**
```
your name is {myName}
```

### Erreurs métier

Aucune erreur métier spécifique.

### Exemple curl

```bash
curl -X POST http://localhost:3000/api/v1/route-example \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-token" \
  -d '{"myName": "Alice"}'
```
