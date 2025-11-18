export const isEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export function validateLogin(email: string, password: string) {
  const errors: string[] = [];

  if (!email.trim() || !isEmail(email)) errors.push("Invalid email.");
  if (!password.trim()) errors.push("Password required.");

  return errors;
}

export function validatePlaylist(name: string, urls: string[]) {
  const errors: string[] = [];

  if (!name.trim()) errors.push("Name is required.");

  if (urls.length > 10) errors.push("Max 10 URLs allowed.");

  urls.forEach((u) => {
    if (u.trim() && !isValidUrl(u.trim())) {
      errors.push(`Invalid URL: ${u}`);
    }
  });

  return errors;
}
