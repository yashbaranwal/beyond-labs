import Image from "next/image";

const BulletSection = () => {
  const linkseraBulletPoints = [
    "How to add your website to the marketplace",
    "Setting pricing and niche/category filters",
    "Uploading sample articles or guidelines",
    "Editing or updating your website listing anytime",
    "Tips to make your listing stand out to buyers",
  ];

  return (
    <section className="bg-white flex flex-col gap-6 md:flex-row md:items-center md:justify-between p-6 md:p-10 rounded">
      <div className="space-y-4 order-2 md:order-1">
        <h3 className="heading-three max-w-sm">
          Learn how to get best out of linksera
        </h3>
        <ul className="list-disc space-y-2 ml-4">
          {linkseraBulletPoints.map((point) => (
            <li key={point} className="text-foreground/60 text-sm font-normal">
              {point}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative order-1 md:order-2">
        <Image
          src="/images/linksera-freelancer.png"
          width={600}
          height={200}
          priority
          alt="freelancer"
          className="rounded"
        />
        <Image
          src="/icons/linksera.svg"
          width={97}
          height={22}
          priority
          alt="linksera"
          className="absolute top-5 left-5"
        />
        <Image
          src="/icons/play.svg"
          width={55}
          height={55}
          priority
          alt="play"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </section>
  );
};

export default BulletSection;
