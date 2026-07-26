import { ProjectStatus } from "@prisma/client";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { ProjectView } from "@/lib/content";
import { editableProjectCategories, normalizeProjectCategory } from "@/lib/project-categories";

export function ProjectForm({
  action,
  project,
}: {
  action: (formData: FormData) => void | Promise<void>;
  project?: ProjectView;
}) {
  return (
    <form action={action} className="admin-form-shell grid gap-6">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Title" name="title" defaultValue={project?.title} minLength={3} required />
        <Field label="SEO slug" name="slug" defaultValue={project?.slug} />
        <Field label="Client name" name="clientName" defaultValue={project?.clientName} required />
        <Field label="Project value" name="contractValue" defaultValue={project?.contractValue ?? project?.projectValue} placeholder="INR 400+ Lakhs" required />
        <Field label="Featured image URL" name="featuredImage" defaultValue={project?.featuredImage} placeholder="https://... or /home-reference/project.jpg" required />
        <Field label="Location" name="location" defaultValue={project?.location} required />
        <Field label="Timeline" name="timeline" defaultValue={project?.timeline} required />
        <input name="projectValue" type="hidden" defaultValue={project?.projectValue ?? project?.contractValue ?? ""} />
        <Field label="Industry" name="industry" defaultValue={project?.industry} required />
        <div className="grid gap-2">
          <Label>Status</Label>
          <Select name="status" defaultValue={project?.status ?? "IN_PROGRESS"}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {Object.values(ProjectStatus).map((status) => (
                <SelectItem key={status} value={status}>{status.replace("_", " ")}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <TextField
        label="Nature of Works"
        name="servicesUsed"
        defaultValue={project?.servicesUsed.join(", ")}
        placeholder={"Road Strengthening & Renewal,\nBT & CC Road Formation,\nDrainage & Infrastructure Works"}
        required
      />
      <TextField label="Scope of work" name="scopeOfWork" defaultValue={project?.scopeOfWork} minLength={10} required />
      <TextField label="Summary" name="summary" defaultValue={project?.summary} minLength={10} required />
      <Button type="submit" className="w-fit mt-2"><Save className="size-4" /> Save Project</Button>
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

function TextField({
  label,
  name,
  rows = 4,
  ...props
}: React.ComponentProps<typeof Textarea> & { label: string; name: string }) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Textarea id={name} name={name} rows={rows} {...props} />
    </div>
  );
}
