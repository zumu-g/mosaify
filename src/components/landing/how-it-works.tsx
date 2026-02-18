const steps = [
  {
    step: '1',
    title: 'Upload Your Photo',
    description: 'Drop any JPG, PNG, or WebP image up to 10MB.',
  },
  {
    step: '2',
    title: 'Choose a Style',
    description: 'Pick from Pixel Grid, Circle, Hexagon, or Diamond mosaics.',
  },
  {
    step: '3',
    title: 'Download',
    description: 'Preview for free, then purchase and download your high-res mosaic.',
  },
];

export function HowItWorks() {
  return (
    <section className="bg-gray-50 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          How It Works
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.step} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-lg font-bold text-brand-700">
                {s.step}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
