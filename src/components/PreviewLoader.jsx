// src/components/PreviewLoader.jsx
import React, { useEffect, useState } from "react";
import { readProfileFromHash } from "../utils/shareUrl";

function LinkRow({ link }) {
  return (
    <div className="py-2">
      <a
        className="text-indigo-600 underline"
        href={link.url}
        target="_blank"
        rel="noreferrer"
      >
        {link.title || link.url}
      </a>
    </div>
  );
}

export default function PreviewLoader({ fallbackProfile = null }) {
  const [sharedProfile, setSharedProfile] = useState(null);

  useEffect(() => {
    const load = () => {
      const p = readProfileFromHash();
      if (p) setSharedProfile(p);
      else setSharedProfile(null);
    };

    load();
    // also update if the hash changes while the page is open
    window.addEventListener("hashchange", load);
    return () => window.removeEventListener("hashchange", load);
  }, []);

  const profile = sharedProfile || fallbackProfile;

  if (!profile) {
    return (
      <div className="p-6 text-center text-sm text-gray-500">
        No shared preview found. Create one with Share.
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-4 mb-4">
        {profile.avatar ? (
          <img
            className="w-14 h-14 rounded-full object-cover"
            src={profile.avatar}
            alt="avatar"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            {profile.firstName?.[0] || "U"}
          </div>
        )}
        <div>
          <div className="text-lg font-semibold">
            {profile.firstName} {profile.lastName}
          </div>
          {profile.bio && (
            <div className="text-sm text-gray-500">{profile.bio}</div>
          )}
        </div>
      </div>

      <div>
        {(profile.links || []).length === 0 ? (
          <div className="text-sm text-gray-500">No links yet</div>
        ) : (
          profile.links.map((l, i) => <LinkRow key={i} link={l} />)
        )}
      </div>
    </div>
  );
}
