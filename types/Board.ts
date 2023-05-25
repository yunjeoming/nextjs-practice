interface BasicInfo {
  _id: string;
  content: string;
  authorName: string;
  authorEmail: string;
}

export interface Board extends BasicInfo {
  title: string;
  liked: string[];
}

export interface Comment extends BasicInfo {}
