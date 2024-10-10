import { ReactNode, SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IInput {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label: string;
  name: string;
  disabled?: boolean;
  clearable?: boolean;
  placeholder?: string;
  defaultValue?: string;
  endContent?: ReactNode;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  profilePicture?: string;
  bio?: string;
  followers: string[];
  following: string[];
  premiumPostsPurchased: string[];
  isBlocked: boolean;
}

export interface IPost {
  _id: string;
  author: IUser;
  title: string;
  content: string;
  category: string;
  isPremium: number;
  upvotes: string[];
  downvotes: string[];
  images: string[];
  comments: { author: IUser; content: string }[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}
