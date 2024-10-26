export interface IGitHubUser {
  avatar_url: string;
  name: string;
  login: string;
}

export async function fetchGitHubUser(
  username: string
): Promise<IGitHubUser | null> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) throw new Error("Failed to fetch user data");
    const data: IGitHubUser = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data from GitHub:", error);
    return null;
  }
}
