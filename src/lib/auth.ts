import { cookies } from 'next/headers';

export async function getUserFromApi() {
	const cookieStore = await cookies();
	const token = cookieStore.get('authToken')?.value;

	if (!token) return null;

	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-user`, {
			headers: { Authorization: `Bearer ${token}` },
			cache: 'no-store'
		});
		if (!res.ok) return null;

		return await res.json();
	} catch {
		return null;
	}
}
