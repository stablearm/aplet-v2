"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword) {
      // TODO: Call reset-password API endpoint with token when available
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4" dir="rtl">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-xl">A</div>
          </div>
          <CardTitle className="text-2xl">رمز عبور جدید</CardTitle>
          <CardDescription>رمز عبور جدید خود را وارد کنید.</CardDescription>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="text-center space-y-4">
              <div className="rounded-md bg-success/10 p-3 text-sm text-success">
                رمز عبور با موفقیت تغییر کرد.
              </div>
              <Link href="/login">
                <Button className="w-full">ورود</Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">رمز عبور جدید</label>
                <Input type="password" placeholder="حداقل ۸ کاراکتر" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">تکرار رمز عبور</label>
                <Input type="password" placeholder="تکرار رمز عبور" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full" disabled={password !== confirmPassword || password.length < 8}>ذخیره رمز عبور</Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
