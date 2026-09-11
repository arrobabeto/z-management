<script setup lang="ts">
  import { useHead, useI18n, useRuntimeConfig } from "#imports"
  import { useSeoMeta } from "#app"
  import { useCanonicalLinks } from "~/composables/useCanonicalLinks"
  import { useLocalePaths } from "~/composables/useLocalePaths"
  import { useTranslate } from "~/composables/useTranslate"

  const t = useTranslate()
  const { locale } = useI18n()
  const config = useRuntimeConfig()

  const { dePath, enPath, canonicalPath } = useLocalePaths("/impressum")
  const canonicalUrl = `${config.public.siteUrl}${canonicalPath}`

  const title = t({ de: "Impressum", en: "Imprint" })
  const description = t({
    de: "Impressum und rechtliche Hinweise der Z-Management AG.",
    en: "Imprint and legal notices of Z-Management AG.",
  })

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: "website",
    ogUrl: canonicalUrl,
    ogSiteName: config.public.siteName,
    ogLocale: locale.value === "de" ? "de_DE" : "en_US",
  })

  useHead({
    link: useCanonicalLinks({
      canonicalPath,
      enPath,
      dePath,
    }),
  })
</script>

<template>
  <main class="bg-white text-brand-darkgreen">
    <section class="px-6 pb-16 pt-[70px] lg:px-[120px] lg:pb-24 lg:pt-[70px]">
      <article class="mx-auto flex max-w-[852px] flex-col gap-10 lg:gap-12">
        <header class="flex flex-col gap-4">
          <h1
            class="font-sans text-[32px] font-bold leading-tight text-brand-darkgreen sm:text-[40px] lg:text-[44px]"
          >
            {{ t({ de: "Impressum", en: "Imprint" }) }}
          </h1>
          <p
            class="font-sans text-[16px] font-medium leading-[1.5] text-black sm:text-[18px]"
          >
            {{
              t({
                de: "Für den Inhalt dieser Website verantwortlich:",
                en: "Responsible for the content of this website:",
              })
            }}
          </p>
          <address
            class="font-sans text-[16px] font-medium not-italic leading-[1.6] text-black sm:text-[18px]"
          >
            <p class="font-semibold text-brand-darkgreen">Z-Management AG</p>
            <p>Alte Schmerikonerstrasse 5</p>
            <p>CH-8733 Eschenbach SG</p>
            <p>
              <a
                href="mailto:info@z-management.ch"
                class="text-brand-orange underline transition-colors hover:text-brand-yellow"
              >
                info@z-management.ch
              </a>
            </p>
            <p>CH-320-3062282-5</p>
          </address>
        </header>

        <section class="flex flex-col gap-3">
          <h2
            class="font-sans text-[22px] font-semibold text-brand-darkgreen sm:text-[28px]"
          >
            Disclaimer
          </h2>
          <p
            class="font-sans text-[16px] font-normal leading-[1.55] text-black sm:text-[18px]"
          >
            {{
              t({
                de: "Personen, welche auf dieser Website Informationen abrufen, erklären sich mit den nachstehenden Bedingungen einverstanden.",
                en: "Persons who retrieve information from this website agree to the following terms and conditions.",
              })
            }}
          </p>
        </section>

        <section class="flex flex-col gap-3">
          <h2
            class="font-sans text-[22px] font-semibold text-brand-darkgreen sm:text-[28px]"
          >
            {{
              t({
                de: "Benutzung der Webseite",
                en: "Use of the website",
              })
            }}
          </h2>
          <p
            class="font-sans text-[16px] font-normal leading-[1.55] text-black sm:text-[18px]"
          >
            {{
              t({
                de: "Die Z-Management AG unternimmt alle Anstrengungen, um einen sicheren Betrieb der Website sicherzustellen. Dennoch können Mängel wie z.B. Datenverlust oder -verfälschung, Virenbefall, Betriebsunterbruch etc. nicht ausgeschlossen werden. Der Zugriff auf die Websites erfolgt deshalb auf eigene Gefahr und in eigener Verantwortung.",
                en: "Z-Management AG makes every effort to ensure the secure operation of the website. Nevertheless, defects such as data loss or corruption, viruses, service interruptions, etc. cannot be ruled out. Access to the websites is therefore at your own risk and responsibility.",
              })
            }}
          </p>
        </section>

        <section class="flex flex-col gap-3">
          <h2
            class="font-sans text-[22px] font-semibold text-brand-darkgreen sm:text-[28px]"
          >
            {{
              t({
                de: "Haftungsausschluss",
                en: "Disclaimer of liability",
              })
            }}
          </h2>
          <p
            class="font-sans text-[16px] font-normal leading-[1.55] text-black sm:text-[18px]"
          >
            {{
              t({
                de: "Die Z-Management AG lehnt jegliche Haftung für Schäden oder Folgeschäden ab, die sich aus dem Zugriff auf eine Website beziehungsweise auf einzelne Teile davon (wie z.B. heruntergeladene Dokumente), deren Benutzung (bzw. aus der Unmöglichkeit des Zugriffs oder der Benutzung) oder Links auf andere Websites ergeben. Gewährleistungsausschluss. Die Z-Management AG verwendet all ihre Sorgfalt darauf, dass die Informationen auf der Website zum Zeitpunkt der Veröffentlichung korrekt und aktuell sind und keine Rechte Dritter (insbesondere Rechte des Persönlichkeitsschutzes) verletzen. Dennoch kann Z-Management AG keine Gewährleistung hinsichtlich der Genauigkeit, Zuverlässigkeit oder Vollständigkeit der Information sicherstellen.",
                en: "Z-Management AG disclaims any liability for damages or consequential damages arising from access to a website or individual parts thereof (such as downloaded documents), their use (or the impossibility of access or use), or links to other websites. Disclaimer of warranty. Z-Management AG takes all due care to ensure that the information on the website is correct and up to date at the time of publication and does not infringe third-party rights (in particular personality rights). Nevertheless, Z-Management AG cannot guarantee the accuracy, reliability or completeness of the information.",
              })
            }}
          </p>
        </section>

        <section class="flex flex-col gap-3">
          <h2
            class="font-sans text-[22px] font-semibold text-brand-darkgreen sm:text-[28px]"
          >
            {{
              t({
                de: "Verknüpfte Webseiten (Links) und Framing",
                en: "Linked websites (links) and framing",
              })
            }}
          </h2>
          <p
            class="font-sans text-[16px] font-normal leading-[1.55] text-black sm:text-[18px]"
          >
            {{
              t({
                de: "Diese Website enthält zum Teil Links zu Webseiten von Dritten. Die Z-Management AG übernimmt für deren Inhalt, den darauf angebotenen Produkten, Dienstleistungen oder sonstigen Angeboten, sowie für die Einhaltung von Datenschutzbestimmungen keine Verantwortung. Das Besuchen eines Links erfolgt auf eigene Verantwortung. Im Übrigen besteht kein Anspruch auf das Einfügen von Links oder anderen HTML-Elementen in Formulare auf dieser Seite.",
                en: "This website partly contains links to third-party websites. Z-Management AG assumes no responsibility for their content, the products, services or other offers provided thereon, or for compliance with data protection regulations. Visiting a link is at your own risk. Furthermore, there is no entitlement to insert links or other HTML elements into forms on this page.",
              })
            }}
          </p>
        </section>

        <section class="flex flex-col gap-3">
          <h2
            class="font-sans text-[22px] font-semibold text-brand-darkgreen sm:text-[28px]"
          >
            {{
              t({
                de: "Urheberrecht",
                en: "Copyright",
              })
            }}
          </h2>
          <p
            class="font-sans text-[16px] font-normal leading-[1.55] text-black sm:text-[18px]"
          >
            {{
              t({
                de: "Der gesamte Inhalt (Texte, Grafiken, Bilder etc.) dieser Website ist urheberrechtlich geschützt und gehört, soweit nicht anders bestimmt, ausschliesslich und umfassend der Z-Management AG. Es ist nicht erlaubt, ohne vorgängige schriftliche Erlaubnis, diese Website ganz oder teilweise zu reproduzieren, zu übertragen (sei dies auf elektronischem oder irgendeinem anderen Weg), zu verändern oder sie für öffentliche oder kommerzielle Zwecke zu nutzen.",
                en: "The entire content (texts, graphics, images, etc.) of this website is protected by copyright and, unless otherwise stated, belongs exclusively and comprehensively to Z-Management AG. It is not permitted, without prior written permission, to reproduce this website in whole or in part, to transmit it (whether electronically or otherwise), to modify it, or to use it for public or commercial purposes.",
              })
            }}
          </p>
        </section>

        <section class="flex flex-col gap-3">
          <h2
            class="font-sans text-[22px] font-semibold text-brand-darkgreen sm:text-[28px]"
          >
            {{
              t({
                de: "Anwendbares Recht und Gerichtsstand",
                en: "Applicable law and place of jurisdiction",
              })
            }}
          </h2>
          <p
            class="font-sans text-[16px] font-normal leading-[1.55] text-black sm:text-[18px]"
          >
            {{
              t({
                de: "Für sämtliche allfällige Streitigkeiten zwischen Ihnen als Besucher und Nutzer dieser Website und der Z-Management AG, welche aus dem Betrieb bzw. Besuch dieser Website herrühren, sind die Gerichte am Sitz der Z-Management AG in 8733 Eschenbach ausschliesslich zuständig. Anwendbar ist ausschliesslich Schweizer Recht.",
                en: "For any disputes between you as a visitor and user of this website and Z-Management AG arising from the operation or visit of this website, the courts at the registered office of Z-Management AG in 8733 Eschenbach shall have exclusive jurisdiction. Swiss law applies exclusively.",
              })
            }}
          </p>
        </section>

        <p
          class="border-t border-brand-darkgreen/15 pt-8 font-sans text-[14px] font-medium leading-[1.5] text-brand-darkgreen/80 sm:text-[16px]"
        >
          {{
            t({
              de: "Diese Webseite wurde designt und entwickelt von der Website-Agentur",
              en: "This website was designed and developed by the website agency",
            })
          }}
          <a
            href="https://landeseiten.de"
            target="_blank"
            rel="noopener noreferrer"
            class="text-brand-orange underline transition-colors hover:text-brand-yellow"
          >
            Landeseiten.de
          </a>
        </p>
      </article>
    </section>
  </main>
</template>
