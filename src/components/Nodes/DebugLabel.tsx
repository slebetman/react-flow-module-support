import { FC, memo } from "react";

const DEBUG = typeof(sessionStorage) !== 'undefined' ?
	sessionStorage.getItem('DEBUG') : false;

type DebugLabelProps = {
	id: string;
}

const DebugLabel:FC<DebugLabelProps> = ({id}) => {
	if (DEBUG) {	
		return <div
			style={{
				fontSize: '4px',
				position: 'absolute',
				marginLeft: '12px',
				marginTop: '-5px',
			}}
		>
			{id}
		</div>
	}
	else {
		return null;
	}
}

export default memo(DebugLabel);