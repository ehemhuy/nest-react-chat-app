export type ConversationType = {
    id: string,
    from: string,
    to: string,
    latestMessage: string,
    hasRead: boolean,
    sentTime: Date,
    avatarUrl: string
}