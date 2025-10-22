A11Y & SEO – Checklist Rapide (WCAG 2.2 AA)

Accessibilité
- Focus visible: vérifier la présence d’un focus net sur liens, boutons, contrôles.
- Navigation clavier: tester Tab/Shift+Tab, Enter/Espace sur menus, carrousel, lightbox.
- Skip link: `Aller au contenu principal` présent et fonctionnel (`main#contenu`).
- Burger menu: bouton avec `aria-expanded` qui se met à jour, `aria-controls` vers `#menu-principal`.
- Carrousel: boutons Prev/Next avec libellés, points cliquables au clavier, pause au focus/survol, respect reduced motion.
- Lightbox: rôle `dialog`, `aria-modal`, bouton fermer, piège du focus, Esc, flèches gauche/droite.
- Formulaires: labels et `for/id` cohérents, messages d’erreur lisibles (à compléter sur les pages de formulaire si besoin).

SEO
- Head: `<title>` unique et `<meta name="description">` pertinent par page.
- Open Graph/Twitter: `og:title`, `og:description`, `og:image` de base.
- Favicon: 16x16 et 32x32 référencés; `theme-color` défini.
- H1: un seul par page, aligné au contenu métier (peut être visuellement masqué si non nécessaire visuellement).
- robots/sitemap: `robots.txt` et `sitemap.xml` présents et à jour en cas d’ajout de page.

Performances (bonus)
- Images: ajouter `width`/`height` si possible pour réduire le CLS; `loading="lazy"` pour images hors-écran.
- Réduire les animations: respecter `prefers-reduced-motion`.

QA rapide
- Test clavier complet (sans souris).
- Test lecteur d’écran sur header/nav/carreusel/lightbox.
- Audit Lighthouse (Accessibilité 95+, SEO 100 si possible).
