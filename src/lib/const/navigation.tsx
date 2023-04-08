import { FontAwesomeIcon } from "solid-fontawesome";

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/',
		icon: () => <FontAwesomeIcon icon='fa-solid fa-table' />
	},
	{
		key: 'accounts',
		label: 'Accounts',
		path: '/accounts',
		icon: () => <FontAwesomeIcon icon='fa-solid fa-wallet' />
	},
	{
		key: 'transactions',
		label: 'Transactions',
		path: '/transactions',
		icon: () => <FontAwesomeIcon icon='fa-solid fa-arrow-right-arrow-left' />
	},
	{
		key: 'blocks',
		label: 'Blocks',
		path: '/blocks',
		icon: () => <FontAwesomeIcon icon='fa-solid fa-cubes' />
	},
	{
		key: 'applications',
		label: 'Applications',
		path: '/applications',
		icon: () => <FontAwesomeIcon icon='fa-solid fa-layer-group' />
	},
	{
		key: 'participation',
		label: 'Participation',
		path: '/participation',
		icon: () => <FontAwesomeIcon icon='fa-solid fa-circle-nodes' />
	},
	{
		key: 'ledger',
		label: 'Ledger',
		path: '/ledger',
		icon: () => <FontAwesomeIcon icon='fa-solid fa-mobile' />
	},
	{
		key: 'catchup',
		label: 'Cathup',
		path: '/catchup',
		icon: () => <FontAwesomeIcon icon='fa-solid fa-forward-fast' />
	},
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: () => <FontAwesomeIcon icon='fa-solid fa-gear' />
	},
]