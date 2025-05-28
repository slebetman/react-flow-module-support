import { getEditorContext } from 'lib/editorContext';
import { CSSProperties, FC, useEffect, useState } from 'react';
import { Panel } from 'reactflow';

const titleFont: CSSProperties = {
	fontSize: '20px',
};

const titlePanelStyle: CSSProperties = {
	...titleFont,
	backgroundColor: '#ccc',
	padding: '10px',
	borderRadius: '10px',
};

const simSpeed: Record<string, [number, number]> = {
	slower: [1, 100],
	slow: [1, 10],
	normal: [1, 1],
	fast: [19, 0],
	faster: [313, 0],
	turbo: [1913, 0],
};

type SpeedType = keyof typeof simSpeed;

export const StatusPanel: FC = () => {
	const [speed, setSpeed] = useState<SpeedType>('normal');
	const [glow, setGlow] = useState(false);
	const ctx = getEditorContext();

	useEffect(() => {
		setSpeed('normal');
	}, [ctx.sim]);

	useEffect(() => {
		ctx.sim?.setSpeed(...simSpeed[speed]);
	}, [speed]);

	useEffect(() => {
		ctx.setGlow?.(glow);
	}, [glow]);

	return (
		<>
			{ctx.sim ?
				<Panel position='top-center' style={titlePanelStyle}>
					Simulation running..
					{ctx.mode === 'module' ?
						<span style={{ marginLeft: '10px' }}>
							Module: {ctx.currentModule?.[0]?.label}
						</span>
					:	<div
							style={{
								fontSize: '12px',
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
							}}
						>
							speed:
							<select
								style={{
									marginLeft: '4px',
									marginRight: '10px',
								}}
								onChange={(e) =>
									setSpeed(e.currentTarget.value as SpeedType)
								}
								value={speed}
							>
								{Object.keys(simSpeed).map((s, i) => (
									<option key={`${s}${i}`} value={s}>
										{s}
									</option>
								))}
							</select>
							glow:
							<input
								type='checkbox'
								checked={glow}
								onChange={(e) =>
									setGlow(e.currentTarget.checked)
								}
							/>
						</div>
					}
				</Panel>
			: ctx.mode === 'module' ?
				<Panel position='top-center' style={titlePanelStyle}>
					<span style={{ marginRight: '5px' }}>Edit Module:</span>
					<input
						style={{
							...titleFont,
							padding: '5px 10px',
							borderRadius: '5px',
							border: '1px solid #999',
						}}
						type='text'
						value={ctx.currentModule?.[0]?.label}
						onChange={(e) => {
							const val = e.currentTarget?.value;

							if (val !== undefined) {
								ctx.setCurrentModule?.((prevModule) => {
									if (prevModule.length) {
										prevModule[0] = {
											...prevModule[0],
											label: val,
										};
									}
									return [...prevModule];
								});
							}
						}}
					/>
				</Panel>
			:	''}
		</>
	);
};
