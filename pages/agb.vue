<script setup lang="ts">
  import { useHead, useI18n, useRuntimeConfig } from "#imports"
  import { useSeoMeta } from "#app"
  import { useCanonicalLinks } from "~/composables/useCanonicalLinks"
  import { useLocalePaths } from "~/composables/useLocalePaths"
  import { useTranslate } from "~/composables/useTranslate"
  import type { I18nString } from "~/types/util/I18nString"

  const t = useTranslate()
  const { locale } = useI18n()
  const config = useRuntimeConfig()

  const { dePath, enPath, canonicalPath } = useLocalePaths("/agb")
  const canonicalUrl = `${config.public.siteUrl}${canonicalPath}`

  const title = t({
    de: "Allgemeine Geschäftsbedingungen",
    en: "General Terms and Conditions",
  })
  const description = t({
    de: "Allgemeine Geschäftsbedingungen der Z-Management AG.",
    en: "General Terms and Conditions of Z-Management AG.",
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

  type Block =
    | { kind: "p"; text: I18nString }
    | {
        kind: "link"
        before: I18nString
        label: string
        href: string
        after?: I18nString
      }

  type Section = {
    title: I18nString
    blocks: Block[]
  }

  const sections: Section[] = [
    {
      title: { de: "1. Geltungsbereich", en: "1. Scope" },
      blocks: [
        {
          kind: "p",
          text: {
            de: "Diese AGB gelten für alle Rechtsgeschäfte zwischen der Z-Management AG (nachfolgend «Anbieter» genannt) und dem Kunden (nachfolgend «Auftraggeber» genannt) im Zusammenhang mit der Bereitstellung von Beratungsleistungen sowie der Nutzung der firmeneigenen Software-Plattform «ZAMENTA» (nachfolgend «ZAMENTA» genannt).",
            en: "These GTC apply to all legal transactions between Z-Management AG (hereinafter “Provider”) and the customer (hereinafter “Client”) in connection with the provision of consulting services and the use of the proprietary software platform “ZAMENTA” (hereinafter “ZAMENTA”).",
          },
        },
        {
          kind: "p",
          text: {
            de: "Entgegenstehende oder von diesen AGB abweichende Bedingungen des Auftraggebers werden nicht anerkannt, es sei denn, der Anbieter stimmt ihrer Geltung ausdrücklich schriftlich zu.",
            en: "Conflicting or differing terms and conditions of the Client are not recognised unless the Provider expressly agrees to their validity in writing.",
          },
        },
      ],
    },
    {
      title: {
        de: "2. Vertragsgegenstand",
        en: "2. Subject matter of the contract",
      },
      blocks: [
        {
          kind: "p",
          text: {
            de: "2.1 Die Vertragsparteien vereinbaren die Zusammenarbeit gemäss der individuellen vertraglichen Vereinbarung (Software und/oder Dienstleistung).",
            en: "2.1 The contracting parties agree on cooperation in accordance with the individual contractual agreement (software and/or service).",
          },
        },
        {
          kind: "p",
          text: {
            de: "2.2 Der Anbieter trägt selbst Sorge für alle Sozialversicherungs- und steuerlichen Belange, die ihn betreffen, und stellt den Auftraggeber von eventuellen Verpflichtungen frei.",
            en: "2.2 The Provider itself takes care of all social security and tax matters that concern it and indemnifies the Client against any related obligations.",
          },
        },
        {
          kind: "p",
          text: {
            de: "2.3 Der Anbieter kann auch für andere Auftraggeber tätig werden.",
            en: "2.3 The Provider may also work for other clients.",
          },
        },
      ],
    },
    {
      title: {
        de: "3. Vertragsdauer, Kündigungs- und Widerrufsrecht",
        en: "3. Contract term, termination and right of withdrawal",
      },
      blocks: [
        {
          kind: "p",
          text: {
            de: "3.1 Der jeweilige Vertrag beginnt und endet zum individuell vereinbarten Zeitpunkt.",
            en: "3.1 The respective contract begins and ends at the individually agreed time.",
          },
        },
        {
          kind: "p",
          text: {
            de: "3.2 Dienstleistungsverträge können beidseitig mit einer Frist von 30 Tagen ordentlich gekündigt werden.",
            en: "3.2 Service contracts may be terminated by either party with a notice period of 30 days.",
          },
        },
        {
          kind: "p",
          text: {
            de: "3.3 Eine fristlose Kündigung ist aus wichtigem Grund möglich, z.B. bei Zahlungsverzug oder bei Vermögensverfall des Auftraggebers.",
            en: "3.3 Termination without notice is possible for good cause, e.g. in the event of default in payment or insolvency of the Client.",
          },
        },
        {
          kind: "p",
          text: {
            de: "3.4 Bei Software- und Lizenzvereinbarungen besteht kein Widerrufsrecht; diese verlängern sich nach der erstmaligen Laufzeit von drei Jahren um ein weiteres Jahr, wenn sie nicht sechs Monate vor Ablauf schriftlich gekündigt werden.",
            en: "3.4 There is no right of withdrawal for software and licence agreements; after the initial term of three years, they are extended by a further year unless terminated in writing six months before expiry.",
          },
        },
      ],
    },
    {
      title: {
        de: "4. Leistungsumfang und Pflichten der Vertragspartner",
        en: "4. Scope of services and obligations of the contracting parties",
      },
      blocks: [
        {
          kind: "p",
          text: {
            de: "4.1 Der Anbieter erbringt die im jeweiligen Angebot vermerkten Leistungen.",
            en: "4.1 The Provider renders the services stated in the respective offer.",
          },
        },
        {
          kind: "p",
          text: {
            de: "4.2 Der Anbieter informiert den Auftraggeber regelmässig über den Fortschritt.",
            en: "4.2 The Provider regularly informs the Client about progress.",
          },
        },
        {
          kind: "p",
          text: {
            de: "4.3 Der Auftraggeber benennt einen Ansprechpartner für alle projektbezogenen Angelegenheiten.",
            en: "4.3 The Client designates a contact person for all project-related matters.",
          },
        },
        {
          kind: "p",
          text: {
            de: "4.4 Der Anbieter informiert unverzüglich, wenn die vertraglich geschuldete Leistung nicht erbracht werden kann.",
            en: "4.4 The Provider shall inform without delay if the contractually owed service cannot be provided.",
          },
        },
        {
          kind: "p",
          text: {
            de: "4.5 Der Auftraggeber verpflichtet sich, alle zur Auftragserfüllung notwendigen Informationen rechtzeitig, vollständig und wahrheitsgemäss bereitzustellen. Der Vergütungsanspruch des Anbieters bleibt trotz Verzögerung, die der Auftraggeber zu verantworten hat, unberührt.",
            en: "4.5 The Client undertakes to provide all information necessary for fulfilment of the order in a timely, complete and truthful manner. The Provider’s claim to remuneration remains unaffected despite delays for which the Client is responsible.",
          },
        },
        {
          kind: "p",
          text: {
            de: "4.6 Bei Beratungsleistungen trägt der Auftraggeber die Verantwortung für die Umsetzung empfohlener Massnahmen.",
            en: "4.6 In the case of consulting services, the Client is responsible for implementing recommended measures.",
          },
        },
        {
          kind: "p",
          text: {
            de: "4.7 Änderungen des Leistungsumfangs sind schriftlich zu beantragen und bedürfen gegenseitiger Zustimmung.",
            en: "4.7 Changes to the scope of services must be requested in writing and require mutual consent.",
          },
        },
      ],
    },
    {
      title: {
        de: "5. Geheimhaltungs-/Verschwiegenheitspflicht",
        en: "5. Confidentiality / non-disclosure obligation",
      },
      blocks: [
        {
          kind: "p",
          text: {
            de: "5.1 Der Anbieter verpflichtet sich zur strikten Geheimhaltung aller Informationen, Daten, Wahrnehmungen, Angelegenheiten, Unterlagen usw., die zur Geheimsphäre des Auftraggebers gehören und weder offenkundig noch allgemein zugänglich sind. Als vertrauliche Informationen gelten dabei insbesondere Kunden- bzw. Personendaten, Informationen zur Unternehmensstrategie, Produkt- sowie Produktionsinformationen, geschäftliche Abläufe, Informationen betreffend Organisation, Finanz- und Buchhaltungspraktiken, Informationen über Tochter- oder Partnergesellschaften, Marketing- und Verkaufsinformationen, Forschungs- und Entwicklungsdaten etc. sowie alle Daten bzw. Unterlagen mit solchen Inhalten.",
            en: "5.1 The Provider undertakes to strictly maintain the confidentiality of all information, data, perceptions, matters, documents, etc. that belong to the Client’s confidential sphere and are neither obvious nor generally accessible. Confidential information includes in particular customer or personal data, information on corporate strategy, product and production information, business processes, information concerning organisation, financial and accounting practices, information about subsidiaries or partner companies, marketing and sales information, research and development data, etc., as well as all data or documents with such content.",
          },
        },
        {
          kind: "p",
          text: {
            de: "5.2 Die Pflicht zur Geheimhaltung, zu Stillschweigen und Verschwiegenheit besteht für den Anbieter auch nach einer Vertragsbeendigung sachlich wie auch zeitlich unbeschränkt weiter.",
            en: "5.2 The Provider’s duty of confidentiality and secrecy continues after termination of the contract without limitation in substance or time.",
          },
        },
        {
          kind: "p",
          text: {
            de: "5.3 Der Anbieter ist verpflichtet, alle nötigen Massnahmen zu treffen, damit der Schutz aller genannten geheimen bzw. vertraulichen Daten, Informationen und Unterlagen des Auftraggebers sichergestellt ist.",
            en: "5.3 The Provider is obliged to take all necessary measures to ensure the protection of all aforementioned secret or confidential data, information and documents of the Client.",
          },
        },
        {
          kind: "p",
          text: {
            de: "5.4 Dem Anbieter ist es verboten, geheimnisgeschützte oder sonstige vertrauliche Daten, Informationen und Unterlagen für eigene Zwecke ausserhalb dieser Vertragsbeziehung auf irgendeine Art und Weise zu verwerten. Ebenfalls ist es ihm untersagt, diese Dritten weiterzugeben bzw. zugänglich zu machen. Anderslautende Vereinbarungen bleiben vorbehalten.",
            en: "5.4 The Provider is prohibited from exploiting secret or other confidential data, information and documents for its own purposes outside this contractual relationship in any way. It is also prohibited from disclosing or making them accessible to third parties. Agreements to the contrary remain reserved.",
          },
        },
        {
          kind: "p",
          text: {
            de: "5.5 Der Anbieter ist verpflichtet, nach der Beendigung dieses Vertrages alle sich in seinem Besitz befindlichen Unterlagen, Daten und Informationen, welche vom Auftraggeber zur Verfügung gestellt wurden, sofort und unaufgefordert dem Auftraggeber zurückzugeben.",
            en: "5.5 After termination of this contract, the Provider is obliged to return to the Client immediately and unsolicited all documents, data and information in its possession that were provided by the Client.",
          },
        },
      ],
    },
    {
      title: {
        de: "6. Zertifizierung «ZAMENTA»",
        en: "6. Certification “ZAMENTA”",
      },
      blocks: [
        {
          kind: "p",
          text: {
            de: "Der Entwickler und Betreiber (Host) von ZAMENTA, die Avideno AG, ist nach den jeweils aktuell gültigen Bestimmungen nach ISO 9001 zertifiziert. Der Anbieter der Server Infrastruktur (Microsoft) ist nach ISO 27001/27002 (Azure) zertifiziert.",
            en: "The developer and operator (host) of ZAMENTA, Avideno AG, is certified in accordance with the currently applicable provisions of ISO 9001. The provider of the server infrastructure (Microsoft) is certified in accordance with ISO 27001/27002 (Azure).",
          },
        },
      ],
    },
    {
      title: {
        de: "7. Urheber- und Nutzungsrechte",
        en: "7. Copyright and rights of use",
      },
      blocks: [
        {
          kind: "p",
          text: {
            de: "7.1 «ZAMENTA» ist urheberrechtlich geschützt. Sämtliche Rechte, insbesondere das Eigentum und die Verwertungsrechte, verbleiben – sofern nicht ausdrücklich anders vereinbart – beim Anbieter.",
            en: "7.1 “ZAMENTA” is protected by copyright. All rights, in particular ownership and exploitation rights, remain with the Provider unless expressly agreed otherwise.",
          },
        },
        {
          kind: "p",
          text: {
            de: "7.2 Der Auftraggeber erhält ein nicht ausschliessliches, nicht übertragbares und nicht unterlizenzierbares Recht zur Nutzung der „ZAMENTA“ in dem vertraglich vereinbarten Umfang. Die Nutzung ist auf die im Vertrag festgelegte Dauer, Anzahl von Nutzern oder Geräten und den vereinbarten Zweck beschränkt.",
            en: "7.2 The Client receives a non-exclusive, non-transferable and non-sublicensable right to use “ZAMENTA” to the extent contractually agreed. Use is limited to the duration, number of users or devices and the agreed purpose set out in the contract.",
          },
        },
        {
          kind: "p",
          text: {
            de: "7.3 Dem Auftraggeber ist es untersagt, «ZAMENTA» ohne vorherige schriftliche Zustimmung des Anbieters zu vervielfältigen, zu verbreiten, öffentlich zugänglich zu machen, zu bearbeiten oder zu dekompilieren.",
            en: "7.3 The Client is prohibited from reproducing, distributing, making publicly available, editing or decompiling “ZAMENTA” without the prior written consent of the Provider.",
          },
        },
        {
          kind: "p",
          text: {
            de: "7.4 Bei einer Verletzung der Urheber- und Nutzungsrechte behält sich der Anbieter das Recht vor, die Nutzung von «ZAMENTA» unverzüglich zu untersagen und rechtliche Schritte einzuleiten. Weitergehende Schadenersatzansprüche bleiben vorbehalten.",
            en: "7.4 In the event of an infringement of copyright and rights of use, the Provider reserves the right to prohibit the use of “ZAMENTA” immediately and to take legal action. Further claims for damages remain reserved.",
          },
        },
        {
          kind: "p",
          text: {
            de: "7.5 Sämtliche Rechte an Arbeitserzeugnissen, insbesondere Urheberrecht, gelten als vollumfänglich und ohne zusätzliche Entschädigung auf den Auftraggeber übertragen. Dies betrifft Arbeitsergebnisse und Produkte, die im direkten Zusammenhang mit dem Auftragsverhältnis entstehen, sei es aus der Tätigkeit des Anbieters allein, oder aus der Zusammenarbeit mit anderen.",
            en: "7.5 All rights to work products, in particular copyright, are deemed to be fully transferred to the Client without additional compensation. This concerns work results and products that arise in direct connection with the contractual relationship, whether from the Provider’s activity alone or from cooperation with others.",
          },
        },
        {
          kind: "p",
          text: {
            de: "7.6 Der Anbieter hat hingegen im gesetzlich zulässigen Rahmen das Recht, projekt-spezifisches Know-how und Erfahrung in anderen, ähnlich gelagerten Projekten zu verwenden, solange dieses Wissen branchenspezifisches Allgemeingut ist, keine Rückschlüsse auf den Auftraggeber und den Gegenstand bzw. Inhalt der Projekte bzw. Aufträge zulässt und daraus keine Beeinträchtigung der Geschäftstätigkeit des Auftraggebers entstehen kann.",
            en: "7.6 Within the legally permissible framework, the Provider has the right to use project-specific know-how and experience in other, similarly situated projects, provided that this knowledge is industry-specific general knowledge, does not allow conclusions to be drawn about the Client and the subject matter or content of the projects or orders, and cannot impair the Client’s business activities.",
          },
        },
      ],
    },
    {
      title: { de: "8. Datenschutz", en: "8. Data protection" },
      blocks: [
        {
          kind: "link",
          before: {
            de: "Bei der Nutzung von «ZAMENTA» finden vorgängig die Datenschutzbestimmungen der Avideno AG in der jeweils aktuell gültigen Fassung Anwendung. Diese können unter",
            en: "When using “ZAMENTA”, the privacy policy of Avideno AG in its currently valid version applies first. It can be viewed at",
          },
          label: "avideno.com/unternehmen/impressum-datenschutzerklaerung/",
          href: "https://www.avideno.com/unternehmen/impressum-datenschutzerklaerung/",
          after: {
            de: "eingesehen werden. Im Übrigen gelten die Datenschutzbestimmungen der Z-Management AG.",
            en: ". In all other respects, the privacy policy of Z-Management AG applies.",
          },
        },
      ],
    },
    {
      title: {
        de: "9. Preise und Zahlungsbedingungen",
        en: "9. Prices and payment terms",
      },
      blocks: [
        {
          kind: "p",
          text: {
            de: "9.1 Die angebotenen Dienstleistungen werden gemäss individuellem Angebot abgerechnet.",
            en: "9.1 The services offered are billed according to the individual offer.",
          },
        },
        {
          kind: "p",
          text: {
            de: "9.2 Schätzpreise sind unverbindlich und basieren auf einer sorgfältigen Bewertung.",
            en: "9.2 Estimated prices are non-binding and based on a careful assessment.",
          },
        },
        {
          kind: "p",
          text: {
            de: "9.3 Die Mehrwertsteuer wird zum gültigen Satz in Rechnung gestellt.",
            en: "9.3 Value added tax is charged at the applicable rate.",
          },
        },
      ],
    },
    {
      title: { de: "10. Haftung", en: "10. Liability" },
      blocks: [
        {
          kind: "p",
          text: {
            de: "10.1 Der Anbieter erbringt seine Leistungen mit der gebotenen Sorgfalt und auf Grundlage der zum Zeitpunkt der Leistungserbringung bekannten Informationen und Methoden. Eine Erfolgsgarantie wird nicht übernommen.",
            en: "10.1 The Provider renders its services with due care and on the basis of the information and methods known at the time of performance. No guarantee of success is assumed.",
          },
        },
        {
          kind: "p",
          text: {
            de: "10.2 Der Anbieter haftet im Rahmen der gesetzlichen Vorschriften für Schäden, die dem Auftraggeber durch vorsätzliches oder grobfahrlässiges Verhalten des Anbieters entstehen. Eine weitergehende Haftung ist – soweit gesetzlich zulässig – ausgeschlossen.",
            en: "10.2 Within the framework of statutory provisions, the Provider is liable for damage caused to the Client by intentional or grossly negligent conduct of the Provider. Any further liability is excluded to the extent legally permissible.",
          },
        },
        {
          kind: "p",
          text: {
            de: "10.3 Soweit eine Haftung nicht ausgeschlossen werden kann, ist diese auf den direkten, nachgewiesenen Schaden beschränkt und auf den Betrag der Vergütung begrenzt, den der Auftraggeber für die betreffende Leistung tatsächlich bezahlt hat. Bei «ZAMENTA» ist die Haftung auf die innert der letzten 12 Monate vor Eintritt des Schadens gezahlten Lizenzgebühr begrenzt.",
            en: "10.3 Where liability cannot be excluded, it is limited to direct, proven damage and capped at the amount of remuneration actually paid by the Client for the relevant service. For “ZAMENTA”, liability is limited to the licence fee paid within the last 12 months before the damage occurred.",
          },
        },
        {
          kind: "p",
          text: {
            de: "10.4 Jegliche Haftung für indirekte Schäden und Folgeschäden, insbesondere für entgangenen Gewinn, Datenverluste, Produktionsausfälle oder Ansprüche Dritter, ist – soweit gesetzlich zulässig – ausgeschlossen.",
            en: "10.4 Any liability for indirect and consequential damages, in particular for lost profits, data loss, production downtime or third-party claims, is excluded to the extent legally permissible.",
          },
        },
        {
          kind: "p",
          text: {
            de: "10.5 Der Anbieter übernimmt keine Haftung für vorübergehende Nichtverfügbarkeit von «ZAMENTA», Systemausfälle, Unterbrüche oder Störungen, insbesondere aufgrund von Wartungsarbeiten, Sicherheitsrisiken oder höherer Gewalt.",
            en: "10.5 The Provider accepts no liability for temporary unavailability of “ZAMENTA”, system failures, interruptions or disruptions, in particular due to maintenance work, security risks or force majeure.",
          },
        },
        {
          kind: "p",
          text: {
            de: "10.6 Der Auftraggeber ist selbst für eine angemessene Sicherung seiner Daten verantwortlich. Der Anbieter haftet nicht für Datenverluste, soweit diese durch mangelnde oder unzureichende Sicherungsmassnahmen des Kunden verursacht wurden.",
            en: "10.6 The Client itself is responsible for adequate backup of its data. The Provider is not liable for data loss insofar as it was caused by inadequate or insufficient backup measures of the customer.",
          },
        },
      ],
    },
    {
      title: {
        de: "11. Schlussbestimmungen",
        en: "11. Final provisions",
      },
      blocks: [
        {
          kind: "p",
          text: {
            de: "11.1 Änderungen und Ergänzungen dieser AGB bedürfen der Schriftform. Der Anbieter informiert den Auftraggeber über Änderungen an diesen AGB.",
            en: "11.1 Amendments and additions to these GTC require written form. The Provider informs the Client of changes to these GTC.",
          },
        },
        {
          kind: "p",
          text: {
            de: "11.2 Es gilt ausschliesslich Schweizer Recht. Ausschliesslicher Gerichtsstand für sämtliche Streitigkeiten ist St. Gallen.",
            en: "11.2 Swiss law applies exclusively. The exclusive place of jurisdiction for all disputes is St. Gallen.",
          },
        },
        {
          kind: "p",
          text: {
            de: "11.3 Sollten einzelne Bestimmungen unwirksam sein, bleiben die übrigen Bestimmungen unberührt.",
            en: "11.3 Should individual provisions be invalid, the remaining provisions remain unaffected.",
          },
        },
      ],
    },
  ]
</script>

<template>
  <main class="bg-white text-brand-darkgreen">
    <section class="px-6 pb-16 pt-[70px] lg:px-[120px] lg:pb-24 lg:pt-[70px]">
      <article class="mx-auto flex max-w-[852px] flex-col gap-10 lg:gap-12">
        <header class="flex flex-col gap-4">
          <h1
            class="font-sans text-[32px] font-bold leading-tight text-brand-darkgreen sm:text-[40px] lg:text-[44px]"
          >
            {{
              t({
                de: "Allgemeine Geschäftsbedingungen",
                en: "General Terms and Conditions",
              })
            }}
          </h1>
          <p
            class="font-sans text-[16px] font-semibold text-brand-darkgreen sm:text-[18px]"
          >
            Firma Z-Management AG
          </p>
          <p
            class="font-sans text-[16px] font-medium text-black sm:text-[18px]"
          >
            {{ t({ de: "Stand:", en: "As of:" }) }} 03.09.2025
          </p>
          <address
            class="font-sans text-[16px] font-medium not-italic leading-[1.6] text-black sm:text-[18px]"
          >
            <p>Z-Management AG</p>
            <p>Alte Schmerikonerstrasse 5</p>
            <p>8733 Eschenbach SG</p>
            <p>
              <a
                href="tel:+41552822012"
                class="transition-colors hover:text-brand-orange"
              >
                +41 55 282 20 12
              </a>
            </p>
            <p>
              <a
                href="mailto:info@felixw128.sg-host.com"
                class="text-brand-orange underline transition-colors hover:text-brand-yellow"
              >
                info@felixw128.sg-host.com
              </a>
            </p>
            <p>CHE-113.958.284 MWST</p>
          </address>
        </header>

        <section
          v-for="(s, i) of sections"
          :key="i"
          class="flex flex-col gap-3"
        >
          <h2
            class="font-sans text-[22px] font-semibold text-brand-darkgreen sm:text-[28px]"
          >
            {{ t(s.title) }}
          </h2>

          <template v-for="(b, bi) of s.blocks" :key="bi">
            <p
              v-if="b.kind === 'p'"
              class="font-sans text-[16px] font-normal leading-[1.55] text-black sm:text-[18px]"
            >
              {{ t(b.text) }}
            </p>
            <p
              v-else
              class="font-sans text-[16px] font-normal leading-[1.55] text-black sm:text-[18px]"
            >
              {{ t(b.before) }}
              <a
                :href="b.href"
                target="_blank"
                rel="noopener noreferrer"
                class="text-brand-orange underline transition-colors hover:text-brand-yellow"
              >
                {{ b.label }}
              </a>
              <template v-if="b.after">
                {{ " " + t(b.after) }}
              </template>
            </p>
          </template>
        </section>
      </article>
    </section>
  </main>
</template>
