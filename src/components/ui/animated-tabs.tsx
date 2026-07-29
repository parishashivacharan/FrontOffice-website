"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface Tab {
  id: string;
  label: string;
  badge?: string | number;
  content: React.ReactNode;
}

export interface AnimatedTabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
  tabListClassName?: string;
  contentClassName?: string;
}

export const AnimatedTabs = ({
  tabs,
  defaultTab,
  className,
  tabListClassName,
  contentClassName,
}: AnimatedTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab || tabs[0]?.id);

  if (!tabs?.length) return null;

  return (
    <div className={cn("w-full flex flex-col gap-y-3", className)}>
      <div
        className={cn(
          "flex gap-2 flex-wrap bg-[#fffaf0] border border-[#e5e5e5] p-1.5 rounded-2xl shadow-xs",
          tabListClassName
        )}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative px-4 py-2 text-xs font-semibold rounded-xl outline-none transition-colors flex items-center gap-2",
                isActive ? "text-white" : "text-[#6a6a6a] hover:text-[#0a0a0a]"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-tab-bg"
                  className="absolute inset-0 bg-[#0a0a0a] rounded-xl shadow-xs"
                  transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={cn(
                    "relative z-10 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider",
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-[#0a0a0a] border border-[#e5e5e5]"
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div
        className={cn(
          "p-5 bg-white border border-[#e5e5e5] rounded-3xl shadow-xs min-h-[300px]",
          contentClassName
        )}
      >
        {tabs.map(
          (tab) =>
            activeTab === tab.id && (
              <motion.div
                key={tab.id}
                initial={{
                  opacity: 0,
                  y: 6,
                  filter: "blur(4px)",
                }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
                transition={{
                  duration: 0.35,
                  ease: "easeInOut",
                }}
              >
                {tab.content}
              </motion.div>
            )
        )}
      </div>
    </div>
  );
};
