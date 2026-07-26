import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ClientView } from "@/lib/content";

export function ClientForm({
  action,
  client,
}: {
  action: (formData: FormData) => void | Promise<void>;
  client?: ClientView;
}) {
  return (
    <form action={action} className="admin-form-shell grid gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Client name" name="name" defaultValue={client?.name} required />
        <Field label="Slug" name="slug" defaultValue={client?.slug} />
        <Field label="Logo URL" name="logoUrl" defaultValue={client?.logoUrl ?? ""} placeholder="https://... or /client-logos/logo.svg" />
        <Field label="Industry" name="industry" defaultValue={client?.industry ?? ""} />
        <Field label="Website" name="website" defaultValue={client?.website ?? ""} placeholder="https://example.com" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="testimonial">Client note / testimonial</Label>
        <Textarea id="testimonial" name="testimonial" rows={5} defaultValue={client?.testimonial ?? ""} />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input name="featured" type="checkbox" defaultChecked={client?.featured ?? true} />
        Featured on site
      </label>
      <Button type="submit" className="w-fit"><Save className="size-4" /> Save Client</Button>
    </form>
  );
}

function Field(props: React.ComponentProps<typeof Input> & { label: string; name: string }) {
  const { label, name, ...inputProps } = props;
  return (
    <div className="grid gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} {...inputProps} />
    </div>
  );
}
