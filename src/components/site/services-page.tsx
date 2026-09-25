import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { InnerPage } from "@/components/site/inner-page";
import { ServiceFamilies } from "@/components/sections/services-band";
import { getContent, path, type Locale } from "@/lib/content";

export function ServicesPage({ locale }: { locale: Locale }) {
  const { services } = getContent(locale);
  const french = locale === "fr";
  return (
    <InnerPage
      locale={locale}
      eyebrow={services.eyebrow}
      title={french ? "Automatisation et agents IA pour vos processus métier" : "Automation and AI agents for your business processes"}
      titleAccent={french ? "Automatisation et agents IA" : "Automation and AI agents"}
      body={french
        ? "Découvrez nos services pour connecter vos logiciels, automatiser les tâches répétitives et aider vos équipes à exploiter leurs données. Chaque solution part de votre fonctionnement actuel, de vos outils et des actions que vous souhaitez garder sous contrôle."
        : "Explore our services to connect your software, automate repetitive tasks and help your teams use their data. Every solution starts with your current workflows, tools and the actions you want to keep under your control."}
    >
      <div className="container-page pb-[var(--space-section)]">
        <ServiceFamilies locale={locale} expanded />
        <section className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-semibold">{french ? "Quel processus automatiser en premier ?" : "Which process should you automate first?"}</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">{french
            ? "Un processus fréquent, documenté et alimenté par des données accessibles constitue un bon point de départ. Nous examinons les étapes, les exceptions et les connexions possibles à vos outils pour définir un périmètre réaliste. Pour un agent IA, nous précisons aussi les sources utilisables, les droits d’accès et les actions qui exigent votre validation."
            : "A frequent, documented process with accessible data is a useful starting point. We review its steps, exceptions and possible tool integrations to define a realistic scope. For an AI agent, we also define usable sources, access rights and actions that require your approval."}</p>
          <Link className="services-more" href={path(locale, "/contact")}>
            {french ? "Parlons de vos processus" : "Let’s discuss your processes"}<ArrowRight aria-hidden />
          </Link>
        </section>
      </div>
    </InnerPage>
  );
}
