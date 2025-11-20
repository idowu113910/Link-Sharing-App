// src/utils/shareUrl.js
import LZString from "lz-string"; // if CDN, remove this import and use global LZString

// Pick a minimal shape to include in the share link to keep it small.
// Avoid large binary data (images) — prefer external avatar URLs.
export const buildProfilePayload = (profile) => {
  // only include fields you need in the preview
  return {
    firstName: profile.firstName || "",
    lastName: profile.lastName || "",
    avatar: profile.avatar || "",
    links: (profile.links || []).map((l) => ({ title: l.title, url: l.url })),
    bio: profile.bio || "",
  };
};

export const encodeProfile = (profileObj) => {
  const json = JSON.stringify(profileObj);
  // compress then make URL-safe with encodeURIComponent
  const compressed = LZString.compressToEncodedURIComponent(json);
  return compressed;
};

export const decodeProfile = (encoded) => {
  try {
    const json = LZString.decompressFromEncodedURIComponent(encoded);
    if (!json) return null;
    return JSON.parse(json);
  } catch (err) {
    console.error("Failed to decode profile:", err);
    return null;
  }
};

export const buildShareUrlFromProfile = (profileObj) => {
  const encoded = encodeProfile(profileObj);
  // use hash so it doesn't conflict with router / server
  return `${window.location.origin}${window.location.pathname}#preview=${encoded}`;
};

export const readProfileFromHash = () => {
  const hash = window.location.hash || "";
  const m = hash.match(/preview=([^&]+)/);
  if (!m) return null;
  return decodeProfile(m[1]);
};
