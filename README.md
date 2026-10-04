# Clinchy — site officiel

Site vitrine 100 % statique (HTML/CSS/JS vanilla, sans build, sans dépendance) pour
l'application Clinchy, prêt à être déployé sur GitHub Pages.

## ✅ Check-list des variables

Toutes les variables `{{…}}` qui apparaissaient dans du contenu visible ont été
résolues. Vérification :

```bash
grep -rn "{{" --include="*.html" --include="*.js" .
```

Il ne doit plus rester que des occurrences **dans des commentaires** de
`index.html` et `assets/js/main.js`, qui décrivent quoi faire le jour où l'app
sera publiée sur les stores.

### Résolues

| Variable                | Valeur                                                    |
| ----------------------- | --------------------------------------------------------- |
| `{{DOMAIN}}`            | `getclinchy.com` (`CNAME` créé, DNS OVH configuré)         |
| `{{PUBLISHER_NAME}}`    | `KEVIN IHOUA (CINETX)`                                      |
| `{{PUBLISHER_ADDRESS}}` | `30 bis rue de Ferrières, 77600 Bussy-Saint-Georges, France`|
| `{{SIRET}}`             | `10834840000012` (SIREN `108348400`)                        |
| `{{CONTACT_EMAIL}}`     | `admin.cinetx@getclinchy.com`                               |
| `{{JURISDICTION}}`      | droit français                                              |
| `{{MIN_AGE}}`           | `13`                                                        |
| `{{DELETION_SLA_DAYS}}` | `30` jours (suppression) — `2` jours ouvrés (réponse support) |
| `{{RETENTION_MONTHS}}`  | `12`                                                        |
| `{{FORM_ENDPOINT}}`     | supprimé — les formulaires basculent sur `mailto:` en JS    |

### En attente de la publication de l'app

- [ ] `{{APPSTORE_URL}}` — lien App Store. Tant qu'il est vide, les badges
      affichent « Bientôt » (voir § Badges de stores).
- [ ] `{{PLAYSTORE_URL}}` — lien Google Play. Même comportement.
- [ ] `{{APPLE_APP_ID}}` — identifiant numérique App Store. La balise
      `<meta name="apple-itunes-app">` a été **retirée** de toutes les pages :
      elle était invalide sans identifiant. À réintroduire une fois l'app publiée.
- [ ] `{{APPLE_TEAM_ID}}` — pour `.well-known/apple-app-site-association`
- [ ] `{{ANDROID_SHA256}}` — empreinte SHA-256, pour `.well-known/assetlinks.json`

⚠️ **Les pages légales** (`confidentialite/`, `conditions/`,
`suppression-compte/`, `mentions-legales/`, `cinetx/` et leurs équivalents `en/`)
sont rédigées en langage clair et alignées sur l'identité légale réelle de
l'éditeur. Elles restent **des textes rédigés par un non-juriste** : une relecture
par un professionnel est recommandée, en particulier la clause de médiation, le
droit de rétractation et la clause sur la boutique de points.

---

## 🏢 Identité de l'organisation (CINETX)

Le site est la vitrine officielle du studio **CINETX**, nom commercial sous lequel
**KEVIN IHOUA** édite l'application Clinchy. Ces informations apparaissent à
**cinq endroits** ; toute correction doit être répercutée partout :

1. le bloc `footer__legal` — présent sur **toutes** les pages ;
2. `cinetx/index.html` et `en/cinetx/index.html` — la page studio ;
3. `mentions-legales/index.html` et son équivalent `en/` ;
4. le JSON-LD `Organization` dans le `<head>` de `index.html` et `en/index.html` ;
5. `cinetx-subdomain/index.html` — le site du sous-domaine (dépôt séparé).

Pour retrouver toutes les occurrences d'un coup :

```bash
grep -rn "10834840000012\|Ferrières\|admin.cinetx@" --include="*.html" .
```

### Sous-domaine `cinetx.getclinchy.com`

Le dossier `cinetx-subdomain/` contient un site autonome (un seul fichier HTML,
CSS intégré) prêt à être déployé sur ce sous-domaine. **Il ne peut pas être servi
par ce dépôt** : GitHub Pages ne sert qu'un domaine personnalisé par dépôt, et
celui-ci est déjà pris par `getclinchy.com`. Voir `cinetx-subdomain/README.md`
pour les deux options de déploiement (second dépôt, ou redirection OVH).

En attendant, la page studio est déjà en ligne sur le domaine principal :
**<https://getclinchy.com/cinetx/>**.

### URL stables pour les stores

À déclarer dans App Store Connect et la Play Console — elles ne bougeront plus, et
redirigent automatiquement vers la version française ou anglaise selon la langue
du navigateur :

- Confidentialité : `https://getclinchy.com/privacy/`
- Conditions : `https://getclinchy.com/terms/`
- Suppression de compte : `https://getclinchy.com/suppression-compte/`

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
market.png   shop.png    activity.png  pomodoro.png  live.png  island.png
planner.png  stats.png   equity.png    kid.png       family.png
```

Elles viennent du dossier `CAPTURES_CLINCHY_2026-10/Framed_iPhone_transparent_758x1552`
(famille démo Bennett, en anglais, 9:41), produit depuis le dépôt de l'app
(`scripts/frameShowcaseShots.py`). `live.png` et `island.png` sont de vraies captures
de la Live Activity (écran verrouillé, Dynamic Island étendue), gardées en couleurs
pleines : en 256 couleurs, le fond d'écran iOS fait des aplats.
Pour remplacer une capture, garde le même nom et le ratio 758:1552.

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

### Pages ajoutées pour la conformité Apple

| URL                     | Fichier                    | Rôle                                          |
| ----------------------- | -------------------------- | --------------------------------------------- |
| `/cinetx/`              | `cinetx/index.html`        | Page studio : identité légale complète         |
| `/en/cinetx/`           | `en/cinetx/index.html`     | Version anglaise                               |
| `/privacy/`             | `privacy/index.html`       | Alias stable → `/confidentialite/` ou `/en/…`  |
| `/terms/`               | `terms/index.html`         | Alias stable → `/conditions/` ou `/en/…`       |

`/privacy/` et `/terms/` sont des **redirections** : un script choisit la langue
d'après `navigator.language`, avec un `<meta http-equiv="refresh">` en repli sans
JS et deux boutons de choix manuel. Elles portent `noindex, follow` et un
`canonical` vers la page française, pour ne pas créer de contenu dupliqué. Ce sont
les URL à donner aux stores : elles ne bougeront plus même si les pages sous-jacentes
sont renommées.

---

## 🌗 Apparence

Le site reprend le design de l'app : style iOS, police système (SF Pro sur les
appareils Apple), une seule teinte d'accent, aplats sans dégradés ni halos. Il reste
TOUJOURS en clair, même sur un appareil en mode sombre (choix délibéré : plus
esthétique). Les couleurs sont celles du mode clair de l'app (`src/theme.ts`), dans
`:root` en tête de `assets/css/style.css`. Le logo est servi dans sa version sombre
(`clinchy-wordmark-dark.png`), substituée en CSS.

Les anciens thèmes du site (Clay, Gold, Neon, 8-bit) et leur sélecteur ont été
retirés en même temps que de l'app.

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

### Fait

- [x] Domaine `getclinchy.com` configuré (`CNAME`, DNS OVH)
- [x] Les 9 captures d'écran réelles sont en place
- [x] Wordmark et icône de production
- [x] Toutes les variables `{{…}}` visibles remplacées par l'identité réelle
- [x] Bloc légal éditeur (nom, SIRET, siège, contact) sur **toutes** les pages
- [x] Page studio `/cinetx/` + version anglaise, avec JSON-LD `Organization`
- [x] Alias stables `/privacy/` et `/terms/` pour les stores
- [x] Mentions légales enrichies : forme juridique, TVA, hébergeur des données,
      point de contact DSA, signalement de contenu, médiation de la consommation
- [x] Politique de confidentialité : détail Firebase (Auth / Firestore / Storage),
      engagement de non-revente, procédure de suppression et purge
- [x] CGU : clause complète sur les points et la boutique de récompenses,
      droit de rétractation

### À faire

- [ ] Activer **Enforce HTTPS** dans Settings → Pages
- [ ] Déployer `cinetx-subdomain/` sur `cinetx.getclinchy.com`
      (voir `cinetx-subdomain/README.md`), **ou** créer la redirection OVH
- [ ] Déclarer le site de l'organisation dans le dossier Apple Developer
      (`https://cinetx.getclinchy.com/` une fois en ligne, sinon
      `https://getclinchy.com/cinetx/`)
- [ ] Vérifier que le WHOIS de `getclinchy.com` chez OVH porte bien le nom
      **KEVIN IHOUA** ou **CINETX**, et la même adresse que le D-U-N-S — c'est ce
      qu'Apple recoupe
- [ ] Confirmer la mention TVA (« TVA non applicable, art. 293 B du CGI ») :
      exacte en micro-entreprise sous les seuils, à corriger si assujetti
- [ ] Faire relire les pages légales par un professionnel
- [ ] Renseigner `{{APPSTORE_URL}}` / `{{PLAYSTORE_URL}}` / `{{APPLE_APP_ID}}`
      quand l'app sera publiée, puis réactiver les badges et la balise
      `apple-itunes-app`
- [ ] Décider si un service de formulaire tiers est nécessaire, sinon laisser le
      comportement `mailto:` par défaut
- [ ] Vérifier `{{APPLE_TEAM_ID}}` / `{{ANDROID_SHA256}}` pour les liens profonds
