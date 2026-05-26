export const getInputClassName = (hasError: boolean) =>
  `w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2 ${
    hasError
      ? "border-red-400 bg-red-50 text-red-900 focus:border-red-500 focus:ring-red-200"
      : "border-slate-200 bg-white text-slate-900 focus:border-indigo-500 focus:ring-indigo-200"
  }`;
