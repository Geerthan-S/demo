import Image from "next/image";
import { Truck, Package, Zap } from "lucide-react";
import { getEquipment, type EquipmentItem } from "@/lib/repositories";

function EquipmentCard({ item }: { item: EquipmentItem }) {
  return (
    <article className="equipment-card">
      <div className="equipment-card__image">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="equipment-card__placeholder">
            <Truck aria-hidden="true" />
          </div>
        )}
        <span className="equipment-card__qty">
          <Package className="size-3" aria-hidden="true" />
          {item.quantity} {item.quantity === 1 ? "Unit" : "Units"}
        </span>
        <span className={`equipment-card__status equipment-card__status--${item.status.toLowerCase()}`}>
          {item.status}
        </span>
      </div>
      <div className="equipment-card__body">
        <h3>{item.name}</h3>
        <dl className="equipment-card__specs">
          {item.capacity && (
            <div>
              <dt>
                <Zap className="size-3" aria-hidden="true" /> Capacity
              </dt>
              <dd>{item.capacity}</dd>
            </div>
          )}
          {item.manufacturer && (
            <div>
              <dt>Manufacturer</dt>
              <dd>{item.manufacturer}</dd>
            </div>
          )}
          {item.year && (
            <div>
              <dt>Year</dt>
              <dd>{item.year}</dd>
            </div>
          )}
        </dl>
      </div>
    </article>
  );
}

export async function EquipmentFleet() {
  const equipment = await getEquipment();

  return (
    <section id="equipment" className="equipment-section" aria-label="Equipment Fleet">
      <div className="equipment-section__inner">
        <div className="equipment-section__head">
          <span className="equipment-section__eyebrow">Our Fleet</span>
          <h2>Heavy Equipment Fleet</h2>
          <p>
            Owned and maintained machinery deployed across all active project sites — ensuring
            schedule certainty and equipment reliability.
          </p>
        </div>

        <div className="equipment-grid">
          {equipment.map((item) => (
            <EquipmentCard key={item.id} item={item} />
          ))}
        </div>

        <div className="equipment-section__footer">
          <p>
            <strong>{equipment.reduce((sum, e) => sum + e.quantity, 0)}+</strong> machines deployed
            across active sites &nbsp;·&nbsp;
            <strong>100%</strong> owned &amp; maintained fleet
          </p>
        </div>
      </div>
    </section>
  );
}
