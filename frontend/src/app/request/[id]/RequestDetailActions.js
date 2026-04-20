"use client";

import { useState } from "react";
import Button from "@/components/Button";

/**
 * RequestDetailActions — interactive buttons on the detail page
 */
export default function RequestDetailActions({ isSolved }) {
  const [helped, setHelped] = useState(false);
  const [solved, setSolved] = useState(isSolved);

  return (
    <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-slate-100">
      {!solved && (
        <Button
          variant={helped ? "secondary" : "primary"}
          size="sm"
          onClick={() => setHelped(!helped)}
        >
          {helped ? "✓ You offered help" : "🙋 I Can Help"}
        </Button>
      )}

      <Button
        variant={solved ? "secondary" : "success"}
        size="sm"
        onClick={() => setSolved(!solved)}
      >
        {solved ? "✓ Marked as Solved" : "✅ Mark as Solved"}
      </Button>

      <Button variant="ghost" size="sm">🔗 Share</Button>

      {helped && !solved && (
        <p className="w-full text-xs text-emerald-600 font-medium mt-1">
          The requester has been notified. 🎉
        </p>
      )}
    </div>
  );
}
