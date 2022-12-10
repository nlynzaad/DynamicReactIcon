import React, { CSSProperties, Suspense, SVGAttributes, lazy } from 'react';
import { IconContext, IconType } from 'react-icons';

const getIcon = async (path: string): Promise<IconType> => {
	const [library, IconComponent] = path.split('/');
	const module = await import(`react-icons/${library.toLowerCase()}/index.esm.js`);
	return module[IconComponent];
};

const errorIcon = async () => {
	const errorIconPath = 'bi/BiError';
	return await getIcon(errorIconPath);
};

interface IProps {
	icon: string;
	color?: string;
	size?: string;
	className?: string;
	style?: CSSProperties;
	attr?: SVGAttributes<SVGElement>;
	fallbackIcon?: string;
	loadingIcon?: JSX.Element | null;
}

const DynamicIcon: React.FC<IProps> = (props) => {
	const { icon, color, size, className, style, attr, fallbackIcon, loadingIcon } = props;

	const defaultIcon = async () => {
		if (!fallbackIcon) return errorIcon();
		return (await getIcon(fallbackIcon)) ?? (await errorIcon());
	};

	const Icon = lazy(async () => {
		try {
			return { default: (await getIcon(icon)) ?? (await defaultIcon()) };
		} catch {
			return { default: await defaultIcon() };
		}
	});

	const value: IconContext = {
		color: color,
		size: size,
		className: className,
		style: style,
		attr: attr,
	};

	return (
		<Suspense fallback={loadingIcon ?? null}>
			<IconContext.Provider value={value}>
				<Icon />
			</IconContext.Provider>
		</Suspense>
	);
};

export default DynamicIcon;
