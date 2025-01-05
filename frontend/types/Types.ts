export type btnType = {
    name: string;
    type: "submit" | "button" | "reset";
    onClick?: () => void;
    varient?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    className?:string;
  }

  export type appointmentTypes = {
    _id?: string;
    userName?: string;
    date: Date;
    time: string;
    course?: string;
    teacher?: string;
    status?: boolean;
    handleDateChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleTimeChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
    handleDelete?: () => void;
  }

 
  export type batchType  = {
    _id: string;
    teacher: string;
    batch: string;
    time: string[];
  }


  export type normalClassType = {
    _id:string;
    time:string[];
    items:string[];
    teacher:string;
    batch:string;
  }

  export type attendanceType = {
    _id: string;
    batch: string;
    date: Date;
    score: string;
    studentsPresent?:number;
    totalStudent?:number;
  }

 