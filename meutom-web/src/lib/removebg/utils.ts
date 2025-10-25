import { browser } from '$app/environment';

/**
 * Checks if the current device is likely a mobile device based on user agent.
 */
export function isMobileDevice(): boolean {
	if (!browser) return false;
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
