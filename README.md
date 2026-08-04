# Clinchy — site officiel

Site vitrine 100 % statique (HTML/CSS/JS vanilla, sans build, sans dépendance) pour
l'application Clinchy, prêt à être déployé sur GitHub Pages.

## ✅ Check-list des variables à remplir

Toutes les variables `{{…}}` du dépôt doivent être remplacées avant mise en ligne
définitive. Fais une recherche globale (`grep -rn "{{" .` depuis la racine du dépôt)
pour vérifier qu'il n'en reste aucune une fois cette liste traitée.

- [ ] `{{DOMAIN}}` — nom de domaine du site, ex. `clinchy.app` (utilisé dans les balises
      canonical, OG, JSON-LD, `robots.txt`, `sitemap.xml`)
- [ ] `{{APPSTORE_URL}}` — lien App Store. Tant qu'il est vide, les badges affichent
      « Bientôt » (voir § Badges de stores)
- [ ] `{{PLAYSTORE_URL}}` — lien Google Play. Même comportement que ci-dessus.
- [ ] `{{APPLE_APP_ID}}` — identifiant numérique App Store (balise
      `apple-itunes-app` pour le Smart App Banner iOS)
- [ ] `{{CONTACT_EMAIL}}` — adresse de support et de suppression de compte
- [ ] `{{PUBLISHER_NAME}}` — éditeur (personne ou société)
- [ ] `{{PUBLISHER_ADDRESS}}` — adresse postale de l'éditeur
- [ ] `{{SIRET}}` — si applicable
- [ ] `{{JURISDICTION}}` — droit applicable, ex. `France`
- [ ] `{{PRICE_PRO}}` — prix de l'abonnement Pro, ex. `4,99 €`
- [ ] `{{PRICE_FAMILY}}` — prix de l'abonnement Family, ex. `7,99 €`
- [ ] `{{MIN_AGE}}` — âge minimum, ex. `13`
- [ ] `{{DELETION_SLA_DAYS}}` — délai de traitement d'une demande, ex. `30`
- [ ] `{{RETENTION_MONTHS}}` — durée de conservation résiduelle, ex. `12`
- [ ] `{{FORM_ENDPOINT}}` — endpoint de formulaire tiers (optionnel, voir plus bas)
- [ ] `{{APPLE_TEAM_ID}}` — pour `.well-known/apple-app-site-association`
- [ ] `{{ANDROID_SHA256}}` — empreinte SHA-256 de signature, pour
      `.well-known/assetlinks.json`

**Où chercher :** ces variables apparaissent dans les 16 pages HTML (FR + EN),
`sitemap.xml`, `robots.txt`, `site.webmanifest` et les deux fichiers de
`.well-known/`. Un remplacement global (rechercher/remplacer dans ton éditeur ou un
script `sed`) est le plus sûr. **Ne remplace jamais un identifiant à la main dans un
seul fichier** : les deux langues et tous les usages doivent rester cohérents.

⚠️ **Les pages légales (`confidentialite.html`, `conditions.html`,
`suppression-compte.html`, `mentions-legales.html`, et leurs équivalents `en/`)
contiennent un encadré HTML commenté en haut du fichier source listant les points à
vérifier. Elles doivent être relues par une personne compétente (juriste ou
responsable produit) avant mise en ligne : ce sont des modèles rédigés en langage
clair, pas un avis juridique.**

---

## 🚀 Déployer sur GitHub Pages

1. Pousse ce dépôt sur GitHub (branche `main` par défaut).
2. Dans **Settings → Pages** du dépôt, choisis la source **Deploy from a branch**,
   branche `main`, dossier `/ (root)`.
3. Le fichier `.nojekyll` à la racine est indispensable : sans lui, GitHub Pages
   utilise Jekyll par défaut et peut ignorer les dossiers commençant par un
   underscore ou mal servir `.well-known/`. Ne le supprime pas.
4. **Domaine personnalisé (optionnel) :** si tu veux un domaine du type
   `www.clinchy.app` plutôt que `usera.github.io/clinchy/`, crée un fichier `CNAME`
   à la racine du dépôt contenant uniquement ton nom de domaine (une ligne, sans
   `http://`, ex. `clinchy.app`), puis configure un enregistrement DNS `CNAME` (ou
   `A`) chez ton registrar pointant vers GitHub Pages. Ce fichier `CNAME` n'est pas
   inclus dans ce dépôt car il doit contenir un domaine réel, pas la variable
   `{{DOMAIN}}` — remplace `{{DOMAIN}}` partout dans le site par ce même domaine.
5. Si tu déploies sans domaine personnalisé (sur `usera.github.io/clinchy/`), tous
   les chemins du site sont relatifs (`./assets/…`) : aucune modification
   supplémentaire n'est nécessaire.
6. Attends quelques minutes puis vérifie `https://<ton-domaine>/index.html`.

---

## 🖼️ Remplacer les visuels

### Logo et icône
`assets/img/clinchy-wordmark.png` et `assets/img/icon.png` sont des **versions
provisoires générées programmatiquement** pour ce livrable (ratio et style fidèles à
la charte décrite, mais pas les fichiers de production de l'app). Remplace-les par
les fichiers officiels de la marque avant mise en ligne :
- `clinchy-wordmark.png` : ratio natif attendu 2209 × 576, fond transparent.
- `icon.png` : 1024 × 1024, fond transparent ou dégradé plein.

Après remplacement, régénère les favicons (`favicon.ico`, `favicon-16x16.png`,
`favicon-32x32.png`, `favicon-48x48.png`, `favicon-192x192.png`,
`favicon-512x512.png`, `apple-touch-icon.png`) et `og-image.png` (1200 × 630) à
partir des nouveaux fichiers sources, avec l'outil de ton choix (ImageMagick,
Squoosh, Figma…).

### Captures d'écran
`assets/screens/*.webp` sont des **maquettes stylisées générées pour ce livrable**
(pas de vraies captures de l'app), aux dimensions attendues (1290 × 2796, plus une
variante `@1x` à moitié résolution pour le `srcset`). Remplace-les par de vraies
captures du simulateur iOS ou d'un appareil Android, en conservant exactement les
mêmes noms de fichiers :

```
market.webp   store.webp   activity.webp   stats.webp
pomodoro.webp kid-mode.webp profile.webp   paywall.webp
```

Génère aussi la variante `@1x` (moitié résolution, ex. `market@1x.webp`) pour
chaque nouvelle capture si tu veux garder le `srcset` 1x/2x utilisé dans le carrousel.

### Badges App Store / Google Play
`assets/img/badge-appstore-fr.svg`, `badge-appstore-en.svg`,
`badge-googleplay-fr.png` et `badge-googleplay-en.png` sont les **assets officiels**
récupérés directement depuis les générateurs de badges d'Apple et de Google — ne les
recolore pas, ne les déforme pas. Tant que `{{APPSTORE_URL}}` / `{{PLAYSTORE_URL}}`
ne sont pas renseignées, chaque badge s'affiche en état désactivé avec une pastille
« Bientôt » : c'est un `<span>`, pas un `<a>`, donc aucun lien mort. Une fois l'URL
disponible, remplace le bloc `<span class="store-badge-wrap">…</span>` par le bloc
`<a class="store-badge" href="{{APPSTORE_URL}}">…</a>` équivalent — le modèle exact
est donné en commentaire HTML juste après chaque badge désactivé dans le code
source.

---

## ✉️ Brancher un vrai formulaire (optionnel)

Par défaut, le formulaire de suppression de compte (`suppression-compte.html`) et le
formulaire de contact (`support.html`) fonctionnent **sans aucun service tiers** : ils
composent un email pré-rempli (`mailto:`) vers `{{CONTACT_EMAIL}}` et affichent un
bloc « copier le message » en secours.

Pour recevoir ces messages dans un vrai backend de formulaire (Formspree, Getform,
Google Forms…) :
1. Crée un compte chez le service de ton choix et récupère l'URL d'endpoint.
2. Remplace `{{FORM_ENDPOINT}}` par cette URL dans l'attribut `action` du
   `<form id="deletion-form">` et/ou `<form id="contact-form">`.
3. Dans `assets/js/main.js`, décommente le bloc `fetch(...)` situé juste après
   chaque gestionnaire de soumission (`/* Voie optionnelle : … */`) — le code est
   déjà écrit, seulement inactif.

---

## 🌍 Langues

Le site est disponible en français (racine) et en anglais (`/en/`). Les deux
versions utilisent **les mêmes noms de fichiers** (`fonctionnalites.html`,
`tarifs.html`, etc.) et **les mêmes ancres** (`#comment-ca-marche`, `#tarifs`…) pour
que les liens `hreflang` et le sélecteur de langue en pied de page pointent
correctement d'une langue à l'autre. Si tu ajoutes l'espagnol ou l'allemand, respecte
cette même convention (`/es/fonctionnalites.html`, `/de/tarifs.html`…) et mets à jour
les balises `hreflang` sur toutes les pages ainsi que `sitemap.xml`.

---

## 🎨 Thèmes

Le sélecteur de thème (pied de page + section Personnalisation) repeint le site en
`Clay 🫧 / Gold 👑 / Neon ⚡ / 8-bit 🕹️` via `document.documentElement.dataset.theme`
et des surcharges de variables CSS dans `assets/css/style.css`. Le choix est mémorisé
en `localStorage` (clé `clinchy-theme`) et appliqué au chargement de chaque page via
un petit script inline dans le `<head>`, avant le CSS, pour éviter un flash du mauvais
thème.

---

## 🧩 Liens profonds

`.well-known/apple-app-site-association` et `.well-known/assetlinks.json` sont prêts
pour les Universal Links (iOS) et App Links (Android) vers `join.html`, une fois
`{{APPLE_TEAM_ID}}` et `{{ANDROID_SHA256}}` renseignés. `join.html` lit `?code=XXXXXX`
dans l'URL, tente d'ouvrir `clinchy://join?code=XXXXXX`, et affiche après 1,5 s les
badges de stores et le code (copiable) si l'app ne s'est pas ouverte.

---

## 🛠️ Développement local

Aucune installation n'est nécessaire : ouvre `index.html` directement dans un
navigateur. Pour un rendu plus proche de la production (chemins relatifs, en-têtes
HTTP), sers le dossier avec un serveur statique simple :

```bash
python3 -m http.server 8000
# puis ouvre http://localhost:8000/
```

---

## 📋 Ce qui reste à faire côté humain avant mise en ligne

- [ ] Remplacer toutes les variables `{{…}}` (voir check-list ci-dessus)
- [ ] Remplacer le wordmark, l'icône et les captures d'écran par les fichiers de
      production réels de l'app
- [ ] Faire relire les 4 pages légales (+ leurs versions `en/`) par une personne
      compétente
- [ ] Renseigner `{{APPSTORE_URL}}` / `{{PLAYSTORE_URL}}` puis activer les vrais
      liens des badges (voir § Badges)
- [ ] Décider si un service de formulaire tiers est nécessaire, sinon laisser le
      comportement `mailto:` par défaut
- [ ] Créer le fichier `CNAME` si un domaine personnalisé est utilisé
- [ ] Vérifier `{{APPLE_TEAM_ID}}` / `{{ANDROID_SHA256}}` si les liens profonds
      Universal Links / App Links doivent fonctionner
