"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, Mail } from "lucide-react";
import type { Locale, Translations } from "@/locales";

interface ContactClientProps {
  locale: Locale;
  t: Translations;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactClient({ locale, t }: ContactClientProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t.contact.form.nameRequired;
    }

    if (!formData.email.trim()) {
      newErrors.email = t.contact.form.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.contact.form.emailInvalid;
    }

    if (!formData.message.trim()) {
      newErrors.message = t.contact.form.messageRequired;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t.contact.form.messageMinLength;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulate API call

      const body = new FormData();
      body.append("お名前", formData.name);
      body.append("メールアドレス", formData.email);
      body.append("お問い合わせ内容", formData.message);
      const res = await fetch("https://ssgform.com/s/iKgLTdV9LxsB", {
        method: "POST",
        body,
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      // In a real application, you would send the form data to your backend
      console.log("Form submitted:", formData);

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-8">
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-8">
          <Mail className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {t.contact.title}
            </h1>
            <p className="text-lg text-gray-600 mt-1">{t.contact.subtitle}</p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <p className="text-lg text-gray-700 leading-relaxed">
            {t.contact.description}
          </p>
        </div>

        {/* Form Section */}
        <div className="border-l-4 border-blue-200 pl-6 hover:border-blue-400 transition-colors duration-200">
          {submitStatus === "success" && (
            <Alert className="mb-8 border-green-200/50 bg-green-50/70 backdrop-blur-sm rounded-xl">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <AlertDescription className="text-green-800 font-medium">
                {t.contact.form.success}
              </AlertDescription>
            </Alert>
          )}

          {submitStatus === "error" && (
            <Alert className="mb-8 border-red-200/50 bg-red-50/70 backdrop-blur-sm rounded-xl">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <AlertDescription className="text-red-800 font-medium">
                {t.contact.form.error}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  {t.contact.form.name}
                </label>
                <div className="relative">
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange("name")}
                    placeholder={t.contact.form.namePlaceholder}
                    className={`h-12 rounded-lg border-2 transition-all duration-200 ${
                      errors.name
                        ? "border-red-300 bg-red-50/50 focus:border-red-500"
                        : "border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white group-hover:border-gray-300"
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm font-medium flex items-center gap-1 mt-2">
                    <AlertCircle className="h-3 w-3" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="group">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  {t.contact.form.email}
                </label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange("email")}
                    placeholder={t.contact.form.emailPlaceholder}
                    className={`h-12 rounded-lg border-2 transition-all duration-200 ${
                      errors.email
                        ? "border-red-300 bg-red-50/50 focus:border-red-500"
                        : "border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white group-hover:border-gray-300"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm font-medium flex items-center gap-1 mt-2">
                    <AlertCircle className="h-3 w-3" />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="group">
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                {t.contact.form.message}
              </label>
              <div className="relative">
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange("message")}
                  placeholder={t.contact.form.messagePlaceholder}
                  rows={6}
                  className={`rounded-lg border-2 transition-all duration-200 resize-none ${
                    errors.message
                      ? "border-red-300 bg-red-50/50 focus:border-red-500"
                      : "border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white group-hover:border-gray-300"
                  }`}
                />
              </div>
              {errors.message && (
                <p className="text-red-500 text-sm font-medium flex items-center gap-1 mt-2">
                  <AlertCircle className="h-3 w-3" />
                  {errors.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-60"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {t.contact.form.submitting}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5" />
                  {t.contact.form.submit}
                </div>
              )}
            </Button>
          </form>
        </div>

        {/* Footer Note */}
        <div className="mt-12 pt-6 border-t border-gray-100">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Mail className="h-4 w-4" />
              <span className="font-medium">{t.common.siteTitle}</span>
              <span>•</span>
              <span>{t.contact.title}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
