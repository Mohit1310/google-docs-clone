import { Input } from "@/components/ui/input";
import { useEditorStore } from "@/store/use-editor-store";
import { MinusIcon, PlusIcon } from "lucide-react";
import type React from "react";
import { useEffect, useMemo, useState } from "react";

const FontSizeButton = () => {
  const { editor } = useEditorStore();

  // biome-ignore lint: unecessary lint error
  const currentFontSize = useMemo(() => {
    const attrs = editor?.getAttributes("textStyle");
    return attrs?.fontSize ? attrs.fontSize.replace("px", "") : "16";
  }, [editor?.getAttributes("textStyle")]);

  const [inputValue, setInputValue] = useState(currentFontSize);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setInputValue(currentFontSize);
  }, [currentFontSize]);

  const updateFontSize = (newSize: string) => {
    const size = Number.parseInt(newSize);
    if (!Number.isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setInputValue(newSize);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    updateFontSize(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
    }
  };

  const increment = () => {
    const newSize = Number.parseInt(currentFontSize) + 1;
    updateFontSize(newSize.toString());
  };

  const decrement = () => {
    const newSize = Number.parseInt(currentFontSize) - 1;
    if (newSize > 0) {
      updateFontSize(newSize.toString());
    }
  };

  return (
    <div className="flex items-center gap-x-0.5">
      <button
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm hover:bg-neutral-200/80"
        onClick={decrement}
        type="button"
      >
        <MinusIcon className="size-4" />
      </button>
      {isEditing ? (
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className="h-7 w-10 rounded-sm border border-neutral-400 bg-transparent text-center text-sm focus:outline-none focus:ring-0"
        />
      ) : (
        <button
          className="h-7 w-10 cursor-text rounded-sm border border-neutral-400 bg-transparent text-center text-sm"
          type="button"
          onClick={() => {
            setIsEditing(true);
          }}
        >
          {currentFontSize}
        </button>
      )}
      <button
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm hover:bg-neutral-200/80"
        onClick={increment}
        type="button"
      >
        <PlusIcon className="size-4" />
      </button>
    </div>
  );
};

export default FontSizeButton;
