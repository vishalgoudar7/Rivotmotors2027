import Image from "next/image";
import Link from "next/link";
import { ModelComparison } from "@/components/ModelComparison";
import { ProductFeatureSections } from "@/components/ProductFeatureSections";
import { BackToTopButton } from "@/components/BackToTopButton";
import modelPro from "@/asset/Model/Pro.png";
import modelSport from "@/asset/Model/Sport_NX100.png";
import { modelComparisonModels, modelComparisonRows } from "@/data/modelComparison";
import "./products.css";

const products = [
  {
    name: "RIVOT NX100 Pro",
    href: "/products/nx100-pro",
    image: modelPro,
    description: "Extended range, enhanced features, and refined performance.",
  },
  {
    name: "RIVOT NX100 Sport",
    href: "/products/nx100-sport",
    image: modelSport,
    description: "Sharper performance with a sportier riding experience.",
  },
];

export default function Products() {
  return (
    <>
      <section className="rivotProductsPage">
        <div className="rivotProductsShell">
          <div className="rivotProductsIntro">
            <p>RIVOT MOTORS</p>
            <h1>Our Products</h1>
          </div>
          <div className="rivotProductsGrid">
            {products.map((product, index) => (
              <article className="rivotProductsCard" key={product.name}>
                <div className="rivotProductsVisual">
                  <Image src={product.image} alt={product.name} fill priority={index === 0} sizes="(max-width: 760px) calc(100vw - 56px), (max-width: 1440px) 44vw, 650px" />
                </div>
                <div className="rivotProductsCopy">
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <Link href={product.href}>
                    View Product <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ModelComparison rows={modelComparisonRows} models={modelComparisonModels} />

      <ProductFeatureSections />

      <BackToTopButton />
    </>
  );
}
