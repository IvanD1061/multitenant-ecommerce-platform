import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default function Home() {
  return (
    <div className="p-4">
    <div className="flex flex-col gap-y-4">
      <div>
        <Button variant={"elevated"}>
          This a button
        </Button>
      </div>

      <div>
        <Input placeholder="this is for an input:"/>
      </div>
      <div>
        <Progress value = {25}/>
      </div>
      <div>
        <Textarea placeholder = "Ivan you were at 1:13:48 in the video:" />
      </div>
      <div>
        <Checkbox />
      </div>
    </div>
  </div>
  );
};
