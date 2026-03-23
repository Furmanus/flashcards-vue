import { z } from 'zod';

export const FolderNameSchema = {
  name: z.string().min(3).max(128),
};

export const FolderSchema = z.object({
  id: z.uuid(),
  ...FolderNameSchema,
});

export const CreateFolderSchema = z.object({
  ...FolderNameSchema,
});

export const CreateDeckSchema = z.object({
  name: z.string().min(3).max(128),
  description: z.string().min(3).max(1024).optional(),
  folderId: z.union([z.uuid(), z.literal('')]).optional(),
});

export const DeckSchema = z.object({
  id: z.uuid(),
  ...CreateDeckSchema.shape,
});

export const CreateFlashcardSchema = z.object({
  front: z.string().min(3).max(1024),
  back: z.string().min(3).max(8096),
  deckId: z.uuid(),
});

export const FlashcardSchema = z.object({
  ...CreateFlashcardSchema.shape,
  id: z.uuid(),
});
