// src/components/ShareButton.jsx
import React, { useState } from "react";
import {
  buildProfilePayload,
  buildShareUrlFromProfile,
} from "../utils/shareUrl";

export default function ShareButton({ profile }) {
  const [msg, setMsg] = useState("");

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setMsg("Link copied to clipboard ✓");
      setTimeout(() => setMsg(""), 2000);
    } catch (e) {
      console.error("Clipboard error:", e);
      setMsg("Could not copy link");
      setTimeout(() => setMsg(""), 2000);
    }
  };

  const handleShare = async () => {
    // create minimal payload to keep URL short
    const payload = buildProfilePayload(profile);
    const shareUrl = buildShareUrlFromProfile(payload);
    const shareTitle = `${payload.firstName || "Profile"}'s preview`;
    const shareText = `Check out this preview:`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        setMsg("Shared! ✓");
        setTimeout(() => setMsg(""), 2000);
        return;
      } catch (err) {
        // user cancelled or other error - fallback to copy
        console.info("Web Share canceled/failed:", err);
      }
    }

    // fallback
    await copyToClipboard(shareUrl);
  };

  return (
    <div className="inline-flex items-center gap-3">
      <button
        onClick={handleShare}
        className="bg-[#633CFF] hover:bg-[#532DD1] text-white px-4 py-2 rounded"
      >
        Share
      </button>
      {msg && <span className="text-sm text-gray-600">{msg}</span>}
    </div>
  );
}
