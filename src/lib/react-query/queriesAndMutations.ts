import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { createUserAccount } from "../appwrite/api";
import { INewUser } from "@/types";
import { signInAccount, signOutAccount } from "../appwrite/api";

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};
export const useSingInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};
export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount,
  });
};
