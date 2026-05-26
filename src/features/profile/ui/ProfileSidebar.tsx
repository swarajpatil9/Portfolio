export default function ProfileSidebar() {
  return (
    <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-500">
          Save status
        </p>
        <h3 className="mt-2 text-xl font-bold text-slate-900">
          Persist profile changes
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Changes are saved to localStorage, so the updated profile is
          immediately reflected across the app.
        </p>
      </section>

      <section className="rounded-3xl bg-slate-900 p-6 text-white shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
          Photo sizes
        </p>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-200">
          <li>Small renders at 64 x 64 pixels</li>
          <li>Medium renders at 96 x 96 pixels</li>
          <li>Large renders at 144 x 144 pixels</li>
          <li>The uploaded image is stored with your profile locally</li>
        </ul>
      </section>
    </aside>
  );
}
