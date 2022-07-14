/**
 *
 * @param {String} path string of the pathname
 * @param {Object} params Optional - Object key/value pairs of query paremeters
 * @param {String} hostname Optional - if you want to change the hostname
 * @returns String of the completed URL
 */
 export default function (path: string, params?: {[key: string]: string}, hostname?: string): string {
	// check if Window Object exists
	if (typeof window === "undefined") {
		return "";
	}
	// create URL instance with current protocol and hostname
	const url = new URL(
		`${window.location.protocol}//${
			hostname ? hostname : window.location.hostname
		}`
	);
	// add pathname and query params to instance
	url.pathname = path;
	if (params) {
		Object.keys(params).map((key) => {
			url.searchParams.append(key, params[key]);
		});
	}
	// return complete string of URL
	return url.href;
}
