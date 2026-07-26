import Image from "next/image";

export type LogoClient = {
  name: string;
  slug: string;
  logoUrl?: string | null;
  industry?: string | null;
};

function ClientLogoCard({ client, duplicate = false }: { client: LogoClient; duplicate?: boolean }) {
  return (
    <strong aria-hidden={duplicate ? true : undefined}>
      {client.logoUrl ? (
        <Image
          src={client.logoUrl}
          alt={duplicate ? "" : `${client.name} logo`}
          width={210}
          height={82}
          loading="eager"
        />
      ) : (
        <>
          {client.name}
          {client.industry ? <em>{client.industry}</em> : null}
        </>
      )}
    </strong>
  );
}

export function ClientLogoMarquee({ clients }: { clients: LogoClient[] }) {
  if (!clients.length) return null;

  return (
    <div className="shot-client-strip__viewport" aria-label="Client logos">
      <div className="shot-client-strip__track">
        {clients.map((client) => (
          <ClientLogoCard client={client} key={client.slug} />
        ))}
        {clients.map((client) => (
          <ClientLogoCard client={client} duplicate key={`${client.slug}-duplicate`} />
        ))}
      </div>
    </div>
  );
}
