# Clinchy — site officiel

Site vitrine 100 % statique (HTML/CSS/JS vanilla, sans build, sans dépendance) pour
l'application Clinchy, prêt à être déployé sur GitHub Pages.

## ✅ Check-list des variables à remplir

Toutes les variables `{{…}}` du dépôt doivent être remplacées avant mise en ligne
définitive. Fais une recherche globale (`grep -rn "{{" .` depuis la racine du dépôt)
pour vérifier qu'il n'en reste aucune une fois cette liste traitée.

- [x] `{{DOMAIN}}` — résolu : `getclinchy.com` (déjà remplacé partout, `CNAME` créé,
      DNS configuré chez OVH)
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

⚠️ **Les pages légales (`confidentialite/`, `conditions/`,
`suppression-compte/`, `mentions-legales/`, et leurs équivalents `en/`)
contiennent un encadré HTML commenté en haut du fichier source listant les points à
vérifier. Elles doivent être relues par une personne compétente (juriste ou
responsable produit) avant mise en ligne : ce sont des modèles rédigés en langage
clair, pas un avis juridique.**

---

## 🚀 Déploiement sur GitHub Pages

Déjà en place pour ce dépôt : poussé sur `github.com/KevinCinetx/Clinchyweb`
(branche `main`), domaine personnalisé `getclinchy.com` configuré (fichier `CNAME` +
DNS chez OVH : 4 enregistrements `A` sur la racine vers les IPs GitHub Pages, plus
une redirection `www` → racine). Reste à activer **Settings → Pages → Enforce
HTTPS** une fois que GitHub a validé le DNS.

Pour redéployer ailleurs ou repartir de zéro :
1. Pousse ce dépôt sur GitHub (branche `main` par défaut).
2. Dans **Settings → Pages** du dépôt, choisis la source **Deploy from a branch**,
   branche `main`, dossier `/ (root)`.
3. Le fichier `.nojekyll` à la racine est indispensable : sans lui, GitHub Pages
   utilise Jekyll par défaut et peut ignorer les dossiers commençant par un
   underscore ou mal servir `.well-known/`. Ne le supprime pas.
4. **Domaine personnalisé :** le fichier `CNAME` à la racine contient déjà
   `getclinchy.com`. Pour changer de domaine, remplace son contenu par le nouveau
   nom de domaine (une ligne, sans `http://`), puis mets à jour les DNS chez ton
   registrar (4 `A` sur la racine vers `185.199.108.153`, `.109.153`, `.110.153`,
   `.111.153`, plus un `CNAME` `www` vers `<compte>.github.io.`).
5. Attends quelques minutes puis vérifie `https://getclinchy.com/`.

---

## 🖼️ Remplacer les visuels

### Logo et icône
`assets/img/clinchy-wordmark.png` (2174 × 602, fond transparent) et
`assets/img/icon.png` (1024 × 1024) sont les **fichiers de marque réels**. Les
favicons (`favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`,
`favicon-48x48.png`, `favicon-192x192.png`, `favicon-512x512.png`,
`apple-touch-icon.png`) et `og-image.png` (1200 × 630) en sont dérivés. Si le logo
change, régénère l'ensemble à partir des nouveaux fichiers sources (ImageMagick,
Squoosh, Figma…) et mets à jour les attributs `width`/`height` des `<img>` du
wordmark si le ratio change.

### Captures d'écran
`assets/screens/*.png` sont les **vraies captures de l'app** (chaque PNG contient
déjà son propre cadre de téléphone avec coins transparents ; le site ne rajoute
aucun bezel CSS par-dessus, juste une ombre portée via `.shot`) :

```
market.png   shop.png    activity.png  pomodoro.png  planner.png
stats.png    equity.png  kid.png       family.png
```

Chaque fichier a une variante `@1x` (moitié résolution, ex. `market@1x.png`) pour le
`srcset` 1x/2x utilisé dans le carrousel. Si tu remplaces une capture, régénère sa
variante `@1x` en conservant le même nom.

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

Par défaut, le formulaire de suppression de compte (`suppression-compte/`) et le
formulaire de contact (`support/`) fonctionnent **sans aucun service tiers** : ils
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

## 👑 Formules

Deux formules, prix codés en dur dans le site (pas de variable) : **Clinchy Basic**
(gratuit) et **Clinchy +** (2,99 € / mois ou 24,99 € / an). Si le prix change, une
recherche globale de `2,99 €` / `2.99` et `24,99 €` / `24.99` dans les fichiers HTML
+ le JSON-LD de `index.html` (FR et EN) localise tous les emplacements à mettre à
jour. Le mot « Premium » est volontairement absent du texte visible : on dit
« Clinchy + » partout, y compris dans les pastilles de fonctionnalité (`CLINCHY +`).

---

## 🌍 Langues

Le site est disponible en français (racine) et en anglais (`/en/`). Les deux
versions utilisent **les mêmes chemins d'URL** (`/fonctionnalites/`,
`/tarifs/`, etc.) et **les mêmes ancres** (`#comment-ca-marche`, `#tarifs`…) pour
que les liens `hreflang` et le sélecteur de langue en pied de page pointent
correctement d'une langue à l'autre. Si tu ajoutes l'espagnol ou l'allemand, respecte
cette même convention (`/es/fonctionnalites/`, `/de/tarifs/`…) et mets à jour
les balises `hreflang` sur toutes les pages ainsi que `sitemap.xml`.

---

## 🔗 Structure des URLs

Le site utilise des URLs « propres », sans extension `.html` visible
(`/fonctionnalites/` plutôt que `/fonctionnalites.html`). Comme GitHub Pages ne
permet aucune réécriture d'URL côté serveur, chaque page (hors accueil et `404.html`)
vit dans son propre dossier sous la forme `nom/index.html` : un serveur statique
résout automatiquement `/nom/` vers `nom/index.html`. L'accueil (`index.html`,
`en/index.html`) reste à la racine de son dossier de langue. Si tu ajoutes une
nouvelle page, respecte cette convention (`nouvelle-page/index.html`) et recalcule
les chemins relatifs (`href`/`src`) en fonction de la profondeur du dossier.

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
pour les Universal Links (iOS) et App Links (Android) vers `/join/`, une fois
`{{APPLE_TEAM_ID}}` et `{{ANDROID_SHA256}}` renseignés. La page lit `?code=XXXXXX`
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

- [x] Domaine `getclinchy.com` configuré (`{{DOMAIN}}` remplacé, `CNAME`, DNS OVH)
- [ ] Activer **Enforce HTTPS** dans Settings → Pages une fois le DNS validé par GitHub
- [x] Remplacer les 9 captures placeholder par les vraies (voir § Captures d'écran)
- [ ] Remplacer toutes les autres variables `{{…}}` (voir check-list ci-dessus)
- [x] Remplacer le wordmark et l'icône par les fichiers de production réels de l'app
- [ ] Faire relire les 4 pages légales (+ leurs versions `en/`) par une personne
      compétente
- [ ] Renseigner `{{APPSTORE_URL}}` / `{{PLAYSTORE_URL}}` puis activer les vrais
      liens des badges (voir § Badges)
- [ ] Décider si un service de formulaire tiers est nécessaire, sinon laisser le
      comportement `mailto:` par défaut
- [ ] Vérifier `{{APPLE_TEAM_ID}}` / `{{ANDROID_SHA256}}` si les liens profonds
      Universal Links / App Links doivent fonctionner
