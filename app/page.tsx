import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full  after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3  sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <Image
          src="/furnitut.svg"
          alt="Furnitut Logo"
          width={180}
          height={37}
          priority
        />
      </div>
    </main>
  );
}
