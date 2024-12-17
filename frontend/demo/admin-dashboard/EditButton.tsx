import { Button } from "@/components/ui/button";

interface btnType {
  name: string;
  type: "submit" | "button" | "reset";
  onClick?: () => void;
  varient?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  className?:string;
}

export function EditButton({ name, type, onClick, varient, className }: btnType) {
  return (
    <Button type={type} onClick={onClick} variant={varient} className={className}>
      {name}
    </Button>
  );
}
