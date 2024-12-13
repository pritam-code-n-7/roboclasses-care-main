import { Button } from "@/components/ui/button";

interface btnType {
  name: string;
  type: "submit" | "button" | "reset";
  onClick?: () => void;
  varient?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export function EditButton({ name, type, onClick, varient }: btnType) {
  return (
    <Button type={type} onClick={onClick} variant={varient}>
      {name}
    </Button>
  );
}
