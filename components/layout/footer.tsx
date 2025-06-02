import Link from "next/link"
import type { Locale, Translations } from "@/lib/i18n"

interface FooterProps {
  locale: Locale
  t: Translations
}

export default function Footer({ locale, t }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: t.footer.services,
      links: [{ name: t.common.services, href: `/${locale}/services` }],
    },
    {
      title: t.footer.support,
      links: [
        { name: t.footer.helpCenter, href: "#" },
        { name: t.footer.contact, href: "#" },
      ],
    },
    {
      title: t.footer.legal,
      links: [
        { name: t.footer.privacyPolicy, href: "#" },
        { name: t.footer.termsOfService, href: "#" },
      ],
    },
  ]

  return (
    <footer className="bg-gray-50 border-t border-gray-200" role="contentinfo">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link
              href={`/${locale}`}
              className="flex items-center space-x-2 font-bold text-xl text-gray-900 hover:text-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg"
              aria-label={`${t.header.logo} - ${locale === "ja" ? "ホームページに戻る" : "Go to homepage"}`}
            >
              <div
                className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center"
                role="img"
                aria-hidden="true"
              >
                <span className="text-white font-bold text-sm">UT</span>
              </div>
              <span>{t.header.logo}</span>
            </Link>
            <p className="mt-4 text-gray-600 text-sm">{t.footer.description}</p>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title} className="col-span-1">
              <h3 className="font-semibold text-gray-900 mb-4">{section.title}</h3>
              <nav aria-label={section.title}>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-600 hover:text-gray-900 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600 text-sm">
            © {currentYear} {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
