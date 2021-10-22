export function getStrapiURL(path = '', type = '') {
  // To access localhost from docker container, we need to replace localhost/127.0.0.1
  // with 'host.docker.internal', however we don't want to use this URL for media/image
  // queries as these are run from the clients browser, which knows nothing about 'host.docker.internal' URL.
  if (type === 'media') {
    if (process.env.REACT_APP_STRAPI_URL.includes('host.docker.internal')) {
      return `http://localhost:1337${path}`;
    }
  }

  return `${
    process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337'
  }${path}`;
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path) {
  const requestUrl = getStrapiURL(path);
  const response = await fetch(requestUrl);
  const data = await response.json();
  return data;
}
