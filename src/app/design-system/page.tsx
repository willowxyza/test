"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function DesignSystemPage() {
  const [activeTab, setActiveTab] = useState<"tokens" | "components">("tokens");

  return (
    <div className="min-h-screen bg-[var(--color-background-default-default)] text-[var(--color-text-default-default)] p-[var(--spacing-800)] flex flex-col gap-[var(--spacing-800)] font-sans">
      <div className="flex flex-col gap-[var(--spacing-200)]">
        <h1 className="text-[length:var(--sds-typography-title-page-size-base,48px)] font-bold tracking-tight">Design System Showcase</h1>
        <p className="text-[length:var(--text-body-size-medium)] text-[var(--color-text-default-secondary)]">
          디자인 토큰과 UI 컴포넌트를 한눈에 확인하고 코드를 복사해 사용할 수 있습니다.
        </p>
      </div>

      <div className="flex gap-[var(--spacing-200)] border-b border-[var(--color-border-default-default)] pb-[var(--spacing-200)]">
        <Button 
          variant={activeTab === "tokens" ? "primary" : "subtle"} 
          onClick={() => setActiveTab("tokens")}
        >
          토큰 (Tokens)
        </Button>
        <Button 
          variant={activeTab === "components" ? "primary" : "subtle"} 
          onClick={() => setActiveTab("components")}
        >
          컴포넌트 (Components)
        </Button>
      </div>

      {activeTab === "tokens" && (
        <div className="flex flex-col gap-[var(--spacing-800)]">
          {/* Colors */}
          <section className="flex flex-col gap-[var(--spacing-400)]">
            <h2 className="text-[length:var(--text-heading-base,24px)] font-semibold border-b border-[var(--color-border-default-default)] pb-[var(--spacing-200)]">Colors</h2>
            
            <div className="flex flex-col gap-[var(--spacing-200)]">
              <h3 className="text-[length:var(--text-body-size-medium)] font-medium">Primitive Colors</h3>
              <div className="flex flex-wrap gap-[var(--spacing-400)]">
                <ColorSwatch name="white" color="#ffffff" />
                <ColorSwatch name="black" color="#000000" />
                <ColorSwatch name="gray-500" color="#767676" />
                <ColorSwatch name="green-500" color="#14ae5c" />
                <ColorSwatch name="amber-500" color="#e5a000" />
                <ColorSwatch name="red-500" color="#ec221f" />
              </div>
            </div>

            <div className="flex flex-col gap-[var(--spacing-200)]">
              <h3 className="text-[length:var(--text-body-size-medium)] font-medium">Semantic (Brand & Neutral)</h3>
              <div className="flex flex-wrap gap-[var(--spacing-400)]">
                <ColorSwatch name="brand-default" color="var(--color-background-brand-default)" />
                <ColorSwatch name="neutral-tertiary" color="var(--color-background-neutral-tertiary)" />
                <ColorSwatch name="default-secondary" color="var(--color-background-default-secondary)" />
              </div>
            </div>

            <div className="flex flex-col gap-[var(--spacing-200)]">
              <h3 className="text-[length:var(--text-body-size-medium)] font-medium">Semantic (Feedback)</h3>
              <div className="flex flex-wrap gap-[var(--spacing-400)]">
                <ColorSwatch name="positive-default" color="var(--color-background-positive-default)" />
                <ColorSwatch name="warning-default" color="var(--color-background-warning-default)" />
                <ColorSwatch name="danger-default" color="var(--color-background-danger-default)" />
              </div>
            </div>
          </section>

          {/* Typography */}
          <section className="flex flex-col gap-[var(--spacing-400)]">
            <h2 className="text-[length:var(--text-heading-base,24px)] font-semibold border-b border-[var(--color-border-default-default)] pb-[var(--spacing-200)]">Typography</h2>
            <div className="flex flex-col gap-[var(--spacing-400)]">
              <div className="flex items-baseline gap-[var(--spacing-400)]">
                <span className="w-[120px] text-[var(--color-text-default-secondary)] text-[length:var(--text-body-size-small)]">Title Page</span>
                <span className="text-[length:var(--sds-typography-title-page-size-base,48px)] font-bold">The quick brown fox</span>
              </div>
              <div className="flex items-baseline gap-[var(--spacing-400)]">
                <span className="w-[120px] text-[var(--color-text-default-secondary)] text-[length:var(--text-body-size-small)]">Subtitle</span>
                <span className="text-[length:var(--sds-typography-subtitle-size-base,32px)] font-normal">The quick brown fox</span>
              </div>
              <div className="flex items-baseline gap-[var(--spacing-400)]">
                <span className="w-[120px] text-[var(--color-text-default-secondary)] text-[length:var(--text-body-size-small)]">Heading</span>
                <span className="text-[length:var(--text-heading-base,24px)] font-semibold">The quick brown fox</span>
              </div>
              <div className="flex items-baseline gap-[var(--spacing-400)]">
                <span className="w-[120px] text-[var(--color-text-default-secondary)] text-[length:var(--text-body-size-small)]">Body Base</span>
                <span className="text-[length:var(--text-body-size-medium)] font-normal">The quick brown fox jumps over the lazy dog</span>
              </div>
              <div className="flex items-baseline gap-[var(--spacing-400)]">
                <span className="w-[120px] text-[var(--color-text-default-secondary)] text-[length:var(--text-body-size-small)]">Body Small</span>
                <span className="text-[length:var(--text-body-size-small)] font-normal">The quick brown fox jumps over the lazy dog</span>
              </div>
            </div>
          </section>

          {/* Spacing */}
          <section className="flex flex-col gap-[var(--spacing-400)]">
            <h2 className="text-[length:var(--text-heading-base,24px)] font-semibold border-b border-[var(--color-border-default-default)] pb-[var(--spacing-200)]">Spacing</h2>
            <div className="flex flex-col gap-[var(--spacing-200)]">
              {[
                { name: "space-100", size: "4px" },
                { name: "space-200", size: "8px" },
                { name: "space-300", size: "12px" },
                { name: "space-400", size: "16px" },
                { name: "space-600", size: "24px" },
                { name: "space-800", size: "32px" },
                { name: "space-1600", size: "64px" },
              ].map((space) => (
                <div key={space.name} className="flex items-center gap-[var(--spacing-400)]">
                  <span className="w-[120px] text-[var(--color-text-default-secondary)] text-[length:var(--text-body-size-small)] font-mono">{space.name}</span>
                  <div className="bg-[var(--color-background-brand-default)] rounded-[var(--radius-100)]" style={{ width: space.size, height: "16px" }} />
                  <span className="text-[length:var(--text-body-size-small)] text-[var(--color-text-default-secondary)]">{space.size}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {activeTab === "components" && (
        <div className="flex flex-col gap-[var(--spacing-800)]">
          {/* Buttons */}
          <section className="flex flex-col gap-[var(--spacing-400)]">
            <h2 className="text-[length:var(--text-heading-base,24px)] font-semibold border-b border-[var(--color-border-default-default)] pb-[var(--spacing-200)]">Buttons</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--spacing-400)]">
              <ComponentPreview title="Variants (Medium)" code={`<Button variant="primary">Primary</Button>\n<Button variant="neutral">Neutral</Button>\n<Button variant="subtle">Subtle</Button>\n<Button variant="danger">Danger</Button>`}>
                <div className="flex flex-wrap gap-[var(--spacing-200)]">
                  <Button variant="primary">Primary</Button>
                  <Button variant="neutral">Neutral</Button>
                  <Button variant="subtle">Subtle</Button>
                  <Button variant="danger">Danger</Button>
                </div>
              </ComponentPreview>

              <ComponentPreview title="Sizes (Primary)" code={`<Button size="small">Small</Button>\n<Button size="medium">Medium</Button>`}>
                <div className="flex flex-wrap items-center gap-[var(--spacing-200)]">
                  <Button size="small">Small</Button>
                  <Button size="medium">Medium</Button>
                </div>
              </ComponentPreview>
            </div>
          </section>

          {/* Inputs */}
          <section className="flex flex-col gap-[var(--spacing-400)]">
            <h2 className="text-[length:var(--text-heading-base,24px)] font-semibold border-b border-[var(--color-border-default-default)] pb-[var(--spacing-200)]">Inputs</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--spacing-400)]">
              <ComponentPreview title="States" code={`<Input placeholder="Default Input" />\n<Input hasError placeholder="Error Input" />\n<Input disabled placeholder="Disabled Input" />`}>
                <div className="flex flex-col gap-[var(--spacing-400)] w-full max-w-[300px]">
                  <Input placeholder="Default Input" />
                  <Input hasError placeholder="Error Input" />
                  <Input disabled placeholder="Disabled Input" />
                </div>
              </ComponentPreview>

              <ComponentPreview title="Sizes" code={`<Input size="small" placeholder="Small Input" />\n<Input size="medium" placeholder="Medium Input" />`}>
                <div className="flex flex-col gap-[var(--spacing-400)] w-full max-w-[300px]">
                  <Input size="small" placeholder="Small Input" />
                  <Input size="medium" placeholder="Medium Input" />
                </div>
              </ComponentPreview>
            </div>
          </section>

          {/* Cards */}
          <section className="flex flex-col gap-[var(--spacing-400)]">
            <h2 className="text-[length:var(--text-heading-base,24px)] font-semibold border-b border-[var(--color-border-default-default)] pb-[var(--spacing-200)]">Cards</h2>
            
            <ComponentPreview title="Card Layout" code={`<Card>\n  <CardHeader>\n    <CardTitle>Card Title</CardTitle>\n    <CardDescription>Card Description</CardDescription>\n  </CardHeader>\n  <CardContent>\n    <p>Card Content area</p>\n  </CardContent>\n</Card>`}>
              <div className="flex flex-col lg:flex-row gap-[var(--spacing-400)]">
                <Card className="w-[300px]">
                  <CardHeader>
                    <CardTitle>4,000+</CardTitle>
                    <CardDescription>커뮤니티 멤버</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-[length:var(--text-body-size-small)]">
                      이 카드는 Tokens와 Component를 활용하여 재구성되었습니다.
                    </div>
                  </CardContent>
                </Card>

                <Card size="small" className="w-[157px]">
                  <div className="flex flex-col gap-[6px] items-center justify-center">
                    <span className="font-bold text-[20px]">10년+</span>
                    <span className="text-[length:var(--text-body-size-small)] text-[var(--color-text-default-secondary)]">디자인 실무 경력</span>
                  </div>
                </Card>
              </div>
            </ComponentPreview>
          </section>
        </div>
      )}
    </div>
  );
}

// ------------------------
// Helpers
// ------------------------

function ColorSwatch({ color, name }: { color: string; name: string }) {
  return (
    <div className="flex flex-col gap-[var(--spacing-100)] w-[120px]">
      <div 
        className="h-[80px] rounded-[var(--radius-200)] border border-[var(--color-border-default-default)] shadow-[var(--sds-size-depth-025)]"
        style={{ backgroundColor: color }}
      />
      <span className="text-[length:var(--text-body-size-small)] font-mono">{name}</span>
    </div>
  );
}

function ComponentPreview({ title, children, code }: { title: string; children: React.ReactNode; code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col rounded-[var(--radius-200)] border border-[var(--color-border-default-default)] overflow-hidden">
      <div className="bg-[var(--color-background-default-secondary)] px-[var(--spacing-400)] py-[var(--spacing-200)] border-b border-[var(--color-border-default-default)] flex justify-between items-center">
        <span className="font-medium text-[length:var(--text-body-size-small)]">{title}</span>
        <Button size="small" variant="neutral" onClick={handleCopy}>
          {copied ? "Copied!" : "Copy Code"}
        </Button>
      </div>
      <div className="p-[var(--spacing-400)] flex items-center justify-center bg-[var(--color-background-default-default)] min-h-[150px]">
        {children}
      </div>
    </div>
  );
}
