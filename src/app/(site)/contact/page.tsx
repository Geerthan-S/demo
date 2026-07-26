import Link from "next/link";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  ArrowRight,
  Clock3,
  Cog,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Timer,
  UsersRound,
} from "lucide-react";
import { seedClients } from "@/lib/content";
import { canUseDatabase, getPrisma } from "@/lib/prisma";
import { getClients } from "@/lib/repositories";
import { ClientLogoMarquee } from "@/components/client-logo-marquee";
import { ContactReasons } from "@/components/contact/ContactReasons";
import { ContactForm } from "@/components/contact/ContactForm";
import ContactHero from "./contact-hero";

export const dynamic = "force-dynamic";


export const metadata = { title: "Contact" };

const OFFICE_LAT = "12.886303218652689";
const OFFICE_LNG = "80.0823886117243";
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${OFFICE_LAT},${OFFICE_LNG}`;
const mapUrl = `https://www.google.com/maps?q=${OFFICE_LAT},${OFFICE_LNG}&z=15&output=embed`;

const contactSchema = z.object({
  name: z.string().min(2),
  company: z.string().optional(),
  phone: z.string().min(6),
  email: z.string().email(),
  projectType: z.string().min(2),
  message: z.string().min(10),
});

async function submitContact(formData: FormData) {
  "use server";

  const parsed = contactSchema.safeParse(Object.fromEntries(formData));
  if (parsed.success && canUseDatabase()) {
    const { name, email, message, ...details } = parsed.data;
    const enrichedMessage = [
      message,
      "",
      "Project enquiry details:",
      `Company: ${details.company || "Not provided"}`,
      `Phone: ${details.phone}`,
      `Project type: ${details.projectType}`,
      `Map location: ${OFFICE_LAT}, ${OFFICE_LNG}`,
    ].join("\n");

    await getPrisma().contactMessage.create({
      data: {
        id: crypto.randomUUID(),
        name,
        email,
        message: enrichedMessage,
      },
    });
  }

  redirect("/contact/thank-you");
}

const reasons = [
  {
    title: "Expert Team",
    text: "Experienced professionals ready to understand your requirements.",
    icon: UsersRound,
  },
  {
    title: "Reliable Support",
    text: "Prompt responses and dedicated support at every step.",
    icon: ShieldCheck,
  },
  {
    title: "Tailored Solutions",
    text: "Customized solutions that fit your project and goals.",
    icon: Cog,
  },
  {
    title: "On-Time Delivery",
    text: "Commitment to deadlines and efficient execution always.",
    icon: Timer,
  },
  {
    title: "Quality Assured",
    text: "Highest standards of quality, safety and compliance.",
    icon: ShieldCheck,
  },
];

export default async function ContactPage() {
  const clientRecords = await getClients().catch(() => seedClients);

  return (
    <div className="shot-page shot-page--contact">
      <ContactHero />

      <section className="shot-contact-panel">
        <div className="shot-contact-info">
          <span>Contact Information</span>
          <h2>Reach out to Dockside</h2>
          <div className="shot-contact-info__list">
            <article>
              <MapPin aria-hidden="true" />
              <div>
                <h3>Registered Office</h3>
                <p>No.56, V.G.P. Nagar East,<br />Salamedu, Villupuram - 605401<br />Tamil Nadu, India</p>
              </div>
            </article>
            <article>
              <MapPin aria-hidden="true" />
              <div>
                <h3>Functional Office</h3>
                <p>Vandalur, Chennai - 600048<br />Tamil Nadu, India</p>
              </div>
            </article>
            <article>
              <Phone aria-hidden="true" />
              <div>
                <h3>Phone</h3>
                <p><a href="tel:+918925922737">+91 89259 22737</a><br /><a href="tel:+919791938050">+91 97919 38050</a></p>
              </div>
            </article>
            <article>
              <Mail aria-hidden="true" />
              <div>
                <h3>Email</h3>
                <p><a href="mailto:ceo@docksideconstructions.com">ceo@docksideconstructions.com</a><br /><a href="mailto:works@docksideconstructions.com">works@docksideconstructions.com</a></p>
              </div>
            </article>
            <article>
              <Clock3 aria-hidden="true" />
              <div>
                <h3>Office Hours</h3>
                <p>Monday - Saturday<br />9:00 AM - 6:00 PM</p>
              </div>
            </article>
          </div>
        </div>

        <div id="contact-form" className="shot-contact-form">
          <span>Send us a message We will get back to you</span>
          <h2>Reason for Contact</h2>
          <ContactForm />
        </div>
      </section>

      <section className="shot-contact-location">
        <div>
          <span>Our Location</span>
          <h2>Find us here</h2>
          <p>Vandalur<br />Chennai - 600048<br />Tamil Nadu, India</p>
          <Link href={directionsUrl} target="_blank" rel="noreferrer" className="shot-button shot-button--outline">
            <MapPin aria-hidden="true" />
            Get Directions <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="shot-contact-map">
          <iframe title="Dockside Constructions map location" loading="lazy" src={mapUrl} />
        </div>
      </section>

      <section className="shot-client-strip shot-client-strip--contact">
        <span>Trusted by industrial leaders & public sector organizations</span>
        <ClientLogoMarquee clients={clientRecords} />
      </section>
    </div>
  );
}
