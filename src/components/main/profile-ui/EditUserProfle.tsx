"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { updateUserProfile } from "@/store/slices/userSlice";
import { toast } from "sonner";
import { CustomToast } from "@/components/my-ui/CustomToast";
import { LoadingTypeEnum } from "@/constants";
import { SquarePen } from "lucide-react";

export function EditUserProfileDialog() {
  const dispatch = useAppDispatch();
  const { profile, loading } = useAppSelector(state => state.userProfile);
  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState(profile?.full_name || "");

  const handleSaveChanges = async () => {
    try {
      if (profile?.id) {
        const updatedProfile = {
          full_name: fullName,
        };

        await dispatch(
          updateUserProfile({
            updatedProfile,
            userId: profile.id,
          })
        ).unwrap();

        toast.custom(() =>
          CustomToast({
            type: "success",
            message: "Profile updated successfully!",
          })
        );
        setOpen(false);
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.custom(() =>
        CustomToast({
          type: "error",
          message: "Failed to update profile. Please try again.",
        })
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="w-full md:max-w-20">
          <SquarePen />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={profile?.email || ""}
              disabled
              placeholder="Email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveChanges}
              disabled={loading === LoadingTypeEnum.PENDING}
            >
              {loading === LoadingTypeEnum.PENDING
                ? "Saving..."
                : "Save Changes"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
