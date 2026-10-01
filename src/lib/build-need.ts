/** Answers to "What do you need?" on the free build consult forms. Plain module so server routes can use it. */

export type Need = '' | 'new' | 'rebuild' | 'tone';

export const NEED_LABEL: Record<string, string> = {
  new: 'New custom board',
  rebuild: 'Rebuild of their current board',
};
