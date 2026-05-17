export interface VideoDirective {
  provider: "youtube";
  id: string;
}

type VideoProviderRenderer = (directive: VideoDirective) => string;

const VIDEO_DIRECTIVE_REGEX = /::video\[[^\]]+\]\s*\{[^}]*\}/g;
const VIDEO_DIRECTIVE_PARSER_REGEX =
  /^::video\[(?<provider>[^\]]+)\]\s*\{(?<props>[^}]*)\}$/;
const ATTRIBUTE_REGEX = /(?<key>[a-zA-Z_][\w-]*)\s*=\s*"(?<value>[^"]*)"/g;

const videoProviderRenderers: Record<
  VideoDirective["provider"],
  VideoProviderRenderer
> = {
  youtube: (directive) => renderYoutubeVideo(directive.id),
};

function parseDirectiveAttributes(rawProps: string): Record<string, string> {
  const attributes: Record<string, string> = {};
  for (const match of rawProps.matchAll(ATTRIBUTE_REGEX)) {
    const key = match.groups?.key;
    const value = match.groups?.value;
    if (!key || value === undefined) {
      continue;
    }
    attributes[key] = value;
  }
  return attributes;
}

export function renderYoutubeVideo(id: string): string {
  return `<iframe width="600" height="315"
  src="https://www.youtube.com/embed/${id}"
  frameborder="0"
  allowfullscreen>
</iframe>`;
}

export function parseVideoDirective(raw: string): VideoDirective | null {
  const trimmedRaw = raw.trim();
  const match = trimmedRaw.match(VIDEO_DIRECTIVE_PARSER_REGEX);
  if (!match?.groups) {
    return null;
  }

  const provider = match.groups.provider.trim();
  if (provider !== "youtube") {
    return null;
  }

  const props = parseDirectiveAttributes(match.groups.props);
  const id = props.id?.trim();
  if (!id) {
    return null;
  }

  return {
    provider: "youtube",
    id,
  };
}

function resolveVideoDirective(directive: VideoDirective): string {
  return videoProviderRenderers[directive.provider](directive);
}

export function transformCustomDirectives(md: string): string {
  return md.replace(VIDEO_DIRECTIVE_REGEX, (rawDirective) => {
    const directive = parseVideoDirective(rawDirective);
    if (!directive) {
      return rawDirective;
    }
    return resolveVideoDirective(directive);
  });
}
