"use client";

import {
  User,
  CheckCircle,
  Heart,
  Target,
  Lightbulb,
  Code,
  Building,
  Clock,
  BookOpen,
  Shield,
  Github,
  Star,
  Users,
} from "lucide-react";
import { Locale, Translations } from "@/locales";

interface AboutClientProps {
  locale: Locale;
  t: Translations;
}

export default function AboutClient({ locale, t }: AboutClientProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-8">
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-8">
          <User className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {t.about.header.title}
            </h1>
            <p className="text-lg text-gray-600 mt-1">
              {t.about.header.subtitle}
            </p>
          </div>
        </div>

        {/* Trust & Credibility Badge */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  {t.about.trustBadge.title}
                </h2>
                <p className="text-gray-700 text-sm">
                  {t.about.trustBadge.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Heart className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  {t.about.introduction.title}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t.about.introduction.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Target className="h-6 w-6 text-blue-600" />
            {t.about.vision.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                {t.about.vision.visionCard.title}
              </h3>
              <p className="text-green-700 leading-relaxed">
                {t.about.vision.visionCard.description}
              </p>
            </div>
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <h3 className="text-lg font-semibold text-purple-800 mb-3 flex items-center gap-2">
                <Heart className="h-5 w-5" />
                {t.about.vision.missionCard.title}
              </h3>
              <p className="text-purple-700 leading-relaxed">
                {t.about.vision.missionCard.description}
              </p>
            </div>
          </div>
        </div>

        {/* Development Philosophy */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Code className="h-6 w-6 text-blue-600" />
            {t.about.philosophy.title}
          </h2>
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t.about.philosophy.simplicity.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t.about.philosophy.simplicity.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t.about.philosophy.userFirst.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t.about.philosophy.userFirst.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Code className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t.about.philosophy.quality.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t.about.philosophy.quality.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Developer Profile - E-E-A-T focused */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <User className="h-6 w-6 text-blue-600" />
            {t.about.profile.title}
          </h2>
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-8 border border-gray-200">
            <div className="flex items-start gap-8">
              <div className="flex-1">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {t.about.profile.name}
                  </h3>
                  <p className="text-gray-600 text-lg">
                    {t.about.profile.role}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {t.about.profile.experience}
                    </span>
                  </div>
                </div>

                {/* Experience Section */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Building className="h-5 w-5 text-blue-600" />
                    {t.about.profile.experienceSection.title}
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h5 className="font-medium text-gray-900 mb-1">
                        {t.about.profile.experienceSection.medicalSystem.title}
                      </h5>
                      <p className="text-sm text-gray-600">
                        {
                          t.about.profile.experienceSection.medicalSystem
                            .description
                        }
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h5 className="font-medium text-gray-900 mb-1">
                        {t.about.profile.experienceSection.carrierMedia.title}
                      </h5>
                      <p className="text-sm text-gray-600">
                        {
                          t.about.profile.experienceSection.carrierMedia
                            .description
                        }
                      </p>
                    </div>
                  </div>
                </div>

                {/* Technical Expertise */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Code className="h-5 w-5 text-blue-600" />
                    {t.about.profile.technicalExpertise.title}
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h5 className="font-medium text-gray-900 mb-2">
                        {t.about.profile.technicalExpertise.coreTech.title}
                      </h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {t.about.profile.technicalExpertise.coreTech.items.map(
                          (item, index) => (
                            <li key={index}>• {item}</li>
                          )
                        )}
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h5 className="font-medium text-gray-900 mb-2">
                        {t.about.profile.technicalExpertise.relatedTech.title}
                      </h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {t.about.profile.technicalExpertise.relatedTech.items.map(
                          (item, index) => (
                            <li key={index}>• {item}</li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Continuous Learning */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200 mb-6">
                  <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-purple-600" />
                    {t.about.profile.continuousLearning.title}
                  </h4>
                  <p className="text-sm text-purple-700 leading-relaxed">
                    {t.about.profile.continuousLearning.description}
                  </p>
                </div>

                {/* Authority & Trust */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    {t.about.profile.trustTransparency.title}
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h5 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                        <Github className="h-4 w-4 text-gray-700" />
                        {t.about.profile.trustTransparency.openSource.title}
                      </h5>
                      <p className="text-sm text-gray-600">
                        {
                          t.about.profile.trustTransparency.openSource
                            .description
                        }
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h5 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                        <Heart className="h-4 w-4 text-red-600" />
                        {
                          t.about.profile.trustTransparency.continuousOperation
                            .title
                        }
                      </h5>
                      <p className="text-sm text-gray-600">
                        {
                          t.about.profile.trustTransparency.continuousOperation
                            .description
                        }
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <a
                    href="https://github.com/ykarmr/useful-tools"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    <Github className="h-5 w-5" />
                    <span>{t.about.profile.githubButton}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quality Assurance & Security */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-600" />
            {t.about.qualitySecurity.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t.about.qualitySecurity.qualityManagement.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {t.about.qualitySecurity.qualityManagement.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t.about.qualitySecurity.security.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {t.about.qualitySecurity.security.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service Features & Achievements */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Star className="h-6 w-6 text-blue-600" />
            {t.about.serviceFeatures.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    {t.about.serviceFeatures.practicality.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  {t.about.serviceFeatures.practicality.description}
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Lightbulb className="h-4 w-4 text-yellow-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    {t.about.serviceFeatures.userFirst.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  {t.about.serviceFeatures.userFirst.description}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Code className="h-4 w-4 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    {t.about.serviceFeatures.technicalReliability.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  {t.about.serviceFeatures.technicalReliability.description}
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <Shield className="h-4 w-4 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    {t.about.serviceFeatures.privacyProtection.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  {t.about.serviceFeatures.privacyProtection.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Implementation */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Code className="h-6 w-6 text-blue-600" />
            {t.about.technicalImplementation.title}
          </h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-800 mb-3">
                  {t.about.technicalImplementation.adoptedTech.title}
                </h3>
                <div className="space-y-2">
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <h4 className="font-medium text-gray-900 text-sm">
                      {
                        t.about.technicalImplementation.adoptedTech.frontend
                          .title
                      }
                    </h4>
                    <ul className="text-sm text-gray-600 mt-1 space-y-1">
                      {t.about.technicalImplementation.adoptedTech.frontend.items.map(
                        (item, index) => (
                          <li key={index}>• {item}</li>
                        )
                      )}
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <h4 className="font-medium text-gray-900 text-sm">
                      {t.about.technicalImplementation.adoptedTech.devOps.title}
                    </h4>
                    <ul className="text-sm text-gray-600 mt-1 space-y-1">
                      {t.about.technicalImplementation.adoptedTech.devOps.items.map(
                        (item, index) => (
                          <li key={index}>• {item}</li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-3">
                  {t.about.technicalImplementation.designPolicy.title}
                </h3>
                <div className="space-y-2">
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <h4 className="font-medium text-gray-900 text-sm">
                      {
                        t.about.technicalImplementation.designPolicy.performance
                          .title
                      }
                    </h4>
                    <ul className="text-sm text-gray-600 mt-1 space-y-1">
                      {t.about.technicalImplementation.designPolicy.performance.items.map(
                        (item, index) => (
                          <li key={index}>• {item}</li>
                        )
                      )}
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <h4 className="font-medium text-gray-900 text-sm">
                      {
                        t.about.technicalImplementation.designPolicy
                          .accessibility.title
                      }
                    </h4>
                    <ul className="text-sm text-gray-600 mt-1 space-y-1">
                      {t.about.technicalImplementation.designPolicy.accessibility.items.map(
                        (item, index) => (
                          <li key={index}>• {item}</li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Continuous Improvement & Future */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-blue-600" />
            {t.about.continuousImprovement.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">
                {t.about.continuousImprovement.currentEfforts.title}
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                {t.about.continuousImprovement.currentEfforts.items.map(
                  (item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h3 className="text-lg font-semibold text-green-900 mb-4">
                {t.about.continuousImprovement.futurePlans.title}
              </h3>
              <ul className="space-y-2 text-sm text-green-800">
                {t.about.continuousImprovement.futurePlans.items.map(
                  (item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Target className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Contact & Feedback */}
        <div className="border-t border-gray-200 pt-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t.about.contactFeedback.title}
            </h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              {t.about.contactFeedback.description}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <a
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Heart className="h-5 w-5" />
                <span>{t.about.contactFeedback.contactButton}</span>
              </a>
              <a
                href="https://github.com/ykarmr/useful-tools/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                <Github className="h-5 w-5" />
                <span>{t.about.contactFeedback.githubIssuesButton}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
