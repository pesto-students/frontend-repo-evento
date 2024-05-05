import { Button, Card } from "antd";
import { ChevronLeftIcon, EyeIcon, SaveIcon } from "lucide-react";
import React from "react";

const FormButtons = () => {
  return (
    <Card className="w-full">
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <Button icon={<ChevronLeftIcon className="w-4 h-4" />} />
          <div>
            <div className="text-xs">Back to List</div>
            <div className="font-semibold">Edit Event Details</div>
          </div>
        </div>
        <div>
          <Button icon={<EyeIcon className="w-3 h-3" />}>Preview</Button>
        </div>
      </div>
    </Card>
  );
};

export default FormButtons;
