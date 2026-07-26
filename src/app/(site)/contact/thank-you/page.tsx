import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Message Received" };

export default function ContactThankYouPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-28 text-center sm:px-6 lg:px-8">
      <h1 className="text-4xl font-semibold">Message received.</h1>
      <p className="mt-5 text-muted-foreground">
        Thanks for reaching out. The Dockside team will route your enquiry to the right person.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Back to Home</Link>
      </Button>
    </section>
  );
}
