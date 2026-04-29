"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";

type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const isFormValid =
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    message.trim().length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setStatus("loading");
    setErrorMsg("");

    const { error } = await supabase.from("contacts").insert({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      // created_at 은 DB 기본값(now())으로 자동 저장
    });

    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
    } else {
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background-default-default)] font-sans flex flex-col items-center py-[var(--spacing-800)] px-[var(--spacing-400)]">
      <div className="w-full max-w-[700px] flex flex-col gap-[var(--spacing-800)]">

        {/* Section Header */}
        <div className="flex flex-col gap-[var(--spacing-200)]">
          <span className="text-[length:var(--text-body-size-medium)] font-semibold text-[var(--color-text-default-default)]">
            Contact
          </span>
          <h1 className="text-[length:var(--sds-typography-subtitle-size-base,32px)] font-bold tracking-tight text-[var(--color-text-default-default)]">
            교육 문의 &amp; 협업
          </h1>
          <p className="text-[length:var(--text-body-size-medium)] text-[var(--color-text-default-secondary)] leading-[1.4]">
            기업 출강, 온라인 강의 협업, 또는 디자인 관련 문의가 있으시면 이메일로 편하게 연락주세요.
          </p>
        </div>

        {/* Success Banner */}
        {status === "success" && (
          <div className="rounded-[var(--border-radius-medium)] bg-[var(--color-background-success-default,#d1fae5)] px-[var(--spacing-400)] py-[var(--spacing-300)] text-[length:var(--text-body-size-medium)] text-[var(--color-text-success-default,#065f46)]">
            ✅ 문의가 성공적으로 제출되었습니다. 빠르게 답변 드리겠습니다!
          </div>
        )}

        {/* Error Banner */}
        {status === "error" && (
          <div className="rounded-[var(--border-radius-medium)] bg-[var(--color-background-danger-default,#fee2e2)] px-[var(--spacing-400)] py-[var(--spacing-300)] text-[length:var(--text-body-size-medium)] text-[var(--color-text-danger-default,#991b1b)]">
            ❌ 제출 실패: {errorMsg}
          </div>
        )}

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-[var(--spacing-400)]">
          <div className="flex flex-col md:flex-row gap-[var(--spacing-400)]">
            {/* Name Field */}
            <div className="flex flex-col gap-[var(--spacing-200)] flex-1">
              <label
                htmlFor="name"
                className="text-[length:var(--text-body-size-medium)] font-[var(--sds-typography-body-font-weight-regular)] text-[var(--color-text-default-default)]"
              >
                이름
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름을 입력하세요"
              />
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-[var(--spacing-200)] flex-1">
              <label
                htmlFor="email"
                className="text-[length:var(--text-body-size-medium)] font-[var(--sds-typography-body-font-weight-regular)] text-[var(--color-text-default-default)]"
              >
                이메일
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력하세요"
              />
            </div>
          </div>

          {/* Message Field */}
          <div className="flex flex-col gap-[var(--spacing-200)]">
            <label
              htmlFor="message"
              className="text-[length:var(--text-body-size-medium)] font-[var(--sds-typography-body-font-weight-regular)] text-[var(--color-text-default-default)]"
            >
              문의 내용
            </label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="문의하실 내용을 입력하세요"
              className="min-h-[120px]"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-[var(--spacing-200)] flex justify-end">
            <Button
              type="submit"
              variant="primary"
              disabled={!isFormValid || status === "loading"}
              className="w-full md:w-auto px-[var(--spacing-800)]"
            >
              {status === "loading" ? "제출 중..." : "제출하기"}
            </Button>
          </div>
        </form>

      </div>
    </div>
  );
}
