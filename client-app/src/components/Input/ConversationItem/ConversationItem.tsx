import React from 'react';
import { BaseProps } from '../../../interfaces/baseProps';
import { ConversationType } from '../../../types/conversation';

interface ConversationItemProps extends BaseProps {
	conversationData: ConversationType;
	onClickRow: React.MouseEventHandler<HTMLDivElement> | undefined;
}

function ConversationItem(props: ConversationItemProps) {
	const { conversationData, onClickRow } = props;
	return (
		<div
			className={`conversation-item flex items-center gap-2 w-full cursor-pointer p-3 ${
				!conversationData.hasRead ? 'bg-slate-100' : 'bg-white'
			}`}
			onClick={onClickRow}
		>
			<div className='avatar h-9 w-9 rounded-full'>
				<img src={conversationData.avatarUrl} alt='---' />
			</div>
			<div>
				<div className='flex items-center justify-between'>
					<div className='font-bold'>{conversationData.from}</div>
					<div className='text-slate-500 text-xs'>
						{conversationData.sentTime.getHours() +
							'/' +
							conversationData.sentTime.getMinutes()}
					</div>
				</div>
				<div className='flex items-center justify-between'>
					<div className='text-slate-500 text-xs'>{conversationData.latestMessage}</div>
					{!conversationData.hasRead && (
						<div className='h-2 w-2 rounded-full bg-blue-600'></div>
					)}
				</div>
			</div>
		</div>
	);
}

export default ConversationItem;
