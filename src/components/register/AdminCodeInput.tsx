
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AdminCodeInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const AdminCodeInput: React.FC<AdminCodeInputProps> = ({ value, onChange }) => (
  <div>
    <Label htmlFor="adminCode">
      Admin Code <span className="text-xs text-gray-400">(leave blank unless authorized)</span>
    </Label>
    <Input
      id="adminCode"
      name="adminCode"
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Enter admin code (if any)"
      className="border-2 border-gray-200 focus:border-kenya-green"
      autoComplete="off"
    />
  </div>
);

export default AdminCodeInput;
