import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Board = {
    id: Generated<string>;
    user_id: string;
    uid: string;
    created_at: Generated<Timestamp>;
    updated_at: Generated<Timestamp>;
};
export type Post = {
    id: Generated<string>;
    board_id: string;
    upload_id: string;
    title: string;
    summary: string;
    content: string;
    created_at: Generated<Timestamp>;
    updated_at: Generated<Timestamp>;
};
export type Upload = {
    id: Generated<string>;
    board_id: string;
    name: string;
    path: string;
    created_at: Generated<Timestamp>;
    updated_at: Generated<Timestamp>;
};
export type User = {
    id: Generated<string>;
    email: string;
    created_at: Generated<Timestamp>;
    updated_at: Generated<Timestamp>;
};
export type DB = {
    boards: Board;
    posts: Post;
    uploads: Upload;
    users: User;
};
