import Not from 'components/Icons/Not';
import { memo, FC } from 'react';
import { NodeProps, Handle, Position } from 'reactflow';
import DebugLabel from './DebugLabel';
import { getEditorContext } from 'lib/editorContext';

const NotGate: FC<NodeProps> = ({ id, selected, data }) => {
	const ctx = getEditorContext();

	return (
		<>
			<DebugLabel id={id} />
			<Handle
				type='target'
				id='a'
				position={Position.Left}
				style={{ top: '10px' }}
			/>
			<div
				style={{
					filter: data?.on && ctx.glow ? 'drop-shadow(0 0 5px #ff0)'
						: 'none',
				}}
			>
				<Not selected={selected} />
			</div>
			<Handle
				type='source'
				id='c'
				position={Position.Right}
				style={{ top: '10px' }}
			/>
		</>
	);
};

export default memo(NotGate);
