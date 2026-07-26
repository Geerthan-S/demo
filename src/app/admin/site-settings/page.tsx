import { updateSiteSettings } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin";
import { getSiteSettings } from "@/lib/repositories";

export const metadata = { title: "Site Settings" };

export default async function SiteSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; database?: string; error?: string }>;
}) {
  await requireAdmin();
  const params = await searchParams;
  const settings = await getSiteSettings();

  return (
    <div>
      <div className="admin-page-title">
        <h1>Site Settings</h1>
        <p className="mt-2">
          Control global company information that appears across the entire website — contact
          details, social links, and SEO metadata.
        </p>
      </div>

      {params.saved && (
        <p className="mt-4 rounded-md border border-green-600/30 bg-green-600/10 p-3 text-sm text-green-700">
          Settings saved successfully. Changes are live on the website.
        </p>
      )}
      {params.error && (
        <p className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {decodeURIComponent(params.error)}
        </p>
      )}

      <form action={updateSiteSettings} className="admin-form mt-6">
        {/* General */}
        <section className="admin-settings-group">
          <h2 className="admin-settings-group__title">General</h2>
          <div className="admin-form__grid">
            <div className="admin-form__field admin-form__field--full">
              <label htmlFor="s-company-name">Company Name</label>
              <input
                id="s-company-name"
                name="company_name"
                type="text"
                defaultValue={settings.company_name}
              />
            </div>
            <div className="admin-form__field admin-form__field--full">
              <label htmlFor="s-tagline">Tagline</label>
              <input
                id="s-tagline"
                name="company_tagline"
                type="text"
                defaultValue={settings.company_tagline}
              />
            </div>
            <div className="admin-form__field">
              <label htmlFor="s-phone">Primary Phone</label>
              <input
                id="s-phone"
                name="phone_primary"
                type="text"
                defaultValue={settings.phone_primary}
              />
            </div>
            <div className="admin-form__field">
              <label htmlFor="s-phone-alt">Alternate Phone</label>
              <input
                id="s-phone-alt"
                name="phone_alternate"
                type="text"
                defaultValue={settings.phone_alternate}
              />
            </div>
            <div className="admin-form__field">
              <label htmlFor="s-email">Email</label>
              <input
                id="s-email"
                name="email"
                type="email"
                defaultValue={settings.email}
              />
            </div>
            <div className="admin-form__field">
              <label htmlFor="s-hours">Working Hours</label>
              <input
                id="s-hours"
                name="working_hours"
                type="text"
                defaultValue={settings.working_hours}
                placeholder="Mon – Sat: 9:00 AM – 6:00 PM"
              />
            </div>
            <div className="admin-form__field admin-form__field--full">
              <label htmlFor="s-address">Office Address</label>
              <textarea
                id="s-address"
                name="address"
                rows={2}
                defaultValue={settings.address}
              />
            </div>
            <div className="admin-form__field admin-form__field--full">
              <label htmlFor="s-maps">Google Maps Embed URL</label>
              <input
                id="s-maps"
                name="maps_url"
                type="text"
                defaultValue={settings.maps_url}
                placeholder="https://www.google.com/maps/embed?..."
              />
              <small>
                Go to Google Maps → Share → Embed a map → Copy the{" "}
                <code>src</code> value from the iframe code.
              </small>
            </div>
          </div>
        </section>

        {/* Legal */}
        <section className="admin-settings-group">
          <h2 className="admin-settings-group__title">Legal &amp; Registration</h2>
          <div className="admin-form__grid">
            <div className="admin-form__field">
              <label htmlFor="s-gst">GST Number</label>
              <input
                id="s-gst"
                name="gst_number"
                type="text"
                defaultValue={settings.gst_number}
                placeholder="e.g. 33AABCD1234E1Z5"
              />
            </div>
            <div className="admin-form__field">
              <label htmlFor="s-pan">PAN Number</label>
              <input
                id="s-pan"
                name="pan_number"
                type="text"
                defaultValue={settings.pan_number}
                placeholder="e.g. AABCD1234E"
              />
            </div>
          </div>
        </section>

        {/* Social Media */}
        <section className="admin-settings-group">
          <h2 className="admin-settings-group__title">Social Media</h2>
          <div className="admin-form__grid">
            <div className="admin-form__field">
              <label htmlFor="s-fb">Facebook URL</label>
              <input
                id="s-fb"
                name="facebook_url"
                type="url"
                defaultValue={settings.facebook_url}
                placeholder="https://facebook.com/..."
              />
            </div>
            <div className="admin-form__field">
              <label htmlFor="s-ig">Instagram URL</label>
              <input
                id="s-ig"
                name="instagram_url"
                type="url"
                defaultValue={settings.instagram_url}
                placeholder="https://instagram.com/..."
              />
            </div>
            <div className="admin-form__field">
              <label htmlFor="s-li">LinkedIn URL</label>
              <input
                id="s-li"
                name="linkedin_url"
                type="url"
                defaultValue={settings.linkedin_url}
                placeholder="https://linkedin.com/company/..."
              />
            </div>
            <div className="admin-form__field">
              <label htmlFor="s-yt">YouTube URL</label>
              <input
                id="s-yt"
                name="youtube_url"
                type="url"
                defaultValue={settings.youtube_url}
                placeholder="https://youtube.com/@..."
              />
            </div>
          </div>
        </section>

        {/* SEO */}
        <section className="admin-settings-group">
          <h2 className="admin-settings-group__title">SEO &amp; Meta</h2>
          <div className="admin-form__grid">
            <div className="admin-form__field admin-form__field--full">
              <label htmlFor="s-meta-title">Meta Title</label>
              <input
                id="s-meta-title"
                name="seo_meta_title"
                type="text"
                defaultValue={settings.seo_meta_title}
              />
            </div>
            <div className="admin-form__field admin-form__field--full">
              <label htmlFor="s-meta-desc">Meta Description</label>
              <textarea
                id="s-meta-desc"
                name="seo_meta_description"
                rows={3}
                defaultValue={settings.seo_meta_description}
              />
            </div>
            <div className="admin-form__field admin-form__field--full">
              <label htmlFor="s-og-img">OG Image URL</label>
              <input
                id="s-og-img"
                name="seo_og_image"
                type="text"
                defaultValue={settings.seo_og_image}
                placeholder="https://... or /path/to/og-image.jpg"
              />
            </div>
          </div>
        </section>

        <div className="admin-form__actions">
          <Button type="submit">Save All Settings</Button>
        </div>
      </form>
    </div>
  );
}
