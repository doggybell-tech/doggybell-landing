import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import AutoImport from "astro-auto-import";
import { defineConfig } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import config from "./src/config/config.json";
import cookieconsent from "@jop-software/astro-cookieconsent";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: config.site.base_url ? config.site.base_url : "http://examplesite.com",
  base: config.site.base_path ? config.site.base_path : "/",
  trailingSlash: config.site.trailing_slash ? "always" : "never",
  vite: { plugins: [tailwindcss()] },
  integrations: [react(), sitemap(), AutoImport({
    imports: [
      "@/shortcodes/Button",
      "@/shortcodes/Accordion",
      "@/shortcodes/Notice",
      "@/shortcodes/Video",
      "@/shortcodes/Youtube",
      "@/shortcodes/Blockquote",
      "@/shortcodes/Badge",
      "@/shortcodes/ContentBlock",
      "@/shortcodes/Changelog",
      "@/shortcodes/Tab",
      "@/shortcodes/Tabs",
    ],
  }), mdx(), cookieconsent({
    categories: {
        necessary: {
            enabled: true,
            readOnly: true
        },
        analytics: {
          
        }
    },
    language: {
        default: 'de',
        translations: {
            de: {
                consentModal: {
                    title: 'Hier gibt\'s Hundekekse!',
                    description: 'Sie riechen nach Datenschutz und schmecken nach verbesserter Website. Dürfen wir dir ein paar Hundekekse anbieten?',
                    acceptAllBtn: '🐶 Ja, gebt uns die Kekse!',
                    showPreferencesBtn: 'Einstellungen verwalten'
                },
                preferencesModal: {
                    title: 'Cookie-Einstellungen verwalten',
                    acceptAllBtn: 'Alle akzeptieren',
                    acceptNecessaryBtn: 'Alle ablehnen',
                    savePreferencesBtn: 'Auswahl speichern',
                    closeIconLabel: 'Modal schließen',
                    sections: [
                        {
                            title: 'Cookies und warum wir sie nutzen',
                            description: 'Cookies helfen uns DoggyBell für dich zu verbessern - damit alles so läuft wie bei einem entspannten Spaziergang.'
                        },
                        {
                            title: 'Technisch notwendige Cookies',
                            description: 'Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden.',
                            linkedCategory: 'necessary'
                        },
                        {
                            title: 'Analyse und Leistung',
                            description: 'Diese Cookies sammeln Informationen darüber, wie Sie unsere Website nutzen. Alle Daten sind anonymisiert und können nicht zur Identifizierung verwendet werden. Wir benutzen Google Analytics, um die Nutzung der Website zu analysieren und zu verbessern.',
                            linkedCategory: 'analytics'
                        },
                        {
                            title: 'Weitere Informationen',
                            description: 'Bei Fragen zu unserer Cookie-Richtlinie und deinen Wahlmöglichkeiten <a href="mailto:info@doggybell.de">kontaktieren Sie uns</a>'
                        }
                    ]
                }
            }
        }
    }
}), partytown({
  config: {
    forward: ['dataLayer.push'],
  },
})],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
    extendDefaultPlugins: true,
  },
});