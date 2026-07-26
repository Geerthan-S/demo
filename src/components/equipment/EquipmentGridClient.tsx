"use client";

import Image from "next/image";
import { Gauge, CheckCircle2, Truck } from "lucide-react";
import type { EquipmentItem } from "@/lib/repositories";

interface EquipmentCardProps {
  item: EquipmentItem;
  fleetBadgeMap: Record<string, string>;
  fleetDescMap: Record<string, string>;
}

function EquipmentCard({
  item,
  fleetBadgeMap,
  fleetDescMap,
}: EquipmentCardProps) {
  const badge = fleetBadgeMap[item.slug] ?? `${item.quantity}+ Units`;
  const description =
    item.description?.trim() || fleetDescMap[item.slug] || "";

  return (
    <article
      className="group flex flex-col bg-white border border-gray-200 hover:border-[#8A3841]/30 hover:shadow-[0_8px_32px_rgba(138,56,65,0.08)] transition-all duration-300 overflow-hidden"
    >
      <div className="relative aspect-[16/10] flex-shrink-0 overflow-hidden bg-gray-100">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <Truck className="w-10 h-10 text-gray-200" aria-hidden="true" />
          </div>
        )}
        <span
          className="absolute top-0 left-0 bg-[#8A3841] text-[11px] font-extrabold tracking-widest uppercase px-3 py-1.5"
          style={{ color: "#ffffff" }}
        >
          {badge}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-display text-[17px] font-extrabold uppercase tracking-wide text-gray-900 mb-4 leading-tight">
          {item.name}
        </h3>

        <div className="space-y-2.5 mb-4">
          {item.capacity && (
            <div className="flex items-center gap-2">
              <Gauge
                className="w-3.5 h-3.5 text-gray-400 flex-shrink-0"
                aria-hidden="true"
              />
              <span className="text-[11px] font-bold tracking-widest uppercase text-gray-400 flex-1">
                Capacity
              </span>
              <span className="text-[12px] font-semibold text-gray-700">
                {item.capacity}
              </span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <CheckCircle2
              className="w-3.5 h-3.5 text-gray-400 flex-shrink-0"
              aria-hidden="true"
            />
            <span className="text-[11px] font-bold tracking-widest uppercase text-gray-400 flex-1">
              Status
            </span>
            <span className="text-[12px] font-bold text-[#16A34A]">
              {item.status || "Active Fleet"}
            </span>
          </div>
        </div>

        {description && (
          <p className="text-[13px] leading-[1.7] text-gray-500 pt-3.5 mt-auto border-t border-gray-100">
            {description}
          </p>
        )}
      </div>
    </article>
  );
}

interface EquipmentGridClientProps {
  equipment: EquipmentItem[];
  fleetBadgeMap: Record<string, string>;
  fleetDescMap: Record<string, string>;
}

export function EquipmentGridClient({
  equipment,
  fleetBadgeMap,
  fleetDescMap,
}: EquipmentGridClientProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {equipment.map((item) => (
        <EquipmentCard
          key={item.id}
          item={item}
          fleetBadgeMap={fleetBadgeMap}
          fleetDescMap={fleetDescMap}
        />
      ))}
    </div>
  );
}
