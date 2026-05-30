const OWNER = "SongMihyun";
const REPO = "KakaoCampaignSender";
const RELEASE_BASE_URL = `https://github.com/${OWNER}/${REPO}/releases/latest/download/`;
const LATEST_JSON_URL = `${RELEASE_BASE_URL}latest.json`;
const LATEST_RELEASE_API_URL = `https://api.github.com/repos/${OWNER}/${REPO}/releases/latest`;

const EXE_PATTERN = /\.exe(?:$|[?#])/i;
let latestReleasePromise = null;

function isExeUrl(value) {
  return typeof value === "string" && EXE_PATTERN.test(value);
}

function toDownloadUrl(value, releaseBaseUrl = RELEASE_BASE_URL) {
  if (typeof value !== "string" || value.trim() === "") {
    return "";
  }

  try {
    return new URL(value.trim(), releaseBaseUrl).href;
  } catch {
    return "";
  }
}

function getFileName(url) {
  try {
    return decodeURIComponent(new URL(url).pathname.split("/").pop() || "");
  } catch {
    return "";
  }
}

function firstExeFromList(items = [], releaseBaseUrl = RELEASE_BASE_URL) {
  for (const item of items) {
    const candidates = [
      item?.browser_download_url,
      item?.downloadUrl,
      item?.download_url,
      item?.url,
      item?.path,
      item?.name,
    ];

    const match = candidates
      .map((value) => toDownloadUrl(value, releaseBaseUrl))
      .find(isExeUrl);
    if (match) {
      return match;
    }
  }

  return "";
}

function parseLatestJson(data, releaseBaseUrl = RELEASE_BASE_URL) {
  const directUrl = [
    data?.downloadUrl,
    data?.download_url,
    data?.browser_download_url,
    data?.url,
    data?.path,
  ]
    .map((value) => toDownloadUrl(value, releaseBaseUrl))
    .find(isExeUrl);

  const downloadUrl =
    directUrl ||
    firstExeFromList(data?.files, releaseBaseUrl) ||
    firstExeFromList(data?.assets, releaseBaseUrl);

  if (!downloadUrl) {
    throw new Error("latest.json에서 Windows exe 설치파일을 찾지 못했습니다.");
  }

  return {
    version: data.version || data.tag_name || data.name || "",
    publishedAt: data.published_at || data.publishedAt || "",
    downloadUrl,
    fileName: data.fileName || data.name || getFileName(downloadUrl),
  };
}

async function fetchJson(url, accept = "application/json") {
  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      Accept: accept,
    },
  });

  if (!response.ok) {
    throw new Error(`${url} 요청에 실패했습니다. (${response.status})`);
  }

  return response.json();
}

function getReleaseDownloadBaseUrl(release) {
  return `https://github.com/${OWNER}/${REPO}/releases/download/${release.tag_name}/`;
}

function findAsset(release, assetName) {
  return release.assets?.find((asset) => asset.name?.toLowerCase() === assetName);
}

async function fetchLatestJsonFromAsset(release) {
  const latestJsonAsset = findAsset(release, "latest.json");

  if (!latestJsonAsset) {
    throw new Error("최신 릴리즈에 latest.json이 없습니다.");
  }

  const data = await fetchJson(
    latestJsonAsset.url,
    "application/octet-stream"
  );

  return parseLatestJson(data, getReleaseDownloadBaseUrl(release));
}

function parseReleaseApi(release) {
  const downloadUrl = firstExeFromList(release.assets);

  if (!downloadUrl) {
    throw new Error("최신 GitHub 릴리즈에서 Windows exe 설치파일을 찾지 못했습니다.");
  }

  return {
    version: release.tag_name || release.name || "",
    publishedAt: release.published_at || "",
    downloadUrl,
    fileName: getFileName(downloadUrl),
  };
}

async function loadLatestRelease() {
  const release = await fetchJson(LATEST_RELEASE_API_URL);

  try {
    return await fetchLatestJsonFromAsset(release);
  } catch (assetJsonError) {
    console.warn("릴리즈 asset latest.json을 읽지 못했습니다.", assetJsonError);
  }

  try {
    return parseLatestJson(
      await fetchJson(LATEST_JSON_URL),
      getReleaseDownloadBaseUrl(release)
    );
  } catch (latestJsonError) {
    console.warn("latest.json을 읽지 못해 GitHub 릴리즈 API로 대체합니다.", latestJsonError);
    return parseReleaseApi(release);
  }
}

export function formatVersionLabel(version, suffix = "베타") {
  if (!version) {
    return "최신 버전";
  }

  const normalizedVersion = version.startsWith("v") ? version : `v${version}`;
  return suffix ? `${normalizedVersion} ${suffix}` : normalizedVersion;
}

export async function fetchLatestRelease() {
  latestReleasePromise ??= loadLatestRelease();
  return latestReleasePromise;
}

export async function downloadLatestWindowsVersion() {
  const latest = await fetchLatestRelease();
  window.location.assign(latest.downloadUrl);
}
