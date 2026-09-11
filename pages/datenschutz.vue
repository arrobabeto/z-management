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

  const { dePath, enPath, canonicalPath } = useLocalePaths("/datenschutz")
  const canonicalUrl = `${config.public.siteUrl}${canonicalPath}`

  const title = t({
    de: "Datenschutzerklärung",
    en: "Privacy Policy",
  })
  const description = t({
    de: "Datenschutzerklärung der Z-Management AG.",
    en: "Privacy policy of Z-Management AG.",
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

  type Section = {
    title: I18nString
    paragraphs?: I18nString[]
    list?: I18nString[]
    afterList?: I18nString[]
    links?: { label: string; href: string }[]
    address?: boolean
  }

  const sections: Section[] = [
    {
      title: {
        de: "Ihre Betroffenenrechte",
        en: "Your data subject rights",
      },
      paragraphs: [
        {
          de: "Unter den angegebenen Kontaktdaten unseres Datenschutzbeauftragten können Sie jederzeit folgende Rechte ausüben:",
          en: "Using the contact details of our data protection officer provided below, you may exercise the following rights at any time:",
        },
      ],
      list: [
        {
          de: "Auskunft über Ihre bei uns gespeicherten Daten und deren Verarbeitung (Art. 15 DSGVO),",
          en: "Access to your personal data stored by us and information about its processing (Art. 15 GDPR),",
        },
        {
          de: "Berichtigung unrichtiger personenbezogener Daten (Art. 16 DSGVO),",
          en: "Rectification of inaccurate personal data (Art. 16 GDPR),",
        },
        {
          de: "Löschung Ihrer bei uns gespeicherten Daten (Art. 17 DSGVO),",
          en: "Erasure of your data stored by us (Art. 17 GDPR),",
        },
        {
          de: "Einschränkung der Datenverarbeitung, sofern wir Ihre Daten aufgrund gesetzlicher Pflichten noch nicht löschen dürfen (Art. 18 DSGVO),",
          en: "Restriction of processing where we are not yet allowed to erase your data due to legal obligations (Art. 18 GDPR),",
        },
        {
          de: "Widerspruch gegen die Verarbeitung Ihrer Daten bei uns (Art. 21 DSGVO) und",
          en: "Objection to the processing of your data by us (Art. 21 GDPR), and",
        },
        {
          de: "Datenübertragbarkeit, sofern Sie in die Datenverarbeitung eingewilligt haben oder einen Vertrag mit uns abgeschlossen haben (Art. 20 DSGVO).",
          en: "Data portability, where you have consented to data processing or entered into a contract with us (Art. 20 GDPR).",
        },
      ],
      afterList: [
        {
          de: "Sofern Sie uns eine Einwilligung erteilt haben, können Sie diese jederzeit mit Wirkung für die Zukunft widerrufen.",
          en: "If you have given us consent, you may revoke it at any time with effect for the future.",
        },
        {
          de: "Sie können sich jederzeit mit einer Beschwerde an eine Aufsichtsbehörde wenden, z. B. an die zuständige Aufsichtsbehörde des Bundeslands Ihres Wohnsitzes oder an die für uns als verantwortliche Stelle zuständige Behörde.",
          en: "You may lodge a complaint with a supervisory authority at any time, for example the competent authority of your place of residence or the authority responsible for us as the controller.",
        },
      ],
    },
    {
      title: {
        de: "Erfassung allgemeiner Informationen beim Besuch unserer Website",
        en: "Collection of general information when visiting our website",
      },
      paragraphs: [
        {
          de: "Wenn Sie auf unsere Website zugreifen, d.h., wenn Sie sich nicht registrieren oder anderweitig Informationen übermitteln, werden automatisch Informationen allgemeiner Natur erfasst. Diese Informationen (Server-Logfiles) beinhalten etwa die Art des Webbrowsers, das verwendete Betriebssystem, den Domainnamen Ihres Internet-Service-Providers, Ihre IP-Adresse und ähnliches. Hierbei handelt es sich ausschließlich um Informationen, welche keine Rückschlüsse auf Ihre Person zulassen.",
          en: "When you access our website — i.e. if you do not register or otherwise submit information — information of a general nature is collected automatically. This information (server log files) includes, for example, the type of web browser, the operating system used, the domain name of your internet service provider, your IP address and similar data. This is exclusively information that does not allow conclusions to be drawn about your person.",
        },
        {
          de: "Sie werden insbesondere zu folgenden Zwecken verarbeitet:",
          en: "They are processed in particular for the following purposes:",
        },
      ],
      list: [
        {
          de: "Sicherstellung eines problemlosen Verbindungsaufbaus der Website,",
          en: "Ensuring a smooth connection to the website,",
        },
        {
          de: "Sicherstellung einer reibungslosen Nutzung unserer Website,",
          en: "Ensuring smooth use of our website,",
        },
        {
          de: "Auswertung der Systemsicherheit und -stabilität sowie",
          en: "Evaluating system security and stability, and",
        },
        {
          de: "zu weiteren administrativen Zwecken.",
          en: "for further administrative purposes.",
        },
      ],
      afterList: [
        {
          de: "Wir verwenden Ihre Daten nicht, um Rückschlüsse auf Ihre Person zu ziehen. Informationen dieser Art werden von uns ggfs. statistisch ausgewertet, um unseren Internetauftritt und die dahinterstehende Technik zu optimieren.",
          en: "We do not use your data to draw conclusions about your person. Information of this kind may be evaluated statistically by us in order to optimise our website and the underlying technology.",
        },
      ],
    },
    {
      title: { de: "Rechtsgrundlage", en: "Legal basis" },
      paragraphs: [
        {
          de: "Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. f DSGVO auf Basis unseres berechtigten Interesses an der Verbesserung der Stabilität und Funktionalität unserer Website.",
          en: "Processing is carried out in accordance with Art. 6(1)(f) GDPR on the basis of our legitimate interest in improving the stability and functionality of our website.",
        },
      ],
    },
    {
      title: { de: "Empfänger", en: "Recipients" },
      paragraphs: [
        {
          de: "Empfänger der Daten sind ggf. technische Dienstleister, die für den Betrieb und die Wartung unserer Webseite als Auftragsverarbeiter tätig werden.",
          en: "Recipients of the data may include technical service providers who act as processors for the operation and maintenance of our website.",
        },
      ],
    },
    {
      title: { de: "Speicherdauer", en: "Storage period" },
      paragraphs: [
        {
          de: "Die Daten werden gelöscht, sobald diese für den Zweck der Erhebung nicht mehr erforderlich sind. Dies ist für die Daten, die der Bereitstellung der Webseite dienen, grundsätzlich der Fall, wenn die jeweilige Sitzung beendet ist.",
          en: "The data is deleted as soon as it is no longer required for the purpose of collection. For data used to provide the website, this is generally the case when the respective session has ended.",
        },
      ],
    },
    {
      title: {
        de: "Bereitstellung vorgeschrieben oder erforderlich",
        en: "Provision prescribed or required",
      },
      paragraphs: [
        {
          de: "Die Bereitstellung der vorgenannten personenbezogenen Daten ist weder gesetzlich noch vertraglich vorgeschrieben. Ohne die IP-Adresse ist jedoch der Dienst und die Funktionsfähigkeit unserer Website nicht gewährleistet. Zudem können einzelne Dienste und Services nicht verfügbar oder eingeschränkt sein. Aus diesem Grund ist ein Widerspruch ausgeschlossen.",
          en: "Providing the aforementioned personal data is neither legally nor contractually required. Without the IP address, however, the service and functionality of our website cannot be guaranteed. In addition, individual services may be unavailable or restricted. For this reason, an objection is excluded.",
        },
      ],
    },
    {
      title: {
        de: "Hinweis zur verantwortlichen Stelle",
        en: "Information on the controller",
      },
      paragraphs: [
        {
          de: "Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:",
          en: "The controller responsible for data processing on this website is:",
        },
      ],
      address: true,
    },
    {
      title: {
        de: "Formulare — Art und Zweck der Verarbeitung",
        en: "Forms — type and purpose of processing",
      },
      paragraphs: [
        {
          de: "Die von Ihnen eingegebenen Daten werden zum Zweck der individuellen Kommunikation mit Ihnen gespeichert. Hierfür ist die Angabe einer validen E-Mail-Adresse sowie Ihres Namens erforderlich. Diese dient der Zuordnung der Anfrage und der anschließenden Beantwortung derselben. Die Angabe weiterer Daten ist optional.",
          en: "The data you enter is stored for the purpose of individual communication with you. Providing a valid email address and your name is required for this. This serves to allocate the enquiry and subsequently answer it. Providing further data is optional.",
        },
      ],
    },
    {
      title: {
        de: "Formulare — Rechtsgrundlage",
        en: "Forms — legal basis",
      },
      paragraphs: [
        {
          de: "Die Verarbeitung der in das Kontaktformular eingegebenen Daten erfolgt auf der Grundlage eines berechtigten Interesses (Art 6 Abs. 1 lit. f DSGVO). Durch Bereitstellung des Kontaktformulars möchten wir Ihnen eine unkomplizierte Kontaktaufnahme ermöglichen. Ihre gemachten Angaben werden zum Zwecke der Bearbeitung der Anfrage sowie für mögliche Anschlussfragen gespeichert. Sofern Sie mit uns Kontakt aufnehmen, um ein Angebot zu erfragen, erfolgt die Verarbeitung der in das Kontaktformular eingegebenen Daten zur Durchführung vorvertraglicher Maßnahmen (Art 6 Abs. 1 lit. b DSGVO).",
          en: "Processing of the data entered in the contact form is based on a legitimate interest (Art. 6(1)(f) GDPR). By providing the contact form, we want to enable you to get in touch easily. Your details are stored for the purpose of processing the enquiry and for possible follow-up questions. If you contact us to request an offer, the data entered in the contact form is processed to carry out pre-contractual measures (Art. 6(1)(b) GDPR).",
        },
      ],
    },
    {
      title: {
        de: "Formulare — Empfänger",
        en: "Forms — recipients",
      },
      paragraphs: [
        {
          de: "Empfänger der Daten sind ggf. Auftragsverarbeiter.",
          en: "Recipients of the data may include processors.",
        },
      ],
    },
    {
      title: {
        de: "Formulare — Speicherdauer",
        en: "Forms — storage period",
      },
      paragraphs: [
        {
          de: "Daten werden wenn nicht mehr benötigt nach Bearbeitung der Anfrage gelöscht. Sofern es zu einem Vertragsverhältnis kommt, unterliegen wir den gesetzlichen Aufbewahrungsfristen nach HGB und löschen Ihre Daten nach Ablauf dieser Fristen.",
          en: "Data is deleted after the enquiry has been processed if it is no longer required. If a contractual relationship is established, we are subject to the statutory retention periods under the German Commercial Code (HGB) and delete your data after these periods expire.",
        },
      ],
    },
    {
      title: {
        de: "Formulare — Bereitstellung vorgeschrieben oder erforderlich",
        en: "Forms — provision prescribed or required",
      },
      paragraphs: [
        {
          de: "Die Bereitstellung Ihrer personenbezogenen Daten erfolgt freiwillig. Wir können Ihre Anfrage jedoch nur bearbeiten, sofern Sie uns Ihren Namen, Ihre E-Mail-Adresse und den Grund der Anfrage mitteilen.",
          en: "Providing your personal data is voluntary. However, we can only process your enquiry if you provide your name, email address and the reason for the enquiry.",
        },
      ],
    },
    {
      title: {
        de: "Cookies — Art und Zweck der Verarbeitung",
        en: "Cookies — type and purpose of processing",
      },
      paragraphs: [
        {
          de: "Wie viele andere Webseiten verwenden wir auch so genannte „Cookies“. Cookies sind kleine Textdateien, die von einem Websiteserver auf Ihre Festplatte übertragen werden. Hierdurch erhalten wir automatisch bestimmte Daten wie z. B. IP-Adresse, verwendeter Browser, Betriebssystem und Ihre Verbindung zum Internet. Cookies können nicht verwendet werden, um Programme zu starten oder Viren auf einen Computer zu übertragen. Anhand der in Cookies enthaltenen Informationen können wir Ihnen die Navigation erleichtern und die korrekte Anzeige unserer Webseiten ermöglichen.",
          en: "Like many other websites, we also use so-called “cookies”. Cookies are small text files that are transferred from a website server to your hard drive. This automatically provides us with certain data such as IP address, browser used, operating system and your connection to the internet. Cookies cannot be used to start programmes or transfer viruses to a computer. Based on the information contained in cookies, we can make navigation easier for you and enable the correct display of our websites.",
        },
        {
          de: "In keinem Fall werden die von uns erfassten Daten an Dritte weitergegeben oder ohne Ihre Einwilligung eine Verknüpfung mit personenbezogenen Daten hergestellt. Natürlich können Sie unsere Website grundsätzlich auch ohne Cookies betrachten. Internet-Browser sind regelmäßig so eingestellt, dass sie Cookies akzeptieren. Im Allgemeinen können Sie die Verwendung von Cookies jederzeit über die Einstellungen Ihres Browsers deaktivieren. Bitte verwenden Sie die Hilfefunktionen Ihres Internetbrowsers, um zu erfahren, wie Sie diese Einstellungen ändern können. Bitte beachten Sie, dass einzelne Funktionen unserer Website möglicherweise nicht funktionieren, wenn Sie die Verwendung von Cookies deaktiviert haben.",
          en: "Under no circumstances will the data we collect be passed on to third parties or linked to personal data without your consent. Of course, you can generally also view our website without cookies. Internet browsers are regularly set to accept cookies. In general, you can deactivate the use of cookies at any time via your browser settings. Please use your browser’s help functions to find out how to change these settings. Please note that individual functions of our website may not work if you have deactivated cookies.",
        },
      ],
    },
    {
      title: {
        de: "Speicherdauer und eingesetzte Cookies",
        en: "Storage period and cookies used",
      },
      paragraphs: [
        {
          de: "Soweit Sie uns durch Ihre Browsereinstellungen oder Zustimmung die Verwendung von Cookies erlauben, können folgende Cookies auf unseren Webseiten zum Einsatz kommen: Soweit diese Cookies (auch) personenbezogene Daten betreffen können, informieren wir Sie darüber in den folgenden Abschnitten. Sie können über Ihre Browsereinstellungen einzelne Cookies oder den gesamten Cookie-Bestand löschen. Darüber hinaus erhalten Sie Informationen und Anleitungen, wie diese Cookies gelöscht oder deren Speicherung vorab blockiert werden können. Je nach Anbieter Ihres Browsers finden Sie die notwendigen Informationen unter den nachfolgenden Links:",
          en: "If you allow us to use cookies via your browser settings or consent, the following cookies may be used on our websites: Where these cookies may (also) relate to personal data, we will inform you in the following sections. You can delete individual cookies or all cookies via your browser settings. You will also find information and instructions on how to delete these cookies or block their storage in advance. Depending on your browser provider, you will find the necessary information at the following links:",
        },
      ],
      links: [
        {
          label: "Mozilla Firefox",
          href: "https://support.mozilla.org/de/kb/cookies-loeschen-daten-von-websites-entfernen",
        },
        {
          label: "Internet Explorer",
          href: "https://support.microsoft.com/de-de/help/17442/windows-internet-explorer-delete-manage-cookies",
        },
        {
          label: "Google Chrome",
          href: "https://support.google.com/accounts/answer/61416?hl=de",
        },
        {
          label: "Opera",
          href: "http://www.opera.com/de/help",
        },
        {
          label: "Safari",
          href: "https://support.apple.com/kb/PH17191?locale=de_DE&viewlocale=de_DE",
        },
      ],
    },
    {
      title: {
        de: "Verwendung von Google Analytics",
        en: "Use of Google Analytics",
      },
      paragraphs: [
        {
          de: "Diese Website benutzt Google Analytics, einen Webanalysedienst der Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043 USA (nachfolgend: „Google“). Google Analytics verwendet sog. „Cookies“, also Textdateien, die auf Ihrem Computer gespeichert werden und die eine Analyse der Benutzung der Webseite durch Sie ermöglichen. Die durch das Cookie erzeugten Informationen über Ihre Benutzung dieser Webseite werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert. Aufgrund der Aktivierung der IP-Anonymisierung auf diesen Webseiten, wird Ihre IP-Adresse von Google jedoch innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum zuvor gekürzt. Nur in Ausnahmefällen wird die volle IP-Adresse an einen Server von Google in den USA übertragen und dort gekürzt. Im Auftrag des Betreibers dieser Website wird Google diese Informationen benutzen, um Ihre Nutzung der Webseite auszuwerten, um Reports über die Webseitenaktivitäten zusammenzustellen und um weitere mit der Websitenutzung und der Internetnutzung verbundene Dienstleistungen gegenüber dem Webseitenbetreiber zu erbringen. Die im Rahmen von Google Analytics von Ihrem Browser übermittelte IP-Adresse wird nicht mit anderen Daten von Google zusammengeführt. Die Zwecke der Datenverarbeitung liegen in der Auswertung der Nutzung der Website und in der Zusammenstellung von Reports über Aktivitäten auf der Website. Auf Grundlage der Nutzung der Website und des Internets sollen dann weitere verbundene Dienstleistungen erbracht werden.",
          en: "This website uses Google Analytics, a web analysis service of Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043 USA (hereinafter: “Google”). Google Analytics uses so-called “cookies”, text files that are stored on your computer and that enable an analysis of your use of the website. The information generated by the cookie about your use of this website is usually transmitted to a Google server in the USA and stored there. Due to the activation of IP anonymisation on these websites, your IP address will be truncated by Google within member states of the European Union or in other contracting states to the Agreement on the European Economic Area. Only in exceptional cases will the full IP address be transmitted to a Google server in the USA and truncated there. On behalf of the operator of this website, Google will use this information to evaluate your use of the website, to compile reports on website activities and to provide other services related to website and internet use to the website operator. The IP address transmitted by your browser as part of Google Analytics will not be merged with other Google data. The purposes of data processing are to evaluate the use of the website and to compile reports on activities on the website. Further related services are then to be provided on the basis of the use of the website and the internet.",
        },
        {
          de: "Rechtsgrundlage: Die Verarbeitung der Daten erfolgt auf Grundlage einer Einwilligung des Nutzers (Art. 6 Abs. 1 lit. a DSGVO).",
          en: "Legal basis: Data is processed on the basis of the user’s consent (Art. 6(1)(a) GDPR).",
        },
        {
          de: "Empfänger: Empfänger der Daten ist Google als Auftragsverarbeiter. Hierfür haben wir mit Google den entsprechenden Auftragsverarbeitungsvertrag abgeschlossen.",
          en: "Recipients: The recipient of the data is Google as a processor. We have concluded the corresponding data processing agreement with Google for this purpose.",
        },
        {
          de: "Speicherdauer: Die Löschung der Daten erfolgt, sobald diese für unsere Aufzeichnungszwecke nicht mehr erforderlich sind.",
          en: "Storage period: The data is deleted as soon as it is no longer required for our recording purposes.",
        },
        {
          de: "Drittlandtransfer: Google verarbeitet Ihre Daten in den USA und hat sich dem EU_US Privacy Shield unterworfen. Außerdem haben wir Standarddatenschutzklauseln mit Google für den Einsatz von Google Analytics abgeschlossen. Bereitstellung vorgeschrieben oder erforderlich: Die Bereitstellung Ihrer personenbezogenen Daten erfolgt freiwillig, allein auf Basis Ihrer Einwilligung. Sofern Sie den Zugriff unterbinden, kann es hierdurch zu Funktionseinschränkungen auf der Website kommen.",
          en: "Third-country transfer: Google processes your data in the USA and has submitted to the EU-US Privacy Shield. We have also concluded standard contractual clauses with Google for the use of Google Analytics. Provision prescribed or required: Providing your personal data is voluntary, solely on the basis of your consent. If you prevent access, this may result in functional restrictions on the website.",
        },
        {
          de: "Widerruf der Einwilligung: Sie können die Speicherung der Cookies durch eine entsprechende Einstellung Ihrer Browser-Software verhindern; wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche Funktionen dieser Website vollumfänglich werden nutzen können. Sie können darüber hinaus die Erfassung der durch das Cookie erzeugten und auf Ihre Nutzung der Webseite bezogenen Daten (inkl. Ihrer IP-Adresse) an Google sowie die Verarbeitung dieser Daten durch Google verhindern, indem sie das unter dem folgenden Link verfügbare Browser-Plugin herunterladen und installieren:",
          en: "Withdrawal of consent: You can prevent the storage of cookies by adjusting your browser software accordingly; however, we point out that in this case you may not be able to use all functions of this website to their full extent. You can also prevent the collection of the data generated by the cookie and related to your use of the website (including your IP address) by Google and the processing of this data by Google by downloading and installing the browser plug-in available at the following link:",
        },
      ],
      links: [
        {
          label: "Browser Add On zur Deaktivierung von Google Analytics",
          href: "https://tools.google.com/dlpage/gaoptout",
        },
      ],
      afterList: [
        {
          de: "Zusätzlich oder als Alternative zum Browser-Add-On können Sie das Tracking durch Google Analytics auf unseren Seiten unterbinden, indem Sie die Verwendung von Cookies bzw. Tracking in Ihren Browser-Einstellungen deaktivieren. Profiling: Mit Hilfe des Tracking-Tools Google Analytics kann das Verhalten der Besucher der Webseite bewertet und die Interessen analysiert werden. Hierzu erstellen wir ein pseudonymes Nutzerprofil.",
          en: "In addition or as an alternative to the browser add-on, you can prevent tracking by Google Analytics on our pages by deactivating cookies or tracking in your browser settings. Profiling: With the help of the Google Analytics tracking tool, the behaviour of website visitors can be evaluated and interests analysed. For this purpose, we create a pseudonymous user profile.",
        },
      ],
    },
    {
      title: { de: "Google Ads", en: "Google Ads" },
      paragraphs: [
        {
          de: "Art und Zweck der Verarbeitung: Unsere Webseite nutzt das Google Conversion-Tracking. Betreibergesellschaft der Dienste von Google Ads ist die Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA. Sind Sie über eine von Google geschaltete Anzeige auf unsere Webseite gelangt, wird von Google Adwords ein Cookie auf Ihrem Rechner gesetzt. Das Cookie für Conversion-Tracking wird gesetzt, wenn ein Nutzer auf eine von Google geschaltete Anzeige klickt. Besucht der Nutzer bestimmte Seiten unserer Website und das Cookie ist noch nicht abgelaufen, können wir und Google erkennen, dass der Nutzer auf die Anzeige geklickt hat und zu dieser Seite weitergeleitet wurde. Jeder Google AdWords-Kunde erhält ein anderes Cookie. Cookies können somit nicht über die Websites von AdWords-Kunden nachverfolgt werden. Die mithilfe des Conversion-Cookies eingeholten Informationen dienen dazu, Conversion-Statistiken für AdWords-Kunden zu erstellen, die sich für Conversion-Tracking entschieden haben. Die Kunden erfahren die Gesamtanzahl der Nutzer, die auf ihre Anzeige geklickt haben und zu einer mit einem Conversion-Tracking-Tag versehenen Seite weitergeleitet wurden. Sie erhalten jedoch keine Informationen, mit denen sich Nutzer persönlich identifizieren lassen.",
          en: "Type and purpose of processing: Our website uses Google Conversion Tracking. The operating company of Google Ads services is Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA. If you have reached our website via an ad placed by Google, Google AdWords sets a cookie on your computer. The conversion tracking cookie is set when a user clicks on an ad placed by Google. If the user visits certain pages of our website and the cookie has not yet expired, we and Google can recognise that the user clicked on the ad and was redirected to this page. Each Google Ads customer receives a different cookie. Cookies can therefore not be tracked across the websites of Ads customers. The information obtained using the conversion cookie is used to create conversion statistics for Ads customers who have opted for conversion tracking. Customers learn the total number of users who clicked on their ad and were redirected to a page tagged with a conversion tracking tag. However, they do not receive any information that personally identifies users.",
        },
        {
          de: "Rechtsgrundlage: Rechtsgrundlage für die Einbindung von Google Ads und dem damit verbundenen Datentransfer zu Google ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).",
          en: "Legal basis: The legal basis for integrating Google Ads and the associated data transfer to Google is your consent (Art. 6(1)(a) GDPR).",
        },
        {
          de: "Empfänger: Bei jedem Besuch unsere Webseite werden personenbezogene Daten, einschließlich Ihrer IP-Adresse an Google in die USA übertragen. Diese personenbezogenen Daten werden durch Google gespeichert. Google gibt diese über das technische Verfahren erhobenen personenbezogenen Daten unter Umständen an Dritte weiter. Unser Unternehmen enthält keine Informationen von Google, mittels derer die betroffene Person identifiziert werden könnte.",
          en: "Recipients: Each time you visit our website, personal data, including your IP address, is transmitted to Google in the USA. This personal data is stored by Google. Google may pass on this personal data collected via the technical process to third parties. Our company does not receive any information from Google by which the data subject could be identified.",
        },
        {
          de: "Speicherdauer: Diese Cookies verlieren nach 30 Tagen ihre Gültigkeit und dienen nicht der persönlichen Identifizierung.",
          en: "Storage period: These cookies expire after 30 days and are not used for personal identification.",
        },
        {
          de: "Drittlandtransfer: Google verarbeitet Ihre Daten in den USA und hat sich dem EU_US Privacy Shield unterworfen.",
          en: "Third-country transfer: Google processes your data in the USA and has submitted to the EU-US Privacy Shield.",
        },
        {
          de: "Widerruf der Einwilligung: Möchten Sie nicht am Tracking teilnehmen, können Sie das hierfür erforderliche Setzen eines Cookies ablehnen – etwa per Browser-Einstellung, die das automatische Setzen von Cookies generell deaktiviert oder Ihren Browser so einstellen, dass Cookies von der Domain „googleleadservices.com“ blockiert werden. Bitte beachten Sie, dass Sie die Opt-out-Cookies nicht löschen dürfen, solange Sie keine Aufzeichnung von Messdaten wünschen. Haben Sie alle Ihre Cookies im Browser gelöscht, müssen Sie das jeweilige Opt-out Cookie erneut setzen.",
          en: "Withdrawal of consent: If you do not wish to participate in tracking, you can refuse the setting of a cookie required for this — for example via a browser setting that generally deactivates the automatic setting of cookies, or by configuring your browser to block cookies from the domain “googleleadservices.com”. Please note that you must not delete the opt-out cookies as long as you do not want measurement data to be recorded. If you have deleted all cookies in your browser, you must set the respective opt-out cookie again.",
        },
        {
          de: "Bereitstellung vorgeschrieben oder erforderlich: Die Bereitstellung Ihrer personenbezogenen Daten erfolgt freiwillig, allein auf Basis Ihrer Einwilligung. Sofern Sie den Zugriff unterbinden, kann es hierdurch zu Funktionseinschränkungen auf der Website kommen.",
          en: "Provision prescribed or required: Providing your personal data is voluntary, solely on the basis of your consent. If you prevent access, this may result in functional restrictions on the website.",
        },
      ],
    },
    {
      title: { de: "Instagram", en: "Instagram" },
      paragraphs: [
        {
          de: "Wir verwenden auf dieser Webseite Funktionen des Dienstes Instagram. Diese Funktionen werden angeboten durch Instagram Inc., 1601 Willow Road, Menlo Park, CA, 94025 USA integriert. Wenn Sie in Ihrem Instagram-Account eingeloggt sind können Sie durch anklicken des Instagram-Buttons die Inhalte unserer Seite mit Ihrem Instagram-Profil verlinken. Dadurch kann Instagram den Besuch unserer Seiten Ihrem Benutzerkonto zuordnen. Wir weisen darauf hin, dass wir als Anbieter der Seiten keine Kenntnis vom Inhalt der übermittelten Daten sowie deren Nutzung durch Instagram erhalten. Weitere Informationen hierzu finden Sie in der Datenschutzerklärung von Instagram:",
          en: "We use functions of the Instagram service on this website. These functions are offered by Instagram Inc., 1601 Willow Road, Menlo Park, CA, 94025 USA. If you are logged into your Instagram account, you can link the content of our pages to your Instagram profile by clicking the Instagram button. This allows Instagram to associate the visit to our pages with your user account. We point out that we as the provider of the pages have no knowledge of the content of the transmitted data or its use by Instagram. Further information can be found in Instagram’s privacy policy:",
        },
      ],
      links: [
        {
          label: "instagram.com/about/legal/privacy/",
          href: "https://instagram.com/about/legal/privacy/",
        },
      ],
    },
    {
      title: { de: "Facebook", en: "Facebook" },
      paragraphs: [
        {
          de: "Wir verwenden auf dieser Webseite Funktionen von Facebook, einem Social Media Network der Firma Facebook Ireland Ltd., 4 Grand Canal Square, Grand Canal Harbour, Dublin 2 Ireland. Welche Funktionen (Soziale Plug-ins) Facebook bereitstellt, können Sie hier nachlesen:",
          en: "We use functions of Facebook, a social media network of Facebook Ireland Ltd., 4 Grand Canal Square, Grand Canal Harbour, Dublin 2 Ireland, on this website. You can read which functions (social plug-ins) Facebook provides here:",
        },
      ],
      links: [
        {
          label: "developers.facebook.com/docs/plugins/",
          href: "https://developers.facebook.com/docs/plugins/",
        },
      ],
      afterList: [
        {
          de: "Durch den Besuch unserer Webseite können Informationen an Facebook übermittelt werden. Wenn Sie über ein Facebook-Konto verfügen, kann Facebook diese Daten Ihrem persönlichen Konto zuordnen. Sollten Sie das nicht wünschen, melden Sie sich bitte von Facebook ab. Die Datenschutzrichtlinien, welche Informationen Facebook sammeln und wie sie diese verwenden finden Sie auf https://www.facebook.com/policy.php.",
          en: "By visiting our website, information may be transmitted to Facebook. If you have a Facebook account, Facebook may associate this data with your personal account. If you do not want this, please log out of Facebook. Facebook’s privacy policy, which information Facebook collects and how it uses it, can be found at https://www.facebook.com/policy.php.",
        },
      ],
    },
  ]

  const closing: I18nString = {
    de: "Änderung unserer Datenschutzbestimmungen: Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen, z.B. bei der Einführung neuer Services. Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.",
    en: "Changes to our privacy policy: We reserve the right to adapt this privacy policy so that it always complies with current legal requirements or to implement changes to our services in the privacy policy, e.g. when introducing new services. The new privacy policy will then apply for your next visit.",
  }
</script>

<template>
  <main class="bg-white text-brand-darkgreen">
    <section class="px-6 pb-16 pt-[70px] lg:px-[120px] lg:pb-24 lg:pt-[70px]">
      <article class="mx-auto flex max-w-[852px] flex-col gap-10 lg:gap-12">
        <header class="flex flex-col gap-4">
          <h1
            class="font-sans text-[32px] font-bold leading-tight text-brand-darkgreen sm:text-[40px] lg:text-[44px]"
          >
            {{ t({ de: "Datenschutzerklärung", en: "Privacy Policy" }) }}
          </h1>
          <p
            class="font-sans text-[16px] font-medium leading-[1.5] text-black sm:text-[18px]"
          >
            {{
              t({
                de: "Verantwortliche Stelle im Sinne der Datenschutzgesetze, insbesondere der EU-Datenschutzgrundverordnung (DSGVO), ist:",
                en: "The controller within the meaning of data protection laws, in particular the EU General Data Protection Regulation (GDPR), is:",
              })
            }}
          </p>
          <p
            class="font-sans text-[16px] font-semibold text-brand-darkgreen sm:text-[18px]"
          >
            Z-Management AG
          </p>
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

          <p
            v-for="(p, pi) of s.paragraphs || []"
            :key="`p-${pi}`"
            class="font-sans text-[16px] font-normal leading-[1.55] text-black sm:text-[18px]"
          >
            {{ t(p) }}
          </p>

          <ul
            v-if="s.list?.length"
            class="list-disc space-y-2 pl-5 font-sans text-[16px] font-normal leading-[1.55] text-black sm:text-[18px]"
          >
            <li v-for="(item, li) of s.list" :key="li">
              {{ t(item) }}
            </li>
          </ul>

          <ul
            v-if="s.links?.length"
            class="list-disc space-y-2 pl-5 font-sans text-[16px] font-normal leading-[1.55] text-black sm:text-[18px]"
          >
            <li v-for="(link, li) of s.links" :key="li">
              <a
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
                class="text-brand-orange underline transition-colors hover:text-brand-yellow"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>

          <address
            v-if="s.address"
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
          </address>

          <p
            v-for="(p, ai) of s.afterList || []"
            :key="`a-${ai}`"
            class="font-sans text-[16px] font-normal leading-[1.55] text-black sm:text-[18px]"
          >
            {{ t(p) }}
          </p>
        </section>

        <p
          class="border-t border-brand-darkgreen/15 pt-8 font-sans text-[16px] font-normal leading-[1.55] text-black sm:text-[18px]"
        >
          {{ t(closing) }}
        </p>
      </article>
    </section>
  </main>
</template>
