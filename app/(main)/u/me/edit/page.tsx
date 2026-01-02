"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function EditProfilePage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 실제 프로필 업데이트 로직 구현
    console.log("Profile updated");
    router.push("/accounts/me");
  };

  const handleCancel = () => {
    router.push("/accounts/me");
  };

  return (
    <main className="container mx-auto p-4">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

        <form onSubmit={handleSubmit}>
          <FieldSet>
            <FieldLegend>Profile</FieldLegend>
            <FieldDescription>
              Fill in your profile information.
            </FieldDescription>
            <FieldSeparator />
            <FieldGroup>
              <Field orientation="responsive">
                <FieldContent>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <FieldDescription>
                    Provide your full name for identification
                  </FieldDescription>
                </FieldContent>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  defaultValue="Travel Guru"
                />
              </Field>
              <FieldSeparator />
              <Field orientation="responsive">
                <FieldContent>
                  <FieldLabel htmlFor="bio">Bio</FieldLabel>
                  <FieldDescription>
                    You can write your bio here. Keep it short, preferably under
                    100 characters.
                  </FieldDescription>
                </FieldContent>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  defaultValue="Just a person who loves to travel and explore new places! ✈️🌍"
                  className="min-h-[100px] resize-none sm:min-w-[300px]"
                />
              </Field>
              <FieldSeparator />
              <Field orientation="responsive">
                <Button type="submit">Save Changes</Button>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </Field>
            </FieldGroup>
          </FieldSet>
        </form>
      </div>
    </main>
  );
}
