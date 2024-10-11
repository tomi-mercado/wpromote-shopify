import Image from "next/image";

export const ErrorScreen = ({
  title = "Error",
  description = "An error occurred",
}: {
  title?: string;
  description?: string;
}) => {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="rounded-full p-10 w-fit h-fit bg-primary">
        <Image
          src="/dead-plant-illustration.png"
          alt="Dead plant illustration"
          width={200}
          height={200}
        />
      </div>

      {(title || description) && (
        <div className="text-center text-foreground-primary">
          {title && <p className="text-2xl font-semibold">{title}</p>}
          {description && <p className="text-lg">{description}</p>}
        </div>
      )}
    </div>
  );
};
