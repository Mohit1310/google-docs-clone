import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useEditorStore } from "@/store/use-editor-store";
import { Link2Icon } from "lucide-react";
import { useState } from "react";

const LinkButton = () => {
  const { editor } = useEditorStore();
  const [value, setValue] = useState("");

  const onChange = (value: string) => {
    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: value })
      .run();
    setValue("");
  };

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (open) {
          setValue(editor?.getAttributes("link").href || "");
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <button
          className="flex h-7 min-w-7 shrink-0 flex-col items-center justify-center overflow-hidden rounded-sm px-1.5 text-sm hover:bg-neutral-200/80"
          type="button"
        >
          <Link2Icon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex items-center gap-x-2 p-2.5">
        <Input
          placeholder="https://example.com"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button onClick={() => onChange(value)}>Apply</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LinkButton;
