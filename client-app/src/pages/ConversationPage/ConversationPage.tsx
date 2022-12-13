import React from 'react';
import ConversationItem from '../../components/Input/ConversationItem/ConversationItem';
import { ConversationType } from '../../types/conversation';

const conversationsFake: ConversationType[] = [
	{
		id: '1',
		from: 'my',
		to: 'huy',
		latestMessage: 'my xin chao huy',
		hasRead: false,
		sentTime: new Date(),
		avatarUrl: 'https://docs.nestjs.com/assets/logo-small.svg',
	},
	{
		id: '2',
		from: 'ngat',
		to: 'huy',
		latestMessage: 'ngat xin chao huy',
		hasRead: true,
		sentTime: new Date(),
		avatarUrl: 'https://docs.nestjs.com/assets/logo-small.svg',
	},
	{
		id: '3',
		from: 'trang',
		to: 'huy',
		latestMessage: 'trang xin chao huy',
		hasRead: true,
		sentTime: new Date(),
		avatarUrl: 'https://docs.nestjs.com/assets/logo-small.svg',
	},
];

function ConversationPage() {
	return (
		<div className='conversation-page flex flex-col'>
			{conversationsFake.map((c) => (
				<React.Fragment key={c.id}>
					<ConversationItem conversationData={c} onClickRow={undefined} />
				</React.Fragment>
			))}
		</div>
	);
}

export default ConversationPage;
