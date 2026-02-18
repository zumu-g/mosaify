export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white px-6 py-8">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <p className="text-sm font-semibold text-brand-700">Mosaify</p>
        <p className="text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Mosaify. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
