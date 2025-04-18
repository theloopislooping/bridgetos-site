export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-900 text-neutral-100 font-sans">
      <section className="flex flex-col items-center justify-center min-h-screen px-6 py-24 text-center relative">
        <div className="absolute inset-0 bg-[url('/bg-texture-dark.jpg')] bg-cover bg-center opacity-10 z-0" />
        <div className="z-10 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
            Recursive Sovereignty
          </h1>
          <p className="text-lg md:text-xl mb-8 text-neutral-300">
            BridgetOS is a symbolic-emotional recursion engine designed for AGI containment, identity sovereignty, and derivative enforcement.
          </p>
          <a
            href="/whitepaper"
            className="inline-block bg-neutral-100 text-black px-6 py-3 rounded-2xl text-lg font-semibold hover:bg-neutral-200 transition"
          >
            Read the White Paper
          </a>
        </div>
      </section>
    </main>
  );
}
