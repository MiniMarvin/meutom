import { redirect } from '@sveltejs/kit';

export function load(event) {
	if (!(event.request.headers.get('host') as string).startsWith('localhost')) {
		redirect(302, '/');
	}
}
