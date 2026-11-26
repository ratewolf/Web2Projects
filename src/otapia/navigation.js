const pageNames = ['dex', 'worldcup', 'notice', 'login', 'register'];

export function readRoute(hash) {
    const [path, query] = hash.replace(/^#\/?/, '').split('?');
    return {
        page: pageNames.includes(path) ? path : 'home',
        params: new URLSearchParams(query),
    };
}

export function pageHref(page, params = {}) {
    const path = page === 'home' ? '' : page;
    const query = new URLSearchParams(params).toString();
    return `#/${path}${query ? `?${query}` : ''}`;
}
