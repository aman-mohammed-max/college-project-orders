import Nav_button from "@/components/custom/nav_button";

interface NavProps {
  isCollapsed: boolean;
  links:
    | Array<{
        id: string;
        number: number;
      }>
    | undefined;
}

export function Nav({ links, isCollapsed }: NavProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links?.map((link, index) => (
          <Nav_button
            key={index}
            link={link}
            isCollapsed={isCollapsed}
            index={index}
          />
        ))}
      </nav>
    </div>
  );
}
