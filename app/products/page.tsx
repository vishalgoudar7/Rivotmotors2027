import Image from "next/image";
import Link from "next/link";
import modelPro from "@/asset/Model/Pro.png";
import modelSport from "@/asset/Model/Sport_NX100.png";

const products = [
  {
    name: "RIVOT NX100 Sport",
    href: "/products/nx100-sport",
    image: modelSport,
    description: "Sharper performance with a sportier riding experience.",
  },
  {
    name: "RIVOT NX100 Pro",
    href: "/products/nx100-pro",
    image: modelPro,
    description: "Extended range, enhanced features, and refined performance.",
  },
];

export default function Products() {
  return (
    <section className="page">
      <p className="eyebrow">RIVOT MOTORS</p>
      <h1>Our Products</h1>
      <div className="cards">
        {products.map((product) => (
          <article key={product.name}>
            <div className="vehicle small">
              <Image src={product.image} alt={product.name} sizes="(max-width: 800px) 90vw, 360px" />
            </div>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <Link href={product.href} className="text">
              View Product
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
