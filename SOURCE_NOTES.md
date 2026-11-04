# Image sources and treatment

The storefront uses 83 sourced product images, not a verified inventory of 83 unique SKUs. A photographed color, wash, or coordinated look is a separate catalog entry. The user accepted 83 and requested further work focus on design. Availability, sizes, fabric composition, and official product names remain unverified.

- 41 original still images from Space's product highlights (4 base photos plus 37 imports).
- 37 retouched product video frames from the Winter Sale highlight are included. Each has a transcribed price in `sale-products.json`; original frames are retained under `raw-frames` for comparison. Additional unused source frames remain outside the public catalog. These are historical highlight prices, not a live inventory feed.
- 5 product reel-cover photos from the same account fill the shortfall after the available highlight imagery was exhausted. Their exact post URLs are preserved with each record and in `scripts/additional-source-photos.json`. These covers were already observed on the account's rendered profile before download. No price overlays were present on them.

The 41 still images were visually reviewed and had no visible price overlay. Included video frames were individually edited with the built-in image editing tool to remove Instagram interface and price overlays. Garments, colors, pose and the central scene were constrained to remain faithful; obscured pixels are reconstructed. These are retouched video frames, not untouched original product photographs. Root prompt/output records are in `review/retouch-root.json` and `review/retouch-batch-25-30.json`. Delivery copies are compressed JPEGs; original generated PNGs are retained in `source-assets/retouched` with matching `sale-NN` filenames.

At the user's request, products without visible source prices receive explicitly labeled approximate prices. Category guides are Sets $35, Hoodies $20, Sweaters $20, Jeans $20, Wool sweaters $25, Outerwear $30, and Trousers $15. These are estimates informed by the visible store highlight prices and comparable clothing types, not verified store quotes. The source price remains null in `sourcePrice`; `priceIsEstimate` distinguishes estimates from transcribed prices. Before purchasing, the visitor sends an inquiry to the store for current pricing, sizing, and stock. The website does not process payments.

## Design references

- [COS Spring/Summer 2026 menswear](https://www.cos.com/en-gb/campaign/spring-summer-2026-menswear): contemporary editorial direction and considered wardrobe presentation.
- [Massimo Dutti menswear](https://www.massimodutti.com/gb/men-n1343): restrained luxury styling reference.
- [House of Power source](https://github.com/Hsenghaddar/house-of-power), inspected at commit `d4c5fcb62a9486cded10bf052638c6b100301137`: interaction reference for sticky navigation, search previews, category menu drawer, bag count, quantity controls and continue-exploring behavior. Space's implementation and visual styling are original.

The SPACE text wordmark is an original typographic treatment in the account's requested white/gold direction, not an extracted official logo file.
