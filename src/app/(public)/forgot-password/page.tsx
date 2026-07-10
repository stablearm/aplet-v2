"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Call forgot-password API endpoint when available
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4" dir="rtl">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-xl">A</div>
          </div>
          <CardTitle className="text-2xl">بازیابی رمز عبور</CardTitle>
          <CardDescription>ایمیل خود را وارد کنید تا لینک بازیابی ارسال شود.</CardDescription>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="text-center space-y-4">
              <div className="rounded-md bg-success/10 p-3 text-sm text-success">
                لینک بازیابی رمز عبور به ایمیل شما ارسال شد.
              </div>
              <Link href="/login">
                <Button variant="outline" className="w-full">بازگشت به ورود</Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">ایمیل</label>
                <Input type="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full">ارسال لینک بازیابی</Button>
              <div className="text-center text-sm text-muted-foreground">
                <Link href="/login" className="text-primary hover:underline">بازگشت به ورود</Link>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
