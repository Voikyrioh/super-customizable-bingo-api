#!/usr/bin/env bash
set -euo pipefail

echo "Key generation script, only for development."

# Dossier cible (par défaut: ./keys). Vous pouvez passer un dossier en argument.
DIR="${1:-./keys}"

# Noms des fichiers de sortie
PRIVATE="${DIR}/jwtRS256.private.pem"
PUBLIC="${DIR}/jwtRS256.public.pem"

# Option pour forcer l'écrasement (ex: FORCE=1 ./generate-keys.sh)
FORCE="${FORCE:-0}"

# Vérification d'OpenSSL
if ! command -v openssl >/dev/null 2>&1; then
  echo "Erreur: openssl n'est pas installé ou introuvable dans le PATH."
  echo "Veuillez l'installer puis réessayer."
  exit 1
fi

# Création du dossier si nécessaire
mkdir -p "$DIR"

# Avertir si les fichiers existent déjà
if [[ -f "$PRIVATE" || -f "$PUBLIC" ]] && [[ "$FORCE" != "1" ]]; then
  echo "Des clés existent déjà dans: $DIR"
  [[ -f "$PRIVATE" ]] && echo " - $PRIVATE"
  [[ -f "$PUBLIC" ]] && echo " - $PUBLIC"
  read -r -p "Les écraser ? [y/N] " ans
  case "$ans" in
    [yY]|[yY][eE][sS]) ;;
    *) echo "Opération annulée."; exit 0;;
  esac
fi

# Génère une clé privée RSA 2048 bits au format PKCS#8 (PEM)
openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out "$PRIVATE"

# Restreindre les permissions de la clé privée
chmod 600 "$PRIVATE"

# Exporte la clé publique au format SPKI (PEM)
openssl pkey -in "$PRIVATE" -pubout -out "$PUBLIC"

echo "Clés générées avec succès"
