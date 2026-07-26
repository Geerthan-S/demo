"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const deliverCards = [
  {
    num: "01",
    slug: "civil-construction",
    title: "Civil Construction",
    tagline: "Building robust foundations for a stronger tomorrow.",
    image: "/services-reference/card-civil-construction-enhanced.png",
  },
  {
    num: "02",
    slug: "road-highways",
    title: "Road & Highways",
    tagline: "Delivering smooth, durable, and safe road infrastructure.",
    image: "/services-reference/card-road-highways-enhanced.png",
  },
  {
    num: "03",
    slug: "railway-works",
    title: "Railway Works",
    tagline: "Engineering reliable rail solutions that connect the future.",
    image: "/services-reference/card-railway-works-enhanced.png",
  },
  {
    num: "04",
    slug: "electrical-works",
    title: "Electrical Works",
    tagline: "Powering progress with safe and efficient electrical systems.",
    image: "/services-reference/card-electrical-works-enhanced.png",
  },
  {
    num: "05",
    slug: "industrial-projects",
    title: "Industrial Projects",
    tagline: "Creating high-performance industrial spaces for growth and productivity.",
    image: "/services-reference/card-industrial-projects-enhanced.png",
  },
  {
    num: "06",
    slug: "project-management",
    title: "Project Management",
    tagline: "Smart planning, precise execution, successful delivery.",
    image: "/services-reference/card-project-management-enhanced.png",
  },
  {
    num: "07",
    slug: "water-infrastructure-drainage-works",
    title: "Water Infrastructure & Drainage Works",
    tagline: "Sustainable water and drainage solutions for communities.",
    image: "/services-reference/card-water-drainage-enhanced.png",
  },
  {
    num: "08",
    slug: "road-safety-traffic-management-systems",
    title: "Road Safety & Traffic Management Systems",
    tagline: "Enhancing safety and ensuring smooth traffic movement.",
    image: "/services-reference/card-road-safety-enhanced.png",
  },
] as const;

export function Services() {
  return (
    <section className="delivers-section !mt-0 !pt-16" id="services" aria-labelledby="delivers-title">
      <div className="delivers-section__inner">
        <div className="delivers-section__head">
          <div className="delivers-section__headcopy">
            <h2 className="delivers-section__title" id="delivers-title">
              WHAT DOCKSIDE DELIVERS
            </h2>
            <p className="delivers-section__subtitle">
              End-to-end infrastructure and civil construction solutions built
              <br />
              on expertise, technology, and unwavering commitment.
            </p>
          </div>
          <span className="delivers-section__accent-rule" aria-hidden="true" />
          <div className="delivers-section__watermark" aria-hidden="true">
            <svg viewBox="0 0 220 360" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 83L110 169L202 83" />
              <path d="M18 119L110 205L202 119" />
              <path d="M18 155L110 241L202 155" />
              <path d="M18 191L110 277L202 191" />
              <path d="M18 227L110 313L202 227" />
              <path d="M18 263L110 349L202 263" />
              <path d="M18 263L18 313L110 399" />
            </svg>
          </div>
        </div>

        <motion.div
          className="delivers-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08, delayChildren: 0.1 },
            },
          }}
        >
          {deliverCards.map(({ num, slug, title, tagline, image }) => (
            <motion.div key={slug} variants={cardVariants}>
              <Link
                href={`/services#${slug}`}
                className="delivers-card"
                aria-label={`Learn about ${title}`}
              >
                <span className="delivers-card__num">{num}</span>
                <div className="delivers-card__illustration" aria-hidden="true">
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="(max-width: 860px) 50vw, 25vw"
                    className="delivers-card__image"
                  />
                </div>
                <div className="delivers-card__body">
                  <h3 className="delivers-card__title">{title}</h3>
                  <p className="delivers-card__desc">{tagline}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
