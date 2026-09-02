# cinetx.getclinchy.com — site officiel du studio CINETX

Site **autonome, en un seul fichier** (`index.html`, CSS intégré, zéro dépendance)
destiné au sous-domaine `cinetx.getclinchy.com`. C'est l'URL à déclarer comme
**site web de l'organisation** dans l'inscription Apple Developer Program.

---

## ⚠️ Pourquoi ce dossier est séparé

**GitHub Pages ne sert qu'un seul domaine personnalisé par dépôt** : c'est le
fichier `CNAME` à la racine qui le fixe. Le dépôt `KevinCinetx/Clinchyweb`
contient déjà `CNAME` = `getclinchy.com`, donc il **ne peut pas** servir en plus
`cinetx.getclinchy.com`.

Ce dossier doit donc partir dans un **second dépôt GitHub**, avec son propre
`CNAME` (déjà présent ici : `cinetx.getclinchy.com`).

Tant qu'il n'est pas déployé, ce dossier reste inerte dans le dépôt principal :
il n'est lié depuis aucune page et n'apparaît pas dans le `sitemap.xml` du site
principal.

---

## Option A — second dépôt GitHub Pages (recommandé)

Donne une vraie page à la racine du sous-domaine, servie en HTTPS par GitHub.

### 1. Créer le dépôt et pousser ce dossier

```bash
cd "cinetx-subdomain"
git init -b main
git add -A
git commit -m "Site officiel du studio CINETX"
gh repo create KevinCinetx/cinetx-site --public --source=. --push
```

(Sans la CLI `gh` : crée `cinetx-site` sur github.com, puis
`git remote add origin git@github.com:KevinCinetx/cinetx-site.git && git push -u origin main`.)

### 2. Activer Pages

Dans **Settings → Pages** du dépôt `cinetx-site` :

- Source : **Deploy from a branch**
- Branche : `main`, dossier `/ (root)`
- Custom domain : `cinetx.getclinchy.com` (le fichier `CNAME` le pré-remplit)
- Coche **Enforce HTTPS** dès que le certificat est émis (quelques minutes)

### 3. Ajouter l'enregistrement DNS chez OVH

Dans la zone DNS de `getclinchy.com`, ajoute **un seul** enregistrement :

| Type    | Sous-domaine | Cible                    | TTL  |
| ------- | ------------ | ------------------------ | ---- |
| `CNAME` | `cinetx`     | `kevincinetx.github.io.` | 3600 |

⚠️ Le point final de `kevincinetx.github.io.` est important chez OVH.

N'utilise **pas** d'enregistrements `A` ici : les 4 IP GitHub Pages
(`185.199.108-111.153`) servent l'apex `getclinchy.com`, pas les sous-domaines.

### 4. Vérifier

```bash
dig +short cinetx.getclinchy.com          # doit renvoyer kevincinetx.github.io + IPs
curl -sI https://cinetx.getclinchy.com/   # doit renvoyer HTTP/2 200
```

La propagation DNS prend de quelques minutes à ~1 h. Le certificat HTTPS est
émis par GitHub une fois le DNS résolu.

---

## Option B — redirection OVH (plus rapide, pas de second dépôt)

Si tu préfères ne pas gérer un deuxième dépôt : dans l'espace client OVH,
**Domaines → getclinchy.com → Redirection → Ajouter une redirection**

- Sous-domaine : `cinetx`
- Cible : `https://getclinchy.com/cinetx/`
- Type : **redirection visible (301)**

Le sous-domaine renvoie alors vers la page studio déjà en ligne sur le site
principal, qui contient exactement les mêmes informations légales. C'est
acceptable pour Apple — l'auditeur atterrit sur une page publique et
fonctionnelle portant l'identité de l'organisation — mais l'option A reste plus
propre parce que le sous-domaine sert son propre contenu.

---

## Mettre à jour le contenu

Tout tient dans `index.html` : le HTML, le CSS (balise `<style>` dans le
`<head>`) et les données structurées `schema.org` de l'organisation.

Si une information légale change (adresse, SIRET, statut juridique, e-mail),
elle doit être corrigée **aux quatre endroits** où elle apparaît :

1. le JSON-LD `Organization` dans le `<head>` ;
2. le tableau « Carte d'identité légale » (`<dl class="facts">`) ;
3. le bloc `<address>` du pied de page ;
4. les mêmes emplacements sur le site principal — `cinetx/index.html`,
   `en/cinetx/index.html`, `mentions-legales/index.html` et le bloc
   `footer__legal` présent sur toutes les pages.

## Contenu du dossier

| Fichier       | Rôle                                                          |
| ------------- | ------------------------------------------------------------- |
| `index.html`  | La page complète (HTML + CSS intégré + JSON-LD)                |
| `CNAME`       | Domaine personnalisé lu par GitHub Pages                       |
| `.nojekyll`   | Désactive Jekyll — indispensable sur GitHub Pages              |
| `robots.txt`  | Autorise l'indexation, pointe vers le sitemap                  |
| `sitemap.xml` | Une seule URL, la racine du sous-domaine                       |
| `assets/`     | Favicons et icône de l'app (copiés depuis le site principal)   |
