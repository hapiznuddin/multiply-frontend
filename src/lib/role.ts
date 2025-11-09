export function getDashboardRoute(role: string) {
	switch (role) {
		case 'teacher': return '/teacher';
		case 'user': return '/dashboard';
		default: return '/login';
	}
}
