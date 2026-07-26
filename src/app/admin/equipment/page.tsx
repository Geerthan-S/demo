import Image from "next/image";
import Link from "next/link";
import { Plus, Pencil, Truck, LayoutGrid, CheckCircle2 } from "lucide-react";
import { getEquipment, type EquipmentItem } from "@/lib/repositories";
import { deleteEquipment } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin";

export const dynamic = "force-dynamic";
export const metadata = { title: "Equipment Fleet | Admin" };

/* ─── Delete button (plain server-action form — no client JS needed) ──────── */
function DeleteButton({ id }: { id: string }) {
  const action = deleteEquipment.bind(null, id);
  return (
    <form action={action}>
      <button
        type="submit"
        className="text-[11px] font-semibold text-red-600 hover:text-red-800 hover:underline transition-colors"
      >
        Delete
      </button>
    </form>
  );
}

/* ─── Single equipment row ─────────────────────────────────────────────────── */
function EquipmentRow({ item, index }: { item: EquipmentItem; index: number }) {
  const isActive = (item.status ?? "").toLowerCase().includes("active");

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50/70 transition-colors">
      {/* Sort / order */}
      <td className="py-3.5 px-4 text-[12px] text-gray-400 font-mono w-10 text-center">
        {item.sortOrder ?? index + 1}
      </td>

      {/* Thumbnail + name */}
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          <div className="relative w-14 h-10 rounded overflow-hidden bg-gray-100 flex-shrink-0">
            {item.imageUrl ? (
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                sizes="56px"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <Truck className="w-5 h-5 text-gray-300" />
              </div>
            )}
          </div>
          <div>
            <p className="text-[13px] font-semibold text-gray-900 leading-tight">{item.name}</p>
            <p className="text-[11px] text-gray-400 font-mono mt-0.5">{item.slug}</p>
          </div>
        </div>
      </td>

      {/* Quantity */}
      <td className="py-3.5 px-4 text-[12px] text-gray-700 font-semibold">
        {item.quantity}+
      </td>

      {/* Capacity */}
      <td className="py-3.5 px-4 text-[12px] text-gray-600">
        {item.capacity ?? <span className="text-gray-300">—</span>}
      </td>

      {/* Manufacturer */}
      <td className="py-3.5 px-4 text-[12px] text-gray-500 hidden lg:table-cell">
        {item.manufacturer ?? <span className="text-gray-300">—</span>}
      </td>

      {/* Year */}
      <td className="py-3.5 px-4 text-[12px] text-gray-500 hidden xl:table-cell">
        {item.year ?? <span className="text-gray-300">—</span>}
      </td>

      {/* Status */}
      <td className="py-3.5 px-4">
        <span
          className={`inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wide px-2 py-0.5 rounded-full ${
            isActive
              ? "bg-green-50 text-green-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          <CheckCircle2 className="w-3 h-3" />
          {item.status}
        </span>
      </td>

      {/* Actions */}
      <td className="py-3.5 px-4">
        <div className="flex items-center gap-3">
          <Link
            href={`/admin/equipment/${item.id}/edit`}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#8A3841] hover:text-[#6D2B32] hover:underline transition-colors"
          >
            <Pencil className="w-3 h-3" />
            Edit
          </Link>
          <DeleteButton id={item.id} />
        </div>
      </td>
    </tr>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────────────── */
export default async function AdminEquipmentPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  await requireAdmin();
  const equipment = await getEquipment();
  const sp = await searchParams;

  const totalUnits = equipment.reduce((sum, e) => sum + e.quantity, 0);
  const activeCount = equipment.filter((e) =>
    (e.status ?? "").toLowerCase().includes("active")
  ).length;

  return (
    <div>
      {/* ── Page header */}
      <div className="admin-page-title">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#8A3841]" />
              Equipment Fleet
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage heavy equipment displayed on the public fleet page.
            </p>
          </div>
          <Link
            href="/admin/equipment/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#8A3841] hover:bg-[#6D2B32] text-white text-[12px] font-bold tracking-wide uppercase rounded-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Equipment
          </Link>
        </div>
      </div>

      {/* ── Toast messages */}
      {sp.saved && (
        <div className="mt-4 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          ✓ Equipment saved successfully.
        </div>
      )}
      {sp.error && (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {decodeURIComponent(sp.error)}
        </div>
      )}

      {/* ── Summary stats */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Equipment Types", value: equipment.length, icon: LayoutGrid },
          { label: "Total Units", value: `${totalUnits}+`, icon: Truck },
          { label: "Active", value: activeCount, icon: CheckCircle2 },
          { label: "Published", value: equipment.length, icon: CheckCircle2 },
        ].map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-md border border-gray-200 bg-white px-5 py-4 flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-full bg-[rgba(138,56,65,0.08)] flex items-center justify-center flex-shrink-0">
              <Icon className="w-4 h-4 text-[#8A3841]" />
            </div>
            <div>
              <p className="text-[22px] font-bold text-gray-900 leading-none">{value}</p>
              <p className="text-[11px] text-gray-500 mt-0.5">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Equipment table */}
      <div className="mt-6 rounded-md border border-gray-200 bg-white overflow-hidden">
        {equipment.length === 0 ? (
          <div className="py-20 text-center">
            <Truck className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="text-sm font-medium text-gray-500">No equipment items yet.</p>
            <p className="text-xs text-gray-400 mt-1 mb-5">
              Add your first item to display it on the public Equipment Fleet page.
            </p>
            <Link
              href="/admin/equipment/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#8A3841] text-white text-[12px] font-bold uppercase rounded-sm"
            >
              <Plus className="w-4 h-4" /> Add Equipment
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/80">
                  <th className="py-3 px-4 text-[10px] font-bold tracking-widest uppercase text-gray-400 text-center w-10">#</th>
                  <th className="py-3 px-4 text-[10px] font-bold tracking-widest uppercase text-gray-400 text-left">Equipment</th>
                  <th className="py-3 px-4 text-[10px] font-bold tracking-widest uppercase text-gray-400 text-left">Qty</th>
                  <th className="py-3 px-4 text-[10px] font-bold tracking-widest uppercase text-gray-400 text-left">Capacity</th>
                  <th className="py-3 px-4 text-[10px] font-bold tracking-widest uppercase text-gray-400 text-left hidden lg:table-cell">Manufacturer</th>
                  <th className="py-3 px-4 text-[10px] font-bold tracking-widest uppercase text-gray-400 text-left hidden xl:table-cell">Year</th>
                  <th className="py-3 px-4 text-[10px] font-bold tracking-widest uppercase text-gray-400 text-left">Status</th>
                  <th className="py-3 px-4 text-[10px] font-bold tracking-widest uppercase text-gray-400 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {equipment.map((item, i) => (
                  <EquipmentRow key={item.id} item={item} index={i} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Quick link to public page */}
      <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
        <span>Preview on site:</span>
        <Link
          href="/equipment-fleet"
          target="_blank"
          className="text-[#8A3841] hover:underline font-medium"
        >
          /equipment-fleet ↗
        </Link>
      </div>
    </div>
  );
}