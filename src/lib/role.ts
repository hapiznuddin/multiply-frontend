export function getDashboardRoute(role: string) {
	switch (role) {
		case 'teacher': return '/dashboard';
		default: return '/login';
	}
}
